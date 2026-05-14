#!/usr/bin/env node

const { Client } = require("@notionhq/client");

async function diagnostic() {
  const apiKey = process.env.NOTION_API_KEY;
  const databaseId = process.env.NOTION_DATABASE_ID;

  const notion = new Client({ auth: apiKey });

  try {
    const database = await notion.databases.retrieve({
      database_id: databaseId,
    });

    console.log("Database object keys:", Object.keys(database));
    console.log("\nDatabase title:", database.title);
    console.log("Database properties:", database.properties);
    console.log("\nFull database object:");
    console.log(JSON.stringify(database, null, 2));
  } catch (error) {
    console.error("Error:", error.message);
  }
}

diagnostic();
