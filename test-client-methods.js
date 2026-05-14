#!/usr/bin/env node

const { Client } = require("@notionhq/client");

const apiKey = process.env.NOTION_API_KEY;
const notion = new Client({ auth: apiKey });

console.log("notion.databases methods:");
console.log(Object.getOwnPropertyNames(notion.databases).filter(m => typeof notion.databases[m] === 'function'));

console.log("\nnotion.databases prototype methods:");
console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(notion.databases)));
