import React from "react";
import { Fragment, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { setAuthInfoState } from "../../redux/reducers/loginState";
import { Dialog, Transition } from "@headlessui/react";
import "../../assets/css/login.css";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import eye_icon from "../../assets/img/eye-icon.svg";
import gmail_icon from "../../assets/img/gmail_sign.svg";
import facebook_icon from "../../assets/img/facebook_sign.svg";
import apple_icon from "../../assets/img/apple_sign.svg";
import twitter_icon from "../../assets/img/twitter_sign.svg";
import telegram_icon from "../../assets/img/telegram_sign.svg";
import whatsapp_icon from "../../assets/img/whatsapp_sign.svg";

export default function RegisterEmail({ open, setOpen, type, setType }) {
    const { t } = useTranslation();

    const dispatch = useDispatch();

    const [phone, setPhone] = useState("");
    const [bban, setBban] = useState("");
    const [bbun, setBbun] = useState("");
    const [bbn, setBbn] = useState("");

    const [isPhoneValid, setIsPhoneValid] = useState(false);
    const [password, setPassword] = useState("");
    const [isPasswordValid, setIsPasswordValid] = useState(false);

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordLength = 6;

    const [passVisible, setPassVisible] = useState(false);
    const cancelButtonRef = useRef(null);
    const phoneRef = useRef(null);

    const bbanRef = useRef(null);
    const bbunRef = useRef(null);
    const bbnRef = useRef(null);

    const passwordRef = useRef(null);

    const [isAgree, setIsAgree] = useState(false);
    const [isReceive, setIsReceive] = useState(false);

    const bankLists = [
        "KBANK",
        "SCB",
        "BBL",
        "KTB",
        "TTB",
        "CITI",
        "SCBT",
        "CIMB",
        "UOBT",
        "BAY",
        "GOV",
        "GHB",
        "BAAC",
        "BOC",
        "ISBT",
        "KK",
        "ICBC",
        "LHBANK",
    ];

    const handlePhoneChange = (e) => {
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

    const handleBBANChange = (e) => {
        const bban = e.target.value;
        setBban(bban);
    };

    const handleBBUNChange = (e) => {
        const bbun = e.target.value;
        setBbun(bbun);
    };

    const handleBBNChange = (e) => {
        const bbn = e.target.value;
        setBbn(bbn);
    };

    const handleAgreeChange = (e) => {
        setIsAgree(e.target.checked);
    };

    const handleReceiveChange = (e) => {
        setIsReceive(e.target.checked);
    };

    const onLogin = (e) => {
        e.preventDefault();
        setType("login");
    };

    // const onRegisterPhone = (e) => {
    //   e.preventDefault();
    //   setType('signup_phone');
    // }

    const failSignUp = () =>
        toast.error(t("Valid input"), {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,

            draggable: true,
            progress: undefined,
            theme: "light",
        });

    // const failConnection = () =>
    //   toast.error(t('Connection failed'), {
    //     position: 'top-right',
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //
    //     draggable: true,
    //     progress: undefined,
    //     theme: 'light'
    //   })

    function initFunc() {
        setPhone("");
        setPassword("");
        setIsAgree(false);
        setIsReceive(false);
    }

    const onRegister = async (e) => {
        e.preventDefault();
        const phone = phoneRef.current.value;
        const password = passwordRef.current.value;

        const bban = bbanRef.current.value;
        const bbun = bbunRef.current.value;
        const bbn = bbnRef.current.value;

        if (
            phone === "" ||
            !isPhoneValid ||
            password === "" ||
            !isPasswordValid
        ) {
            failSignUp();
            return;
        }

        const options = {
            method: "POST",
            url: process.env.REACT_APP_BACKEND + "/api/users",
            headers: { "content-type": "application/x-www-form-urlencoded" },
            data: {
                phone,
                password,
                bban,
                bbun,
                bbn,
                platform: process.env.REACT_APP_PLATFORM,
            },
        };

        await axios
            .request(options)
            .then(function (response) {
                if (response.data.status === "0000") {
                    dispatch(setAuthInfoState({ phone, password }));
                    setTimeout(initFunc, 1000);
                    setType("login");

                    toast.success("Sign Up Successfully.", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,

                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    // window.localStorage.setItem("token", response.data.token);
                    // window.location.href = response.data.login_url;
                } else {
                    toast.error(response.data.desc, {
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
                // failConnection()

                toast.error("Sign Up Failed.", {
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
        <Transition.Root show={open && type === "signup_email"} as={Fragment}>
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
                            <Dialog.Panel className="overflow-auto md:overflow-hidden flex flex-col md:flex-row bg-[#181637] w-[817px] h-[796px] md:grid grid-cols-2 border border-[#2c2a4a] rounded-[12px]">
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
                                        onSubmit={onRegister}
                                    >
                                        <h1 className="mb-3 !text-[var(--secondaryColor)] font-bold">{t("Sign Up")}</h1>
                                        {/* <div className="grid grid-cols-2 tabs-wrapper gap-3 mb-5">
                      <button className="rounded-lg active">{t("Email")}</button> */}
                                        {/* <button className="rounded-lg " onClick={onRegisterPhone}>{t("Phone Number")}</button> */}
                                        {/* </div> */}
                                        <div className="input-wrapper mt-6">
                                            <label htmlFor="phone" className="!text-black font-semibold">
                                                {t("Phone Number")}
                                            </label>
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
                                                // placeholder="Jackrose11@gmail.com"
                                                ref={phoneRef}
                                                id="phone"
                                                className="rounded-lg px-6 mt-3 placeholder-black border"
                                                autoFocus

                                            />
                                        </div>
                                        <div className="input-wrapper mt-4 mb-5">
                                            <label htmlFor="password" className="!text-black font-semibold">
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
                                                // placeholder={t("Enter your password ( 8+ )")}
                                                placeholder={t(
                                                    "Enter your password"
                                                )}
                                                ref={passwordRef}
                                                id="password"
                                                className="rounded-lg px-6 mt-3 placeholder-black border"
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

                                        <div className="input-wrapper mt-5">
                                            <label htmlFor="bban" className="!text-black font-semibold">
                                                {t("Bank Account Number")}
                                            </label>
                                            <input
                                                type="text"
                                                value={bban}
                                                onChange={handleBBANChange}
                                                placeholder={t(
                                                    "Bank Account Number"
                                                )}
                                                // placeholder="Jackrose11@gmail.com"
                                                ref={bbanRef}
                                                id="bban"
                                                className="rounded-lg px-6 mt-3 placeholder-black border"
                                                autoFocus
                                            />
                                        </div>

                                        <div className="input-wrapper mt-5">
                                            <label htmlFor="bbun" className="!text-black font-semibold">
                                                {t("Bank User Name")}
                                            </label>
                                            <input
                                                type="text"
                                                value={bbun}
                                                onChange={handleBBUNChange}
                                                placeholder={t(
                                                    "Bank User Name"
                                                )}
                                                // placeholder="Jackrose11@gmail.com"
                                                ref={bbunRef}
                                                id="bbun"
                                                className="rounded-lg px-6 mt-3 placeholder-black border"
                                                autoFocus
                                            />
                                        </div>

                                        <div className="input-wrapper mt-5">
                                            <label htmlFor="bbn" className="!text-black font-semibold">
                                                {t("Bank Name")}
                                            </label>
                                            <select
                                                value={bbn}
                                                onChange={handleBBNChange}
                                                ref={bbnRef}
                                                id="bbn"
                                                className="rounded-lg px-6 mt-3"
                                                autoFocus
                                            >
                                                {/* <option value="" disabled>{t("Select Bank")}</option> */}
                                                {bankLists.map((bank) => (
                                                    <option
                                                        key={bank}
                                                        value={bank}
                                                    >
                                                        {t(bank)}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="hidden agreement flex items-center">
                                            <h1 className="mr-2 !text-black font-semibold">
                                                {t(
                                                    "Enter Referral / Promo Code"
                                                )}
                                            </h1>
                                            <svg
                                                width="22"
                                                height="17"
                                                viewBox="0 0 22 17"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M6.51825 4.59054L11.0911 9.64645L15.664 4.59054C15.7731 4.4699 15.9027 4.37421 16.0453 4.30892C16.1878 4.24363 16.3406 4.21002 16.4949 4.21002C16.6492 4.21002 16.802 4.24363 16.9446 4.30892C17.0872 4.37421 17.2167 4.4699 17.3258 4.59054C17.4349 4.71119 17.5215 4.85441 17.5806 5.01203C17.6396 5.16965 17.67 5.3386 17.67 5.50921C17.67 5.67982 17.6396 5.84876 17.5806 6.00638C17.5215 6.16401 17.4349 6.30723 17.3258 6.42787L11.9161 12.4089C11.8071 12.5297 11.6776 12.6256 11.535 12.691C11.3924 12.7564 11.2396 12.79 11.0852 12.79C10.9309 12.79 10.7781 12.7564 10.6355 12.691C10.4929 12.6256 10.3634 12.5297 10.2544 12.4089L4.84467 6.42787C4.73541 6.30732 4.64873 6.16413 4.58959 6.00649C4.53044 5.84885 4.5 5.67987 4.5 5.50921C4.5 5.33855 4.53044 5.16956 4.58959 5.01192C4.64873 4.85429 4.73541 4.7111 4.84467 4.59054C5.30431 4.09538 6.05861 4.08235 6.51825 4.59054Z"
                                                    fill="white"
                                                ></path>
                                            </svg>
                                        </div>

                                        <div className="hidden agreement-list mt-4">
                                            <div className="list-inner flex items-start">
                                                <div className="CheckboxStyle CheckboxStyleSignUp">
                                                    <input
                                                        type="checkbox"
                                                        id="user-agree"
                                                        className="hidden"
                                                        onClick={
                                                            handleAgreeChange
                                                        }
                                                        checked={isAgree}
                                                    />
                                                    <label
                                                        htmlFor="user-agree"
                                                        className="cursor-pointer w-5 h-5 rounded-full flex items-center justify-center
                                                        !text-black font-semibold"

                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 24 24"
                                                            fill="#181837"
                                                            className="w-6 h-6"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                                                                clipRule="evenodd"
                                                            ></path>
                                                        </svg>
                                                    </label>
                                                </div>
                                                <p className="ml-3 !text-black font-semibold">
                                                    {t("I agree to the User ")}
                                                    <a href="/">
                                                        {t(
                                                            "Agreement & Confirm"
                                                        )}
                                                    </a>
                                                    {t(
                                                        " I am at least 18 years old"
                                                    )}
                                                </p>
                                            </div>
                                            <div className="list-inner mt-2 flex items-center">
                                                <div className="CheckboxStyle CheckboxStyleSignUp">
                                                    <input
                                                        type="checkbox"
                                                        id="marketing"
                                                        className="hidden"
                                                        onClick={
                                                            handleReceiveChange
                                                        }
                                                        checked={isReceive}
                                                    />
                                                    <label
                                                        htmlFor="marketing"
                                                        className="cursor-pointer w-5 h-5 rounded-full flex items-center justify-center"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 24 24"
                                                            fill="#181837"
                                                            className="w-6 h-6"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                                                                clipRule="evenodd"
                                                            ></path>
                                                        </svg>
                                                    </label>
                                                </div>
                                                <p
                                                    className="ml-3 text-md"

                                                >
                                                    {t("I agree to receive")}
                                                </p>
                                            </div>
                                        </div>

                                        <button
                                            className="btn-f1-1 w-full rounded-lg mt-4 mb-4"
                                            type="submit"
                                        >
                                            {t("Sign Up")}
                                        </button>
                                        <p className="dont-have-p">
                                            {t("Already have an account! ")}
                                            <a href="/" onClick={onLogin}>
                                                {t("Sign In")}
                                            </a>
                                        </p>

                                        <div className="hidden ending-point  flex-1 flex flex-col  justify-end">
                                            <div className="line-breaker flex items-center mt-3">
                                                <span className="flex-1 mr-2"></span>
                                                <p>{t("Or Login with")}</p>
                                                <span className="flex-1 ml-2"></span>
                                            </div>
                                            <div className="mt-3 social-icons flex items-center justify-between">
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
