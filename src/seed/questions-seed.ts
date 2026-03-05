import dotenv from "dotenv";
import { InferInsertModel } from "drizzle-orm";
import { questions } from "@/db/schema";
import { db } from "..";
import { pythonId } from "./subjects-ids";

dotenv.config();

const labId = "78c99b00-c8ba-4264-8a17-2180f186f161";

const pythonLabOne: InferInsertModel<typeof questions>[] = [
  {
    questionNo: 1,
    questionText:
      "What are the symbols used to draw a flowchart? Mention the symbol, purpose, and its explanation.",
    labId,
    subjectId: pythonId,
  },
  {
    questionNo: 2,
    questionText:
      "Write a step-form algorithm and flowchart to find the sum of two numbers.",
    labId,
    subjectId: pythonId,
  },
  {
    questionNo: 3,
    questionText:
      "Write step-form algorithm and flowchart to:\n(a) Calculate the area of a rectangle.\n(b) Calculate the area of a circle.\n(c) Check if a number is even or odd.",
    labId,
    subjectId: pythonId,
  },
  {
    questionNo: 4,
    questionText:
      "Draw flowchart for the following:\n(a) Given a positive integer N, calculate the sum of its digits (e.g., 432 → 4 + 3 + 2 = 9).\n(b) Read three numbers A, B, and C and output the largest.\n(c) Compute the factorial of a non-negative integer N (i.e., N! = 1×2×...×N).\n(d) Find the greatest common divisor of two positive integers A and B using repeated subtraction or modulo.\n(e) Given a year Y, determine whether it is a leap year.\n(f) Convert a temperature value between Celsius and Fahrenheit based on user choice.\n(g) Search for a target value T in an array of N elements. Return the index if found; otherwise, output -1.\n(h) Given N numbers, compute their sum and average.\n(i) Determine whether a given integer X > 1 is a prime or not.\n(j) Reverse the digits of a positive integer N (e.g., 1234 → 4321).\n(k) Check whether a 3-digit number N is an Armstrong number (sum of cubes of digits equals N).",
    labId,
    subjectId: pythonId,
  },
  {
    questionNo: 5,
    questionText:
      "Draw flowchart for a basic login system of a web application.",
    labId,
    subjectId: pythonId,
  },
];

const questionsSeed = async () => {
  try {
    await db.insert(questions).values(pythonLabOne);
    console.log("Data seeded successfully !!");
  } catch (error) {
    console.log("Error while seeding data");
    console.log(error);
  }
};

questionsSeed()
