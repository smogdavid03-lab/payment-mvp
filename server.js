const express = require("express");
const path = require("path");
const db = require("./database");
const app = express();
const PORT = 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/pay", (req, res) => {
  const { amount, mcc, email } = req.body;

  const transactionId = "TX" + Date.now();
db.run(
    `INSERT INTO transactions
    (transactionId, cardholder, amount, mcc, email, status)
    VALUES (?, ?, ?, ?, ?, ?)`,
    [
        transactionId,
        req.body.cardholder,
        amount,
        mcc,
        email,
        "Processing"
    ],
    function(err){

        if(err){
            console.log(err.message);
        }else{
            console.log("Transaction Saved");
        }

    }
);
  res.send(`
    <h2>Payment Submitted Successfully</h2>
    <p>Transaction ID: ${transactionId}</p>
    <p>Amount: $${amount}</p>
    <p>MCC: ${mcc}</p>
    <p>Email: ${email}</p>
    <p>Status: Processing</p>
    <a href="/">Back</a>
  `);
});
app.get("/admin", (req, res) => {

    db.all("SELECT * FROM transactions ORDER BY id DESC", [], (err, rows) => {

        if (err) {
            return res.send(err.message);
        }

        let html = `
        <html>
        <head>
        <title>Admin Dashboard</title>

        <style>

        body{
            font-family:Arial;
            background:#f4f6f9;
            padding:40px;
        }

        table{

            width:100%;
            border-collapse:collapse;
            background:white;

        }

        th,td{

            padding:12px;
            border:1px solid #ddd;
            text-align:left;

        }

        th{

            background:#0057d9;
            color:white;

        }

        h2{

            margin-bottom:20px;

        }

        </style>

        </head>

        <body>

        <h2>Secure Payment Portal Admin Dashboard</h2>

        <table>

        <tr>

        <th>ID</th>
        <th>Transaction</th>
        <th>Cardholder</th>
        <th>Amount</th>
        <th>MCC</th>
        <th>Email</th>
        <th>Status</th>
        <th>Date</th>

        </tr>
        `;

        rows.forEach(row => {

            html += `
            <tr>

            <td>${row.id}</td>
            <td>${row.transactionId}</td>
            <td>${row.cardholder}</td>
            <td>$${row.amount}</td>
            <td>${row.mcc}</td>
            <td>${row.email}</td>
            <td>${row.status}</td>
            <td>${row.createdAt}</td>

            </tr>
            `;

        });

        html += `
        </table>

        </body>

        </html>
        `;

        res.send(html);

    });

});
app.listen(PORT, () => {
  console.log("Server running on http://localhost:3000");
});