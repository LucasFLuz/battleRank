import { app } from "./app.js";

const PORT = process.env.PORT ? Number(process.env.PORT) : 3333;

app.listen(PORT, () => {
  console.log(`[battleRank API] Servidor rodando com sucesso em http://localhost:${PORT}`);
  console.log(`[battleRank API] Ambiente: ${process.env.NODE_ENV || "development"}`);
});
