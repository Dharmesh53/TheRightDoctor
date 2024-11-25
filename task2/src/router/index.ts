import {
  createPerson,
  deletePerson,
  getPeople,
  updatePerson,
} from "../controllers/person.controller";
import { IncomingMessage, ServerResponse } from "http";
import { sendResponse } from "../lib/utils";

interface StackEntry {
  method: string;
  path: string;
  handler: Function;
}

interface RouterType {
  stack: StackEntry[];
  get: (path: string, handler: Function) => void;
  post: (path: string, handler: Function) => void;
  put: (path: string, handler: Function) => void;
  delete: (path: string, handler: Function) => void;
  handle: (req: IncomingMessage, res: ServerResponse) => void;
}

export default function Router() {
  const router: RouterType = {
    stack: [],

    get(path, handler) {
      this.stack.push({ method: "get", path, handler });
    },

    post(path, handler) {
      this.stack.push({ method: "post", path, handler });
    },

    put(path, handler) {
      this.stack.push({ method: "put", path, handler });
    },

    delete(path, handler) {
      this.stack.push({ method: "delete", path, handler });
    },

    handle(req, res) {
      const { method, url } = req;

      this.stack.forEach((entry) => {
        if (entry.method === method?.toLowerCase() && entry.path === url) {
          return entry.handler(req, res);
        }
      });
    },
  };

  return router;
}

export function attachRoutes(router: RouterType) {
  router.get("/people", getPeople);
  router.post("/person", createPerson);
  router.put("/person", updatePerson);
  router.delete("/person", deletePerson);
}
