import express from "express";
const app = express();
const port = 5000;

app.get("/", (_, res) => {
  res.send("Working!!!");
});

app.listen(port, () => console.log(`Running on port ${port}`));
