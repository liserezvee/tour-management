import mongoose from "mongoose";
import { Server } from "http";
import app from "./app";
import { envVars } from "./app/config/env";

let server: Server;

const startServer = async () => {
  await mongoose.connect(envVars.DB_URL);

  console.log("connected to db");

  server = app.listen(envVars.PORT, () => {
    try {
      console.log(`Server is listening to port ${envVars}`);
    } catch (error) {
      console.log(error);
    }
  });
};

startServer();

process.on("unhandledRejection", (err) => {
  console.log("unhandle Rejection Detected... Server is shutting Down", err);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});
process.on("uncaughtException", (err) => {
  console.log("uncaught Exception Detected... Server is shutting Down", err);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});
//throw new Error("I forgot this local error");

process.on("SIGTERM", (err) => {
  console.log("SIGTERM Detected... Server is shutting Down", err);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});
