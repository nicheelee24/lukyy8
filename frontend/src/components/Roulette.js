import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingModal from "./LoadingPage";

import gameg1 from "../assets/img/Roulette.png";
import gameg2 from "../assets/img/European Roulette.png";
import gameg3 from "../assets/img/Chinese Treasures.png";
import gameg4 from "../assets/img/Cinderellas Ball.png";
import gameg5 from "../assets/img/Crazy Genie.png";
import gameg6 from "../assets/img/Devils Number.png";
import gameg7 from "../assets/img/Divine Ways.png";
import gameg8 from "../assets/img/Dragon is Fire.png";
import gameg9 from "../assets/img/Elven Magic.png";
import gameg10 from "../assets/img/Emerald Diamond.png";
import gameg11 from "../assets/img/Epic Journey.png";
import gameg12 from "../assets/img/Fortune Charm.png";

import b from "../assets/img/b.svg";

export const Roulette = (props) => {
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
            text: "Roulette",
            gameCode: "VN-LIVE-009",
            gameType: "LIVE",
            platform: "VENUS",
            hall: "SEXY",
        },
        {
            img: gameg2,
            text: "European Roulette",
            gameCode: "RT-TABLE-002",
            gameType: "TABLE",
            platform: "RT",
            hall: "SEXY",
        },
        {
            img: gameg3,
            text: "Chinese Treasures",
            gameCode: "RT-SLOT-004",
            gameType: "SLOT",
            platform: "RT",
            hall: "SEXY",
        },
        {
            img: gameg4,
            text: "Cinderella's Ball",
            gameCode: "RT-SLOT-005",
            gameType: "SLOT",
            platform: "RT",
            hall: "SEXY",
        },
        {
            img: gameg5,
            text: "Crazy Genie",
            gameCode: "RT-SLOT-006",
            gameType: "SLOT",
            platform: "RT",
            hall: "SEXY",
        },
        {
            img: gameg6,
            text: "Devil's Number",
            gameCode: "RT-SLOT-007",
            gameType: "SLOT",
            platform: "RT",
            hall: "SEXY",
        },
        {
            img: gameg7,
            text: "Divine Ways",
            gameCode: "RT-SLOT-008",
            gameType: "SLOT",
            platform: "RT",
            hall: "SEXY",
        },
        {
            img: gameg8,
            text: "Dragon is Fire",
            gameCode: "JRT-SLOT-009",
            gameType: "SLOT",
            platform: "RT",
            hall: "SEXY",
        },
        {
            img: gameg9,
            text: "Elven Magic",
            gameCode: "RT-SLOT-012",
            gameType: "SLOT",
            platform: "RT",
            hall: "SEXY",
        },
        {
            img: gameg10,
            text: "Emerald Diamond",
            gameCode: "RT-SLOT-013",
            gameType: "SLOT",
            platform: "RT",
            hall: "SEXY",
        },
        {
            img: gameg11,
            text: "Epic Journey",
            gameCode: "RT-SLOT-014",
            gameType: "SLOT",
            platform: "RT",
            hall: "SEXY",
        },
        {
            img: gameg12,
            text: "Fortune Charm",
            gameCode: "RT-SLOT-019",
            gameType: "SLOT",
            platform: "RT",
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
        <div className="RecentWin arrowareaslider" id="roulette">
            {!props.direction && (
                <div className="top flex items-center justify-between mb-4">
                    <h1 className="flex items-center">Roulette</h1>
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
                                            ? "rounded-[50%] w-[70px] h-[70px]"
                                            : "rounded-tr-lg rounded-tl-lg w-[80px] xl:w-[200px] lg:w-[140px] aspect-square"
                                    }
                                />
                                {!props.direction && (
                                    <div className="presentation p-3 justify-between flex flex-col lg:flex-row items-center text-center lg:text-start rounded-bl-lg rounded-br-lg">
                                        <h1 className="w-full h-8 object-cover overflow-hidden">
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
