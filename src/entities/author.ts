import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Book } from "./book";

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @OneToMany(() => Book, (book) => book.author)
  books: Book[];
}
