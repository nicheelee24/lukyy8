import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { setLogoutState } from "../../redux/reducers/loginState";

import search from "../../assets/img/search.svg";
import * as API from "../../services/api";
import LanguageSelector from "../LanguageSelector";

import signIn from "../../assets/img/sign-in.svg";
import signUp from "../../assets/img/sign-up.svg";
import logo from "../../assets/img/teslla_logo2.png";

import Update from "../../assets/update.svg";

import LuckygaoLogo from "../../assets/img/Logo/luckyy.jpeg";
import LuckygaoLogoSmall from "../../assets/img/luckygao_logo_small.png";

import Login from "../signs/Login";
import ResetPassword from "../signs/ResetPassword";
import RegisterEmail from "../signs/RegisterEmail";
import RegisterPhone from "../signs/RegisterPhone";
import GameUpload from "../GameUpload";
import { RollingNumber } from "../RollingNumber";

import TletterLogo from "../../assets/img/t_letter_logo.png";
import MenuExpander from "../../assets/img/menu.svg";
import ThaiIcon from "../../assets/img/aside/chicken-Active.svg";
import CasinoIcon from "../../assets/img/aside/tabs/Live casino_hover.svg";
import BingoIcon from "../../assets/img/aside/tabs/SportsActive.svg";
import SportsIcon from "../../assets/img/svg/soccer.svg";
import HorseIcon from "../../assets/img/svg/horse.svg";
import LotteryIcon from "../../assets/img/svg/lottery.svg";
import TranslationIcon from "../../assets/img/svg/translation.svg";
import SearchIcon from "../../assets/img/svg/search.svg";
import WorldIcon from "../../assets/img/svg/world.svg";

import SoccerBall from "../../assets/img/new_design/soccer_ball.svg";
import Horse from "../../assets/img/new_design/horse.svg";
import EventTicket from "../../assets/img/new_design/event_ticket.svg";
import Cards from "../../assets/img/new_design/cards.svg";

import { reverse } from "../../redux/reducers/openMenu";
import { Link, useLocation } from "react-router-dom";

