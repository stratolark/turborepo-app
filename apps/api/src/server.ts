import { json, urlencoded } from "body-parser";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import actuator from "express-actuator";

export const createServer = () => {
  const app = express();
  app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors())
    .use(actuator())
    .get("/message/:name", (req, res) => {
      return res.json({ message: `hello ${req.params.name}` });
    });

  return app;
};
