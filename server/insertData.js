const fs = require("fs");
const { parse } = require("csv-parse");
const db = require("./db");


function insertData(){
  let dataExsist = false;
  try {
    db.all("SELECT * FROM car WHERE VIN=\'1C4RJXN66R\'", [], (err, rows) => {
      if(err) {
        console.log(err)
        dataExsist = false;
      } else {
        console.log(dataExsist)
        dataExsist = rows.length !== 0;
        console.log(dataExsist)
      }
    })
  } catch (error) {
    dataExsist = false;
  }

  if(!dataExsist){
    fs.createReadStream("./Electric_Vehicle_Population_Data.csv")
      .pipe(parse({ delimiter: ",", from_line: 2 }))
      .on("data", function (row) {
        db.serialize(function () {
          db.run(
            `INSERT INTO \"car\" ('VIN','County', 'City',	'State', 'Postal_Code',
	            'Model_Year', 'Make', 'Model','Vehicle_Type', 'CAFV_Eligibility',
	            'Electric_Range', 'MSRP', 'District','DOL_ID','Location','Utility')
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [row[0], row[1], row[2], row[3], row[4], row[5], row[6], row[7], row[8], 
              row[9], row[10], row[11], row[12], row[13], row[14], row[15]],
            function (error) {
              if (error) {
                console.log(error)
                return console.log(error.message);
              }
            }
          );
        });
      })
    console.log('All entries enter successfully')
  } else {
    console.log('All entries already exsist')
  }
} 

module.exports = insertData;