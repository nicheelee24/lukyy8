import React from "react";

import NavBar from "../Navbar";
import { GameTypeList } from "../GameTypeList";

export const GameType = () => {
    return (
        <div className="px-1 sm:px-3 pt-6 flex flex-col">
            <NavBar />
            <GameTypeList />
        </div>
    );
};
