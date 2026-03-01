import { ASSISTANT_NAME } from "../core/config.js";

const PUSHOVER_API = "https://api.pushover.net/1/messages.json";

export interface PushoverChannelOpts {
  appToken: string;
  userKey: string;
  device?: string;
  priority?: number;
  sound?: string;
}

export class PushoverChannel {
  private opts: PushoverChannelOpts;

  constructor(opts: PushoverChannelOpts) {
    this.opts = opts;
  }

  async start(): Promise<void> {
    // Validate credentials with a receipt-less message dry run isn't possible,
    // so just log that we're ready.
    console.log(
      `[pushover] Channel ready (device: ${this.opts.device || "all"}, priority: ${this.opts.priority ?? 0})`
    );
  }

  async stop(): Promise<void> {
    // Nothing to tear down.
  }

  async sendMessage(_jid: string, text: string): Promise<void> {
    const body: Record<string, string> = {
      token: this.opts.appToken,
      user: this.opts.userKey,
      title: ASSISTANT_NAME,
      message: text,
      html: "1",
    };

    if (this.opts.device) body.device = this.opts.device;
    if (this.opts.priority !== undefined) body.priority = String(this.opts.priority);
    if (this.opts.sound) body.sound = this.opts.sound;

    // Pushover messages are limited to 1024 characters. If the message is
    // longer, truncate and append an ellipsis.
    if (body.message.length > 1024) {
      body.message = body.message.slice(0, 1021) + "...";
    }

    const response = await fetch(PUSHOVER_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.error(`[pushover] Send failed (${response.status}): ${detail}`);
      throw new Error(`Pushover API error: ${response.status}`);
    }
  }
}
