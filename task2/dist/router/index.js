import { createPerson, deletePerson, getPeople, updatePerson, } from "../controllers/person.controller";
export default function Router() {
    const router = {
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
                const params = {};
                const routeRegex = new RegExp(`^${entry.path.replace(/:([^/]+)/g, (_, key) => {
                    params[key] = "";
                    return "([^/]+)";
                })}$`);
                const match = url === null || url === void 0 ? void 0 : url.match(routeRegex);
                if (entry.method === (method === null || method === void 0 ? void 0 : method.toLowerCase()) && match) {
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
export function attachRoutes(router) {
    router.get("/person", getPeople);
    router.post("/person", createPerson);
    router.put("/person/:id", updatePerson);
    router.delete("/person/:id", deletePerson);
}
