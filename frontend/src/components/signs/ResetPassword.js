import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";

import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../assets/css/login.css";

import gmail_icon from "../../assets/img/gmail_sign.svg";
import facebook_icon from "../../assets/img/facebook_sign.svg";
import apple_icon from "../../assets/img/apple_sign.svg";
import twitter_icon from "../../assets/img/twitter_sign.svg";
import telegram_icon from "../../assets/img/telegram_sign.svg";
import whatsapp_icon from "../../assets/img/whatsapp_sign.svg";

export default function ResetPassword({ open, setOpen, type, setType }) {
    const { t } = useTranslation();

    const initEmail = useSelector((state) => state.loginState.email);

    const [email, setEmail] = useState(initEmail);
    const [isEmailValid, setIsEmailValid] = useState(false);

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const emailRef = useRef(null);
    const cancelButtonRef = useRef(null);

    const handleEmailChange = (e) => {
        const inputEmail = e.target.value;
        setEmail(inputEmail);
        setIsEmailValid(emailRegex.test(inputEmail));
    };

    const onLogin = (e) => {
        e.preventDefault();
        setType("login");
    };

    const failLogIn = () =>
        toast.error(t("Input valid email."), {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,

            draggable: true,
            progress: undefined,
            theme: "light",
        });

    return (
        <Transition.Root show={open && type === "reset"} as={Fragment}>
            <Dialog
                as="div"
                className="relative [10]"
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
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="bg-white w-[817px] h-[696px] grid grid-cols-2 overflow-hidden border border-[#2c2a4a] rounded-[12px]">
                                <div className="left-side flex flex-col items-center justify-center">
                                    <img
                                        src={require("../../assets/img/Group1629.png")}
                                        alt="sign in main presentation"
                                    />
                                    <div className="text-white">
                                        <h1 className="text-[23px] leading-[26.45px]">
                                            {t("Welcome")}
                                        </h1>
                                        <p className="mt-4 text-[18px] text-[#c7c8cf] leading-[21.6px]">
                                            {t("Start your game")}
                                        </p>
                                    </div>
                                </div>
                                <div className="right-side px-8 py-10 text-left">
                                    <form
                                        action="#"
                                        className="flex flex-col h-full"
                                    >
                                        <h1 className="mb-12 !text-[var(--secondaryColor)] font-semibold">
                                            {t("Reset Password")}
                                        </h1>
                                        <div className="input-wrapper mt-5 mb-6">
                                            <a
                                                href="https://lin.ee/5WaeTDb"
                                                className="!text-[var(--secondaryColor)] font-semibold"
                                                target="_blank"
                                                
                                            >
                                                https://lin.ee/5WaeTDb
                                            </a>

                                            {/* <label htmlFor="email">
                                                {t("Email")}
                                            </label>
                                            <input
                                                type="text"
                                                value={email}
                                                onChange={handleEmailChange}
                                                style={{
                                                    borderColor:
                                                        email == ""
                                                            ? ""
                                                            : isEmailValid
                                                            ? "green"
                                                            : "red",
                                                }}
                                                placeholder={t(
                                                    "Enter your email"
                                                )}
                                                ref={emailRef}
                                                id="email"
                                                className="rounded-lg px-6 mt-3"
                                            /> */}
                                        </div>
                                        {/* <button className="w-full rounded-lg mt-4 mb-9">
                                            {t("Reset Password")}
                                        </button> */}

                                        <p className="dont-have-p">
                                            {t("Already have an account! ")}
                                            <a href="/" onClick={onLogin}>
                                                {t("Sign In")}
                                            </a>
                                        </p>
                                        <div className="ending-point  flex-1 flex flex-col  justify-end">
                                            <div className="line-breaker flex items-center mt-8">
                                                <span className="flex-1 mr-2"></span>
                                                <p>{t("Or Login with")}</p>
                                                <span className="flex-1 ml-2"></span>
                                            </div>
                                            <div className="mt-7 social-icons flex items-center justify-between">
                                                <a href="/">
                                                    <img
                                                        src={gmail_icon}
                                                        alt="social button"
                                                    />
                                                </a>
                                                <a href="/">
                                                    <img
                                                        src={facebook_icon}
                                                        alt="social button"
                                                    />
                                                </a>
                                                <a href="/">
                                                    <img
                                                        src={apple_icon}
                                                        alt="social button"
                                                    />
                                                </a>
                                                <a href="/">
                                                    <img
                                                        src={twitter_icon}
                                                        alt="social button"
                                                    />
                                                </a>
                                                <a href="/">
                                                    <img
                                                        src={telegram_icon}
                                                        alt="social button"
                                                    />
                                                </a>
                                                <a href="/">
                                                    <img
                                                        src={whatsapp_icon}
                                                        alt="social button"
                                                    />
                                                </a>
                                            </div>
                                        </div>
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
