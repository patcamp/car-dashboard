const fs = require("fs");
const db = require("./db");


const columns = [
    'VIN',	
    'County',
	'City',	
    'State',
    'Postal_Code',
	'Model_Year',
	'Make',
	'Model',
	'Vehicle_Type',
	'CAFV_Eligibility',
	'Electric_Range',
	'MSRP',
	'District',
	'DOL_ID',
	'Location',
	'Utility'
]

function getAllData(cols = []){
    return new Promise(function(resolve, reject){
        let selectStatement =  `SELECT * FROM car`;

        var resp;
        db.all(selectStatement, function cb(error, rows) {
            if (error) {
                console.log("ERROR: retieveData:getAllData - " + error.message);
                resp = {
                    status: 400,
                    error: error
                  };
                reject(resp);
            } else {
                resp = {
                    status: 200,
                    count: rows.length, 
                    data: rows,
                };
                console.log("Success: retieveData:getAllData");
                resolve(resp);
            }
        });
   }) 
}

function getCountsOfMakes(){
    return new Promise(function(resolve, reject){
        let selectStatement =  `SELECT Make FROM car`;

        var resp;
        db.all(selectStatement, function cb(error, rows) {
            if (error) {
                console.log("ERROR: retieveData:countsOfMakes - " + error.message);
                resp = {
                    error: error
                  };
                reject(resp);
            } else {
                let respRows = [];
                let found = false; 
                for(let row of rows) {
                    for (let respRow of respRows){
                        if (respRow['Make'] === row['Make'] && !found){
                            respRow['Count'] += 1;
                            found = true;
                        } 
                    }
                    if (!found){
                        respRows.push({
                            'Count': 1,
                            'Make': row['Make']
                        });
                    }
                    found = false
                }
                resp = {
                    data: respRows
                };
                console.log("Success: retieveData:countsOfMakes");

                resolve(resp);
            }
        });
   }) 
}

module.exports = {getAllData, getCountsOfMakes}