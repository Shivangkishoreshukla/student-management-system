require("dotenv").config();
const mysql = require("mysql2");

const db = mysql.createConnection({
  uri: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
db.connect((err)=>{
  if(err){
    console.log("Database connection failed:", err);
  } else {
    console.log("Database connected");
  }
});

module.exports = db;