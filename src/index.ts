import express, { Request, Response } from "express";
import { AppDataSource } from "./data-source";
import { Author } from "./entities/author";
import { Book } from "./entities/book";

const app = express();
app.use(express.json());
const port = 3000;

const authorRepository = AppDataSource.getRepository(Author);
const bookRepository = AppDataSource.getRepository(Book);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world!");
});

app.get("/authors", async (req, res) => {
  try {
    const authors = await authorRepository.find({
      relations: ["books"],
      select: {
        books: {
          id: true,
          ISBN: true,
          name: true,
          cantPages: true,
          createdAt: true,
        },
      },
    });
    return res.json({ authors });
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/authors", async (req, res) => {
  try {
    const { name, age } = req.body;

    if (!name || !age) {
      return res
        .status(400)
        .json({ message: "Bad request, name or age not found" });
    }

    const newAuthor = authorRepository.create({ name, age });
    await authorRepository.save(newAuthor);
    return res.status(201).json({ author: newAuthor });
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/books", async (req, res) => {
  try {
    const books = await bookRepository.find();
    return res.json({ books });
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/books", async (req, res) => {
  try {
    const { ISBN, name, cantPages, author } = req.body;

    if (!ISBN || !name || !cantPages || !author) {
      return res.status(400).json({
        message: "Bad request, ISBN or name or cantPages or author not found",
      });
    }

    const authorEntity = await authorRepository.findOne({
      where: { id: author },
    });
    if (!authorEntity) {
      return res.status(400).json({ message: "Author not found" });
    }

    const newBook = bookRepository.create({
      ISBN,
      name,
      cantPages,
      author: authorEntity,
    });
    await bookRepository.save(newBook);
    return res.status(201).json({ book: newBook });
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});

AppDataSource.initialize()
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
  });
