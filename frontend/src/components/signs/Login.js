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

export default function Login({ open, setOpen, type, setType }) {
    const { t } = useTranslation();

    const dispatch = useDispatch();
    const initPhone = useSelector((state) => state.loginState.phone);
    const initPassword = useSelector((state) => state.loginState.password);

    const [phone, setPhone] = useState(initPhone);
    const [isPhoneValid, setIsPhoneValid] = useState(false);
    const [password, setPassword] = useState(initPassword);
    const [isPasswordValid, setIsPasswordValid] = useState(false);

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordLength = 8;

    const [passVisible, setPassVisible] = useState(false);
    const [isRemember, setIsRemember] = useState(false);
    const cancelButtonRef = useRef(null);
    const phoneRef = useRef(null);
    const passwordRef = useRef(null);

    // const handleEmailChange = (e) => {
    //   const inputEmail = e.target.value;
    //   setEmail(inputEmail);
    //   setIsEmailValid(emailRegex.test(inputEmail));
    // }

    const handlePhoneChange = (e) => {
        // const inputEmail = e.target.value;
        // setEmail(inputEmail);
        // setIsEmailValid(emailRegex.test(inputEmail));

        const phoneNumber = e.target.value;
        // Regex for a basic international phone number check
        const regex =
            /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,6}$/im;

        setPhone(phoneNumber);
        if (regex.test(phoneNumber)) {
            console.log("Valid phone number");
            setIsPhoneValid(true);

            // Additional actions for a valid phone number
        } else {
            console.log("Invalid phone number");
            setIsPhoneValid(false);
            // Additional actions for an invalid phone number
        }
    };

    const handlePasswordChange = (e) => {
        const inputPassword = e.target.value;
        setPassword(inputPassword);
        setIsPasswordValid(inputPassword.length >= passwordLength);
    };

    const onReset = (e) => {
        e.preventDefault();
        setType("reset");
    };

    const onRegister = (e) => {
        e.preventDefault();
        setType("signup_email");
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

    // function initFunc() {
    //   setEmail('')
    //   setPassword('')
    //   setIsRemember(false)
    // }

    const onLogin = async (e) => {
        e.preventDefault();
        const phone = phoneRef.current.value;
        const password = passwordRef.current.value;

        if (
            phone === "" ||
            !isPhoneValid ||
            password === "" ||
            !isPasswordValid
        ) {
            failLogIn();
            return;
        }

        const options = {
            method: "POST",
            url: process.env.REACT_APP_BACKEND + "/api/auth",
            headers: { "content-type": "application/x-www-form-urlencoded" },
            data: {
                phone,
                password,
            },
        };

        await axios
            .request(options)
            .then(function (response) {
                if (response.data.status === "0000") {
                    window.localStorage.setItem("token", response.data.token);
                    API.setAuthToken(response.data.token);
                    setOpen(false);
                    dispatch(setLoginState());
                    // response.data.sbo_login_url
                    toast.success("Log In Successfully.", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,

                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    // window.location.href = response.data.login_url;
                } else {
                    toast.error("Log In Failed: " + response.data.desc, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,

                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }
            })
            .catch(function (error) {
                console.error(error);
                failConnection();

                toast.error("Log In Failed.", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,

                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            });
    };

    return (
        <Transition.Root show={open && type === "login"} as={Fragment}>
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
                            <Dialog.Panel className="overflow-auto md:overflow-hidden flex flex-col md:flex-row bg-[#181637] w-[817px] h-[696px] grid grid-cols-1 md:grid-cols-2  border border-[#2c2a4a] rounded-[12px]">
                                <div className="hidden md:flex left-side flex-col items-center justify-center">
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
                                <div className="right-side px-8 py-10 text-left bg-white">
                                    <form
                                        action="#"
                                        className="flex flex-col h-full"
                                    >
                                        <h1 className="mb-12 !text-black font-semibold">
                                            {t("Sign In")}
                                        </h1>
                                        <div className="input-wrapper">
                                            <label htmlFor="phone"className="!text-black font-semibold">
                                                {t("Phone Number")}
                                            </label>
                                            {/* <label htmlFor='email'>{t("Email / Phone Number")}</label> */}
                                            <input
                                                type="tel"
                                                value={phone}
                                                onChange={handlePhoneChange}
                                                style={{
                                                    borderColor:
                                                        phone === ""
                                                            ? ""
                                                            : isPhoneValid
                                                            ? "green"
                                                            : "red",
                                                }}
                                                placeholder={t("Phone Number")}
                                                // placeholder='Jackrose11@gmail.com'
                                                ref={phoneRef}
                                                id="phone"
                                                className="rounded-lg px-6 mt-3 !text-black placeholder-black border"
                                                autoFocus
                                            />
                                        </div>
                                        <div className="input-wrapper mt-5 mb-9">
                                            <label htmlFor="password"className="!text-black font-semibold">
                                                {t("Login Password")}
                                            </label>
                                            <input
                                                type={
                                                    passVisible
                                                        ? "text"
                                                        : "password"
                                                }
                                                value={password}
                                                onChange={handlePasswordChange}
                                                style={{
                                                    borderColor:
                                                        password === ""
                                                            ? ""
                                                            : isPasswordValid
                                                            ? "green"
                                                            : "red",
                                                }}
                                                placeholder={t(
                                                    "Enter your password"
                                                )}
                                                ref={passwordRef}
                                                id="password"
                                                className="rounded-lg px-6 mt-3 !text-black placeholder-black border"
                                            />
                                            <img
                                                src={eye_icon}
                                                className="eye-icon cursor-pointer absolute right-[22px] top-[47px]"
                                                alt="eye icon"
                                                onClick={() =>
                                                    setPassVisible(!passVisible)
                                                }
                                            />
                                        </div>
                                        <div className="flex items-center justify-between remember-me-portion">
                                            <div className="checkbox-wrapper flex items-center">
                                                <div className="m-0 p-0">
                                                    <input
                                                        type="checkbox"
                                                        id="remember-me"
                                                        className="hidden"
                                                        checked={isRemember}
                                                        onClick={() =>
                                                            setIsRemember(
                                                                !isRemember
                                                            )
                                                        }
                                                    />
                                                    <label
                                                        htmlFor="remember-me"
                                                        className="cursor-pointer w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#c7c8cf]"
                                                    >
                                                        <span
                                                            className={clsx(
                                                                "w-3 h-3 rounded-full block",
                                                                isRemember
                                                                    ? "bg-[#c7c8cf]"
                                                                    : ""
                                                            )}
                                                        ></span>
                                                    </label>
                                                </div>
                                                <label
                                                    htmlFor="remember-me"
                                                    className="ml-1"
                                                >
                                                    {t("Remember me")}
                                                </label>
                                            </div>
                                            <a href="/" onClick={onReset}>
                                                {t("Forgot Password?")}
                                            </a>
                                        </div>
                                        <button
                                            className="btn-f1-1 w-full rounded-lg mt-4 mb-9"
                                            onClick={onLogin}
                                        >
                                            {t("Sign In")}
                                        </button>
                                        <p className="dont-have-p">
                                            {t("Don’t have an account! ")}
                                            <a href="/" onClick={onRegister}>
                                                {t("Sign up")}
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
                                                        alt="gmail button"
                                                    />
                                                </a>
                                                <a href="/">
                                                    <img
                                                        src={facebook_icon}
                                                        alt="facebook button"
                                                    />
                                                </a>
                                                <a href="/">
                                                    <img
                                                        src={apple_icon}
                                                        alt="apple button"
                                                    />
                                                </a>
                                                <a href="/">
                                                    <img
                                                        src={twitter_icon}
                                                        alt="twitter button"
                                                    />
                                                </a>
                                                <a href="/">
                                                    <img
                                                        src={telegram_icon}
                                                        alt="telegram button"
                                                    />
                                                </a>
                                                <a href="/">
                                                    <img
                                                        src={whatsapp_icon}
                                                        alt="whatsapp button"
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
