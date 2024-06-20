import React from "react";
import { useParams } from "react-router-dom";
import NavBar from "../Navbar";
import { GameList } from "../GameList";
import { GameProvider } from "../GameProvider";

export const Game = () => {
    const { gameType, platform } = useParams();

    return (
        <div className="px-1 sm:px-3 pt-6 flex flex-col">
            {/* <NavBar /> */}
            <GameProvider />
            <span className="text-[var(--textPrimaryColor)]">
                From {gameType} / {platform}
            </span>
            <GameList />
        </div>
    );
};
