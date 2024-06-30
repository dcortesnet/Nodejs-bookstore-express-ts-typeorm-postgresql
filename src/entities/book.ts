import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Author } from "./author";

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ISBN: string;

  @Column()
  name: string;

  @Column()
  cantPages: number;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @ManyToOne(() => Author, (author) => author.books)
  author: Author;
}
