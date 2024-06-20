import React from "react";
import { useTranslation } from "react-i18next";

import logo2 from "../assets/img/Logo/logo1.png";
import logo3 from "../assets/img/Logo/logo (1).svg";
import logo4 from "../assets/img/Logo/logo (1).png";
import logo5 from "../assets/img/Logo/logo2.png";
import logo6 from "../assets/img/Logo/lucky_poker.png";
import logo7 from "../assets/img/Logo/logo3.png";
import logo8 from "../assets/img/Logo/logo4.png";

import logo10 from "../assets/img/Logo/logo (4).png";
import logo11 from "../assets/img/Logo/logo5.svg";
import logo12 from "../assets/img/Logo/logo (5).png";
import logo13 from "../assets/img/Logo/logo 6.png";
import logo14 from "../assets/img/Logo/logo (6).png";
import logo15 from "../assets/img/Logo/logo7.png";
import logo16 from "../assets/img/Logo/logo (7).png";
import logo17 from "../assets/img/Logo/logo8.png";
import logo18 from "../assets/img/Logo/logo (8).png";
import logo19 from "../assets/img/Logo/logo9.png";
import logo20 from "../assets/img/Logo/logo (9).png";
import logo22 from "../assets/img/Logo/logo (10).png";
import logo24 from "../assets/img/Logo/logo (11).png";
import logo25 from "../assets/img/Logo/logo (12).png";

import logo28 from "../assets/img/Logo/logo (20).png";
import logo29 from "../assets/img/Logo/logo (24).png";
import sexyBaccarat from "../assets/img/Logo/sexy-gaming.png";
import evolution from "../assets/img/Logo/evolution.png";
import playngo from "../assets/img/Logo/playngo.png";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import { useNavigate } from "react-router";

export const GameProvider = (props) => {
    const { t } = useTranslation();

    const navigation = useNavigate();

    const Logos = [
        {
            Logo: logo16,
            Url: "",
            platform: "PG",
        },
        // {
        //     Logo: logo19,
        //     Url: "",
        //     platform: "BG",
        // },
        {
            Logo: logo20,
            Url: "",
            platform: "PT",
        },
        {
            Logo: logo22,
            Url: "",
            platform: "PP",
        },
        {
            Logo: sexyBaccarat,
            Url: "",
            platform: "SEXYBCRT",
        },
        {
            Logo: evolution,
            Url: "",
            platform: "EVOLUTION",
        },
        {
            Logo: playngo,
            Url: "",
            platform: "PLAYNGO",
        },
        {
            Logo: logo8,
            Url: "",
            platform: "KINGMAKER",
        },
        {
            Logo: logo24,
            Url: "",
            platform: "RT",
        },
        {
            Logo: logo25,
            Url: "",
            platform: "SPADE",
        },
        // {
        //     Logo: logo27,
        //     Url: "",
        //     platform: "VRLOTTO",
        // },
        {
            Logo: logo28,
            Url: "",
            platform: "YESBINGO",
        },
        {
            Logo: logo2,
            Url: "",
            platform: "FC",
        },
        {
            Logo: logo4,
            Url: "",
            platform: "HORSEBOOK",
        },
        {
            Logo: logo5,
            Url: "",
            platform: "PF",
        },
        {
            Logo: logo6,
            Url: "",
            platform: "LUCKYPOKER",
        },
        {
            Logo: logo7,
            Url: "",
            platform: "JILI",
        },
        // {
        //   Logo: logo8,
        //   Url: '',
        //   platform: "KINGMAKER"
        // },
        // {
        //     Logo: logo9,
        //     Url: "",
        //     platform: "LUCKYPOKER",
        // },
        {
            Logo: logo10,
            Url: "",
            platform: "VENUS",
        },
        {
            Logo: logo11,
            Url: "",
            platform: "DRAGOONSOFT",
        },
        {
            Logo: logo12,
            Url: "",
            platform: "DRAGOONSOFT",
        },
        {
            Logo: logo13,
            Url: "",
            platform: "DRAGOONSOFT",
        },
        {
            Logo: logo14,
            Url: "",
            platform: "LUDO",
        },
        {
            Logo: logo15,
            Url: "",
            platform: "DRAGOONSOFT",
        },
        {
            Logo: logo17,
            Url: "",
            platform: "YL",
        },
        {
            Logo: logo18,
            Url: "",
            platform: "PLAY8",
        },
        {
            Logo: logo29,
            Url: "",
            platform: "JDB",
        },
    ];

    return (
        <div className="icons-wrapper md:mt-7 text-white">
            <div className="top flex items-center justify-between mb-6">
                <h1 className="flex items-center text-sm md:text-xl text-white font-bold">
                    {t("Providers")}
                </h1>
                {/* <a className='see-all' href='/'>{t("View All")}</a> */}
            </div>
            <div className="slider-area w-full">
                <Splide
                    className="mb-5 SliderAreaFirst"
                    options={{
                        gap: 15,
                        arrows: false,
                        pagination: false,
                        perPage: 8,
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
                    }}
                >
                    {Logos.map((item, index) => (
                        <SplideSlide
                            key={index}
                            onClick={() =>
                                navigation(`/ALL/${item.platform}`, {
                                    replace: true,
                                })
                            }
                            className="rounded-lg cursor-pointer"
                        >
                            <div
                                className={`card cursor-pointer ${
                                    props.direction
                                        ? "rounded-full"
                                        : "rounded-lg"
                                }`}
                            >
                                <div className="w-full h-[30px] py-6 md:h-[62px] overflow-hidden rounded-lg flex items-center bg-[var(--newBgProvider)]">
                                    <img
                                        key={index}
                                        src={item.Logo}
                                        alt="Logo"
                                        className="w-[80%] mx-auto"
                                    />
                                </div>
                            </div>
                        </SplideSlide>
                    ))}
                </Splide>
            </div>
        </div>
    );
};
