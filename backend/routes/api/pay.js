const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const axios = require("axios");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
// const { getIo } = require('../../socketManager');

const Transaction = require("../../models/Transaction");
const User = require("../../models/User");
const Bet = require("../../models/Bet");

router.post("/deposit", auth, async (req, res) => {
    try {

        console.log("deposit function called..");
       const { amount, currency, platform } = req.body;
       // console.log(req.body);
      const user = await User.findById(req.user.id).select("-password");
      const DEPOSIT_URL = `${process.env.PMG_BASE_URL}/api/v1/Payment/Deposit`;
      
//console.log(DEPOSIT_URL);


//var current_time=Math.round((new Date()).getTime() / 1000);
 //var secret='SC2629eb1e986556185720';
 //var _key='AK61139a76cf3a83118dee';
 //var preHASH="#" + current_time + "@" + secret + "#";
 //var HASH=CryptoJS.MD5(preHASH).toString();
//console.log(HASH);
//console.log(current_time);


console.log("Deposit URL:"+DEPOSIT_URL);
console.log("ClientCode:"+process.env.CLIENT_CODE);
console.log("memberFlag:"+user.name);
console.log("Amount:"+amount);
console.log("hrefbackurl:https://ama777.cloud");
        await axios
            .post(
                DEPOSIT_URL,
                {
                    clientCode: process.env.CLIENT_CODE,
                    memberFlag: user.name,
                    amount:amount,
                    hrefbackUrl:
                        platform == "ama777agent"
                            ? "https://ama777.cloud"
                            : "https://ama777.cloud",

                    // orderNo:1122334455,
                    // paymentMethod:'QRPAYMENT',
                    // currency:'CNY',
                    // orderAmount: amount,
                    // productName:'Deposit',
                    // trafficType:'Gaming',
                    // callbackUrl:'https://dotbet-backend.6o1yzt.easypanel.host',
                    // redirectUrl:'https://dotbet-backend.6o1yzt.easypanel.host',
                    // ipAddress:'89.116.38.135',
                    // source:'website',
                    // clientFirstName:'john',
                    // clientLastName:'D',
                    // clientEmail:'koiescafe@gmail.com',
                    // clientPhone:'9898989898',

                },
                {
                    headers: {
                        "Content-Type": "application/json",
                       // "authorization": HASH,
 
                        "Accept": "application/json",
                        //"api-key": _key,
                        //"time": current_time
                       Authorization: `Bearer ${process.env.TESLLA_PAY_TOKEN}`,
                    },
                }
            )
            .then(function (response) {
                console.log("response..."+response);
                if (response.data.httpCode == 200) {
                //    console.log("response.."+response);
                    const resp = response.data.data;

                    // callbackUrl: "http://dotbet.co"
                    // hrefbackUrl: "http://dotbet.co"
                    // orderNo: "TRXZCZO0000208"
                    // payUrl: "https://ppypayment.xyzonline.app/3fGXsTdZhAFVFgmJNOWu"
                    // requestAmount: 100
                    // sign: "0bc4c6f7d059cff702872938736dafd7"
                    // status: "CREATE"

                    try {
                        let transaction = new Transaction({
                            userid: req.user.id,
                            clientCode: process.env.CLIENT_CODE,
                            payAmount: resp.requestAmount,
                            trxNo: resp.orderNo,
                            sign: resp.sign,
                            status: resp.status,
                            type: "deposit",
                            platform: platform,
                        });
                        transaction.save();
                    } catch (ex) {
                        //console.log("/deposit error", ex);
                    }

                    res.send({ payUrl: resp.payUrl });

                    // const io = getIo();

                    // io.emit('newPage',
                    // {
                    //   page: '_blank',
                    //   payUrl: resp.payUrl
                    // });

                    // res.json({ status: "0000"});
                } else {
                    console.log("errrrorororoor");
                }
            });
    } catch (ex) {
        console.log("Error Exception On Deposit"+ex);
    }
});

