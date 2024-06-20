import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { setLoginState } from "../../redux/reducers/loginState";

import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../../assets/css/login.css";

import eye_icon from "../../assets/img/eye-icon.svg";
import gmail_icon from "../../assets/img/gmail_sign.svg";
import facebook_icon from "../../assets/img/facebook_sign.svg";
import apple_icon from "../../assets/img/apple_sign.svg";
import twitter_icon from "../../assets/img/twitter_sign.svg";
import telegram_icon from "../../assets/img/telegram_sign.svg";
import whatsapp_icon from "../../assets/img/whatsapp_sign.svg";

import * as API from "../../services/api";
import TransactionHistory from "./TransactionHistory";

// import useSocket from '../../hooks/useSocket';

export default function Deposit({ open, setOpen, type, setType }) {
    const { t } = useTranslation();

    // const { socket, socketConnected } = useSocket();

    const dispatch = useDispatch();

    const [amount, setAmount] = useState(100);
    const [isEmailValid, setIsEmailValid] = useState(false);
    const cancelButtonRef = useRef(null);
    const amountRef = useRef(null);

    const handleAmountChange = (e) => {
        const amount = e.target.value;
        setAmount(amount);
    };

    const handleDepositClick = async (e) => {
        e.preventDefault();
        // call deposit API

        const config = {
            headers: {
                "content-type": "application/json",
                "x-auth-token": window.localStorage.getItem("token"),
            },
        };
        const url = process.env.REACT_APP_BACKEND + "/api/pay/deposit";

        await axios
            .post(
                url,
                {
                    amount: amountRef.current.value,
                    currency: "baht",
                    platform: process.env.REACT_APP_PLATFORM,
                },
                config
            )
            .then(function (response) {
                let resp = response.data;
                window.open(resp.payUrl, "_blank");
            })
            .catch(function (err) {
                console.log(err);

                toast.error("Error is occurred", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                debugger;
            });
    };

    const onReset = (e) => {
        e.preventDefault();
        setType("reset");
    };

    const failLogIn = () =>
        toast.error(t("Valid input"), {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,

            draggable: true,
            progress: undefined,
            theme: "light",
        });

    const failConnection = () =>
        toast.error(t("Signup first"), {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,

            draggable: true,
            progress: undefined,
            theme: "light",
        });

    const onLogin = async (e) => {
        e.preventDefault();
        const amount = amountRef.current.value;

        console.log(amount);
        // const options = {
        //   method: 'POST',
        //   url: process.env.REACT_APP_BACKEND + '/api/auth',
        //   headers: { 'content-type': 'application/x-www-form-urlencoded' },
        //   data: {
        //     email,
        //     password
        //   }
        // }

        // await axios
        //   .request(options)
        //   .then(function (response) {
        //     if (response.data.status === '0000') {
        //       window.localStorage.setItem('token', response.data.token);
        //       API.setAuthToken(response.data.token);
        //       setOpen(false)
        //       dispatch(setLoginState())
        //       toast.success('Log In Successfully.', {
        //         position: 'top-right',
        //         autoClose: 5000,
        //         hideProgressBar: false,
        //         closeOnClick: true,
        //
        //         draggable: true,
        //         progress: undefined,
        //         theme: 'light'
        //       })
        //       // window.location.href = response.data.login_url;
        //     } else {
        //       toast.error(response.data.desc, {
        //         position: 'top-right',
        //         autoClose: 5000,
        //         hideProgressBar: false,
        //         closeOnClick: true,
        //
        //         draggable: true,
        //         progress: undefined,
        //         theme: 'light'
        //       })
        //     }
        //   })
        //   .catch(function (error) {
        //     console.error(error)
        //     failConnection()

        //     toast.error('Log In Failed.', {
        //       position: 'top-right',
        //       autoClose: 5000,
        //       hideProgressBar: false,
        //       closeOnClick: true,
        //
        //       draggable: true,
        //       progress: undefined,
        //       theme: 'light'
        //     })
        //   })
    };

    return (
        <Transition.Root show={open && type === "deposit"} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-[10]"
                initialFocus={cancelButtonRef}
                onClose={setOpen}
            >
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
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 backdrop-blur-sm bg-black bg-opacity-30 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="overflow-auto md:overflow-hidden flex flex-col md:flex-row bg-[#181637] w-[617px] h-[auto] border border-[#2c2a4a] rounded-[12px]">
                                <div className="right-side px-8 py-10 text-left w-full bg-white" >
                                    <form
                                        action="#"
                                        className="flex flex-col h-full"
                                    >
                                        <h1 className="mb-12  !text-xl md:text-2xl text-black font-bold">
                                            {t("Deposit")}
                                        </h1>
                                        <div className="input-wrapper">
                                            <label htmlFor="amount"  className="text-black font-bold">
                                                {t("Amount")}
                                            </label>
                                            {/* <label htmlFor='email'>{t("Email / Phone Number")}</label> */}
                                            <input
                                                type="number"
                                                value={amount}
                                                onChange={handleAmountChange}
                                                style={{
                                                    borderColor:
                                                        amount === ""
                                                            ? ""
                                                            : "#939393",
                                                }}
                                                placeholder={t("Amount")}
                                                // placeholder='Jackrose11@gmail.com'
                                                ref={amountRef}
                                                id="amount"
                                                className="rounded-lg px-6 mt-3 !text-black placeholder-black border"
                                                autoFocus
                                            />
                                        </div>

                                        <button
                                            className={`btn-f1-1 rounded-lg mt-12`}
                                            onClick={(e) =>
                                                handleDepositClick(e)
                                            }
                                        >
                                            {t("Deposit")}
                                        </button>

                                        <TransactionHistory type={"deposit"} />
                                    </form>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
