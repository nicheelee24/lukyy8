import React, { useState } from "react";
import axios from "axios";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingModal from "./LoadingPage";

import gameg1 from "../assets/img/Royal Fishing.png";
import gameg2 from "../assets/img/Bombing Fishing.png";
import gameg3 from "../assets/img/Jackpot Fishing.png";
import gameg4 from "../assets/img/Happy Fishing.png";
import gameg5 from "../assets/img/Mega Fishing.png";
import gameg6 from "../assets/img/Boom Legend.png";
import gameg7 from "../assets/img/All-star Fishing.png";
import gameg8 from "../assets/img/Dinosaur Tycoon II.png";
import gameg9 from "../assets/img/Dragon Fortune.png";

export const Fishing = (props) => {
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
            text: "Royal Fishing",
            gameCode: "JILI-FISH-001",
            gameType: "FH",
            platform: "JILI",
            hall: "SEXY",
        },
        {
            img: gameg2,
            text: "Bombing Fishing",
            gameCode: "JILI-FISH-002",
            gameType: "FH",
            platform: "JILI",
            hall: "SEXY",
        },
        {
            img: gameg3,
            text: "Jackpot Fishing",
            gameCode: "JILI-FISH-003",
            gameType: "FH",
            platform: "JILI",
            hall: "SEXY",
        },
        {
            img: gameg4,
            text: "Happy Fishing",
            gameCode: "JILI-FISH-005",
            gameType: "FH",
            platform: "JILI",
            hall: "SEXY",
        },
        {
            img: gameg5,
            text: "Mega Fishing",
            gameCode: "JILI-FISH-007",
            gameType: "FH",
            platform: "JILI",
            hall: "SEXY",
        },
        {
            img: gameg6,
            text: "Boom Legend",
            gameCode: "JILI-FISH-008",
            gameType: "FH",
            platform: "JILI",
            hall: "SEXY",
        },
        {
            img: gameg7,
            text: "All-star Fishing",
            gameCode: "JILI-FISH-009",
            gameType: "FH",
            platform: "JILI",
            hall: "SEXY",
        },
        {
            img: gameg8,
            text: "Dinosaur Tycoon II",
            gameCode: "JILI-FISH-011",
            gameType: "FH",
            platform: "JILI",
            hall: "SEXY",
        },
        {
            img: gameg9,
            text: "Dragon Fortune",
            gameCode: "JILI-FISH-006",
            gameType: "FH",
            platform: "JILI",
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
        <div className="RecentWin arrowareaslider" id="fishing">
            {!props.direction && (
                <div className="top flex items-center justify-between mb-4">
                    <h1 className="flex items-center">Fishing</h1>
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
                                            : "rounded-tr-xl rounded-tl-xl w-[80px] xl:w-[200px] lg:w-[140px] aspect-square"
                                    }
                                    style={{
                                        aspectRatio: "1 / 1",
                                    }}
                                />
                                {!props.direction && (
                                    <div className="presentation p-3 justify-between flex flex-col lg:flex-row items-center text-center lg:text-start rounded-bl-xl rounded-br-xl">
                                        <h1 className="w-full h-8 object-cover overflow-hidden">
                                            {EachImage.text}
                                        </h1>
                                        <button>Evolution</button>
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
