import { pgTable, varchar, text } from "drizzle-orm/pg-core";

export const departments = pgTable("departments", {
  id: varchar("id", { length: 36 }).primaryKey(),
  name: text("name").notNull(),
});
