import React from "react";
import { useSelector } from "react-redux";
import "./App.css";
import "./assets/css/home.css";
import { Aside } from "./components/layouts/Aside";
import { Header } from "./components/layouts/Header";
import { MainSection } from "./components/layouts/MainSection";
import { Footer } from "./components/layouts/Footer";
import MobileFooter from "./components/layouts/MobileFooter";

function App() {
    const expandMenuState = useSelector((state) => state.openMenuState.value);

    return (
        <div className="App dark">
            <Header />
            <div className="flex">
                <Aside />
                {/* <div className={`flex flex-col w-[100vw]  ${expandMenuState ? 'md:w-[calc(100vw-272px)]' : 'md:w-[calc(100vw-72px)]'}`}> */}
                <div
                    className={`flex flex-col w-[100vw]  ${expandMenuState
                            ? "md:w-[calc(100vw-272px)]"
                            : "md:w-full"
                        }`}
                >
                    <div className="w-full">
                        <MainSection />
                        <Footer />
                        <MobileFooter />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
