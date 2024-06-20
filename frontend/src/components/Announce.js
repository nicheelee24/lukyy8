import { useEffect, useState } from "react";
import axios from "axios";

export const Announce = () => {
    const [ans, setAns] = useState([]);

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const token = window.localStorage.getItem("token");

                const options = {
                    method: "POST",
                    url: process.env.REACT_APP_BACKEND + "/api/util/announce",
                    headers: {
                        "content-type": "application/x-www-form-urlencoded",
                        "x-auth-token": token,
                    },
                };

                await axios
                    .request(options)
                    .then(function (response) {
                        console.log(response.data);
                        setAns(response.data);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            } catch (error) {
                console.error("Error fetching announcements:", error);
                // Handle error (e.g., set an error state, show a message, etc.)
            }
        };

        fetchAnnouncements();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    };

    return (
        <div className="max-w-[1200px] m-auto w-full mt-[30px] px-4 md:px-0">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-lg text-[var(--secondaryColor)] font-bold">Announce</h1>
            </div>

            <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-4">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-white uppercase">
                        <tr>
                            <th
                                scope="col"
                                className="py-3 px-6  px-5 py-3 border-b-2 border-[var(--logoutBg)] bg-gray-1200 text-left text-xs font-semibold text-white uppercase tracking-wider"
                            >
                                #
                            </th>
                            <th
                                scope="col"
                                className="py-3 px-6  px-5 py-3 border-b-2 border-[var(--logoutBg)] bg-gray-1200 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                Time and Date
                            </th>
                            <th
                                scope="col"
                                className="py-3 px-6  px-5 py-3 border-b-2 border-[var(--logoutBg)] bg-gray-1200 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                Details
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {ans.length > 0 ? (
                            <>
                                {ans.map((an, index) => {
                                    return (
                                        <tr className="text-white border-b border-[var(--logoutBg)]">
                                            <th
                                                scope="row"
                                                className="py-4 px-6 font-medium whitespace-nowrap"
                                            >
                                                {index + 1}
                                            </th>
                                            <td className="py-4 px-6">
                                                {formatDate(an.date)}
                                            </td>
                                            <td className="py-4 px-6">
                                                {an.desc}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </>
                        ) : (
                            <tr className="text-white border-b border-[var(--logoutBg)] ">
                                <td
                                    colSpan={6}
                                    scope="row"
                                    className="text-center py-4 px-6 font-medium whitespace-nowrap"
                                >
                                    No Recording
                                </td>
                            </tr>
                        )}
                        {/* <tr className='text-black border-b border-[#bbb]'>
              <th scope='row' className='py-4 px-6 font-medium whitespace-nowrap'>
                2024/02/20, Tuesday
              </th>
              <td className='py-4 px-6'>
                bet
              </td>
              <td className='text-right py-4 px-6'>
                <div className="text-[#00f]">0.00</div>
                <div className="text-[#f00]">0.00</div>
              </td>
              <td className='py-4 px-6'>
                200.00
              </td>
            </tr> */}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
