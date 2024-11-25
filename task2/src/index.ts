import "dotenv/config";
import http from "http";
import Router, { attachRoutes } from "./router";
import connectToDB from "./db";

const router = Router();

attachRoutes(router);

const server = http.createServer((req, res) => {
  router.handle(req, res);
});

const startServer = () => {
  server.listen(process.env.PORT, () => {
    console.log(`Server is runnning on port ${process.env.PORT}`);
  });
};

connectToDB().then(startServer);
