import Server from "./src/servers/config.js";
import router from "./src/routers/index.routes.js"


const server = new Server();
server.app.use("/api", router)

server.listen();