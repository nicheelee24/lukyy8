import React, { useState } from "react"
import i18n from "../i18n"

const LanguageSelector = () => {
    const [selectedLanguage, setSelectedLanguage] = useState(i18n.language) // i18n.language contains the language assigned to lng in i18n.js file.

    const handleClick = (value) => {
        i18n.changeLanguage(value) // i18n.changeLanguage() is used to change the language assigned to lng in i18n.js file
        setSelectedLanguage(value)
        localStorage.setItem("lang", value)
    }

    const languageList = [
        {
            text: 'ภาษาไทย',
            value: 'th'
        },
        {
            text: 'English',
            value: 'en'
        },
        {
            text: '中文',
            value: 'cn'
        }
        // {
        //     text: 'Tiếng Việt',
        //     value: 'vi'
        // },
        // {
        //     text: 'ຄົນລາວ',
        //     value: 'lo'
        // },
    ]

    return (
        <form>
            {languageList.map((item, index) => {
                return (
                <label key={index} htmlFor={item.value} onClick={() => handleClick(item.value)}>
                    <div className="hover:bg-[var(--logoutBg)] align-center h-[45px] px-[16px] py-[12px] text-[.875rem] font-[600] text-[white] hover:text-[black] cursor-pointer flex w-full justify-between leading-[1.5rem] rounded-md">
                        {item.text}
                        <div className="text-[var(--logoutBg)] hover:text-white">
                            <input 
                                type="radio"
                                name="lang"
                                value={item.value}
                                checked={selectedLanguage === item.value}
                                onChange={() => {}}
                                tabIndex="-1"
                                className="" />
                        </div>
                    </div>
                </label>
                )
            })}
        </form>
    )
}

export default LanguageSelector