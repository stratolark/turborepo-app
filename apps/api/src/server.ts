import { json, urlencoded } from "body-parser";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import actuator from "express-actuator";
import session from "express-session";
import redis from "connect-redis";
import { redisClient } from "./config/redis";
import { SESSION_SECRET } from "./config/env";

const RedisStore = redis(session);

export const createServer = () => {
  const app = express();

  // middleware
  app.disable("x-powered-by");
  app.use(morgan("dev"));
  app.use(urlencoded({ extended: true }));
  app.use(json());
  app.use(cors());

  // Sessions with Redis
  app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      saveUninitialized: false,
      secret: SESSION_SECRET as string,
      resave: false,
    })
  );

  // Health checks
  app.use(actuator());

  // Routes
  app.get("/message/:name", (req, res) => {
    return res.json({ message: `hello ${req.params.name}` });
  });

  return app;
};
