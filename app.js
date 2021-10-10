const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const { sendResponse } = require("./helpers");
const contactsRouter = require("./routes/api/contacts");
const usersRouter = require("./routes/api/users");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);
app.use("/api/users", usersRouter);

app.use((req, res, next) => {
  sendResponse({
    res,
    status: 404,
    statusMessage: "Not found",
  });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  sendResponse({
    res,
    status: status,
    statusMessage: "error",
    data: { message },
  });
});

module.exports = app;
