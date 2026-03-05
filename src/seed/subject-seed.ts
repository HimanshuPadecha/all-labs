  import { subjects } from "@/db/schema";
  import { db } from "..";
  import dotenv from "dotenv"

  dotenv.config()

  export const seedData = [
    {
      name: "Python",
    },
    {
      name: "Database Management System",
    },
    {
      name: "Project - 1",
    },
  ];

  const subjectSeed = async () => {
    try {
        
      const subs = await db.insert(subjects).values(seedData).returning();

      console.log("The data seeded successfully !!");
    } catch (error) {
      console.log("Error while seeding data");
      console.log(error);
    }
  };

subjectSeed();