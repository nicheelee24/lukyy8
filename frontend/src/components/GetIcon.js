import { useEffect, useState } from "react";
import sports from "../assets/img/aside/tabs/Sports.svg";
import sports_hover from "../assets/img/aside/tabs/Sports_hover.svg";
import roulette from "../assets/img/aside/tabs/roulette.svg";
import roulette_hover from "../assets/img/aside/tabs/roulette_hover.svg";

import Live from "../assets/img/aside/tabs/Live casino.svg";
import Live_hover from "../assets/img/aside/tabs/Live casino_hover.svg";

import casino from "../assets/img/new_design/aside/casino.svg";
import casino_hover from "../assets/img/new_design/aside/casino.svg";

import slots from "../assets/img/aside/tabs/Slots.svg";
import slots_hover from "../assets/img/aside/tabs/Slots_hover.svg";

import newslots from "../assets/img/new_design/aside/slots.svg";
import newslots_hover from "../assets/img/new_design/aside/slots.svg";

import home from "../assets/img/aside/tabs/home.svg";
import home_hover from "../assets/img/aside/tabs/home_hover.svg";

import lobbyHome from "../assets/img/new_design/aside/lobbyhome.svg";
import lobbyHome_hover from "../assets/img/new_design/aside/lobbyhome.svg";

import cards from "../assets/img/aside/tabs/Card.svg";
import cards_hover from "../assets/img/aside/tabs/Card_hover.svg";

import sportGame from "../assets/img/aside/tabs/sports-game-l-hover.svg";
import sportGame_hover from "../assets/img/aside/tabs/sports-game-l.svg";

import sportsBasketball from "../assets/img/new_design/aside/sports basketball.svg";
import sportsBasketball_hover from "../assets/img/new_design/aside/sports basketball.svg";

import tableGame from "../assets/img/new_design/aside/slots.svg";
import tableGame_hover from "../assets/img/new_design/aside/slots.svg";

import fishingGame from "../assets/img/aside/tabs/fishing-game-l.svg";
import fishingGame_hover from "../assets/img/aside/tabs/fishing-game.svg";

import fishing from "../assets/img/new_design/aside/fishing.svg";
import fishing_hover from "../assets/img/new_design/aside/fishing.svg";

import bingo from "../assets/img/new_design/aside/bingo.svg";
import bingo_hover from "../assets/img/new_design/aside/bingo.svg";

import virtualGame from "../assets/img/aside/tabs/virtual-game-l.svg";
import virtualGame_hover from "../assets/img/aside/tabs/virtual-game.svg";

import lottoGame from "../assets/img/new_design/aside/lottie.svg";
import lottoGame_hover from "../assets/img/new_design/aside/lottie.svg";

import egame from "../assets/img/aside/tabs/egame-l.svg";
import egame_hover from "../assets/img/aside/tabs/egame.svg";

import thai from "../assets/img/new_design/aside/thai.svg";
import thai_hover from "../assets/img/new_design/aside/thai.svg";

import chicken from "../assets/img/aside/chicken-Active.svg";
import chicken_hover from "../assets/img/aside/chicken.svg";

// import blog from '../assets/img/aside/blog.svg'
import promotion from "../assets/img/new_design/aside/promotion.svg";
import promotion_hover from "../assets/img/new_design/aside/promotion.svg";

import vip from "../assets/img/aside/vip.png";
import support from "../assets/img/aside/Support.svg";

import lang from "../assets/img/new_design/aside/language.svg";
import lang_hover from "../assets/img/new_design/aside/language.svg";

export const GetIcon = ({ type, active }) => {
    const [icon, setIcon] = useState("");

    useEffect(() => {
        switch (type) {
            case "ALL":
                if (active) {
                    setIcon(lobbyHome_hover);
                } else {
                    setIcon(lobbyHome);
                }
                break;
            case "ESPORTS":
                if (active) {
                    setIcon(sportsBasketball_hover);
                } else {
                    setIcon(sportsBasketball);
                }
                break;
            case "EGAME":
                if (active) {
                    setIcon(casino_hover);
                } else {
                    setIcon(casino);
                }
                break;
            case "SLOT":
                if (active) {
                    setIcon(newslots_hover);
                } else {
                    setIcon(newslots);
                }
                break;
            case "FH":
                if (active) {
                    setIcon(fishing_hover);
                } else {
                    setIcon(fishing);
                }
                break;
            case "THAI":
                if (active) {
                    setIcon(thai_hover);
                } else {
                    setIcon(thai);
                }
                break;
            case "TABLE":
                if (active) {
                    setIcon(tableGame_hover);
                } else {
                    setIcon(tableGame);
                }
                break;
            case "LIVE":
                if (active) {
                    setIcon(casino);
                } else {
                    setIcon(casino_hover);
                }
                break;
            case "LOTTO":
                if (active) {
                    setIcon(lottoGame_hover);
                } else {
                    setIcon(lottoGame);
                }
                break;
            case "VIRTUAL":
                if (active) {
                    setIcon(bingo_hover);
                } else {
                    setIcon(bingo);
                }
                break;
            case "CHICKEN":
                if (active) {
                    setIcon(chicken_hover);
                } else {
                    setIcon(chicken);
                }
                break;
            case "Virtual":
                if (active) {
                    setIcon(virtualGame_hover);
                } else {
                    setIcon(virtualGame);
                }
                break;
            case "Promotion":
                if (active) {
                    setIcon(promotion_hover);
                } else {
                    setIcon(promotion);
                }
                break;
            case "VIP":
                setIcon(vip);
                break;
            case "Support":
                setIcon(support);
                break;
            case "Language":
                if (active) {
                    setIcon(lang_hover);
                } else {
                    setIcon(lang);
                }
                break;
            case "ContactUs":
                if (active) {
                    setIcon(promotion_hover);
                } else {
                    setIcon(promotion);
                }
                break;
            case "FinancialReport":
                if (active) {
                    setIcon(promotion_hover);
                } else {
                    setIcon(promotion);
                }
                break;
            case "Account":
                if (active) {
                    setIcon(promotion_hover);
                } else {
                    setIcon(promotion);
                }
                break;
            case "MyBetList":
                if (active) {
                    setIcon(promotion_hover);
                } else {
                    setIcon(promotion);
                }
                break;
            case "Announce":
                if (active) {
                    setIcon(promotion_hover);
                } else {
                    setIcon(promotion);
                }
                break;

            default:
                break;
        }
    }, [active]);

    return <img src={icon} alt={icon} className="w-[22px]" />;
};
