import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingModal from "./LoadingPage";

import gameg1 from "../assets/img/thai-hi-lo2.png";
import gameg2 from "../assets/img/belangkai2.png";
import gameg3 from "../assets/img/Dragon-tiger2.png";
import gameg4 from "../assets/img/fish-prawn-crab2.png";
import gameg5 from "../assets/img/vn_fish-prawn-crab.png";
import gameg6 from "../assets/img/taixiu.png";
import gameg7 from "../assets/img/keno.png";
import gameg8 from "../assets/img/NumberMatka.png";
import gameg9 from "../assets/img/CardMatka.png";
import gameg10 from "../assets/img/7 Up 7 Down.png";
import gameshow from "../assets/img/game-show.svg";

export const GameShow = (props) => {
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
            text: "Thai-hi-lo2",
            gameCode: "KM-TABLE-009",
            gameType: "TABLE",
            platform: "KINGMAKER",
            hall: "SEXY",
        },
        {
            img: gameg2,
            text: "Belangkai2",
            gameCode: "KM-TABLE-010",
            gameType: "TABLE",
            platform: "KINGMAKER",
            hall: "SEXY",
        },
        {
            img: gameg3,
            text: "Dragon-tiger2",
            gameCode: "KM-TABLE-011",
            gameType: "TABLE",
            platform: "KINGMAKER",
            hall: "SEXY",
        },
        {
            img: gameg4,
            text: "Fish-prawn-crab2",
            gameCode: "KM-TABLE-013",
            gameType: "TABLE",
            platform: "KINGMAKER",
            hall: "SEXY",
        },
        {
            img: gameg5,
            text: "VN_fish-prawn-crab",
            gameCode: "KM-TABLE-014",
            gameType: "TABLE",
            platform: "KINGMAKER",
            hall: "SEXY",
        },
        {
            img: gameg6,
            text: "taixiu",
            gameCode: "KM-TABLE-017",
            gameType: "TABLE",
            platform: "KINGMAKER",
            hall: "SEXY",
        },
        {
            img: gameg7,
            text: "keno",
            gameCode: "KM-TABLE-018",
            gameType: "TABLE",
            platform: "KINGMAKER",
            hall: "SEXY",
        },
        {
            img: gameg8,
            text: "NumberMatka",
            gameCode: "KM-TABLE-021",
            gameType: "TABLE",
            platform: "KINGMAKER",
            hall: "SEXY",
        },
        {
            img: gameg9,
            text: "CardMatka",
            gameCode: "KM-TABLE-022",
            gameType: "TABLE",
            platform: "KINGMAKER",
            hall: "SEXY",
        },
        {
            img: gameg10,
            text: "7 Up 7 Down",
            gameCode: "KM-TABLE-028",
            gameType: "TABLE",
            platform: "KINGMAKER",
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
        <div className="RecentWin arrowareaslider" id="gameShow">
            {!props.direction && (
                <div className="top flex items-center justify-between mb-4">
                    <h1 className="flex items-center">
                        <img src={gameshow} alt="gameshow" className="mr-2" />
                        {t("Game Shows")}
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
                        perPage: 5,
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
                                                ? "rounded-50 w-[70px] h-[70px]"
                                                : "rounded-tr-xl rounded-tl-xl w-[80px] xl:w-[200px] lg:w-[140px] aspect-square"
                                        }
                                    />
                                    <div className="presentation p-3 justify-between flex flex-col lg:flex-row items-center text-center lg:text-start rounded-bl-xl rounded-br-xl">
                                        <h1 className="w-full h-8 object-cover overflow-hidden">
                                            {EachImage.text}
                                        </h1>
                                        <button>{t("Evolution")}</button>
                                    </div>
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