export const Header = () => {
    const { t } = useTranslation();
    const location = useLocation();

    const isLogin = useSelector((state) => state.loginState.isLogin);
    const dispatch = useDispatch();

    const expandMenuState = useSelector((state) => state.openMenuState.value);

    const [open, setOpen] = useState(false);
    const [type, setType] = useState("");
    const [uploadGame, setUploadGame] = useState(false);
    const [balance, setBalance] = useState(0.0);
    const [totalBetAmount, setTotalBetAmount] = useState(0.0);
    const [loadingBalance, setLoadingBalance] = useState(false);

    const [username, setUsername] = useState("");

    const fetchBalance = useCallback(async () => {
        setLoadingBalance(true);
        try {
            const res = await API.getUserBalance();
            setBalance(res.data.balance);
            setTotalBetAmount(res.data.totalBetAmount);
            // debugger
        } catch (error) {
            // Handle error appropriately (e.g., log it, show a user-friendly message)
            console.error("Error fetching balance info:", error);
        }
        setLoadingBalance(false);
    }, []);

    useEffect(() => {
        // get balance of the user
        if (isLogin) {
            fetchBalance();
        }
    }, [isLogin]);

    const validEmails = useMemo(
        () => [
            "koiescafe@gmail.com"
           
        ],
        [] // Empty dependency array since there are no dependencies
    );

    const fetchUser = useCallback(async () => {
        try {
            const res = await API.getUserInfo();
            setUsername(res.data.name);

            if (isLogin && validEmails.includes(res.data.email)) {
                setUploadGame(true);
            }
        } catch (error) {
            // Handle error appropriately (e.g., log it, show a user-friendly message)
            console.error("Error fetching user info:", error);
        }
    }, [isLogin, validEmails]);

    useEffect(() => {
        fetchUser();
    }, [isLogin, fetchUser]);

    function isMobileDevice() {
        const mobileWidth = 768;
        if (window.innerWidth < mobileWidth) return true;
        else return false;
    }
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <header
                className={`fixed bg-[var(--bgColorWhite)] w-full h-[70px] flex justify-center items-center ${expandMenuState ? "md:pl-[265px]" : "md:pl-[0px]"
                    } transition-width duration-[300ms] ease-in-out`}
            >
                {/* <div className="max-w-[1430px] flex w-full items-center"> */}
                <div className="flex w-full items-center">
                    {/* Hamburger Button */}
                    <div
                        className={`hidden md:flex min-w-[70px] min-h-[70px] items-center justify-center text-white cursor-pointer ml-3 ${expandMenuState ? "hidden" : ""
                            }`}
                        onClick={() => {
                            dispatch(reverse());
                        }}
                    >
                        <img src={MenuExpander} alt="menuExpander" />
                    </div>

                    <img
                        src={
                            isMobileDevice() ? LuckygaoLogo : LuckygaoLogo
                        }
                        alt="Teslla"
                        className={`w-[65px] h-[auto] ml-2 ${expandMenuState ? "hidden" : "ml:flex"
                            } logo-mobile`}
                    />
                    {/* <a href='/' className={`text-[32px] font-semibold text-[#FF0000] ml-2  hidden xl:flex ${expandMenuState ? "!hidden" : ""}`}>LuckyGao</a> */}
                    {/* <div className='input-wrapper ml-3 hidden sm:flex items-center w-72 h-10 hover:border-[#dbe7ff] hover:border-1'>
                        <input
                        type='text'
                        placeholder={t('Search...')}
                        className='flex-1 outline-none border-none '
                        />
                        <img src={search} alt='search' />
                    </div> */}

                    {/* <div className='text-white justify-end ml-6 sm:flex hidden'>
                            <RollingNumber />
                        </div> */}
                    <div className="items-center flex flex-grow justify-end gap-2">
                        {window.localStorage.getItem("token") === "" ||
                            window.localStorage.getItem("token") === undefined ||
                            window.localStorage.getItem("token") === null ||
                            !isLogin ? (
                            <>
                                <Link to={"/THAI/ALL"}>
                                    <div className="hidden lg:flex gap-2 py-[14px] px-[24px] cursor-pointer hover:bg-[var(--bgColors)]">
                                        <img
                                            width={28}
                                            height={28}
                                            src={Cards}
                                            alt="Thai"
                                        />
                                        <span className="text-[var(--secondaryColor)] leading-[28px]">
                                            {t("Thai")}
                                        </span>
                                    </div>
                                </Link>

                                <Link to={"/ESPORTS/ALL"}>
                                    <div className="hidden lg:flex gap-2 py-[14px] px-[24px] cursor-pointer hover:bg-[var(--bgColors)]">
                                        <img
                                            width={28}
                                            height={28}
                                            src={SoccerBall}
                                            alt="Sports"
                                        />
                                        <span className="text-[var(--secondaryColor)]  leading-[28px]">
                                            {t("Sports")}
                                        </span>
                                    </div>
                                </Link>

                                <Link to={"/LIVE/ALL"}>
                                    <div className="hidden lg:flex gap-2 py-[14px] px-[24px] cursor-pointer hover:bg-[var(--bgColors)]">
                                        <img
                                            width={28}
                                            height={28}
                                            src={EventTicket}
                                            alt="Casino"
                                        />
                                        <span className="text-[var(--secondaryColor)]  leading-[28px]">
                                            {t("Casino")}
                                        </span>
                                    </div>
                                </Link>

                                {/* <Link to={"/BINGO/ALL"}>
                                        <div className="hidden lg:flex gap-2 py-[14px] px-[24px] cursor-pointer hover:bg-[#7f7f7f30]">
                                            <img
                                                width={28}
                                                height={28}
                                                src={Horse}
                                                alt="Bingo"
                                            />
                                            <span className="text-[#903489] leading-[28px]">
                                                Bingo
                                            </span>
                                        </div>
                                    </Link> */}

                                <button
                                    className="bg-transparent text-[var(--secondaryColor)] flex rounded justify-center items-center leading-[28px] py-[6px] px-[15px] md:px-[38px] border-2 border-[var(--secondaryColor)] on-mobile-views-login"
                                    onClick={() => {
                                        setOpen(true);
                                        setType("login");
                                    }}
                                >
                                    {/* <img src={signUp} alt='sign Up' className='mr-2' /> */}
                                    {t("Login")}
                                </button>

                                <button
                                    className="bg-[var(--secondaryColor)] text-white flex rounded justify-center items-center leading-[28px] py-2 px-[29px] whitespace-nowrap on-mobile-views"
                                    onClick={() => {
                                        setOpen(true);
                                        setType("signup_email");
                                    }}
                                >
                                    {/* <img src={signUp} alt='sign Up' className='mr-2' /> */}
                                    {t("Sign Up")}
                                </button>

                                {/* <span className="mx-4 w-8 h-8">
                                    <img
                                        className="w-full h-full"
                                        src={TranslationIcon}
                                    />
                                </span> */}
                                <div className="relative inline-block text-left">
                                    <span>
                                        <button
                                            type="button"
                                            onClick={toggleDropdown}
                                            className="inline-flex justify-center w-full py-2 text-sm font-medium border-none bg-transparent mobile-"
                                            aria-haspopup="true"
                                            aria-expanded={isOpen}
                                        >
                                            <span className="mx-4 w-8 h-8">
                                                <img
                                                    className="w-full h-full"
                                                    src={TranslationIcon}
                                                    alt="Translation Icon"
                                                />
                                            </span>
                                        </button>
                                    </span>
                                    {isOpen && (
                                        <div
                                            className="origin-top-right absolute right-0 mt-2 mr-4 w-56 rounded-md shadow-lg bg-black ring-1 ring-black ring-opacity-5 focus:outline-none"
                                            role="menu"
                                            aria-orientation="vertical"
                                            aria-labelledby="options-menu"
                                        >
                                            <div className="py-1" role="none">
                                                <LanguageSelector />
                                            </div>
                                        </div>
                                    )}
                                </div>

                            </>
                        ) : (
                            <div className="gap-4 items-center">
                                <p className="flex items-center gap-4">
                                    {/* <p className="hidden md:flex gap-2">
                                        <Link
                                            to={"/financial-report"}
                                            className={`text-sm bg-transparent text-blue-700 font-semibold py-1 px-3 border rounded ${
                                                location.pathname ===
                                                "/financial-report"
                                                    ? "!bg-blue-500 text-white"
                                                    : "border-blue-500 hover:bg-blue-500 hover:text-white"
                                            }`}
                                        >
                                            Financial Report
                                        </Link>
                                        <Link
                                            to={"/account"}
                                            className={`text-sm bg-transparent text-blue-700 font-semibold py-1 px-3 border rounded ${
                                                location.pathname === "/account"
                                                    ? "!bg-blue-500 text-white"
                                                    : "border-blue-500 hover:bg-blue-500 hover:text-white"
                                            }`}
                                        >
                                            Account
                                        </Link>
                                        <Link
                                            to={"/mybet"}
                                            className={`text-sm bg-transparent text-blue-700 font-semibold py-1 px-3 border rounded ${
                                                location.pathname === "/mybet"
                                                    ? "!bg-blue-500 text-white"
                                                    : "border-blue-500 hover:bg-blue-500 hover:text-white"
                                            }`}
                                        >
                                            My bet list
                                        </Link>
                                        <Link
                                            to={"/announce"}
                                            className={`text-sm bg-transparent text-blue-700 font-semibold py-1 px-3 border rounded ${
                                                location.pathname ===
                                                "/announce"
                                                    ? "!bg-blue-500 text-white"
                                                    : "border-blue-500 hover:bg-blue-500 hover:text-white"
                                            }`}
                                        >
                                            Announce
                                        </Link>
                                    </p> */}

                                    <div className="flex flex-col gap-1 md:gap-4 md:flex-row">
                                        <span className="text-white text-sm md:text-lg w-auto md:px-2 ">
                                            {username}
                                        </span>

                                        <div className="flex gap-3 items-center">
                                            <span className="text-white text-sm md:text-lg">
                                                {loadingBalance
                                                    ? "..."
                                                    : balance.toFixed(2) +
                                                    "THB "}
                                                <span className="text-[var(--logoutBg)]">
                                                    {loadingBalance
                                                        ? "..."
                                                        : " ( " +
                                                        totalBetAmount.toFixed(
                                                            2
                                                        ) +
                                                        " ) "}
                                                </span>
                                            </span>

                                            <img
                                                src={Update}
                                                className="cursor-pointer w-5 h-5 md:w-6 md:h-6"
                                                onClick={() => fetchBalance()}
                                            />
                                        </div>
                                    </div>

                                    <button
                                        className="btn-f1 flex rounded-lg justify-center login-btn deposit-button items-center h-8 !text-[var(--sixthColor) bg-[var(--logoutBg)]]"
                                        onClick={() => {
                                            window.localStorage.removeItem(
                                                "token"
                                            );
                                            setUploadGame(false);
                                            dispatch(setLogoutState());
                                        }}
                                    >
                                        {/* <img src={signIn} alt='sign out' className='mr-2' /> */}

                                        {t("Log Out")}
                                    </button>
                                    {/* <span className="text-[24px] leading-[36px] text-white whitespace-nowrap">
                                            $ USD
                                        </span> */}
                                          <div className="relative inline-block text-left">
                                    <span>
                                        <button
                                            type="button"
                                            onClick={toggleDropdown}
                                            className="inline-flex justify-center w-full py-2 text-sm font-medium border-none bg-transparent mobile-"
                                            aria-haspopup="true"
                                            aria-expanded={isOpen}
                                        >
                                            <span className="mx-4 w-8 h-8">
                                                <img
                                                    className="w-full h-full"
                                                    src={TranslationIcon}
                                                    alt="Translation Icon"
                                                />
                                            </span>
                                        </button>
                                    </span>
                                    {isOpen && (
                                        <div
                                            className="origin-top-right absolute right-0 mt-2 mr-4 w-56 rounded-md shadow-lg bg-black ring-1 ring-black ring-opacity-5 focus:outline-none"
                                            role="menu"
                                            aria-orientation="vertical"
                                            aria-labelledby="options-menu"
                                        >
                                            <div className="py-1" role="none">
                                                <LanguageSelector />
                                            </div>
                                        </div>
                                    )}
                                </div>
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </header>
            <Login
                open={open}
                setOpen={setOpen}
                type={type}
                setType={setType}
            />
            <ResetPassword
                open={open}
                setOpen={setOpen}
                type={type}
                setType={setType}
            />
            <RegisterEmail
                open={open}
                setOpen={setOpen}
                type={type}
                setType={setType}
            />
            <RegisterPhone
                open={open}
                setOpen={setOpen}
                type={type}
                setType={setType}
            />
            <GameUpload
                open={open}
                setOpen={setOpen}
                type={type}
                setType={setType}
            />
        </>
    );
};
