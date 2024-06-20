import React, { useState } from "react";
import MoreSVG from "../../assets/more.svg";
import HomeSVG from "../../assets/home.svg";
import PromotionSVG from "../../assets/promotion.svg";
import AccountSVG from "../../assets/account.svg";
import ChatSVG from "../../assets/chat.svg";
import { useDispatch } from "react-redux";
import { reverse } from "../../redux/reducers/openMenu";
import { useNavigate } from "react-router-dom";
import kf from "../../assets/kf.svg";
import kc from "../../assets/kc.svg";
import AccountsSVG from "../../assets/Accounts.svg";
import PromotionsSVG from "../../assets/Promotions.svg";

const CONTACT_US_LINE_APP_INVITE_URL = "https://lin.ee/5WaeTDb";

const MobileFooter = () => {
    const [isActive, setIsActive] = useState(false);
    const [isActive1, setIsActive1] = useState(false);
    const [isActive2, setIsActive2] = useState(false);
    const [isActive3, setIsActive3] = useState(false);
    const [isActive4, setIsActive4] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onMoreHandler = () => {
        dispatch(reverse());
    };

    const onHomeHandler = () => {
        navigate("/", {
            replace: true,
        });
    };

    const onPromotionHandler = () => {
        navigate(`/promotion`, { replace: true });
    };

    const onAccountHandler = () => {
        navigate(`/account`, { replace: true });
    };

    const onContactHandler = () => {
        window.open(CONTACT_US_LINE_APP_INVITE_URL, "_blank");
    };
    return (
        <>
            <div class="fixed bottom-0 left-0 right-0 h-16 bg-black  flex md:hidden justify-around items-center z-50">
                <div
                    class="tabbar-item flex flex-col items-center w-[20%]"
                    onClick={() => {
                        setIsActive(!isActive);
                        setIsActive1("")
                        setIsActive2("")
                        setIsActive3("")
                        setIsActive4("")
                        onMoreHandler();
                    }}
                >
                    {isActive ? (
                        <img
                            src={kc}
                            width={20}
                            height={20}
                            className="is-img h"
                        />
                    ) : (
                        <img
                            src={MoreSVG}
                            width={20}
                            height={20}
                            className="is-img h"
                        />
                    )}
                    <span className={`text-xs font-medium mt-1 truncate max-w-full ${isActive ? 'text-[var(--logoutBg)]' : 'text-white'}`}>
                        More
                    </span>
                </div>
                <div
                    class="tabbar-item flex flex-col items-center w-[20%]"
                    onClick={() => {
                        setIsActive1(!isActive1);
                        setIsActive("")
                        setIsActive2("")
                        setIsActive3("")
                        setIsActive4("")
                        onPromotionHandler();
                    }}
                >
                    {isActive1 ? (
                        <img
                            src={PromotionsSVG}
                            width={20}
                            height={20}
                            className="is-img h"
                        />
                    ) : (
                        <img
                            src={PromotionSVG}
                            width={20}
                            height={20}
                            className="is-img h"
                        />
                    )}
                    <span className={`text-xs font-medium mt-1 truncate max-w-full ${isActive1 ? 'text-[var(--logoutBg)]' : 'text-white'}`}>
                        Promotion
                    </span>
                </div>
                <div
                    class="tabbar-item flex flex-col items-center w-[20%]"
                    onClick={() => {
                        setIsActive2(!isActive2);
                        setIsActive1("")
                        setIsActive("")
                        setIsActive3("")
                        setIsActive4("")
                        onHomeHandler();
                    }}
                >
                    {isActive2 ? (
                        <svg viewBox="0 0 25 24" xmlns="http://www.w3.org/2000/svg" width="20" height="20" >
                            <path fill="rgba(239, 176, 52, 1)" fill-rule="evenodd" clip-rule="evenodd" d="M14.3212 2.12156L21.258 7.89881C21.8707 8.40881 22.2247 9.16481 22.2247 9.96206V19.8148C22.2247 21.2976 21.0225 22.4998 19.5397 22.4998H14.6029V18.599C14.6029 18.0467 14.1552 17.599 13.6029 17.599H11.6029C11.0507 17.599 10.6029 18.0467 10.6029 18.599V22.4998H5.6662C4.18345 22.4998 2.9812 21.2976 2.9812 19.8148V9.96206C2.9812 9.16481 3.3352 8.40881 3.94795 7.89881L10.8847 2.12156C11.88 1.29281 13.326 1.29281 14.3212 2.12156Z"></path></svg>
                    ) : (
                        <img
                            src={HomeSVG}
                            width={20}
                            height={20}
                            className="is-img h"
                        />
                    )}
                    <span className={`text-xs font-medium mt-1 truncate max-w-full ${isActive2 ? 'text-[var(--logoutBg)]' : 'text-white'}`}>
                        Home
                    </span>
                </div>
                <div
                    class="tabbar-item flex flex-col items-center w-[20%]"
                    onClick={() => {
                        setIsActive3(!isActive3);
                        setIsActive1("")
                        setIsActive2("")
                        setIsActive("")
                        setIsActive4("")
                        onAccountHandler();
                    }}
                >
                    {isActive3 ? (
                        <img
                            src={AccountsSVG}
                            width={20}
                            height={20}
                            className="is-img h"
                        />
                    ) : (
                        <img
                            src={AccountSVG}
                            width={20}
                            height={20}
                            className="is-img h"
                        />
                    )}
                    <span className={`text-xs font-medium mt-1 truncate max-w-full ${isActive3 ? 'text-[var(--logoutBg)]' : 'text-white'}`}>
                        Account
                    </span>
                </div>
                <div
                    class="tabbar-item flex flex-col items-center w-[20%]"
                    onClick={() => {
                        setIsActive4(!isActive4);
                        setIsActive1("")
                        setIsActive2("")
                        setIsActive3("")
                        setIsActive("")
                        onContactHandler()
                    }}
                >
                    {isActive4 ? (
                        <img
                            src={kf}
                            width={20}
                            height={20}
                        />
                    ) : (
                        <img
                            src={ChatSVG}
                            width={20}
                            height={20}
                            className="is-img h"
                        />
                    )}
                    <span className={`text-xs font-medium mt-1 truncate max-w-full ${isActive4 ? 'text-[var(--logoutBg)]' : 'text-white'}`}>
                        Contact
                    </span>
                </div>

                {/* <div
                    class="tabbar-item flex flex-col items-center w-[20%]"
                    onClick={() => onContactHandler()}
                >
                    <div class="dont-badge"></div>
                    <img src={ChatSVG} width={20} height={20} />
                    <span class="text-white text-xs font-medium mt-1 truncate max-w-full">
                        Contact
                    </span>
            </div>
                {/* <div
                    className={`tabbar-item flex flex-col items-center w-[20%] ${isActive ? 'active' : ''}`}
                    onClick={() => {
                        setIsActive(!isActive);
                        setIsActive1("")
                        setIsActive2("")
                        setIsActive3("")
                        setIsActive4("")
                        onMoreHandler();
                    }}
                >
                    <div
                        className={`flex items-center ${isActive ? 'active flex bg-white rounded-full pt-2 pb-2 pl-4 pr-6' : ''}`}
                    >
                        {isActive ? (
                            <img
                                src={kc}
                                width={20}
                                height={20}
                                className="is-img h"
                            />
                        ) : (
                            <img
                                src={MoreSVG}
                                width={40}
                                height={40}
                                className="is-img h"
                            />
                        )}
                        {isActive && (
                            <span className="text-red text-xs font-medium mt-1 max-w-full  pl-2">
                                More
                            </span>
                        )}
                    </div>
                </div>
                <div
                    className={`tabbar-item flex flex-col items-center w-[20%] ${isActive1 ? 'active' : ''}`}
                    onClick={() => {
                        setIsActive1(!isActive1);
                        setIsActive("")
                        setIsActive2("")
                        setIsActive3("")
                        setIsActive4("")
                        onPromotionHandler();
                    }}
                >

                    <div
                        className={`flex items-center ${isActive1 ? 'active flex bg-white rounded-full pt-2 pb-2 pl-2 pr-6 w-auto' : ''}`}
                    >
                        {isActive1 ? (
                            <img
                                src={PromotionsSVG}
                                width={20}
                                height={20}
                                className="is-img h"
                            />
                        ) : (
                            <img
                                src={PromotionSVG}
                                width={40}
                                height={40}
                                className="is-img h"
                            />
                        )}
                        {isActive1 && (
                            <span className="text-red text-xs font-medium mt-1 max-w-full pl-2">
                                Promotion
                            </span>
                        )}
                    </div>
                </div>
                <div
                    className={`tabbar-item flex flex-col items-center w-[20%] ${isActive2 ? 'active' : ''}`}
                    onClick={() => {
                        setIsActive2(!isActive2);
                        setIsActive1("")
                        setIsActive("")
                        setIsActive3("")
                        setIsActive4("")
                        onHomeHandler();
                    }}
                >

                    <div
                        className={`flex items-center ${isActive2 ? 'active flex bg-white rounded-full pt-2 pb-2 pl-4 pr-4' : ''}`}
                    >
                        {isActive2 ? (
                            <svg viewBox="0 0 25 24" xmlns="http://www.w3.org/2000/svg" width="20" height="20" >
                                <path fill="red" fill-rule="evenodd" clip-rule="evenodd" d="M14.3212 2.12156L21.258 7.89881C21.8707 8.40881 22.2247 9.16481 22.2247 9.96206V19.8148C22.2247 21.2976 21.0225 22.4998 19.5397 22.4998H14.6029V18.599C14.6029 18.0467 14.1552 17.599 13.6029 17.599H11.6029C11.0507 17.599 10.6029 18.0467 10.6029 18.599V22.4998H5.6662C4.18345 22.4998 2.9812 21.2976 2.9812 19.8148V9.96206C2.9812 9.16481 3.3352 8.40881 3.94795 7.89881L10.8847 2.12156C11.88 1.29281 13.326 1.29281 14.3212 2.12156Z"></path></svg>
                        ) : (
                            <img
                                src={HomeSVG}
                                width={40}
                                height={40}
                                className="is-img h"
                            />
                        )}
                        {isActive2 && (
                            <span className="text-red text-xs font-medium mt-1 max-w-full  pl-2">
                                Home
                            </span>
                        )}
                    </div>
                </div>
                <div
                    className={`tabbar-item flex flex-col items-center w-[20%] ${isActive3 ? 'active' : ''}`}
                    onClick={() => {
                        setIsActive3(!isActive3);
                        setIsActive1("")
                        setIsActive2("")
                        setIsActive("")
                        setIsActive4("")
                        onAccountHandler();
                    }}
                >
                    <div
                        className={`flex items-center ${isActive3 ? 'active flex bg-white rounded-full pt-2 pb-2 pl-2 pr-6' : ''}`}
                    >
                        {isActive3 ? (
                            <img
                                src={AccountsSVG}
                                width={20}
                                height={20}
                                className="is-img h"
                            />
                        ) : (
                            <img
                                src={AccountSVG}
                                width={40}
                                height={40}
                                className="is-img h"
                            />
                        )}
                        {isActive3 && (
                            <span className="text-red text-xs font-medium mt-1 max-w-full  pl-2">
                                Account
                            </span>
                        )}
                    </div>
                </div>
                <div
                    className={`tabbar-item flex flex-col items-center w-[20%] ${isActive4 ? 'active' : ''}`}
                    onClick={() => {
                        setIsActive4(!isActive4);
                        setIsActive1("")
                        setIsActive2("")
                        setIsActive3("")
                        setIsActive("")
                        onContactHandler()
                    }}
                >
                    <div
                        className={`flex items-center ${isActive4 ? 'active flex bg-white rounded-full pt-2 pb-2 pl-2 pr-6' : ''}`}
                    >
                        {isActive4 ? (
                            <img
                                src={kf}
                                width={20}
                                height={20}
                            />
                        ) : (
                            <img
                                src={ChatSVG}
                                width={40}
                                height={40}
                                className="is-img h"
                            />
                        )}
                        {isActive4 && (
                            <span className="text-red text-xs font-medium mt-1 max-w-full  pl-2">
                                Contact
                            </span>
                        )}
                    </div>
                </div> */}
            </div>
        </>
    );
};

export default MobileFooter;
