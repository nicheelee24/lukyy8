import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Account = () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);

    const [loginid, setLoginId] = useState("LK934534534");
    const [telephone, setTelephone] = useState("000-000-0000");
    const [creditLimit, setCreditLimit] = useState(0);
    const [balance, setBalance] = useState(0);
    const [winlose, setWinloss] = useState(0);
    const [notFinishedYet, setNotFinishedYet] = useState(0);

    const [bban, setBban] = useState("7442635468");
    const [bbn, setBbn] = useState("KBANK");
    const [bbun, setBbun] = useState("สายฝน ก้อนคำ");

    const fetchMyInfo = async () => {
        try {
            setLoading(true);
            const token = window.localStorage.getItem("token");

            const options = {
                method: "GET",
                url: process.env.REACT_APP_BACKEND + "/api/auth",
                headers: {
                    "content-type": "application/x-www-form-urlencoded",
                    "x-auth-token": token,
                },
            };

            await axios
                .request(options)
                .then(function (response) {
                    console.log(response.data);
                    const user = response.data;
                    setLoginId(user.name);
                    setTelephone(user.phone);
                    setCreditLimit(0);
                    setBalance(user.balance);
                    setWinloss(0);
                    setNotFinishedYet(0);
                    setBban(user.bban);
                    setBbn(user.bbn);
                    setBbun(user.bbun);
                })
                .catch(function (error) {
                    console.log(error);
                    setLoading(false);
                });
        } catch (error) {
            console.error("Error fetching mybets:", error);
        }
    };

    useEffect(() => {
        fetchMyInfo();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError("New password and confirm password do not match");
            return;
        }
        const url =
            process.env.REACT_APP_BACKEND + "/api/users/change-password";

        const config = {
            headers: {
                "content-type": "application/x-www-form-urlencoded",
                "x-auth-token": window.localStorage.getItem("token"),
            },
        };
        // Call the API to change the password using Axios
        try {
            const response = await axios.post(
                url,
                {
                    currentPassword: currentPassword,
                    newPassword: newPassword,
                },
                config
            );
            if (response.data.success) {
                // Password changed successfully
                // You can clear the form or redirect the user
                toast.success("Changed Password Successfully.", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,

                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setError("");
            } else {
                setError(response.data.message);
                toast.error("Failed To Change Password", {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,

                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        } catch (error) {
            setError("An error occurred while changing the password");
            toast.error("Failed To Change Password", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,

                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    };

    return (
        <div className="max-w-[1200px] m-auto w-full mt-[30px] px-4 md:px-0">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-lg text-[var(--secondaryColor)] font-semibold">
                    Account
                </h1>
                <div className="flex items-center">
                    {/* <input type="date" className="border p-1 rounded mr-2" defaultValue={fromDate}/>
                      <span>to</span>
                      <input type="date" className="border p-1 rounded mx-2" defaultValue={toDate}/> */}
                    {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Go
                      </button> */}
                </div>
            </div>

            <div className="overflow-x-auto relative sm:rounded-lg mt-4">
                <div className="flex flex-col md:flex-row w-full text-sm text-left gap-6">
                    <div className="w-full md:w-1/2">
                        <h3 className="text-lg text-white border-[var(--logoutBg)] border-b-[4px] mb-4 font-bold">
                            Profile
                        </h3>

                        <div className="flex gap-8">
                            <div className="w-1/2">
                                <div className="sub-info-group mt-4 border-b border-[var(--logoutBg)]">
                                    <span className="text-white">
                                        Login id
                                    </span>
                                    <p className="p-2 text-white">
                                        {loginid}
                                    </p>
                                </div>

                                <div className="sub-info-group mt-4 border-b border-[var(--logoutBg)]">
                                    <span className="text-white">
                                        telephone
                                    </span>
                                    <p className="p-2 text-white">
                                        {telephone}
                                    </p>
                                </div>

                                <div className="sub-info-group mt-4 border-b border-[var(--logoutBg)]">
                                    <span className="text-white">
                                        BBAN
                                    </span>
                                    <p className="p-2 text-white">
                                        {bban}
                                    </p>
                                </div>

                                <div className="sub-info-group mt-4 border-b border-[var(--logoutBg)]">
                                    <span className="text-white">
                                        BBN
                                    </span>
                                    <p className="p-2 text-white">
                                        {bbn}
                                    </p>
                                </div>

                                <div className="sub-info-group mt-4 border-b border-[var(--logoutBg)]">
                                    <span className="text-white">
                                        BBUN
                                    </span>
                                    <p className="p-2 text-white">
                                        {bbun}
                                    </p>
                                </div>
                            </div>

                            <div className="w-1/2">
                                <div className="sub-info-group mt-4 border-b border-[var(--logoutBg)]">
                                    <span className="text-white">
                                        credit limit
                                    </span>
                                    <p className="p-2 text-white">
                                        {creditLimit}
                                    </p>
                                </div>

                                <div className="sub-info-group mt-4 border-b border-[var(--logoutBg)]">
                                    <span className="text-white">
                                        remaining balance
                                    </span>
                                    <p className="p-2 text-white">
                                        {balance.toFixed(2)}
                                    </p>
                                </div>

                                <div className="sub-info-group mt-4 border-b border-[var(--logoutBg)]">
                                    <span className="text-white">
                                        win lose
                                    </span>
                                    <p className="p-2 text-white">
                                        {winlose}
                                    </p>
                                </div>

                                <div className="sub-info-group mt-4 border-b border-[var(--logoutBg)]">
                                    <span className="text-white">
                                        not finished yet
                                    </span>
                                    <p className="p-2 text-white">
                                        {notFinishedYet}
                                    </p>
                                </div>
                                {/* 
                                <div className="sub-info-group mt-4 border-b border-black">
                                    <span className="text-[var(--textPrimaryColor)]">Amount</span>
                                    <p className="p-2 text-[var(--textSecondaryColor)]">THB</p>
                                </div> */}
                            </div>
                        </div>
                    </div>

                    <div className="w-full md:w-1/2">
                        <h3  className="text-lg text-white  border-[var(--logoutBg)] border-b-[4px] mb-4 font-bold">
                            Password
                        </h3>

                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                                <label
                                    className="block text-white font-bold md:text-right mb-1 md:mb-0 pr-4"
                                    for="inline-full-name"
                                >
                                    Current password
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <input
                                    className="bg-[var(--logoutBg)] appearance-none border-2 border-[var(--logoutBg)] rounded w-full py-2 px-4 text-white leading-tight focus:outline-none focus:bg-[var(--logoutBg)] focus:border-black"
                                    type="password"
                                    value={currentPassword}
                                    onChange={(e) =>
                                        setCurrentPassword(e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                                <label
                                    className="block text-white font-bold md:text-right mb-1 md:mb-0 pr-4"
                                    for="inline-full-name"
                                >
                                    New Password
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <input
                                    className="bg-[var(--logoutBg)] appearance-none border-2 border-[var(--logoutBg)] rounded w-full py-2 px-4 text-white leading-tight focus:outline-none focus:bg-[var(--logoutBg)] focus:border-black"
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) =>
                                        setNewPassword(e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                                <label
                                    className="block text-white font-bold md:text-right mb-1 md:mb-0 pr-4"
                                    for="inline-full-name"
                                >
                                    Confirm Password
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <input
                                    className="bg-[var(--logoutBg)] appearance-none border-2 border-[var(--logoutBg)] rounded w-full py-2 px-4 text-white leading-tight focus:outline-none focus:bg-[var(--logoutBg)] focus:border-black"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        {error && (
                            <p className="text-white text-xs italic">
                                {error}
                            </p>
                        )}

                        <button
                            className=" text-black font-bold py-2 px-4 rounded float-right bg-[var(--secondaryColor)]"
                            onClick={handleSubmit}
                        >
                            Change Password
                        </button>
                    </div>
                </div>
            </div>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                theme="light"
            />
        </div>
    );
};
