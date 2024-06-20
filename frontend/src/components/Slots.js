import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingModal from "./LoadingPage";

import gameg1 from "../assets/img/Lucky Piggy.png";
import gameg2 from "../assets/img/Prosperity Fortune Tree.png";
import gameg3 from "../assets/img/Totem Wonders.png";
import gameg4 from "../assets/img/Alchemy Gold.png";
import gameg5 from "../assets/img/Diner Delights.png";
import gameg6 from "../assets/img/Asgardian Rising.png";
import gameg7 from "../assets/img/Midas Fortune.png";
import gameg8 from "../assets/img/Rave Party Fever.png";
import gameg9 from "../assets/img/Bakery Bonanza.png";
import gameg10 from "../assets/img/Lucky Clover Lady.png";
import gameg11 from "../assets/img/Safari Wilds.png";
import gameg12 from "../assets/img/FortuneCat.png";

import b from "../assets/img/b.svg";

export const Slots = (props) => {
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
            text: "Lucky Piggy",
            gameCode: "PG-SLOT-101",
            gameType: "SLOT",
            platform: "PG",
            hall: "SEXY",
        },
        {
            img: gameg2,
            text: "Prosperity Fortune Tree",
            gameCode: "PG-SLOT-106",
            gameType: "SLOT",
            platform: "PG",
            hall: "SEXY",
        },
        {
            img: gameg3,
            text: "Totem Wonders",
            gameCode: "PG-SLOT-107",
            gameType: "SLOT",
            platform: "PG",
            hall: "SEXY",
        },
        {
            img: gameg4,
            text: "Alchemy Gold",
            gameCode: "PG-SLOT-108",
            gameType: "SLOT",
            platform: "PG",
            hall: "SEXY",
        },
        {
            img: gameg5,
            text: "Diner Delights",
            gameCode: "PG-SLOT-109",
            gameType: "SLOT",
            platform: "PG",
            hall: "SEXY",
        },
        {
            img: gameg6,
            text: "Asgardian Rising",
            gameCode: "PG-SLOT-110",
            gameType: "SLOT",
            platform: "PG",
            hall: "SEXY",
        },
        {
            img: gameg7,
            text: "Midas Fortune",
            gameCode: "PG-SLOT-111",
            gameType: "SLOT",
            platform: "PG",
            hall: "SEXY",
        },
        {
            img: gameg8,
            text: "Rave Party Fever",
            gameCode: "PG-SLOT-113",
            gameType: "SLOT",
            platform: "PG",
            hall: "SEXY",
        },
        {
            img: gameg9,
            text: "Bakery Bonanza",
            gameCode: "PG-SLOT-115",
            gameType: "SLOT",
            platform: "PG",
            hall: "SEXY",
        },
        {
            img: gameg10,
            text: "Lucky Clover Lady",
            gameCode: "PG-SLOT-119",
            gameType: "SLOT",
            platform: "PG",
            hall: "SEXY",
        },
        {
            img: gameg11,
            text: "Safari Wilds",
            gameCode: "PG-SLOT-122",
            gameType: "SLOT",
            platform: "JDB",
            hall: "SEXY",
        },
        {
            img: gameg12,
            text: "FortuneCat",
            gameCode: "YesBingo-SLOT-014",
            gameType: "SLOT",
            platform: "YESBINGO",
            hall: "SEXY",
        },
    ];
    const handleGamePlay = async (game) => {
        setLoading(true);
    
        // Simulate a delay to mimic asynchronous behavior
        await new Promise(resolve => setTimeout(resolve, 1000));
    
        // Simulate a successful response
        const fakeResponse = {
            data: {
                status: "0000",
                session_url: "http://fake-session-url.com",
                desc: "Game started successfully!",
            },
        };
    
        if (fakeResponse.data.status === "0000") {
            window.location.href = fakeResponse.data.session_url;
        } else {
            // Simulating displaying an error message
            toast.error(fakeResponse.data.desc, {
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
    };
    
    // Example usage:
    const gameToPlay = ImagesArray[0]; // Choose a game to play from the ImagesArray
    handleGamePlay(gameToPlay);
    

    // const handleGamePlay = async (game) => {
    //     setLoading(true);
    //     const token = window.localStorage.getItem("token");
    //     const options = {
    //         method: "POST",
    //         url: process.env.REACT_APP_BACKEND + "/api/game/play",
    //         headers: {
    //             "content-type": "application/x-www-form-urlencoded",
    //             "x-auth-token": token,
    //         },
    //         data: {
    //             gameCode: game.gameCode,
    //             gameType: game.gameType,
    //             platform: game.platform,
    //             hall: game.hall,
    //             tid: 1,
    //         },
    //     };

    //     await axios
    //         .request(options)
    //         .then(function (response) {
    //             if (response.data.status === "0000") {
    //                 window.location.href = response.data.session_url;
    //             } else {
    //                 toast.error(response.data.desc, {
    //                     position: "top-right",
    //                     autoClose: 1000,
    //                     hideProgressBar: false,
    //                     closeOnClick: true,

    //                     draggable: true,
    //                     progress: undefined,
    //                     theme: "light",
    //                 });
    //             }
    //             setLoading(false);
    //         })
    //         .catch(function (error) {
    //             console.error(error);
    //             notify();
    //             setLoading(false);
    //         });
    // };

    return (
        <div className="RecentWin arrowareaslider" id="slots">
            {!props.direction && (
                <div className="top flex items-center justify-between mb-4">
                    <h1 className="flex items-center">{t("Featured Slots")}</h1>
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
