import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { GameSplide } from "./GameSplide";
import { GameProvider } from "./GameProvider";
import { Banner } from "./Banner";
import { LatestBets } from "./LatestBets";
import * as API from "../services/api";

import glowdot from "../assets/img/glow-dot.svg";
import livecasino from "../assets/img/live-casino.svg";
import gameshow from "../assets/img/game-show.svg";
import NavBar from "./Navbar";

export const HomeList = () => {
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
        LIVE: ["BG", "HORSEBOOK", "PP", "PT", "SEXYBCRT", "SV388", "VENUS"],
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
        VIRTUAL: ["SABA"],
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
        <div className="bg-black">
            <Banner page="lobby" />

            <div className="flex flex-col px-2 md:px-8 w-full gap-4 md:gap-10">
                <NavBar />

                <div className="flex flex-col w-full gap-4 md:gap-10">
                    <GameProvider />
                </div>

                {/* RecentWin*/}
                <GameSplide
                    items={8}
                    icon={() => {
                        return (
                            <img src={glowdot} alt="glowdot" className="mr-2" />
                        );
                    }}
                    title={t("Hits")}
                    games={games.slice(0, 10)}
                />

                {/* NewArrival */}
                <GameSplide items={8} title={t("New")} games={newGames} />

                {/* LiveCasino */}
                <GameSplide
                    items={8}
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
                    items={8}
                    title={t("Featured Slots")}
                    games={slotGames}
                />

                {/* Fishing */}
                <GameSplide
                    items={8}
                    title={t("Fishing")}
                    games={fishingGames}
                />

                {/* GameShow */}
                <GameSplide
                    items={8}
                    icon={() => {
                        return (
                            <img
                                src={gameshow}
                                alt="gameshow"
                                className="mr-2"
                            />
                        );
                    }}
                    title={t("Game Shows")}
                    games={games.slice(11, 21)}
                />

                {/* Top Rates Game */}
                <GameSplide
                    items={8}
                    title={t("Top Rates Game")}
                    games={games.slice(21, 31)}
                />
            </div>

            {/* LatestBets */}
            <div className="flex flex-col px-8 mt-8 w-full gap-10 LatestBets hidden">
                <LatestBets items={8} />
            </div>

            {/* Recommended Game */}
            {/* <GameSplide
          items={8}
          title={t("Recommended Games")}
          games={randomGames}
        /> */}
        </div>
    );
};
