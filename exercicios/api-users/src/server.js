import http from "http";
import { routes } from "./routes/routes.js";
import { json } from "./middlewares/json.js";

const server = http.createServer(async (req, res) => {
    const { method, url } = req;

    await json(req, res);

    const route = routes.find((route) => {
        return route.method === method && route.path === url;
    });

    if (route) {
        return route.handler(req, res);
    }
    res.writeHead(404).end("Route not found.");
});

const port = 3000;

server.listen(port, () => {
    console.log(`Server started on port http://localhost:${port}/users`);
});