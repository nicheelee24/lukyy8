import { useState, useEffect } from "react";
import { GetIcon } from "./GetIcon";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { reverse } from "../redux/reducers/openMenu";

import {
    Sport,
    EGame,
    Slot,
    FishingGame,
    Thai,
    Table,
    LiveCasino,
    // Lotto,
    Bingo,
    Chicken,
} from "../config";
import { setNavBar } from "../redux/reducers/navBar";

const CONTACT_US_LINE_APP_INVITE_URL = "https://lin.ee/5WaeTDb";

export const SideIcon = ({ text, type, index, expand }) => {
    const navigate = useNavigate();
    const navIndex = useSelector((state) => state.navBarState.index);
    const [isHover, setIsHover] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        // 👇️ scroll to top on page load
        // window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }, []);

    function isMobileDevice() {
        const mobileWidth = 768;
        if (window.innerWidth < mobileWidth) return true;
        else return false;
    }

    function renderContentByIndex(ind) {
        switch (ind) {
            case 1:
                // Sports
                return Sport.map((item, index) => (
                    <img
                        key={index}
                        src={item.imageUrl}
                        alt={item.imageUrl}
                        className="w-[70%] hover:brightness-150 m-auto pr-[20px] pb-[30px] pt-[30px]"
                        onClick={() => {
                            navigate(`/ESPORTS/${item.platform}`, {
                                replace: true,
                            });
                        }}
                    />
                ));
            case 2:
                // EGame
                return EGame.map((item, index) => (
                    <img
                        key={index}
                        src={item.imageUrl}
                        alt={item.imageUrl}
                        className="w-[40%] hover:brightness-150 m-auto pb-[30px] pt-[30px]"
                        onClick={() => {
                            navigate(`/EGAME/${item.platform}`, {
                                replace: true,
                            });
                        }}
                    />
                ));
            case 3:
                // Slots
                return Slot.map((item, index) => (
                    <img
                        key={index}
                        src={item.imageUrl}
                        alt={item.imageUrl}
                        className="w-[40%] hover:brightness-150 m-auto pb-[30px] pt-[30px]"
                        onClick={() => {
                            navigate(`/SLOT/${item.platform}`, {
                                replace: true,
                            });
                        }}
                    />
                ));
            case 4:
                // Fishing Game
                return FishingGame.map((item, index) => (
                    <img
                        key={index}
                        src={item.imageUrl}
                        alt={item.imageUrl}
                        className="w-[40%] hover:brightness-150 m-auto pb-[30px] pt-[30px]"
                        onClick={() => {
                            navigate(`/FH/${item.platform}`, { replace: true });
                        }}
                    />
                ));
            case 5:
                // Thai Game
                return Thai.map((item, index) => (
                    <img
                        key={index}
                        src={item.imageUrl}
                        alt={item.imageUrl}
                        className="w-[40%] hover:brightness-150 m-auto pb-[30px] pt-[30px]"
                        onClick={() => {
                            navigate(`/THAI/${item.platform}`, {
                                replace: true,
                            });
                        }}
                    />
                ));
            case 6:
                // Table Games
                return Table.map((item, index) => (
                    <img
                        key={index}
                        src={item.imageUrl}
                        alt={item.imageUrl}
                        className="w-[40%] hover:brightness-150 m-auto pb-[30px] pt-[30px]"
                        onClick={() => {
                            navigate(`TABLE/${item.platform}`, {
                                replace: true,
                            });
                        }}
                    />
                ));
            case 7:
                // Live Casino
                return LiveCasino.map((item, index) => (
                    <img
                        key={index}
                        src={item.imageUrl}
                        alt={item.imageUrl}
                        className="w-[40%] hover:brightness-150 m-auto pb-[30px] pt-[30px]"
                        onClick={() => {
                            navigate(`/LIVE/${item.platform}`, {
                                replace: true,
                            });
                        }}
                    />
                ));
            // case 8:
            //     // Lotto
            //     return Lotto.map((item, index) => (
            //         <img
            //             key={index}
            //             src={item.imageUrl}
            //             alt={item.imageUrl}
            //             className="w-[40%] hover:brightness-150 m-auto pb-[30px] pt-[30px]"
            //             onClick={() => {
            //                 navigate(`/LOTTO/${item.platform}`, {
            //                     replace: true,
            //                 });
            //             }}
            //         />
            //     ));
            // case 9:
            //     // Bingo
            //     return Bingo.map((item, index) => (
            //         <img
            //             key={index}
            //             src={item.imageUrl}
            //             alt={item.imageUrl}
            //             className="w-[40%] hover:brightness-150 m-auto pb-[30px] pt-[30px]"
            //             onClick={() => {
            //                 navigate(`/BINGO/${item.platform}`, {
            //                     replace: true,
            //                 });
            //             }}
            //         />
            //     ));
            case 8:
                // Chicken
                return Chicken.map((item, index) => (
                    <img
                        key={index}
                        src={item.imageUrl}
                        alt={item.imageUrl}
                        className="w-[40%] hover:brightness-150 m-auto pb-[30px] pt-[30px]"
                        onClick={() => {
                            navigate(`/CHICKEN/${item.platform}`, {
                                replace: true,
                            });
                        }}
                    />
                ));
            default:
                break;
        }
    }

    function handleClick(type, index) {
        switch (type) {
            case "ALL":
                dispatch(setNavBar({ index: 0 }));
                navigate(`/`, { replace: true });
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                break;
            case "Promotion":
                navigate(`/promotion`, { replace: true });
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                break;
            case "VIP":
                navigate(`/vip`, { replace: true });
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                break;
            case "Support":
                navigate(`/support`, { replace: true });
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                break;
            case "Language":
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                break;
            case "ContactUs":
                window.open(CONTACT_US_LINE_APP_INVITE_URL, "_blank");
                break;
            case "FinancialReport":
                navigate(`/financial-report`, { replace: true });
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                break;
            case "Account":
                navigate(`/account`, { replace: true });
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                break;
            case "MyBetList":
                navigate(`/mybet`, { replace: true });
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                break;
            case "Announce":
                navigate(`/announce`, { replace: true });
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                break;
            default:
                // navigate(`/${type}/ALL`, { replace: true })
                // window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
                switch (type) {
                    case "SLOT":
                        dispatch(setNavBar({ index: 1 }));
                        break;
                    case "LIVE":
                        dispatch(setNavBar({ index: 2 }));
                        break;
                    case "TABLE":
                        dispatch(setNavBar({ index: 3 }));
                        break;
                    case "ESPORTS":
                        dispatch(setNavBar({ index: 4 }));
                        break;
                    case "EGAME":
                        dispatch(setNavBar({ index: 5 }));
                        break;
                    case "FH":
                        dispatch(setNavBar({ index: 6 }));
                        break;
                    case "THAI":
                        dispatch(setNavBar({ index: 7 }));
                        break;
                    // case "LOTTO":
                    //     dispatch(setNavBar({ index: 8 }));
                    //     break;
                    case "VIRTUAL":
                        dispatch(setNavBar({ index: 8 }));
                        break;
                    default:
                        dispatch(setNavBar({ index: 0 }));
                        break;
                }
                navigate(`/${type}`, { replace: true });
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                break;
        }

        if (type != "Language" && isMobileDevice()) dispatch(reverse());
    }

    return (
        <div
            className={`${
                expand
                    ? "bg-[var(--secondaryColor)] pl-5 "
                    : "flex justify-center pl-0 "
            } ${
                index === navIndex
                    ? "!bg-[var(--logoutBg)] !text-black-800 m-5 rounded-md"
                    : "custom-hover-bg bg-black rounded-md hover:text-black"
            } flex flex-row items-center cursor-pointer h-[46px] mx-auto  my-1`}
            onMouseOver={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            onClick={() => handleClick(type, index)}
        >
            <GetIcon type={type} active={isHover}  />
            <h1
              className={`flex flex-col-1 text-[15px] text-center ${
                index === navIndex ? "text-black-800" : "text-white"
              } ${expand ? "ml-[25px]" : "hidden"}`}
            >
                {text}
            </h1>
            {/* {index > 0 && index < 20 && (
              <div className={`dropdown-content ${expand ? 'left-[220px] md:left-[265px]' : 'left-[65px]'}`}>
                <div className='h-full flex flex-col backdrop-blur-sm no-scrollbar overflow-y-scroll'>
                  { renderContentByIndex(index) }
                </div>
              </div>
            )} */}
        </div>
    );
};
