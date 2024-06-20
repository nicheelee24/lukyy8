import React, { useState } from 'react';
import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import axios from 'axios';

function GameUpload({open, setOpen, type}) {
    const cancelButtonRef = useRef(null)

    const [game, setGame] = useState({
        platform: "BG",
        gameType: "LIVE",
        gameCode: "",
        gameName: "",
        file: ""
    })
    const [uploadedFileURL, setUploadedFileURL] = useState(null)

    function handleChange(event) {
        if (event.target.id === "platform") setGame((prevData) => ({
            ...prevData,
            platform: event.target.value
        }));
        if (event.target.id === "gameType") setGame((prevData) => ({
            ...prevData,
            gameType: event.target.value
        }));
        if (event.target.id === "gameCode") setGame((prevData) => ({
            ...prevData,
            gameCode: event.target.value
        }));
        if (event.target.id === "gameName") setGame((prevData) => ({
            ...prevData,
            gameName: event.target.value
        }));
        if (event.target.id === "file") {
            setGame((prevData) => ({
                ...prevData,
                file: event.target.files[0]
            }));
            var reader = new FileReader();

            reader.onloadend = function (e) {
                setUploadedFileURL([reader.result]);
            };
        }
    }

    function handleSubmit(event) {
        event.preventDefault()
        const url = process.env.REACT_APP_BACKEND + '/api/game';

        const formData = new FormData();
        formData.append('platform', game.platform);
        formData.append('gameType', game.gameType);
        formData.append('gameCode', game.gameCode);
        formData.append('gameName', game.gameName);
        formData.append('file', game.file);
        formData.append('fileName', game.file.name);

        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'x-auth-token': window.localStorage.getItem('token')
            },
        };
        axios.post(url, formData, config)
            .then((response) => {
                if(response.data.status === "0000"){
                    // setUploadedFileURL(process.env.REACT_APP_BACKEND + "/images/" + response.data.game.img);
                    setUploadedFileURL(null);
                    setGame({
                        platform: "BG",
                        gameType: "LIVE",
                        gameCode: "",
                        gameName: "",
                        file: ""
                    });
                }
            })
            .catch((error) => {
                console.error("Error uploading file: ", error);
            });
    }

    return (
        <>
            <Transition.Root show={open && type==='game'} as={Fragment}>
                <Dialog as="div" className="relative z-[10000]" initialFocus={cancelButtonRef} onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 backdrop-blur-sm bg-black bg-opacity-30 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="bg-[#181637] w-[817px] border border-[#2c2a4a] rounded-[12px]">
                                    <div className='right-side px-8 w-full py-10 text-left'>
                                        <form action="#" onSubmit={handleSubmit} className="flex flex-col h-full">
                                            <h1 className="mb-12 text-center">New Game</h1>
                                            {uploadedFileURL && <img className="w-[200px] h-[200px] m-auto" src={uploadedFileURL} alt="Uploaded content" />}
                                            <div className="input-wrapper mt-2 mb-2">
                                                <label htmlFor="platform">Platform</label>
                                                <select id="platform" onChange={handleChange} value={game.platform} className="bg-gray-50 px-6 mt-3 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                    <option value="BG">BG</option>
                                                    <option value="DRAGOONSOFT">DRAGOONSOFT</option>
                                                    <option value="E1SPORT">E1SPORT</option>
                                                    <option value="FASTSPIN">FASTSPIN</option>
                                                    <option value="FC">FC</option>
                                                    <option value="HORSEBOOK">HORSEBOOK</option>
                                                    <option value="JDB">JDB</option>
                                                    <option value="JDBFISH">JDBFISH</option>
                                                    <option value="JILI">JILI</option>
                                                    <option value="KINGMAKER">KINGMAKER</option>
                                                    <option value="LUCKYPOKER">LUCKYPOKER</option>
                                                    <option value="LUDO">LUDO</option>
                                                    <option value="PG">PG</option>
                                                    <option value="PLAY8">PLAY8</option>
                                                    <option value="PP">PP</option>
                                                    <option value="PT">PT</option>
                                                    <option value="RT">RT</option>
                                                    <option value="SABA">SABA</option>
                                                    <option value="SEXYBCRT">SEXYBCRT</option>
                                                    <option value="SPADE">SPADE</option>
                                                    <option value="SV388">SV388</option>
                                                    <option value="VENUS">VENUS</option>
                                                    <option value="VRLOTTO">VRLOTTO</option>
                                                    <option value="YESBINGO">YESBINGO</option>
                                                    <option value="YL">YL</option>
                                                </select>
                                            </div>
                                            <div className="input-wrapper mt-2 mb-2">
                                                <label htmlFor="gameType">Game Type</label>
                                                <select id="gameType" onChange={handleChange} value={game.gameType} className="bg-gray-50 px-6 mt-3 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                    <option value="LIVE">LIVE</option>
                                                    <option value="SLOT">SLOT</option>
                                                    <option value="ESPORTS">ESPORTS</option>
                                                    <option value="FH">FH</option>
                                                    <option value="TABLE">TABLE</option>
                                                    <option value="EGAME">EGAME</option>
                                                    <option value="VIRTUAL">VIRTUAL</option>
                                                    <option value="LOTTO">LOTTO</option>
                                                    <option value="BINGO">BINGO</option>
                                                </select>
                                            </div>
                                            <div className="input-wrapper mt-2 mb-2">
                                                <label htmlFor="gameCode">Game Code</label>
                                                <input type="text" placeholder="BG-LIVE-000" value={game.gameCode} id="gameCode" className="rounded-lg px-6 mt-3" onChange={handleChange} />
                                            </div>
                                            <div className="input-wrapper mt-2 mb-2">
                                                <label htmlFor="gameName">Game Name</label>
                                                <input type="text" placeholder="Roulette" id="gameName" value={game.gameName} className="rounded-lg px-6 mt-3" onChange={handleChange} />
                                            </div>
                                            
                                            <div className="input-wrapper mt-2 mb-2">
                                                <label htmlFor="file" className="sr-only">Choose profile photo</label>
                                                <input type="file" onChange={handleChange} id='file' name='file' className='block border-0 w-full text-sm text-slate-500 file:mr-4 file:py-4 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100' />
                                            </div>
                                            <button className="w-full rounded-lg mt-4 mb-9">Save</button>
                                        </form>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    );
}

export default GameUpload;