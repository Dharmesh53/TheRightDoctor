import { IncomingMessage } from "http";

export interface ServerRequest extends IncomingMessage {
  params?: Record<string, string>;
}
