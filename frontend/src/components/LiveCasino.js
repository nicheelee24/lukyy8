import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingModal from "./LoadingPage";

import gameg1 from "../assets/img/l1.png";
import gameg2 from "../assets/img/l2.png";
import gameg3 from "../assets/img/l3.png";
import gameg4 from "../assets/img/CasinoWar.png";
import gameg5 from "../assets/img/PokerGo.png";
import gameg6 from "../assets/img/Lucky five.png";
import gameg7 from "../assets/img/DiamondDeal.png";
import gameg8 from "../assets/img/Mahjong Wins.png";
import gameg9 from "../assets/img/Baccarat Deluxe.png";
import gameg10 from "../assets/img/Fortune Rabbit.png";

import livecasino from "../assets/img/live-casino.svg";

export const LiveCasino = (props) => {
    const { t } = useTranslation();

    const [loading, setLoading] = useState(false);

    const notify = () =>
        toast.error("Connection failed.", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,

            draggable: true,
            progress: undefined,
            theme: "light",
        });

    const ImagesArray = [
        {
            img: gameg1,
            text: "Roulette",
            gameCode: "BG-LIVE-003",
            gameType: "LIVE",
            platform: "BG",
            hall: null,
        },
        {
            img: gameg2,
            text: "SicBo",
            gameCode: "BG-LIVE-004",
            gameType: "Live",
            platform: "BG",
            hall: "SEXY",
        },
        {
            img: gameg3,
            text: "Baccarat",
            gameCode: "BG-LIVE-002",
            gameType: "Live",
            platform: "BG",
            hall: "SEXY",
        },
        {
            img: gameg4,
            text: "CasinoWar",
            gameCode: "BG-LIVE-014",
            gameType: "Live",
            platform: "BG",
            hall: "SEXY",
        },
        {
            img: gameg5,
            text: "PokerGo",
            gameCode: "YL-EGAME-009",
            gameType: "EGAME",
            platform: "YL",
            hall: "SEXY",
        },
        {
            img: gameg6,
            text: "Lucky five",
            gameCode: "YL-EGAME-008",
            gameType: "EGAME",
            platform: "YL",
            hall: "SEXY",
        },
        {
            img: gameg7,
            text: "DiamondDeal",
            gameCode: "YL-EGAME-010",
            gameType: "EGAME",
            platform: "YL",
            hall: "SEXY",
        },
        {
            img: gameg8,
            text: "Mahjong Wins",
            gameCode: "PP-SLOT-372",
            gameType: "SLOT",
            platform: "PP",
            hall: "SEXY",
        },
        {
            img: gameg9,
            text: "Baccarat Deluxe",
            gameCode: "PG-TABLE-001",
            gameType: "TABLE",
            platform: "PG",
            hall: "SEXY",
        },
        {
            img: gameg10,
            text: "Fortune Rabbit",
            gameCode: "PG-SLOT-112",
            gameType: "SLOT",
            platform: "PG",
            hall: "SEXY",
        },
    ];

    const handleGamePlay = async (game) => {
        setLoading(true);
        const token = window.localStorage.getItem("token");
        const options = {
            method: "POST",
            url: process.env.REACT_APP_BACKEND + "/api/game/play",
            headers: {
                "content-type": "application/x-www-form-urlencoded",
                "x-auth-token": token,
            },
            data: {
                gameCode: game.gameCode,
                gameType: game.gameType,
                platform: game.platform,
                hall: game.hall,
                tid: 1,
            },
        };

        await axios
            .request(options)
            .then(function (response) {
                if (response.data.status === "0000") {
                    window.location.href = response.data.session_url;
                } else {
                    toast.error(response.data.desc, {
                        position: "top-right",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,

                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }
                setLoading(false);
            })
            .catch(function (error) {
                console.error(error);
                notify();
                setLoading(false);
            });
    };

    return (
        <div className="RecentWin arrowareaslider" id="liveCasino">
            {!props.direction && (
                <div className="top flex items-center justify-between mb-4">
                    <h1 className="flex items-center">
                        <img
                            src={livecasino}
                            alt="livecasino"
                            className="mr-2"
                        />
                        {t("Live Casino")}
                    </h1>
                </div>
            )}

            <div className="slider-wrapper-recent">
                <Splide
                    className={
                        props.direction
                            ? "mx-auto SliderAreaFirst"
                            : "mt-8 mb-8 SliderAreaFirst"
                    }
                    options={{
                        gap: 10,
                        arrows: true,
                        pagination: false,
                        perPage: props.items,
                        height: props.height,
                        direction: props.direction,
                    }}
                >
                    {ImagesArray.map((EachImage, key) => (
                        <SplideSlide
                            key={key}
                            onClick={() => (handleGamePlay(EachImage), notify)}
                        >
                            <div className="rounder">
                            <div
                                className={
                                    props.direction
                                        ? "card cursor-pointer hover:border-b-4 hover:border-b-[#469711] rounded-full pb-4 hover:pb-0"
                                        : "card cursor-pointer hover:border-b-4 hover:border-b-[#469711] pb-4 hover:pb-0  rounded-lg"
                                }
                            >
                                <img
                                    src={EachImage.img}
                                    alt={`slider ${key + 1}`}
                                    className={
                                        props.direction
                                            ? "rounded-[50%] w-[70px] h-[70px]"
                                            : "rounded-tr-xl rounded-tl-xl w-[80px] xl:w-[200px] lg:w-[140px] aspect-square"
                                    }
                                />
                                {!props.direction && (
                                    <div className="presentation p-3 justify-between flex flex-col lg:flex-row items-center text-center lg:text-start rounded-bl-xl rounded-br-xl">
                                        <h1 className="w-full h-8 object-cover overflow-hidden">
                                            {EachImage.text}
                                        </h1>
                                        <button>{t("Pragmatic Play")}</button>
                                    </div>
                                )}
                            </div>
                            </div>
                        </SplideSlide>
                    ))}
                </Splide>
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
            {loading && <LoadingModal />}
        </div>
    );
};
