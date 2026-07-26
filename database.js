const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./payments.db", (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log("Connected to SQLite database.");
    }
});

db.serialize(() => {

    // Transactions table
    db.run(`
        CREATE TABLE IF NOT EXISTS transactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            transactionId TEXT,
            cardholder TEXT,
            amount REAL,
            mcc TEXT,
            email TEXT,
            status TEXT,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // Merchants table
    db.run(`
        CREATE TABLE IF NOT EXISTS merchants (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            merchantName TEXT,
            mid TEXT,
            mcc TEXT,
            status TEXT
        )
    `);

    // Default merchants
       db.run(`
INSERT OR IGNORE INTO merchants
(id, merchantName, mid, mcc, status)
VALUES
(1,'Merchant A','MID1001','Office Supply','Active'),
(2,'Merchant B','MID1002','Office Supply','Active'),
(3,'Merchant C','MID1003','Office Supply','Active'),
(4,'Merchant D','MID2001','Electronics','Active'),
(5,'Merchant E','MID3001','Travel','Active'),
(6,'Merchant F','MID4001','Retail','Active'),
(7,'Merchant G','MID5001','Digital Services','Active')
`);

});

module.exports = db;