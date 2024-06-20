import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import glowdot from "../assets/img/glow-dot.svg";
import livecasino from "../assets/img/live-casino.svg";
import gameshow from "../assets/img/game-show.svg";
import NavBar from "./Navbar";

import RegisterImage from "../assets/img/dashboard/register.png";
import DepositImage from "../assets/img/dashboard/deposit.png";
import PlayWinImage from "../assets/img/dashboard/playwin.png";
import { GameSplide } from "./GameSplide";
import { LatestBets } from "./LatestBets";
import { Banner } from "./Banner";
import * as API from "../services/api";

import { Splide, SplideSlide } from "@splidejs/react-splide";

export const Dashboard = () => {
    const { t } = useTranslation();

    const [games, setGames] = useState([]);
    const [newGames, setNewGames] = useState([]);
    const [liveGames, setLiveGames] = useState([]);
    const [slotGames, setSlotGames] = useState([]);
    const [fishingGames, setFishingGames] = useState([]);
    const [randomGames, setRandomGames] = useState([]);

    const [selectedGame, setSelectedGame] = useState("Games");
    const [providers, setProviders] = useState([]);

    const GAMES_PROVIDERS = {
        EGAME: ["FC", "JDB", "PP", "SPADE", "YL"],
        ESPORTS: ["E1SPORT", "SABA"],
        FISH: ["FASTSPIN", "FC", "JDB", "JILI", "SPADE", "YL"],
        LIVE: [
            "BG",
            "HORSEBOOK",
            "PP",
            "PT",
            "SEXYBCRT",
            "EVOLUTION",
            "SV388",
            "VENUS",
        ],
        // LOTTO: ["VRLOTTO"],
        SLOT: [
            "DRAGOONSOFT",
            "FASTSPIN",
            "FC",
            "JDB",
            "JILI",
            "KINGMAKER",
            "PG",
            "PLAY8",
            "PP",
            "PT",
            "RT",
            "SPADE",
            "YESBINGO",
        ],
        TABLE: ["JILI", "KINGMAKER", "LUCKYPOKER", "LUDO", "PG", "RT"],
        // VIRTUAL: ["SABA"],
    };

    useEffect(() => {
        if (selectedGame !== "Games" && GAMES_PROVIDERS[selectedGame]) {
            setProviders(GAMES_PROVIDERS[selectedGame]);
        } else {
            setProviders([]);
        }
    }, [selectedGame]);

    const fetchData = async () => {
        let res = await API.getHome();
        if (res.data.status === "0000") {
            setGames(res.data.games);
        }

        res = await API.getNew();
        if (res.data.status === "0000") {
            setNewGames(res.data.games);
        }

        res = await API.getRandom({ gameType: "LIVE" });
        if (res.data.status === "0000") {
            setLiveGames(res.data.games);
        }

        res = await API.getRandom({ gameType: "SLOT" });
        if (res.data.status === "0000") {
            setSlotGames(res.data.games);
        }

        res = await API.getRandom({ gameType: "FH" });
        if (res.data.status === "0000") {
            setFishingGames(res.data.games);
        }

        res = await API.getRandom({ gameType: "ALL" });
        if (res.data.status === "0000") {
            setRandomGames(res.data.games);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <Banner />
            {/* RecentWin*/}
            <GameSplide
                items={6}
                icon={() => {
                    return <img src={glowdot} alt="glowdot" className="mr-2" />;
                }}
                title={t("Hits")}
                games={games.slice(0, 10)}
            />

            <div className="flex flex-col how-it-works">
                <div className="mt-9 text-center text-[#99FF15] text-[32px] leading-[48px]">
                    How it works
                </div>
                <div className="mt-2 text-[60px] leading-[78px] text-white text-center">
                    It's Really Easy!
                </div>
                <div className="mt-10 mb-5 px-[5%] max-w-full mx-auto">
                    <Splide
                        className="mx-auto"
                        options={{
                            type: "loop",
                            gap: 40,
                            arrows: false,
                            pagination: false,
                            perPage: 3,
                            // breakpoints: {
                            //   360: {
                            //     perPage: 1
                            //   },
                            //   768: {
                            //     perPage: 2
                            //   }
                            // }
                        }}
                    >
                        <SplideSlide>
                            <div className="flex flex-col items-center w-full">
                                <img
                                    src={RegisterImage}
                                    className="w-[182px] h-[196px] mt-[30px]"
                                />
                                <div className="mt-[14px] text-[26px] leading-10 text-white font-[700] text-center">
                                    Register
                                </div>
                                <div className="mt-[14px] text-[18px] leading-[18px] text-[#CFD2DA] text-center">
                                    Instant registration in less than 5mins
                                </div>
                            </div>
                        </SplideSlide>

                        <SplideSlide>
                            <div className="flex flex-col items-center w-full">
                                <img
                                    src={DepositImage}
                                    className="w-[182px] h-[196px] mt-[30px]"
                                />
                                <div className="mt-[14px] text-[26px] leading-10 text-white font-[700] text-center">
                                    Register
                                </div>
                                <div className="mt-[14px] text-[18px] leading-[18px] text-[#CFD2DA] text-center">
                                    Instant registration in less than 5mins
                                </div>
                            </div>
                        </SplideSlide>

                        <SplideSlide>
                            <div className="flex flex-col items-center  w-full">
                                <img
                                    src={PlayWinImage}
                                    className="w-[182px] h-[196px] mt-[30px]"
                                />
                                <div className="mt-[14px] text-[26px] leading-10 text-white font-[700] text-center">
                                    Play n Win
                                </div>
                                <div className="mt-[14px] text-[18px] leading-[18px] text-[#CFD2DA] text-center">
                                    Instant registration in less than 5mins
                                </div>
                            </div>
                        </SplideSlide>
                    </Splide>
                </div>
            </div>

            {/* NewArrival */}
            <GameSplide items={6} title={t("New")} games={newGames} />

            {/* LiveCasino */}
            <GameSplide
                items={6}
                icon={() => {
                    return (
                        <img
                            src={livecasino}
                            alt="livecasino"
                            className="mr-2"
                        />
                    );
                }}
                title={t("Live Casino")}
                games={liveGames}
            />

            {/* Slots */}
            <GameSplide
                items={6}
                title={t("Featured Slots")}
                games={slotGames}
            />

            {/* Fishing */}
            <GameSplide items={6} title={t("Fishing")} games={fishingGames} />

            {/* GameShow */}
            <GameSplide
                items={6}
                icon={() => {
                    return (
                        <img src={gameshow} alt="gameshow" className="mr-2" />
                    );
                }}
                title={t("Game Shows")}
                games={games.slice(11, 21)}
            />

            {/* Top Rates Game */}
            <GameSplide
                items={6}
                title={t("Top Rates Game")}
                games={games.slice(21, 31)}
            />

            {/* LatestBets */}
            <LatestBets items={6} />

            {/* Recommended Game */}
            <GameSplide
                items={6}
                title={t("Recommended Games")}
                games={randomGames}
            />
        </div>
    );
};