router.post("/withdraw", auth, async (req, res) => {
    try {
        const { amount, platform } = req.body;
        console.log(req.body);
        const user = await User.findById(req.user.id).select("-password");
        const WITHDRAW_URL = `${process.env.PMG_BASE_URL}/api/v1/Payout/Withdraw`;

        if (Number(user.balance) < Number(amount)) {
            res.send({
                success: false,
                message: "Not Enough Balance!",
            });

            return;
        }

        // Start Check turnover
        // check playing amount should be over withdrawal amount.
        const result = await Bet.aggregate([
            {
                $match: {
                    userId: req.user.name.toLowerCase(),
                    // action: { $in: ["bet", "betNSettle"] }, // Filters documents to include only those where action is either 'bet' or 'betNSettle'
                },
            },
            {
                $group: {
                    _id: null, // Grouping by null means aggregating all documents together
                    totalBetAmount: { $sum: "$turnover" }, // Sums up all betAmount values
                },
            },
        ]);

        let totalBetAmount = 0;
        if (result.length > 0) {
            console.log("Total Bet Amount:", result[0].totalBetAmount);
            totalBetAmount = result[0].totalBetAmount;
        } else {
            console.log("No bets found or sum is zero");
        }

        if (amount > totalBetAmount) {
            res.send({
                success: false,
                message: "Not Enough Turnover!",
            });

            return;
        }
        // End Check turnover

        await axios
            .post(
                WITHDRAW_URL,
                {
                    clientCode: process.env.CLIENT_CODE,
                    memberFlag: user.name,
                    bankCardNumber: user.bban,
                    bankUserName: user.bbun,
                    bankName: user.bbn,
                    amount: amount,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${process.env.TESLLA_PAY_TOKEN}`,
                    },
                }
            )
            .then(function (response) {
                console.log(response.data);
                /*
                {
                    success: true,
                    httpCode: 200,
                    data: {
                    orderNo: 'PYXLMVI0000042',
                    requestAmount: 100,
                    status: 'PAYING',
                    sign: '02443457e4fae3201168a7f03359adc8'
                    }
                }
                */
                if (response.data.success) {
                    const { orderNo, requestAmount, status, sign } =
                        response.data.data;
                    try {
                        let transaction = new Transaction({
                            userid: req.user.id,
                            clientCode: process.env.CLIENT_CODE,
                            payAmount: requestAmount,
                            trxNo: orderNo,
                            sign: sign,
                            status: status,
                            type: "withdraw",
                            platform: platform,
                        });
                        transaction.save();

                        User.findById(req.user.id)
                            .then((user) => {
                                user.balance =
                                    Number(user.balance) -
                                    Number(requestAmount);
                                user.save();
                            })
                            .catch((err) => {
                                console.log(
                                    "/withdrawal_callback error user",
                                    err
                                );
                            });
                    } catch (ex) {
                        console.log("/withdraw error", ex);
                    }
                }
                res.send(response.data);
            });
    } catch (ex) {
        console.log("Error Exception On Deposit", ex);
    }
});

router.post("/deposit_callback", async (req, res) => {
    const {
        clientCode,
        sign,
        status,
        payAmount,
        chainName,
        clientNo,
        coinUnit,
    } = req.body;
    const filter = { trxNo: clientNo }; // Find a document with this condition
    console.log("deposit_callback");

    if (status == "PAID") {
        // + balance of the user
        let trx = await Transaction.findOne(filter);

        User.findById(trx.userid)
            .then((user) => {
                user.balance = Number(user.balance) + Number(payAmount);
                user.save();
            })
            .catch((err) => {
                console.log("/deposit_callback error user", err);
            });

        const update = {
            clientCode,
            status,
            chainName,
            coinUnit,
        };

        Transaction.findOneAndUpdate(filter, update, { new: true })
            .then((updatedDocument) => {
                if (updatedDocument) {
                    console.log(
                        `Successfully updated document: ${updatedDocument}.`
                    );
                } else {
                    console.log("No document matches the provided query.");
                }
            })
            .catch((err) =>
                console.error(`Failed to find and update document: ${err}`)
            );
    } else if (status == "CANCEL") {
        const update = {
            status,
        };

        Transaction.findOneAndUpdate(filter, update, { new: true })
            .then((updatedDocument) => {
                if (updatedDocument) {
                    console.log(
                        `Successfully updated document: ${updatedDocument}.`
                    );
                } else {
                    console.log("No document matches the provided query.");
                }
            })
            .catch((err) =>
                console.error(`Failed to find and update document: ${err}`)
            );
    }

    res.json({ status: "0000" });

    console.log("deposit_callback is called");
    console.log(req.body);
});

router.post("/withdraw_callback", async (req, res) => {
    const { clientCode, status, payAmount, orderNo, txId } = req.body;
    console.log("withdraw_callback");
    console.log(req.body);
    const filter = { trxNo: orderNo }; // Find a document with this condition

    if (status == "PAID") {
        let trx = await Transaction.findOne(filter);

        // User.findById(trx.userid)
        //     .then((user) => {
        //         user.balance = Number(user.balance) - Number(payAmount);
        //         user.save();
        //     })
        //     .catch((err) => {
        //         console.log("/deposit_callback error user", err);
        //     });

        const update = {
            clientCode,
            status,
        };

        Transaction.findOneAndUpdate(filter, update, { new: true })
            .then((updatedDocument) => {
                if (updatedDocument) {
                    console.log(
                        `Successfully updated document: ${updatedDocument}.`
                    );
                } else {
                    console.log("No document matches the provided query.");
                }
            })
            .catch((err) =>
                console.error(`Failed to find and update document: ${err}`)
            );
    } else if (status == "CANCEL") {
        const update = {
            status,
        };

        User.findById(trx.userid)
            .then((user) => {
                user.balance = Number(user.balance) + Number(payAmount);
                user.save();
            })
            .catch((err) => {
                console.log("/withdraw_callback error user", err);
            });

        Transaction.findOneAndUpdate(filter, update, { new: true })
            .then((updatedDocument) => {
                if (updatedDocument) {
                    console.log(
                        `Successfully updated document: ${updatedDocument}.`
                    );
                } else {
                    console.log("No document matches the provided query.");
                }
            })
            .catch((err) =>
                console.error(`Failed to find and update document: ${err}`)
            );
    }

    res.json({ status: "0000" });
});

router.post("/balance", auth, async (req, res) => {
    let balance =0;
    let result=null;
    console.log("usser id...."+req.user.id);
    const user = await User.findById(req.user.id);
    console.log("user data..."+user)
    if(user)
        {
     balance = user.balance ? user.balance : 0;
       console.log("balance amaount...."+balance);

    console.log("user name..."+user.name);
    result = await Bet.aggregate([
        {
            $match: {
                userId: req.user.name,
                // action: { $in: ["bet", "betNSettle"] }, // Filters documents to include only those where action is either 'bet' or 'betNSettle'
            },
        },
        {
            $group: {
                _id: null, // Grouping by null means aggregating all documents together
                totalBetAmount: { $sum: "$turnover" }, // Sums up all betAmount values
            },
        },
    ]);
}

    let totalBetAmount = 0;
    console.log("result.."+result);
    
    if (result.length > 0) {
        console.log("Total Bet Amount:", result[0].totalBetAmount);
        totalBetAmount = result[0].totalBetAmount;
    } else {
        console.log("No bets found or sum is zero");
    }

    res.json({ balance, totalBetAmount });
});

// playing balance
router.post("/wager", auth, async (req, res) => {
    try {
        const result = await Bet.aggregate([
            {
                $match: {
                    userId: req.user.name.toLowerCase(),
                    // action: { $in: ["bet", "betNSettle"] }, // Filters documents to include only those where action is either 'bet' or 'betNSettle'
                },
            },
            {
                $group: {
                    _id: null, // Grouping by null means aggregating all documents together
                    totalBetAmount: { $sum: "$turnover" }, // Sums up all betAmount values
                },
            },
        ]);

        let totalBetAmount = 0;
        if (result.length > 0) {
            console.log("Total Bet Amount:", result[0].totalBetAmount);
            totalBetAmount = result[0].totalBetAmount;
        } else {
            console.log("No bets found or sum is zero");
        }

        res.json({ totalBetAmount });
    } catch (err) {
        console.error("Error running aggregation:", err);
    }
});

// Total balance
router.post("/total_balance", async (req, res) => {
    // {{BASE_URL}}/api/v1/Payout/CheckBalance?clientCode=S001812kAWFX
    // GET Method
    const CHECKOUT_BALANCE_URL = `${process.env.PMG_BASE_URL}/api/v1/Payout/CheckBalance?clientCode=${process.env.CLIENT_CODE}`;

    await axios
        .post(
            CHECKOUT_BALANCE_URL,
            {},
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.TESLLA_PAY_TOKEN}`,
                },
            }
        )
        .then(function (response) {
            if (response.data.httpCode == 200) {
                let balance = response.data.data.balance;

                res.json({ balance });
            }
        });
});

