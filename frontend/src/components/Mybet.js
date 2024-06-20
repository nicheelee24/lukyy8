import { useEffect, useState } from "react";
import axios from "axios";
import LoadingModal from "./LoadingPage";
import { t } from "i18next";

export const MyBet = () => {
    const [mybets, setMybets] = useState([]);
    const [selectedGame, setSelectedGame] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const [betsPerPage, setBetsPerPage] = useState(10);
    const [loading, setLoading] = useState(false);

    const handleGameChange = (event) => {
        setSelectedGame(event.target.value);
    };

    useEffect(() => {
        fetchMyBets();
    }, [selectedGame, currentPage]);

    const fetchMyBets = async () => {
        try {
            setLoading(true);
            const token = window.localStorage.getItem("token");

            const options = {
                method: "POST",
                url: process.env.REACT_APP_BACKEND + "/api/util/my-bet",
                headers: {
                    "content-type": "application/x-www-form-urlencoded",
                    "x-auth-token": token,
                },
                data: {
                    gameType: selectedGame,
                },
            };

            await axios
                .request(options)
                .then(function (response) {
                    console.log(response.data);
                    setMybets(response.data);
                    setLoading(false);
                })
                .catch(function (error) {
                    console.log(error);
                    setLoading(false);
                });
        } catch (error) {
            console.error("Error fetching mybets:", error);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    };

    // Pagination logic
    const indexOfLastBet = currentPage * betsPerPage;
    const indexOfFirstBet = indexOfLastBet - betsPerPage;
    const currentBets = mybets.slice(indexOfFirstBet, indexOfLastBet);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(mybets.length / betsPerPage); i++) {
        pageNumbers.push(i);
    }

    // const handlePageClick = (event) => {
    //     setCurrentPage(Number(event.target.id));
    // };

    return (
        <div className="max-w-[1200px] m-auto w-full mt-[30px] px-4 md:px-0">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-lg font-semibold text-[var(--secondaryColor)]">
                    My Bet
                </h1>
                <div className="flex items-center">
                    <select
                        id="game-select"
                        className="w-[200px] mr-4 bg-[var(--logoutBg)] text-black text-sm rounded-lg block px-3 outline-none transition duration-300 ease-in-out transform hover:scale-105"
                        aria-label="Select Game"
                        value={selectedGame}
                        onChange={handleGameChange}
                    >
                        <option value="All">All</option>
                        <option value="EGAME">EGAME</option>
                        <option value="ESPORTS">ESPORTS</option>
                        <option value="FISH">FISH</option>
                        <option value="LIVE">LIVE</option>
                        <option value="LOTTO">LOTTO</option>
                        <option value="SLOT">SLOT</option>
                        <option value="TABLE">TABLE</option>
                        <option value="VIRTUAL">VIRTUAL</option>
                    </select>

                    <button className="bg-[var(--logoutBg)] hover:bg-black text-white font-bold py-3 px-4 rounded">
                        Refresh
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
                            <thead className="text-xs text-white uppercase">
                                <tr className="py-3 px-6 border-b-2 border-[var(--logoutBg)]  text-left text-xs font-semibold text-white uppercase tracking-wider">
                                    <th scope="col">#</th>
                                    <th scope="col">Bet Time</th>
                                    <th scope="col">Game Type</th>
                                    <th scope="col">Game Name</th>
                                    <th scope="col">Game Code</th>
                                    <th scope="col">Platform</th>
                                    <th scope="col">Bet Amount</th>
                                    <th scope="col">Win Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentBets.length < 0 ? (
                                    currentBets.map((bet, index) => (
                                        <tr className="text-white border-b border-[var(--logoutBg)]">
                                            <th
                                                scope="row"
                                                className="py-4 px-6 font-medium whitespace-nowrap"
                                            >
                                                {indexOfFirstBet + index + 1}
                                            </th>
                                            <td className="py-4 px-6 text-white">
                                                {formatDate(bet.betTime)}
                                            </td>
                                            <td className="text-right py-4 px-6 text-white">
                                                {bet.gameType}
                                            </td>
                                            <td className="py-4 px-6 text-[var(--logoutBg)]">
                                                {bet.gameName}
                                            </td>
                                            <td className="text-right py-4 px-6">
                                                {bet.gameCode}
                                            </td>
                                            <td className="text-right py-4 px-6">
                                                {bet.platform}
                                            </td>
                                            <td className="text-right py-4 px-6 text-[var(--logoutBg)]">
                                                {bet.betAmount}
                                            </td>
                                            <td className="text-right py-4 px-6 text-white">
                                                {bet.winAmount}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr className="text-white border-b border-[var(--logoutBg)]">
                                        <td
                                            colSpan={8}
                                            scope="row"
                                            className="text-center py-4 px-6 font-medium whitespace-nowrap"
                                        >
                                            No Recording
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="pagination flex justify-end mt-4 items-center">
                        <button
                            className="px-3 py-1 border rounded mx-1 bg-[var(--logoutBg)] text-black"
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
                                        className={`px-3 py-1 border rounded mx-1 ${currentPage === number
                                                ? "bg-blue-500 text-white"
                                                : "bg-white text-black"
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
                            className="px-3 py-1 border rounded mx-1 bg-[var(--logoutBg)] text-black"
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
