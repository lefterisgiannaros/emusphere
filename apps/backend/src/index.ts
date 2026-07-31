import express from "express";
import cors from 'cors';
import gameRouter from "./routes/games";
import launcherRouter from './routes/launcher';
import { installCores } from './lib/retroarch';
import settingsRouter from './routes/settings';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use("/games", gameRouter);
app.use('/games', launcherRouter);
app.use('/settings', settingsRouter);

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

installCores().catch(console.error);

app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});