function getMerchant(mcc) {

    const merchants = {

        "Office Supply": {
            merchant: "Merchant A",
            mid: "MID1001"
        },

        "Electronics": {
            merchant: "Merchant B",
            mid: "MID1002"
        },

        "Travel": {
            merchant: "Merchant C",
            mid: "MID1003"
        },

        "Retail": {
            merchant: "Merchant D",
            mid: "MID1004"
        },

        "Digital Services": {
            merchant: "Merchant E",
            mid: "MID1005"
        }

    };

    return merchants[mcc] || {
        merchant: "Default Merchant",
        mid: "MID0000"
    };

}

module.exports = getMerchant;