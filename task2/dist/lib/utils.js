export function sendResponse(res, statusCode, data) {
    res.writeHead(statusCode, {
        "Content-Type": "application/json",
    });
    res.end(JSON.stringify(data));
}
export function parseURL(url) {
    if (!url) {
        throw new Error("Please provide a url");
    }
    const arr = url.split("/");
    return arr;
}
export function getBody(req) {
    return new Promise((resolve, reject) => {
        let body = "";
        let data;
        req.on("data", (chunk) => {
            body += chunk.toString();
        });
        req.on("end", () => {
            try {
                data = JSON.parse(body);
                resolve(data);
            }
            catch (error) {
                reject(error);
            }
        });
    });
}
