import { IncomingMessage, ServerResponse } from "http";
import { IPerson } from "../db/person.schema";

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
  return new Promise((resolve, reject) => {
    let body: string = "";
    let data;

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      try {
        data = JSON.parse(body);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  });
}
