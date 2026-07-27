import express from "express";
import gameRouter from "./routes/games";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/games", gameRouter);

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});
