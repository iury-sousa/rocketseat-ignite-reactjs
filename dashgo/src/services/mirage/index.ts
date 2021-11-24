import { createServer, Model } from "miragejs";

type User = {
  name: string;
  email: string;
  create_at: string;
};

export function makeServer() {
  const server = createServer({
    models: {
      user: Model.extend<Partial<User>>({}),
    },
    routes() {
      this.namespace = "api";
      this.timing = 750;

      this.get("/users");
      this.post("/users");

      this.namespace = ""; // limpar o namespace para evitar comflitos com o routes/api do next.
      this.passthrough(); // Definido para seguir adiante se não for encontrado a rota na configuração do mirage.
    },
  });

  return server;
}
