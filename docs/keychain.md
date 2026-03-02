# Keychain

Piclaw includes an encrypted SQLite-backed keychain for storing tokens and username/password pairs and injecting them into tool environment variables. All secrets live inside `messages.db` (no extra files).

## How it works

- Secrets are stored in `keychain_entries` inside `/workspace/.piclaw/store/messages.db`.
- Each entry is encrypted with **AES-256-GCM**.
- Keys are derived with **PBKDF2-SHA256** using a per-entry salt.
- A per-entry nonce is stored alongside the ciphertext.
- Entry names are included as additional authenticated data (AAD) to prevent swaps.
- SQLite runs with `PRAGMA secure_delete=ON` so deletes overwrite data pages.

## Configuration

The keychain is disabled unless you provide a master key:

| Variable | Purpose |
|----------|---------|
| `PICLAW_KEYCHAIN_KEY` | Master key for encrypting/decrypting secrets |
| `PICLAW_KEYCHAIN_KEY_FILE` | Path to a file containing the master key |

If neither is set, keychain operations fail with a “Keychain is disabled” error.

## Entry format

Each entry stores:

- `name` (unique, freeform; e.g. `github/foo/bar`)
- `type` (`token`, `password`, `basic`, `secret`)
- `secret` (encrypted)
- `username` (optional, encrypted with the secret)

## Adding entries

Use the CLI (recommended):

```bash
PICLAW_KEYCHAIN_KEY="your-master-key" \
  piclaw keychain set github/foo/bar \
    --type token \
    --secret "ghp_xxx" \
    --username "octo"
```

Or with a secret file:

```bash
PICLAW_KEYCHAIN_KEY="your-master-key" \
  piclaw keychain set github/foo/bar \
    --type token \
    --secret-file /path/to/token.txt
```

You can update an entry by calling `set` again with the same name.

## Listing and deleting

```bash
PICLAW_KEYCHAIN_KEY="your-master-key" piclaw keychain list
PICLAW_KEYCHAIN_KEY="your-master-key" piclaw keychain delete github/foo/bar
```

## Low-level API

If you need direct access, you can call the module directly:

```bash
PICLAW_KEYCHAIN_KEY="your-master-key" \
  bun -e 'import { initDatabase } from "./piclaw/src/db.js";
    import { setKeychainEntry } from "./piclaw/src/secure/keychain.js";
    initDatabase();
    await setKeychainEntry({
      name: "github/foo/bar",
      type: "token",
      secret: "ghp_xxx",
      username: "octo"
    });'
```

## Using entries in tools

Tool env maps can reference keychain entries with the `keychain:` prefix.

- `keychain:NAME` resolves to the stored secret.
- `keychain:NAME:username` resolves to the stored username.

Example:

```json
{
  "env": {
    "GITHUB_TOKEN": "keychain:github/foo/bar",
    "GITHUB_USER": "keychain:github/foo/bar:username"
  }
}
```

Only explicitly declared env vars are resolved. Nothing is injected automatically.

## Notes

- Entry names can be hierarchical (`github/foo/bar`).
- The keychain uses the current master key for all entries; rotating keys requires re-encrypting entries (not yet automated).
- Avoid logging secrets. The tool runner resolves keychain values only at execution time.
