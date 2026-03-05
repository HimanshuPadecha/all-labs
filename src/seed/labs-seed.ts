import { labs } from "@/db/schema";
import dotenv from "dotenv";
import type { InferInsertModel } from "drizzle-orm";
import { db } from "..";
import { DBMSId, projectId, pythonId } from "./subjects-ids";

dotenv.config();

const pythonLabs: InferInsertModel<typeof labs>[] = [
  {
    labNo: 1,
    name: "Algorithm and Flowcharts - 01",
    subjectId: pythonId,
  },
  {
    labNo: 2,
    name: "Algorithm and Flowcharts - 02",
    subjectId: pythonId,
  },
  {
    labNo: 3,
    name: "Introduction to Python Environment",
    subjectId: pythonId,
  },
  {
    labNo: 4,
    name: "Working with Operators",
    subjectId: pythonId,
  },
  {
    labNo: 5,
    name: "Working with Control Statements",
    subjectId: pythonId,
  },
  {
    labNo: 6,
    name: "Working with Arrays and Command Line Arguments",
    subjectId: pythonId,
  },
  {
    labNo: 7,
    name: "Assignment - 01",
    subjectId: pythonId,
  },
  {
    labNo: 8,
    name: "Functions",
    subjectId: pythonId,
  },
  {
    labNo: 9,
    name: "Function - 2",
    subjectId: pythonId,
  },
  {
    labNo: 10,
    name: "Working with Strings",
    subjectId: pythonId,
  },
  {
    labNo: 11,
    name: "File Handling",
    subjectId: pythonId,
  },
];

const dbmsLabs: InferInsertModel<typeof labs>[] = [
  {
    labNo: 1,
    name: "Introduction to MYSQL and  Create Datbase,Table",
    subjectId: DBMSId,
  },
  {
    labNo: 2,
    name: "MySQL Insert Records into Tables,and MySQL Constraints",
    subjectId: DBMSId,
  },
  {
    labNo: 10,
    name: "Cursor",
    subjectId: DBMSId,
  },
  {
    labNo: 9,
    name: "Function and Trigger",
    subjectId: DBMSId,
  },
  {
    labNo: 7,
    name: "Joins",
    subjectId: DBMSId,
  },
  {
    labNo: 8,
    name: "Store Procedure",
    subjectId: DBMSId,
  },
  {
    labNo: 6,
    name: "Group By and Having",
    subjectId: DBMSId,
  },
  {
    labNo: 5,
    name: "Subquery",
    subjectId: DBMSId,
  },
  {
    labNo: 4,
    name: "Inbuilt Function and Update Query",
    subjectId: DBMSId,
  },
  {
    labNo: 3,
    name: "Basic SQL Queries",
    subjectId: DBMSId,
  },
];

const projectLabs: InferInsertModel<typeof labs>[] = [
  {
    labNo: 11,
    name: "Introduction to PHP III",
    subjectId: projectId,
  },
  {
    labNo: 10,
    name: "Introduction to PHP II",
    subjectId: projectId,
  },
  {
    labNo: 9,
    name: "Introduction to PHP I",
    subjectId: projectId,
  },
  {
    labNo: 8,
    name: "Introduction to JavaScript III",
    subjectId: projectId,
  },
  {
    labNo: 7,
    name: "Introduction to JavaScript II",
    subjectId: projectId,
  },
  {
    labNo: 6,
    name: "Introduction to JavaScript I",
    subjectId: projectId,
  },
  {
    labNo: 5,
    name: "Working with CSS Transition and Animation",
    subjectId: projectId,
  },
  {
    labNo: 4,
    name: "Introduction to CSS I",
    subjectId: projectId,
  },
  {
    labNo: 3,
    name: "Working with Forms in HTML 5",
    subjectId: projectId,
  },
  {
    labNo: 2,
    name: "HTML Table, Hyperlink and Image Map",
    subjectId: projectId,
  },
  {
    labNo: 1,
    name: "Basic HTML Tags and Lists",
    subjectId: projectId,
  },
];

const labsSeed = async () => {
  try {
    // await db.insert(labs).values(pythonLabs);
    // await db.insert(labs).values(dbmsLabs);
    await db.insert(labs).values(projectLabs);
    console.log("Data seeded successfully !!");
  } catch (error) {
    console.log("Error while seeding data");
    console.log(error);
  }
};

labsSeed();
