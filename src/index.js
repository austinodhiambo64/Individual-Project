import { create, router as _router, defaults } from "json-server";
const server = create();
const route =_router("db.json");
const middlewares = defaults();

const port = process.env.PORT || 3000;

server.use(middlewares)
server.use(_router)
server.listen(port)