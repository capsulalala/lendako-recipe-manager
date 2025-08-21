import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { recipesRouter } from "./routes/recipes.js";

dotenv.config();

export const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

app.use("/recipes", recipesRouter);

const port = Number(process.env.PORT ?? 4000);

// Only start listening if this file is executed directly (not imported by tests)
if (process.argv[1] && process.argv[1].endsWith("index.ts")) {
  app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
  });
}
