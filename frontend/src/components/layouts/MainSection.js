import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";

import { Lobby } from "../subMainPages/Lobby";
import { Game } from "../subMainPages/Game";
import { Promotion } from "../subMainPages/Promotion";
import { VIP } from "../subMainPages/VIP";
import { Support } from "../subMainPages/Support";
import { Dashboard } from "../Dashboard";

import { FinancialReport } from "../FinalcialReport";
import { Account } from "../Account";
import { MyBet } from "../Mybet";
import { Announce } from "../Announce";
import { GameType } from "../subMainPages/GameType";

export const MainSection = () => {
    const expandMenuState = useSelector((state) => state.openMenuState.value);
    // ${expandMenuState? 'md:ml-[265px]' : 'md:ml-[65px]'}
    return (
        // <div className={`flex home transition-width duration-[300ms] ease-in-out w-full justify-center`}>
        //   <div className='w-[100%] md:w-[84%] flex-1 max-w-[1430px]'>
        //     <div className='flex flex-col px-4 sm:px-10 pt-6'>
        //       <Routes>
        //         <Route path="/" element={<Lobby />} />
        //         <Route path="/:gameType/:platform" element={<Game />} />
        //         <Route path="/promotion" element={<Promotion />} />
        //         <Route path="/vip" element={<VIP />} />
        //         <Route path="/support" element={<Support />} />
        //       </Routes>
        //     </div>
        //   </div>
        // </div>
        <div
            className={`flex home transition-width duration-[300ms] ease-in-out justify-center`}
        >
            {/* <div className="flex-1 w-full max-w-[1430px] sm:mt-16"> */}
            <div className="flex-1 w-full mt-20 sm:mt-16">
                <div className="flex flex-col bg-[var(--bgColorWhite)]">
                    <Routes>
                        <Route path="/" element={<Lobby />} />
                        <Route path="/lobby" element={<Dashboard />} />
                        <Route path="/:gameType/:platform" element={<Game />} />
                        <Route path="/:gameType" element={<GameType />} />
                        <Route
                            path="/THAI"
                            element={<Navigate to="/THAI/ALL" replace />}
                        />

                        <Route
                            path="/VIRTUAL"
                            element={<Navigate to="/VIRTUAL/SABA" replace />}
                        />

                        <Route
                            path="/ESPORTS"
                            element={<Navigate to="/ESPORTS/ALL" replace />}
                        />
                        <Route path="/promotion" element={<Promotion />} />
                        <Route path="/vip" element={<VIP />} />
                        <Route path="/support" element={<Support />} />
                        <Route
                            path="/financial-report"
                            element={<FinancialReport />}
                        />
                        <Route path="/account" element={<Account />} />
                        <Route path="/mybet" element={<MyBet />} />
                        <Route path="/announce" element={<Announce />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};
