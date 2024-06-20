import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setNavBar } from "../redux/reducers/navBar";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import Sports from "../assets/img/aside/tabs/Sports.svg";
import SportsActive from "../assets/img/aside/tabs/SportsActive.svg";
import Live from "../assets/img/aside/tabs/Live casino.svg";
import slots from "../assets/img/aside/tabs/Slots.svg";
import home from "../assets/img/aside/tabs/home.svg";
import home_hover from "../assets/img/aside/tabs/home_hover.svg";
import sportGame from "../assets/img/aside/tabs/sports-game-l.svg";
import sportGameHover from "../assets/img/aside/tabs/sports-game-l-hover.svg";
import tableGame from "../assets/img/aside/tabs/table-game-l.svg";
import fishingGameActive from "../assets/img/aside/tabs/fishing-game-l.svg";
import fishingGame from "../assets/img/aside/tabs/fishing-game.svg";
import virtualGameActive from "../assets/img/aside/tabs/virtual-game-l.svg";
import virtualGame from "../assets/img/aside/tabs/virtual-game.svg";

import lottoGame from "../assets/img/aside/tabs/lotto-game.svg";
import lottoGameActive from "../assets/img/aside/tabs/Lotto-game-l.svg";
import egame from "../assets/img/aside/tabs/egame-l.svg";
import thai from "../assets/img/aside/thai.png";
import chicken from "../assets/img/aside/chicken.svg";
import chickenActive from "../assets/img/aside/chicken-Active.svg";

import Lobby from "../assets/img/new_design/navbar/lobby.svg";
import LobbyActive from "../assets/img/new_design/navbar/lobby.svg";

import Thumbup from "../assets/img/svg/Thumbup.svg";
import ThumbupActive from "../assets/img/svg/ThumbupActive.svg";

import Slots from "../assets/img/new_design/navbar/slots.svg";
import SlotsActive from "../assets/img/new_design/navbar/slots.svg";

import Energy from "../assets/img/aside/tabs/sports-game-l.svg";
import EnergyActive from "../assets/img/aside/tabs/sports-game-l-hover.svg";
import PlayingCards from "../assets/img/aside/tabs/Live casino.svg";
import PlayingCardsActive from "../assets/img/aside/tabs/Live casino_hover.svg";
import ClubsSuit from "../assets/img/aside/tabs/table-game.svg";
import ClubsSuitActive from "../assets/img/aside/tabs/table-game-l.svg";
import Spaceship from "../assets/img/svg/Spaceship.svg";
import SpaceshipActive from "../assets/img/svg/SpaceshipActive.svg";
import Diamonds from "../assets/img/svg/Diamonds.svg";
import DiamondsActive from "../assets/img/svg/DiamondsActive.svg";

import Others from "../assets/img/new_design/navbar/others.svg";
import OthersActive from "../assets/img/new_design/navbar/others.svg";

import Slide from "./Slide";

