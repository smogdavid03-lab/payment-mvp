const express = require("express");
const router = express.Router();
const db = require("../database");
const getMerchant = require("../services/merchantRouter");
router.post("/", (req, res) => {

    const { cardholder, amount, mcc, email } = req.body;

    const transactionId = "TX" + Date.now();
const merchant = getMerchant(mcc);
    db.run(
        `INSERT INTO transactions
        (transactionId, cardholder, amount, mcc, email, status)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [
            transactionId,
            cardholder,
            amount,
            mcc,
            email,
            "Processing"
        ],
        function(err){

            if(err){
                return res.status(500).json({
                    success:false,
                    message:err.message
                });
            }

           res.json({
    success: true,
    transactionId,
    status: "Processing",
    merchant: merchant.merchant,
    mid: merchant.mid
});

        }

    );

});

module.exports = router;