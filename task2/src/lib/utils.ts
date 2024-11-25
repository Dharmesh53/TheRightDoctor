import { IncomingMessage, ServerResponse } from "http";

export function sendResponse(
  res: ServerResponse,
  statusCode: number,
  data: any
): void {
  res.writeHead(statusCode, {
    "Content-Type": "application/json",
  });

  res.end(JSON.stringify(data));
}

export function parseURL(url: string) {
  if (!url) {
    throw new Error("Please provide a url");
  }
  const arr = url.split("/");
  return arr;
}

export function getBody(req: IncomingMessage) {
  let body: string;
  let data: JSON;

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    data = JSON.parse(body);
  });
}
