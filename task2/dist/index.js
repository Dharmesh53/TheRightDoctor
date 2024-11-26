import "dotenv/config";
import http from "http";
import Router, { attachRoutes } from "./router";
import connectToDB from "./db";
const router = Router();
attachRoutes(router);
const server = http.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    if (req.method === "OPTIONS") {
        res.writeHead(204);
        return res.end();
    }
    router.handle(req, res);
});
const startServer = () => {
    server.listen(process.env.PORT, () => {
        console.log(`Server is runnning on port ${process.env.PORT}`);
    });
};
connectToDB().then(startServer);
