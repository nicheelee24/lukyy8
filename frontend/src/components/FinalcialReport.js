import { useEffect, useState } from "react";
import axios from "axios";

export const FinancialReport = () => {
    const currentDate = new Date().toISOString().split("T")[0];

    const [fromDate, setFromDate] = useState(currentDate);
    const [toDate, setToDate] = useState(currentDate);
    const [tableDatas, setTableDatas] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log(fromDate, toDate);
    }, [fromDate, toDate]);

    const handleDateChange = (e, where) => {
        if (where == "from") setFromDate(e.target.value);
        else setToDate(e.target.value);
    };

    const handleGoClick = async () => {
        setLoading(true);
        const token = window.localStorage.getItem("token");

        const options = {
            method: "POST",
            url: process.env.REACT_APP_BACKEND + "/api/util/financial-report",
            headers: {
                "content-type": "application/x-www-form-urlencoded",
                "x-auth-token": token,
            },
            data: {
                fromDate,
                toDate,
            },
        };

        await axios
            .request(options)
            .then(function (response) {
                console.log(response.data);
                setTableDatas(response.data);
                setLoading(false);
            })
            .catch(function (error) {
                console.log(error);
                setLoading(false);
            });
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.toLocaleDateString()}`;
    };

    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    const currentItems = tableDatas.slice(firstItemIndex, lastItemIndex);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(tableDatas.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="max-w-[1200px] m-auto w-full mt-[30px] px-4 md:px-0">
            <div className="flex justify-between items-center mb-4 ">
                <h1 className="text-lg font-bold text-[var(--secondaryColor)]">
                    Report
                </h1>
                <div className="flex items-center">
                    <input
                        type="date"
                        className="border p-1 rounded mr-2"
                        defaultValue={fromDate}
                        onChange={(e) => handleDateChange(e, "from")}
                    />
                    <span>to</span>
                    <input
                        type="date"
                        className="border p-1 rounded mx-2"
                        defaultValue={toDate}
                        onChange={(e) => handleDateChange(e, "to")}
                    />
                    <button
                        className="bg-[var(--logoutBg)] text-black font-bold py-2 px-4 rounded"
                        onClick={handleGoClick}
                    >
                        Go
                    </button>
                </div>
            </div>
            {loading ? (
                <div
                    className={`inline-block h-6 w-6 animate-spin text-white rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]} ml-1/2 mt-1/2 z-20`}
                    role="status"
                ></div>
            ) : (
                <>
                    <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-4">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-[var(--textPrimaryColor)] uppercase">
                                <tr>
                                    <th
                                        scope="col"
                                        className="py-3 px-6 border-b-2 border-white bg-gray-1200 text-left text-xs font-bold uppercase tracking-wider text-white"
                                    >
                                        Date
                                    </th>
                                    <th
                                        scope="col"
                                        className="py-3 px-6 border-b-2 border-white bg-gray-1200 text-left text-xs font-bold uppercase tracking-wider text-white"
                                    >
                                        Category
                                    </th>
                                    <th
                                        scope="col"
                                        className="py-3 px-6 border-b-2 border-white bg-gray-1200 text-left text-xs font-bold uppercase tracking-wider text-white"
                                        >
                                        All / Computers
                                    </th>
                                    <th
                                        scope="col"
                                        className="py-3 px-6 border-b-2 border-white bg-gray-1200 text-left text-xs font-bold uppercase tracking-wider text-white"
                                        >
                                        Total Amount
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.length > 0 ? (
                                    <>
                                        {currentItems.map(
                                            (tableData, index) => {
                                                return (
                                                    <tr className="text-white border-b border-[#bbb]">
                                                        <th
                                                            scope="row"
                                                            className="py-4 px-6 font-medium whitespace-nowrap"
                                                        >
                                                            {formatDate(
                                                                tableData.DATE
                                                            )}
                                                        </th>
                                                        <td className="py-4 px-6">
                                                            {tableData.CATEGORY}
                                                        </td>
                                                        <td className="text-right py-4 px-6">
                                                            {tableData
                                                                .ALLCOMPUTERS
                                                                .length ===
                                                            2 ? (
                                                                <>
                                                                    <div className="text-white">
                                                                        {
                                                                            tableData
                                                                                .ALLCOMPUTERS[0]
                                                                        }
                                                                    </div>
                                                                    <div className="text-white">
                                                                        {
                                                                            tableData
                                                                                .ALLCOMPUTERS[1]
                                                                        }
                                                                    </div>
                                                                </>
                                                            ) : (
                                                                <div className="text-white">
                                                                    {
                                                                        tableData
                                                                            .ALLCOMPUTERS[0]
                                                                    }
                                                                </div>
                                                            )}
                                                        </td>
                                                        <td className="py-4 px-6">
                                                            {
                                                                tableData.TOTALAMOUNT
                                                            }
                                                        </td>
                                                    </tr>
                                                );
                                            }
                                        )}
                                        <tr className="text-white border-b">
                                            <td
                                                colSpan={3}
                                                scope="row"
                                                className="text-right py-4 px-6 font-medium whitespace-nowrap"
                                            >
                                                Not all finished yet
                                            </td>
                                            <td className="py-4 px-6">0.00</td>
                                        </tr>
                                    </>
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="text-center py-5 text-white"
                                        >
                                            No Data
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="pagination flex justify-end mt-4 items-center">
                        <button
                            className="px-3 py-1 border rounded mx-1 bg-[var(--logoutBg)] text-white"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(currentPage - 1)}
                        >
                            Prev
                        </button>
                        {pageNumbers.map((number, index) => {
                            // Show the first page, the last page, the current page, and the pages immediately before and after the current page
                            if (
                                number === 1 ||
                                number === pageNumbers.length ||
                                (number >= currentPage - 2 &&
                                    number <= currentPage + 2)
                            ) {
                                return (
                                    <button
                                        key={number}
                                        className={`px-3 py-1 border rounded mx-1 ${
                                            currentPage === number
                                                ? "bg-white text-black"
                                                : "bg-[var(--logoutBg)] text-black"
                                        }`}
                                        onClick={() => setCurrentPage(number)}
                                    >
                                        {number}
                                    </button>
                                );
                            } else if (
                                index === currentPage - 4 ||
                                index === currentPage + 2
                            ) {
                                // Show ellipsis before and after the current page
                                return (
                                    <span
                                        key={number}
                                        className="px-3 py-1 mx-1"
                                    >
                                        ...
                                    </span>
                                );
                            } else {
                                return null;
                            }
                        })}
                        <button
                            className="px-3 py-1 border rounded mx-1 bg-[var(--logoutBg)] text-white"
                            disabled={currentPage === pageNumbers.length}
                            onClick={() => setCurrentPage(currentPage + 1)}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};
