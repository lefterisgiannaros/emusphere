import express from "express";
import gameRouter from "./routes/games";
import launcherRouter from './routes/launcher';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/games", gameRouter);
app.use('/games', launcherRouter);

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});
