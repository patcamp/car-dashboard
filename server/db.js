const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();
const filepath = "./car.db";

function connectToDatabase() {
  if (fs.existsSync(filepath)) {
    console.log("Connected to the database successfull from exisiting");
    return new sqlite3.Database(filepath);
  } else {
    const db = new sqlite3.Database(filepath, (error) => {
      if (error) {
        console.log(error)
        return console.error(error.message);
      }
      createTable(db);
      console.log("Connected to the database successfully");
    });
    return db;
  }
}

function createTable(db) {
  db.exec(`
  CREATE TABLE car
  (
    VIN                 VARCHAR(10),
    County              VARCHAR(20),
    City                VARCHAR(50),
    State               VARCHAR(2),
    Postal_Code         INT,
    Make                VARCHAR(15),
    Model_Year          INT,
    Model               VARCHAR(15),
    Vehicle_Type        VARCHAR(30),
    CAFV_Eligibility    VARCHAR(30),
    Electric_Range      INT,
    MSRP                INT,
    District            INT,
    DOL_ID              INT,
    LOCATION            VARCHAR(20),
    UTILITY             VARCHAR(20)
  )
`);
}

module.exports = connectToDatabase();