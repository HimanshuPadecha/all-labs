import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema, createUpdateSchema } from "drizzle-zod";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  email: text("email").notNull(),
  name: text("name").notNull(),
  clerkId: text("clerk_id").notNull(),
  profileImage: text("profile_image").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const subjects = pgTable("subjects", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const labs = pgTable("labs", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  subjectId: uuid("subject_id")
    .references(() => subjects.id, { onDelete: "cascade" })
    .notNull(),
  name: text("name").notNull(),
  labNo: integer("lab_no").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const labsSchema = createInsertSchema(labs);

export const questions = pgTable("questions", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  labId: uuid("lab_id").references(() => labs.id, { onDelete: "cascade" }).notNull(),
  questionNo: integer("question_no").notNull(),
  questionText: text("question_text").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const answers = pgTable("answers", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  questionId: uuid("question_id").references(() => questions.id, {
    onDelete: "cascade",
  }).notNull(),
  answerText: text("answer_text").notNull(),
  outputText: text("output_text"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});


export type Subject = typeof subjects.$inferSelect;
export type Lab = typeof labs.$inferSelect;