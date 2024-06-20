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

export const GameList = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const isLogin = useSelector((state) => state.loginState.isLogin);
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const [itemCount, setItemCount] = useState(21);
    const { gameType, platform } = useParams();

    const [selectedGame, setSelectedGame] = useState("Games");
    const [selectedProvider, setSelectedProvider] = useState("Providers");

    const [providers, setProviders] = useState([]);

    const INIT_FETCH = 0;

    const GAMES_PROVIDERS = {
        EGAME: ["FC", "JDB", "PP", "SPADE", "YL"],
        ESPORTS: ["E1SPORT", "SABA"],
        FH: ["FASTSPIN", "FC", "JDB", "JILI", "SPADE", "YL"],
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
        // VIRTUAL: ["SABA"],
    };

    useEffect(() => {
        if (selectedGame !== "Games" && GAMES_PROVIDERS[selectedGame]) {
            setProviders(GAMES_PROVIDERS[selectedGame]);
        } else {
            setProviders([]);
        }

        console.log("Selected Game:", selectedGame);
        console.log("Selected Provider:", selectedProvider);

        setItems([]);
        setPage(1);
        setHasMore(true);

        if (selectedGame == "Games" || selectedGame == "ALL") {
            // fetchDataByParams(selectedGame, selectedProvider)
        } else if (selectedProvider == "Providers") {
            // fetchDataByParams(selectedGame, "ALL")
            // navigate(`/${selectedGame}/ALL`, { replace: true });
        } else {
            // fetchDataByParams(selectedGame, selectedProvider)
            navigate(`/${selectedGame}/${selectedProvider}`, { replace: true });
        }

        // Games  Providers
    }, [selectedGame, selectedProvider]);

    useEffect(() => {
        // debugger
        setItems([]);
        setPage(1);

        setHasMore(true);
        setSelectedGame(gameType);

        fetchData(INIT_FETCH);
    }, [gameType, platform]);

    // useEffect(() => {
    //     if(items.length <= 20)
    //         setHasMore(false)
    // }, [])

    const fetchDataByParams = async (gameType1, platform1) => {
        const response = await API.getGames({
            page: 1,
            limit: 21,
            gameType: gameType1,
            platform: platform1,
        });
        if (response.data.status === "0000") {
            if (response.data.games.length === 0) {
                setHasMore(false);
            } else {
                // setItems([...items, ...response.data.games]);
                setItems(response.data.games);
                // setPage(page + 1);
            }
        }
    };

    const fetchData = async (FETCH_STATUS = 1) => {
        let curPage = FETCH_STATUS == INIT_FETCH ? 1 : page;

        const response = await API.getGames({
            page: curPage,
            limit: 21,
            gameType,
            platform,
        });
        if (response.data.status === "0000") {
            if (response.data.games.length === 0) {
                setHasMore(false);
            } else {
                if (FETCH_STATUS != INIT_FETCH) {
                    setItems([...items, ...response.data.games]);
                    setPage(page + 1);
                } else {
                    // When INIT_FETCH
                    setItems(response.data.games);
                    setPage(2);
                }
            }
        }
    };

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

    const handleGamePlay = async (item) => {
        if (!isLogin) {
            notifyLogin();
            return;
        }

        setIsLoading(true);
        const res = await API.getGamePlayUrl(item._id);
        setIsLoading(false);
        if (res.data.status === "0000") {
            // window.open(res.data.session_url, "", "width=800, height=800");
            // window.open(res.data.session_url, "_blank");
            window.open(
                res.data.session_url,
                "",
                `width=${window.outerWidth}, height=${window.outerHeight}`
            );
        } else {
            toast.error(res.data.desc, {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,

                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    };

    const handleBeforeLoad = (e) => {
        debugger;
        e.target.classList.add("image-blur");
    };

    const handleImageLoad = (e) => {
        e.target.classList.remove("image-blur");
        e.target.classList.add("image-loaded");
    };

    const handleSelectChange = (event) => {
        const { id, value } = event.target;

        if (id === "game-select") {
            setSelectedGame(value);
        } else if (id === "provider-select") {
            setSelectedProvider(value);
        }
        // Now you can use both selectedGame and selectedProvider values
    };

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
            <div className="flex gap-2 mb-6 md:hidden p-1">
                <select
                    id="game-select"
                    className="bg-[var(--secondaryColor)] text-white-800 text-sm rounded-lg focus:ring-2 focus:ring-white-500 focus:border-white-500 block w-full p-3 outline-none shadow transition duration-300 ease-in-out transform hover:scale-105"
                    aria-label="Select Game"
                    value={selectedGame}
                    onChange={handleSelectChange}
                >
                    <option value="Games">Select Game</option>
                    {Object.keys(GAMES_PROVIDERS).map((game) => (
                        <option key={game} value={game}>
                            {game}
                        </option>
                    ))}
                </select>

                <select
                    id="provider-select"
                    className="bg-[var(--secondaryColor)] text-white-800 text-sm rounded-lg focus:ring-2 focus:ring-white-500 focus:border-white-500 block w-full p-3 outline-none shadow transition duration-300 ease-in-out transform hover:scale-105"
                    aria-label="Select Provider"
                    value={selectedProvider}
                    onChange={handleSelectChange}
                    disabled={providers.length === 0}
                >
                    <option value="Providers">Select Provider</option>
                    {providers.map((provider) => (
                        <option key={provider} value={provider}>
                            {provider}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex game-list flex-wrap mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 xxlg:grid-cols-5 2xl:grid-cols-6 xxlg:grid-cols-8 gap-1 lg:gap-4">
                {items &&
                    items.slice(0, itemCount).map((item, index) => (
                        <div
                            key={item._id}
                            onClick={() => handleGamePlay(item)}
                            className="m-auto w-full"
                        >
                            <div className="rounder">
                            <div className="card cursor-pointer rounded-lg">
                                <div className="w-full overflow-hidden rounded-tr-xl rounded-tl-xl flex items-center bg-[var(--secondaryColor)]">
                                    <LazyLoadImage
                                        src={
                                            process.env.REACT_APP_BACKEND +
                                            "/images/" +
                                            item.img
                                        }
                                        srcSet={`${
                                            process.env.REACT_APP_BACKEND +
                                            "/images/" +
                                            item.img
                                        } 300w, ${
                                            process.env.REACT_APP_BACKEND +
                                            "/images/" +
                                            item.img
                                        } 1024w`}
                                        sizes="(max-width: 450px) 300w, 1024w"
                                        placeholderSrc={
                                            process.env.REACT_APP_BACKEND +
                                            "/images/" +
                                            "gamePlaceholder.webp"
                                        }
                                        effect="blur"
                                        wrapperProps={{
                                            // If you need to, you can tweak the effect transition using the wrapper style.
                                            style: { transitionDelay: "0.5s" },
                                        }}
                                        className="object-cover w-[100%] h-full"
                                        alt={`slider ${index + 1}`}
                                    />
                                </div>

                                <div className="presentation p-1 md:p-2 justify-between flex flex-col lg:flex-row items-center text-center lg:text-start rounded-b-xl ">
                                    <span className="w-full overflow-hidden text-[10px] md:text-[.875rem] text-black font-bold whitespace-nowrap md:w-[50%] truncate">
                                        {item.gameName}
                                    </span>
                                    <span className="text-[10px] md:text-[.875rem] text-black font-bold  whitespace-nowrap truncate">
                                        {item.platform}
                                    </span>
                                </div>
                            </div>
                        </div>
                        </div>
                    ))}
            </div>

            {hasMore && (
                <button
                    onClick={() => {
                        setItemCount(itemCount + 21);
                        fetchData();
                    }}
                    className="m-auto mt-4 bg-[var(--secondaryColor)] hover:bg-[var(--secondaryColor)]text-sm text-black font-[900] py-2 px-4 rounded shadow-lg hover:shadow-xl transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-black-300 focus:ring-offset-2"
                >
                    Load More...
                </button>
            )}
        </>
    );
};
