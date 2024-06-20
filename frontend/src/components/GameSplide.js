import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingModal from "./LoadingPage";
import * as API from "../services/api";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Logo from "../assets/img/teslla_logo2.png";

export const GameSplide = (props) => {
    const { t } = useTranslation();

    const isLogin = useSelector((state) => state.loginState.isLogin);
    const [loading, setLoading] = useState(false);

    // const notifyConnection = () =>
    //   toast.error(t('Connection failed'), {
    //     position: 'top-right',
    //     autoClose: 1000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //
    //     draggable: true,
    //     progress: undefined,
    //     theme: 'light'
    //   })

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

        setLoading(true);
        const res = await API.getGamePlayUrl(item._id);
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
        setLoading(false);
    };

    return (
        <div className="RecentWin" id="hits">
            {!props.direction && (
                <div className="viewall-border bg-[#222121]">
                <div className="top flex items-center justify-between mb-2 mt-2">
                    <h1 className="flex items-center text-sm md:text-xl" >
                        {/* {props.icon && <props.icon />} */}
                        {props.title}
                    </h1>
                    <a
                        className="see-all-1 text-sm md:text-xl"
                        href={`/ALL/${props.games[0]?.platform}`}
                    >
                        {t("View All")}
                    </a>
                </div>
                </div>
            )}

            <div className="slider-wrapper-recent">
                <Splide
                    className="my-2 SliderAreaFirst"
                    options={{
                        type: "loop",
                        gap: 15,
                        arrows: false,
                        pagination: false,
                        perPage: props.items,
                        breakpoints: {
                            500: {
                                perPage: 3,
                                gap: 5,
                            },
                            770: {
                                perPage: 3,
                            },
                            970: {
                                perPage: 3,
                            },
                            1200: {
                                perPage: 4,
                            },
                            1400: {
                                perPage: 5,
                            },
                            1600: {
                                perPage: 6,
                            },
                        },
                        height: props.height,
                        direction: props.direction,
                        autoplay: true,
                    }}
                >
                    {props.games &&
                        props.games.map((item, key) => (
                            <SplideSlide
                                key={key}
                                onClick={() => handleGamePlay(item)}
                            >
                                {/* #469711 #9e0505 */}
                                <div
                                    className={`card cursor-pointer ${
                                        props.direction
                                            ? "rounded-full"
                                            : "rounded-lg"
                                    }`}
                                >
                                    <div className="rounder mt-4">
                                    <div className="w-full overflow-hidden rounded-tr-lg rounded-tl-lg flex items-center">
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
                                            sizes="(max-width: 500px) 300w, 1024w"
                                            placeholderSrc={
                                                process.env.REACT_APP_BACKEND +
                                                "/images/" +
                                                "gamePlaceholder.webp"
                                            }
                                            effect="blur"
                                            wrapperProps={{
                                                // If you need to, you can tweak the effect transition using the wrapper style.
                                                style: {
                                                    transitionDelay: "0.5s",
                                                },
                                            }}
                                            className={`
                                                ${
                                                    props.direction
                                                        ? "rounded-50"
                                                        : "rounded-tr-xl rounded-tl-xl"
                                                } object-cover w-full h-full
                                                        `}
                                            alt={`Teslla`}
                                        />

                                        {/*              onError={(e) => { e.target.onerror = null; e.target.src = '../assets/img/teslla_logo2.png'; }} */}
                                    </div>
                                    <div className="presentation p-1 md:p-2 justify-between flex flex-col rounded-b-xl lg:flex-row items-center text-center lg:text-start">
                                        <span className="w-full overflow-hidden text-[10px] md:text-[.875rem] text-black font-bold whitespace-nowrap md:w-[50%] truncate">
                                            {item.gameName}
                                        </span>
                                        <span className=" text-[10px] md:text-[.875rem] text-black font-bold whitespace-nowrap truncate">
                                            {item.platform}
                                        </span>
                                    </div>
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
