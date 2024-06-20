import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingModal from "./LoadingPage";

import gameg1 from "../assets/img/Roulette.png";
import gameg2 from "../assets/img/CasinoWar.png";
import gameg3 from "../assets/img/Prosperity Fortune Tree.png";
import gameg4 from "../assets/img/Honey Trap of Diao Chan.png";
import gameg5 from "../assets/img/belangkai2.png";
import info from "../assets/img/info.svg";

export const RecommendedGames = () => {
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
            game: gameg1,
            heading: "Roulette",
            gameCode: "BG-LIVE-003",
            gameType: "LIVE",
            platform: "BG",
            hall: null,
        },
        {
            game: gameg2,
            heading: "CasinoWar",
            gameCode: "BG-LIVE-014",
            gameType: "Live",
            platform: "BG",
            hall: "SEXY",
        },
        {
            game: gameg3,
            heading: "Prosperity Fortune Tree",
            gameCode: "PG-SLOT-106",
            gameType: "SLOT",
            platform: "PG",
            hall: "SEXY",
        },
        {
            game: gameg4,
            heading: "Honey Trap of Diao Chan",
            gameCode: "PG-SLOT-001",
            gameType: "SLOT",
            platform: "PG",
            hall: "SEXY",
        },
        {
            game: gameg5,
            heading: "Belangkai2",
            gameCode: "KM-TABLE-010",
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
        <div className="RecentWin TopRatesGame" id="recommendedGames">
            <div className="top flex items-center justify-between ">
                <h1 className="flex items-center">{t("Recommended Games")}</h1>
                <a className="see-all" href="/">
                    {t("View All")}
                </a>
            </div>

            <div className="slider-wrapper-recent">
                <Splide
                    className="mt-8 SliderAreaFirst "
                    options={{
                        gap: 10,
                        arrows: false,
                        pagination: false,
                        perPage: 5,
                    }}
                >
                    {ImagesArray.map((EachObj, key) => (
                        <SplideSlide key={key}>
                            <div className="card ">
                                <img
                                    src={EachObj.game}
                                    alt={`slider ${key + 1}`}
                                    className="rounded-tr-lg rounded-tl-lg w-[80px] xl:w-[200px] lg:w-[140px] aspect-square"
                                />
                                <div className="presentation p-3 rounded-bl-lg rounded-br-lg">
                                    <div className="presentation p-3 justify-between flex flex-col lg:flex-row items-center text-center lg:text-start rounded-bl-lg rounded-br-lg">
                                        <h1 className="w-full h-8 object-cover overflow-hidden">
                                            {EachObj.heading}
                                        </h1>
                                        <img src={info} alt="info" />
                                    </div>

                                    <button
                                        className="h-6 rounded-lg text-xs sm:text-black text-[transparent]"
                                        onClick={() => (
                                            handleGamePlay(EachObj), notify
                                        )}
                                    >
                                        {t("Play Now")}
                                    </button>
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
