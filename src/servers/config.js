import express from "express";
import cors from "cors";
import morgan from "morgan";
import { dirname } from "path";
import { fileURLToPath } from "url";
import './dbConfig.js';
import indexRoutes from "../routers/index.routes.js";


export default class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3001;
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(morgan("dev"));

    const __dirname = dirname(fileURLToPath(import.meta.url));
    this.app.use(express.static(__dirname + "/../../public"));
  }

  routes() {
    this.app.use("/api", indexRoutes);
  }

  listen() {
    this.app.listen(this.port, () =>
      console.info(
        `El servidor esta ejecutando en: http://localhost:${this.port}`
      )
    );
  }
}