const getPhoneNumber = (txnUserId) => {
    // Check if txnUserId1 contains only numbers
    var isOnlyNumbers = /^\d+$/.test(txnUserId);

    return isOnlyNumbers ? txnUserId : txnUserId.substring(3);
};

// AWC HOOK FUNCTION
router.post("/awc_hook", async (req, res) => {
    console.log("AWC CALLBACK awc_hook", req.body.message);
    let req_val = JSON.parse(req.body.message);
    // "key": "SWGH308iLalAafVOdgDD",
    // "message": "{\"action\":\"getBalance\",\"userId\":\"swuserid\"}"

    // SAVE BET HISTORY
    if (req_val["action"] != "getBalance") {
        // If the action is not getBalance, must save all bet history
        req_val["txns"].map((txn, key) => {
            const bet = new Bet(txn);
            bet.action = req_val["action"];
            bet.save()
                .then((savedBet) => {
                    // Handle success, e.g., logging or sending a response
                })
                .catch((error) => {
                    // Handle error, e.g., logging or sending an error response
                    console.log(error);
                });
        });
    }

    let response = {};

    if (req_val["action"] == "getBalance") {
        const user = await User.findOne({
            phone: getPhoneNumber(req_val["userId"]),
        });
       // console.log("User balance", user.balance);
if(user!=null)
    {
        response = {
            status: "0000",
            desc: req_val["userId"] + "baht User Balance",
            balance: user.balance,
            balanceTs: new Date().toISOString(),
            userId: req_val["userId"],
        };
    }
    } else if (req_val["action"] == "betNSettle") {
        // Update user balances
        await Promise.all(
            req_val["txns"].map(async (txn) => {
                try {
                    const user = await User.findOne({
                        phone: getPhoneNumber(txn["userId"]),
                    });
                    user.balance =
                        Number(user.balance) - Number(txn["betAmount"]);
                    user.balance =
                        Number(user.balance) + Number(txn["winAmount"]);
                    await user.save();
                } catch (error) {
                    console.error(
                        `Error updating user balance for phone ${txn["userId"]}:`,
                        error
                    );
                    // Handle error appropriately
                }
            })
        );

        // Assuming there's only one user being updated
        const updatedUser = await User.findOne({
            phone: getPhoneNumber(req_val["txns"][0]["userId"]),
        });

        // Construct response
        response = {
            status: "0000",
            balance: Number(updatedUser.balance),
            balanceTs: new Date().toISOString(),
        };
        // Send response
        // res.json(response); // Uncomment and use appropriate response method
    } else if (req_val["action"] == "cancelBetNSettle") {
        // Cancel Bet and Settle
        const txnUserId = req_val["txns"][0]["userId"];

        const user = await User.findOne({
            phone: getPhoneNumber(txnUserId),
        });

        if (!user) {
            // Handle the case where the user is not found
            console.error(`User not found for phone ${txnUserId}`);
            response = {
                status: "0001",
                desc: "User not found",
                balance: null,
                balanceTs: new Date().toISOString(),
            };
            return;
        }

        response = {
            status: "0000",
            desc: "Cancel betNSettle",
            balance: Number(user.balance),
            balanceTs: new Date().toISOString(),
        };
        // Perform any necessary operations before saving, if needed
        // For demonstration, we're just saving the user as is
        // await user.save();
    } else if (req_val["action"] == "bet") {
        await Promise.all(
            req_val["txns"].map(async (txn) => {
                try {
                    const user = await User.findOne({
                        phone: getPhoneNumber(txn["userId"]),
                    });
                    user.balance =
                        Number(user.balance) - Number(txn["betAmount"]);
                    await user.save();
                    console.log("User balance", user.balance);
                } catch (error) {
                    console.error(
                        `Error updating user balance for phone ${txn["userId"]}:`,
                        error
                    );
                    // Handle error appropriately
                }
            })
        );

        const updatedUser = await User.findOne({
            phone: getPhoneNumber(req_val["txns"][0]["userId"]),
        });

        response = {
            status: "0000",
            balance: updatedUser.balance,
            balanceTs: new Date().toISOString(),
        };
    } else if (req_val["action"] == "cancelBet") {
        const txn = req_val["txns"][0];
        const user = await User.findOne({
            phone: getPhoneNumber(txn["userId"]),
        });
        try {
            console.log("user balance----------->", user.balance);
            const bet = await Bet.findOne({
                platform: txn["platform"],
                platformTxId: txn["platformTxId"],
                roundId: txn["roundId"],
                action: "bet",
            });

            if (bet) {
                user.balance = Number(user.balance) + Number(bet.betAmount);
                await user.save();
            }
        } catch (ex) {
            console.log(ex);
        }

        response = {
            status: "0000",
            balance: user.balance,
            balanceTs: new Date().toISOString(),
        };
    } else if (req_val["action"] == "settle") {
        const user = await User.findOne({
            phone: getPhoneNumber(req_val["txns"][0]["userId"]),
        });

        user.balance =
            Number(user.balance) + Number(req_val["txns"][0]["winAmount"]);
        await user.save();
        console.log("User balance", user.balance);

        response = {
            status: "0000",
        };
    } else if (req_val["action"] == "unsettle") {
        // from settle to bet!
        const bet = await Bet.findOne({
            platformTxId: req_val["txns"][0]["platformTxId"],
            platform: req_val["txns"][0]["platform"],
            action: "settle",
        });

        const user = await User.findOne({
            phone: getPhoneNumber(req_val["txns"][0]["userId"]),
        });
        user.balance = Number(user.balance) - Number(bet.winAmount);

        await user.save();
        // -winAmount
        response = {
            status: "0000",
        };
    } else if (req_val["action"] == "voidSettle") {
        response = {
            status: "0000",
            desc: "Void Settle",
        };
    } else if (req_val["action"] == "unvoidSettle") {
        response = {
            status: "0000",
            desc: "Unvoid Settle",
        };
    } else if (req_val["action"] == "freeSpin") {
        await Promise.all(
            req_val["txns"].map(async (txn, key) => {
                const user = await User.findOne({
                    phone: getPhoneNumber(txn["userId"]),
                });
                user.balance = user.balance - txn.betAmount + txn.winAmount;
                await user.save();
            })
        );

        response = {
            status: "0000",
            desc: "Free Spin",
        };
    } else if (req_val["action"] == "give") {
        await Promise.all(
            req_val["txns"].map(async (txn, key) => {
                const user = await User.findOne({
                    phone: getPhoneNumber(txn["userId"]),
                });
                user.balance = user.balance + txn.amount;
                await user.save();
            })
        );

        response = {
            status: "0000",
            desc: "Give",
        };
    } else if (req_val["action"] == "resettle") {
        response = {
            status: "0000",
            desc: "Resettle",
        };
    }

    res.json(response);
});

// SBO HOOK FUNCTION
router.post("/sbo_hook/:hook_type", async (req, res) => {
    const hook_type = req.params.hook_type;

    console.log(req.params.hook_type);
    console.log(req.body);

    switch (hook_type) {
        case "GetBalance":
            break;
        case "Deduct":
            break;
        case "Settle":
            break;
        case "Rollback":
            break;
        case "Cancel":
            break;
        case "Bonus":
            break;
        case "ReturnStake":
            break;
        case "GetBetStatus":
            break;
    }
});

module.exports = router;
