import { DataSource } from "typeorm";
import { Author } from "./entities/author";
import { Book } from "./entities/book";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "123456",
  database: "test",
  synchronize: true,
  logging: false,
  entities: [Author, Book],
  subscribers: [],
  migrations: [],
});
