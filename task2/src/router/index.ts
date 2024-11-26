import {
  createPerson,
  deletePerson,
  getPeople,
  updatePerson,
} from "../controllers/person.controller";
import { IncomingMessage, ServerResponse } from "http";
import { ServerRequest } from "../types";

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
  handle: (req: ServerRequest, res: ServerResponse) => void;
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
        const params: Record<string, string> = {};
        const routeRegex = new RegExp(
          `^${entry.path.replace(/:([^/]+)/g, (_, key) => {
            params[key] = "";
            return "([^/]+)";
          })}$`
        );

        const match = url?.match(routeRegex);

        if (entry.method === method?.toLowerCase() && match) {
          const paramsKeys = Object.keys(params);
          paramsKeys.forEach((key, index) => {
            params[key] = match[index + 1];
          });

          req.params = params;
          return entry.handler(req, res);
        }
      });
    },
  };

  return router;
}

export function attachRoutes(router: RouterType) {
  router.get("/person", getPeople);
  router.post("/person", createPerson);
  router.put("/person/:id", updatePerson);
  router.delete("/person/:id", deletePerson);
}