export default function NavBar() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const { gameType, platform } = useParams();

    const navIndex = useSelector((state) => state.navBarState.index);
    const dispatch = useDispatch();

    let path = "";

    const gameListLeft = [
        {
            Img: Lobby,
            ActiveImg: LobbyActive,
            Text: t("Lobby"),
            Hover: home_hover,
        },
        {
            Img: Slots,
            ActiveImg: SlotsActive,
            Text: t("Slots"),
            Hover: home_hover,
            gameType: "SLOT",
        },
        {
            Img: Others,
            ActiveImg: OthersActive,
            Text: t("Live Casino"),
            Hover: home_hover,
            gameType: "LIVE",
        },
        {
            Img: Others,
            ActiveImg: OthersActive,
            Text: t("Table Game"),
            Hover: home_hover,
            gameType: "TABLE",
        },
        {
            Img: Others,
            ActiveImg: OthersActive,
            Text: t("Sports"),
            Hover: home_hover,
            gameType: "ESPORTS",
        },
        {
            Img: Others,
            ActiveImg: OthersActive,
            Text: t("EGame"),
            Hover: home_hover,
            gameType: "EGAME",
        },
        // {
        //   Img: Thumbup,
        //   ActiveImg: ThumbupActive,
        //   Text: t("Top Picks"),
        //   Hover: home_hover,
        //   gameType: "TOPPICK",
        // },

        {
            Img: Others,
            ActiveImg: OthersActive,
            Text: t("Fishing Game"),
            Hover: home_hover,
            gameType: "FH",
        },
        {
            Img: Others,
            ActiveImg: OthersActive,
            Text: t("Thai Game"),
            Hover: home_hover,
            gameType: "THAI",
        },

        // {
        //   Img: Energy,
        //   ActiveImg: EnergyActive,
        //   Text: t("Hot Games"),
        //   Hover: home_hover,
        //   gameType: "HOTGAME",
        // },

        // {
        //   Img: ClubsSuit,
        //   ActiveImg: ClubsSuitActive,
        //   Text: t("Table Games"),
        //   Hover: home_hover,
        //   gameType: "TABLEGAME",
        // },
        // {
        //   Img: Spaceship,
        //   ActiveImg: SpaceshipActive,
        //   Text: t("New Releases"),
        //   Hover: home_hover,
        //   gameType: "NEWRELEASE",
        // },
        // {
        //   Img: Diamonds,
        //   ActiveImg: DiamondsActive,
        //   Text: t("Black Jack"),
        //   Hover: home_hover,
        //   gameType: "BLACKJACK",
        // },
        // {
        //     Img: Others,
        //     ActiveImg: OthersActive,
        //     Text: t("Lotto"),
        //     Hover: home_hover,
        //     gameType: "LOTTO",
        // },
        // {
        //     Img: Others,
        //     ActiveImg: OthersActive,
        //     Text: t("Bingo"),
        //     Hover: home_hover,
        //     gameType: "BINGO",
        // },

        // {
        //     Img: Others,
        //     ActiveImg: OthersActive,
        //     Text: t("Virtual"),
        //     Hover: home_hover,
        //     gameType: "VIRTUAL",
        // },
        // {
        //   Img: chicken,
        //   Text: t("Game-Chicken"),
        //   Hover: home_hover,
        //   gameType: "CHICKEN",
        // },
    ];

    // useEffect(() => {
    //     console.log(navIndex);
    //     if (!platform) {
    //     }
    // }, [gameType, navigate]); // Include navigate if it's not a constant

    return (
        <div className="mt-8 md:mt-20 my-4">
            <Swiper
                spaceBetween={10}
                slidesPerView={"auto"}
                onSlideChange={() => console.log("slide change")}
                onSwiper={(swiper) => console.log(swiper)}
            >
                {gameListLeft.map((item, index) => (
                    <SwiperSlide key={index} className="!w-fit">
                        <button
                            key={index}
                            onClick={() => {
                                console.log(index);
                                path =
                                    index === 0
                                        ? "/"
                                        : `/${gameListLeft[index].gameType}`;
                                dispatch(setNavBar({ index }));
                                navigate(path, { replace: true });
                            }}
                            className={`${
                                index === navIndex
                                    ? "active !bg-[var(--logoutBg)] rounded-md h-[60px]"
                                    : " mr-8 ml-8"
                            } rounded-0 text-[16px] block h-[80px]  items-center justify-center  px-3 `}
                        >
                            <div className="flex justify-center mt-1">
                            <img
                                src={
                                    index === navIndex
                                        ? item.ActiveImg
                                        : item.Img
                                }
                                alt="game show"
                                className={`${
                                    index === navIndex
                                        ? "active !bg-black border-[var(--logout)] mb-1 rounded-xl p-[2px] shadow-lg"
                                        : " bg-black rounded-xl p-[3px] shadow-lg nonhovers mb-2 "
                                } w-[30px] md:w-[30px] h-auto`}
                                
                            />
                            </div>
                            <span
                                className={`${
                                    index === navIndex
                                        ? "text-black"
                                        : "text-[#868686]"
                                } text-[14px] md:text-[16px] font-[700]`}
                            >
                                {item.Text}
                            </span>
                        </button>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
