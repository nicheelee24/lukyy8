import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useTranslation } from "react-i18next";

// Dummy data fetching function
// Replace this with your actual API call
const formatDate = (dateString) => {
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

const fetchTransactionHistory = async (type = "") => {
    // type can be 'deposit' 'all' 'withdraw'
    const token = window.localStorage.getItem("token");
    const options = {
        method: "GET",
        url: process.env.REACT_APP_BACKEND + "/api/transaction/history/" + type,
        headers: {
            "content-type": "application/x-www-form-urlencoded",
            "x-auth-token": token,
        },
    };

    let trxHistoryData = await axios
        .request(options)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.error(error);
        });

    return trxHistoryData;
};

function isMobileDevice() {
    const mobileWidth = 768;
    if (window.innerWidth < mobileWidth) return true;
    else return false;
}

const TransactionHistory = (props) => {
    const { t } = useTranslation();
    const [transactions, setTransactions] = useState([]);
    const isLogin = useSelector((state) => state.loginState.isLogin);

    console.log(isLogin);
    useEffect(() => {
        if (isLogin)
            fetchTransactionHistory(props.type)
                .then((data) => {
                    setTransactions(data);
                })
                .catch((error) => {
                    console.error("Error fetching transaction history:", error);
                });
    }, []);

    return !isLogin ? (
        <></>
    ) : isMobileDevice() ? (
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-4 max-h-[250px]">
            <table className="w-full text-sm text-left">
                <thead className="text-xs uppercase text-[darksalmon]">
                    <tr>
                        <th
                            scope="col"
                            className="py-1 px-4 w-[60%] px-5 py-3 border-b-2 border-blue-300 bg-blue-1200 text-left text-xs font-semibold text-blue-100 uppercase tracking-wider"
                        >
                            {t("Trx Info")}
                        </th>

                        <th
                            scope="col"
                            className="py-1 px-4 px-5 py-3 border-b-2 border-blue-300 bg-blue-1200 text-left text-xs font-semibold text-blue-100 uppercase tracking-wider"
                        >
                            {t("Amount")}
                        </th>
                        {/* <th scope='col' className='py-1 px-4'>
                Status
              </th> */}
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction, index) => (
                        <tr key={index} className=" text-white ">
                            <td
                                scope="row"
                                className="py-2 px-2 text-[10px] whitespace-nowrap text-white "
                            >
                                <p>{transaction.trxNo}</p>
                                <p>{formatDate(transaction.date)}</p>
                                <span className="mt-2 inline-block px-4 py-1 rounded bg-[#983490] text-white">
                                    {transaction.status}
                                </span>
                            </td>

                            <td className="py-2 px-2 text-[10px] text-center">
                                {transaction.payAmount}
                            </td>
                            {/* <td className='py-4 px-6'>
                  <span className='px-3 py-2 rounded bg-[#983490] text-white'>
                    {transaction.status}
                  </span>
                </td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    ) : (
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-4 max-h-[350px]">
            <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-700 uppercase">
                    <tr>
                        <th
                            scope="col"
                            className="py-3 px-6  px-5 py-3 border-b-2 border-blue-300 bg-blue-1200 text-left text-xs font-semibold text-blue-100 uppercase tracking-wider"
                        >
                            Trx ID
                        </th>
                        <th
                            scope="col"
                            className="py-3 px-6  px-5 py-3 border-b-2 border-blue-300 bg-blue-1200 text-left text-xs font-semibold text-blue-100 uppercase tracking-wider"
                        >
                            Date
                        </th>
                        <th
                            scope="col"
                            className="py-3 px-6  px-5 py-3 border-b-2 border-blue-300 bg-blue-1200 text-left text-xs font-semibold text-blue-100 uppercase tracking-wider"
                        >
                            Amount
                        </th>
                        <th
                            scope="col"
                            className="py-3 px-6  px-5 py-3 border-b-2 border-blue-300 bg-blue-1200 text-left text-xs font-semibold text-blue-100 uppercase tracking-wider"
                        >
                            Status
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction, index) => (
                        <tr key={index} className=" text-white">
                            <th
                                scope="row"
                                className="py-4 px-6 font-medium whitespace-nowrap text-white"
                            >
                                {transaction.trxNo}
                            </th>
                            <td className="py-4 px-6">
                                {formatDate(transaction.date)}
                            </td>
                            <td className="py-4 px-6">
                                {transaction.payAmount}
                            </td>
                            <td className="py-4 px-6">
                                <span className="px-3 py-2 rounded bg-[#983490] text-white">
                                    {transaction.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionHistory;
