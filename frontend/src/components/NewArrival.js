import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingModal from "./LoadingPage";

import gameg1 from "../assets/img/Honey Trap of Diao Chan.png";
import gameg2 from "../assets/img/Hood vs Wolf.png";
import gameg3 from "../assets/img/Legend of Hou Yi.png";
import gameg4 from "../assets/img/Lucky Fortune Cat.png";
import gameg5 from "../assets/img/Ganesha Gold.png";
import gameg6 from "../assets/img/Crypto Gold.png";
import gameg7 from "../assets/img/Supermarket Spree.png";
import gameg8 from "../assets/img/Ice Land.png";
import gameg9 from "../assets/img/Treasure Mine.png";
import gameg10 from "../assets/img/Vault Of Anubis.png";
import gameg11 from "../assets/img/Four Treasures.png";
import gameg12 from "../assets/img/5 Lions Gold.png";

import b from "../assets/img/b.svg";

export const NewArrival = () => {
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
            text: "Honey Trap of Diao Chan",
            gameCode: "PG-SLOT-001",
            gameType: "SLOT",
            platform: "PG",
            hall: "SEXY",
        },
        {
            img: gameg2,
            text: "Hood vs Wolf",
            gameCode: "PG-SLOT-009",
            gameType: "SLOT",
            platform: "PG",
            hall: "SEXY",
        },
        {
            img: gameg3,
            text: "Legend of Hou Yi",
            gameCode: "PG-SLOT-018",
            gameType: "SLOT",
            platform: "PG",
            hall: "SEXY",
        },
        {
            img: gameg4,
            text: "Lucky Fortune Cat",
            gameCode: "RT-SLOT-039",
            gameType: "SLOT",
            platform: "RT",
            hall: "SEXY",
        },
        {
            img: gameg5,
            text: "Ganesha Gold",
            gameCode: "PG-SLOT-026",
            gameType: "SLOT",
            platform: "PG",
            hall: "PG",
        },
        {
            img: gameg6,
            text: "Crypto Gold",
            gameCode: "PG-SLOT-072",
            gameType: "SLOT",
            platform: "PG",
            hall: "SEXY",
        },
        {
            img: gameg7,
            text: "Supermarket Spree",
            gameCode: "PG-SLOT-084",
            gameType: "SLOT",
            platform: "PG",
            hall: "SEXY",
        },
        {
            img: gameg8,
            text: "Ice Land",
            gameCode: "P8-SLOT-018",
            gameType: "SLOT",
            platform: "PLAY8",
            hall: "SEXY",
        },
        {
            img: gameg9,
            text: "Treasure Mine",
            gameCode: "RT-SLOT-081",
            gameType: "SLOT",
            platform: "RT",
            hall: "SEXY",
        },
        {
            img: gameg10,
            text: "Vault Of Anubis",
            gameCode: "RT-SLOT-100",
            gameType: "SLOT",
            platform: "RT",
            hall: "SEXY",
        },
        {
            img: gameg11,
            text: "Four Treasures",
            gameCode: "JDB-SLOT-017",
            gameType: "SLOT",
            platform: "JDB",
            hall: "SEXY",
        },
        {
            img: gameg12,
            text: "5 Lions Gold",
            gameCode: "PP-SLOT-080",
            gameType: "SLOT",
            platform: "PP",
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
        <div className="RecentWin arrowareaslider" id="newArrival">
            <div className="top flex items-center justify-between mb-4">
                <h1 className="flex items-center">{t("New")}</h1>
            </div>

            <div className="slider-wrapper-recent">
                <Splide
                    className="mt-8 mb-8 SliderAreaFirst"
                    options={{
                        gap: 10,
                        arrows: true,
                        pagination: false,
                        perPage: 5,
                    }}
                >
                    {ImagesArray.map((EachImage, key) => (
                        <SplideSlide
                            key={key}
                            onClick={() => (handleGamePlay(EachImage), notify)}
                        >
                            <div className="card cursor-pointer hover:border-b-4 hover:border-b-[#469711] pb-4 hover:pb-0  rounded-lg">
                                <img
                                    src={EachImage.img}
                                    alt={`slider ${key + 1}`}
                                    className="rounded-tr-lg rounded-tl-lg w-[80px] xl:w-[200px] lg:w-[140px] aspect-square"
                                />
                                <div className="presentation p-3 justify-between flex flex-col lg:flex-row items-center text-center lg:text-start rounded-bl-lg rounded-br-lg">
                                    <h1 className="w-full h-8 object-cover overflow-hidden">
                                        {EachImage.text}
                                    </h1>
                                    <img src={b} alt="tag" />
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
