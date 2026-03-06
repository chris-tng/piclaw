/**
 * test/channels/web/workspace-file-service.test.ts
 *
 * High-value coverage for workspace file read/write/upload paths.
 */

import { expect, test } from "bun:test";
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "fs";
import { join } from "path";

import { initDatabase } from "../../../src/db.js";
import { WorkspaceFileService } from "../../../src/channels/web/workspace/file-service.js";
import { WORKSPACE_DIR } from "../../../src/core/config.js";

function setupWorkspaceDir() {
  initDatabase();

  const prefix = `workspace-file-service-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const base = join(WORKSPACE_DIR, prefix);
  mkdirSync(base, { recursive: true });

  const cleanup = () => {
    rmSync(base, { recursive: true, force: true });
  };

  return { prefix, base, cleanup, service: new WorkspaceFileService() };
}

test("getFile handles invalid, directory, text/json/image and binary modes", () => {
  const { prefix, base, cleanup, service } = setupWorkspaceDir();
  try {
    writeFileSync(join(base, "note.txt"), "hello\nworld\n", "utf8");
    writeFileSync(join(base, "raw.json"), '{"a":1}', "utf8");
    writeFileSync(join(base, "binary.bin"), Buffer.from([0, 159, 146, 150]));
    writeFileSync(join(base, "image.png"), Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));

    expect(service.getFile("../../etc/passwd").status).toBe(400);
    expect(service.getFile(prefix).status).toBe(400); // directory path

    const text = service.getFile(`${prefix}/note.txt`);
    expect(text.status).toBe(200);
    expect((text.body as any).kind).toBe("text");
    expect((text.body as any).text).toContain("hello");

    const json = service.getFile(`${prefix}/raw.json`);
    expect(json.status).toBe(200);
    expect((json.body as any).text).toContain('\n  "a": 1\n');

    const image = service.getFile(`${prefix}/image.png`);
    expect(image.status).toBe(200);
    expect((image.body as any).kind).toBe("image");
    expect((image.body as any).url).toContain(`/workspace/raw?path=${encodeURIComponent(`${prefix}/image.png`)}`);

    const binaryPreview = service.getFile(`${prefix}/binary.bin`);
    expect(binaryPreview.status).toBe(200);
    expect((binaryPreview.body as any).kind).toBe("binary");

    const binaryEdit = service.getFile(`${prefix}/binary.bin`, null, "edit");
    expect(binaryEdit.status).toBe(400);
    expect((binaryEdit.body as any).error).toContain("Binary file cannot be edited");
  } finally {
    cleanup();
  }
});

test("updateFile and getRaw handle success and errors", () => {
  const { prefix, base, cleanup, service } = setupWorkspaceDir();
  try {
    writeFileSync(join(base, "edit.txt"), "before", "utf8");

    expect(service.getRaw(`${prefix}/missing.txt`).status).toBe(404);

    const raw = service.getRaw(`${prefix}/edit.txt`);
    expect(raw.status).toBe(200);
    expect(raw.contentType).toBe("text/plain");

    expect(service.updateFile(`${prefix}/edit.txt`, undefined as any).status).toBe(400);
    expect(service.updateFile(`${prefix}/missing.txt`, "x").status).toBe(404);

    const updated = service.updateFile(`${prefix}/edit.txt`, "after");
    expect(updated.status).toBe(200);
    expect(readFileSync(join(base, "edit.txt"), "utf8")).toBe("after");
  } finally {
    cleanup();
  }
});

test("uploadFile, attachFile, and downloadZip return expected outcomes", async () => {
  const { prefix, base, cleanup, service } = setupWorkspaceDir();
  try {
    mkdirSync(join(base, "uploads"), { recursive: true });
    writeFileSync(join(base, "attach.txt"), "attach me", "utf8");

    const upload = await service.uploadFile(`${prefix}/uploads`, new File(["abc"], "new.txt"));
    expect(upload.status).toBe(200);
    expect((upload.body as any).path).toBe(`${prefix}/uploads/new.txt`);

    const conflict = await service.uploadFile(`${prefix}/uploads`, new File(["abc"], "new.txt"));
    expect(conflict.status).toBe(409);

    const overwrite = await service.uploadFile(`${prefix}/uploads`, new File(["xyz"], "new.txt"), true);
    expect(overwrite.status).toBe(200);
    expect((overwrite.body as any).overwritten).toBe(true);

    mkdirSync(join(base, "uploads", "foldername"), { recursive: true });
    const toDir = await service.uploadFile(`${prefix}/uploads`, new File(["q"], "foldername"), true);
    expect(toDir.status).toBe(400);

    const missingDir = await service.uploadFile(`${prefix}/missing-dir`, new File(["x"], "a.txt"));
    expect(missingDir.status).toBe(404);

    const attached = service.attachFile(`${prefix}/attach.txt`);
    expect(attached.status).toBe(200);
    expect((attached.body as any).media_id).toBeGreaterThan(0);

    const attachDir = service.attachFile(`${prefix}/uploads`);
    expect(attachDir.status).toBe(400);

    const zipDir = await service.downloadZip(`${prefix}/uploads`);
    expect(zipDir.status).toBe(200);
    expect(zipDir.filename).toBe("uploads.zip");

    const zipFile = await service.downloadZip(`${prefix}/attach.txt`);
    expect(zipFile.status).toBe(400);
  } finally {
    cleanup();
  }
});
