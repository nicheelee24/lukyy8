import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroller";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";

import * as API from "../services/api";

import { SplideSlide } from "@splidejs/react-splide";
import { ToastContainer, toast } from "react-toastify";
import LoadingModal from "./LoadingPage";

import PlaceHolderImage from "../assets/img/gamePlaceholder.webp";
import "react-lazy-load-image-component/src/effects/blur.css";
import {
    EGame,
    FishingGame,
    LiveCasino,
    Lotto,
    Slot,
    Sport,
    Table,
    Thai,
    Virtual,
} from "../config";

import GoldenBorder from "../assets/golden-border.png";

export const GameTypeList = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const isLogin = useSelector((state) => state.loginState.isLogin);
    const [items, setItems] = useState([]); // imageUrl, platform
    const [isLoading, setIsLoading] = useState(false);
    const { gameType } = useParams();

    useEffect(() => {
        switch (gameType) {
            case "SLOT":
                setItems(Slot);
                break;
            case "LIVE":
                setItems(LiveCasino);
                break;
            case "TABLE":
                setItems(Table);
                break;
            case "ESPORTS":
                setItems(Sport);
                break;
            case "EGAME":
                setItems(EGame);
                break;
            case "FH":
                setItems(FishingGame);
                break;
            case "THAI":
                setItems(Thai);
                break;
            // case "LOTTO":
            //     setItems(Lotto);
            //     break;
            case "BINGO":
                break;
            case "VIRTUAL":
                setItems(Virtual);
                break;
        }
    }, [gameType]);

    const notifyLogin = () =>
        toast.error(t("Login first"), {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,

            draggable: true,
            progress: undefined,
            theme: "light",
        });

    return (
        <>
            {isLoading && <LoadingModal />}
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
            <div className="flex game-list flex-wrap mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 xxlg:grid-cols-5 2xl:grid-cols-6 xxlg:grid-cols-8 gap-1 lg:gap-4">
                {items &&
                    items.map((item, index) => (
                        <div
                            key={item._id}
                            onClick={() => {
                                navigate(`/${gameType}/${item.platform}`);
                            }}
                            className="m-auto w-full"
                        >
                            <div className="rounder">
                            <div className="relative w-full overflow-hidden  ">
                                <LazyLoadImage
                                    src={item.imageUrl}
                                    srcSet={`${item.imageUrl} 300w, ${item.imageUrl} 1024w`}
                                    sizes="(max-width: 450px) 300w, 1024w"
                                    placeholderSrc={
                                        process.env.REACT_APP_BACKEND +
                                        "/images/" +
                                        "gamePlaceholder.webp"
                                    }
                                    effect="blur"
                                    wrapperProps={{
                                        className:
                                            "flex justify-center items-center w-full h-full",
                                    }}
                                    alt={`slider ${index + 1}`}
                                    className="w-full h-full object-cover rounded-t-xl"
                                    
                                />
                            </div>
                            <div className="bg-[var(--secondaryColor)] justify-between flex flex-col items-center text-center lg:text-center rounded-b-xl">
                                <span className="text-[0.7rem] md:text-[1rem] whitespace-nowrap truncate text-black-800 font-extrabold">
                                    {item.platform}
                                </span>
                            </div>
                        </div>
                        </div>
                    ))}
            </div>
        </>
    );
};
