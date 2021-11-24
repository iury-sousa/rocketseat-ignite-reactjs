import { createServer, Factory, Model } from "miragejs";
import faker from "faker";

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

    factories: {
      user: Factory.extend({
        name(index: number) {
          const { firstName, lastName } = faker.name;
          return `${firstName()} ${lastName()}`;
        },
        email() {
          return faker.internet.email().toLowerCase();
        },
        createAt() {
          const days = 10;
          return faker.date.recent(days);
        },
      }),
    },

    seeds(server) {
      server.createList("user", 200);
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
