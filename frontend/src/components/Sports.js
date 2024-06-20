import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingModal from "./LoadingPage";

import gameg1 from "../assets/img/world cup.png";
import gameg2 from "../assets/img/Shaolin Soccer.png";
import gameg3 from "../assets/img/Speed Winner.png";
import gameg4 from "../assets/img/Super Golf Drive.png";
import gameg5 from "../assets/img/Muay Thai Champion.png";
import gameg6 from "../assets/img/Horsebook.png";
import gameg7 from "../assets/img/ANIMAL RACING.png";
import gameg8 from "../assets/img/HorseRacing.png";
import gameg9 from "../assets/img/Penalty Shootout.png";
import gameg10 from "../assets/img/Virtual Sports.png";

import b from "../assets/img/b.svg";

export const Sports = (props) => {
    const { t } = useTranslation();

    const [loading, setLoading] = useState(false);

    const notify = () =>
        toast.error(t("Connection failed"), {
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
            text: "World Cup",
            gameCode: "JILI-SLOT-063",
            gameType: "SLOT",
            platform: "JILI",
            hall: "SEXY",
        },
        {
            img: gameg2,
            text: "Shaolin Soccer",
            gameCode: "PG-SLOT-046",
            gameType: "SLOT",
            platform: "PG",
            hall: "SEXY",
        },
        {
            img: gameg3,
            text: "Speed Winner",
            gameCode: "PG-SLOT-102",
            gameType: "SLOT",
            platform: "PG",
            hall: "SEXY",
        },
        {
            img: gameg4,
            text: "Super Golf Drive",
            gameCode: "PG-SLOT-118",
            gameType: "SLOT",
            platform: "PG",
            hall: "SEXY",
        },
        {
            img: gameg5,
            text: "Muay Thai Champion",
            gameCode: "PG-SLOT-039",
            gameType: "SLOT",
            platform: "PG",
            hall: "SEXY",
        },
        {
            img: gameg6,
            text: "Horsebook",
            gameCode: "HRB-LIVE-001",
            gameType: "LIVE",
            platform: "HORSEBOOK",
            hall: "SEXY",
        },
        {
            img: gameg7,
            text: "ANIMAL RACING",
            gameCode: "FC-SLOT-011",
            gameType: "SLOT",
            platform: "FC",
            hall: "SEXY",
        },
        {
            img: gameg8,
            text: "HorseRacing",
            gameCode: "KM-TABLE-048",
            gameType: "TABLE",
            platform: "KINGMAKER",
            hall: "SEXY",
        },
        {
            img: gameg9,
            text: "Penalty Shootout",
            gameCode: "PP-EGAME-002",
            gameType: "EGAME",
            platform: "PP",
            hall: "SEXY",
        },
        {
            img: gameg10,
            text: "Virtual Sports",
            gameCode: "SABA-VIRTUAL-001",
            gameType: "VIRTUAL",
            platform: "SABA",
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
        <div className="RecentWin arrowareaslider" id="sports">
            {!props.direction && (
                <div className="top flex items-center justify-between mb-4">
                    <h1 className="flex items-center">{t("Sports")}</h1>
                </div>
            )}

            <div className="slider-wrapper-recent mx-auto">
                <Splide
                    className={
                        props.direction
                            ? "mx-auto SliderAreaFirst"
                            : "mt-8 mb-8 SliderAreaFirst"
                    }
                    options={{
                        gap: 15,
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
                            onClick={() => handleGamePlay(EachImage)}
                        >
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
                                            ? "rounded-[50%] w-[70px] h-[70px] "
                                            : "rounded-tr-xl rounded-tl-xl w-[80px] xl:w-[200px] lg:w-[140px] aspect-square"
                                    }
                                />
                                {!props.direction && (
                                    <div className="presentation p-3 justify-between flex flex-col lg:flex-row items-center text-center lg:text-start rounded-bl-xl rounded-br-xl">
                                        <h1
                                            className={`${
                                                props.direction ? "h-4" : "h-8"
                                            }'w-full  object-cover overflow-hidden'`}
                                        >
                                            {EachImage.text}
                                        </h1>
                                        <img src={b} alt="tag" />
                                    </div>
                                )}
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
