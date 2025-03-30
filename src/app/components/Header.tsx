//Header.tsx

"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useSearch } from "./SearchContext";

function Header() {
    const { setSearchQuery, setSearchInitiated } = useSearch();
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleSearchClick = () => {
        setSearchQuery(inputValue);
        setSearchInitiated(true);
    };

    return (
        <header className="flex justify-center items-center bg-[#F8FAFE] h-[118px] w-full">
            <div className="w-full max-w-[1400px] flex justify-between items-center px-4 md:px-10">
                <Image
                    src="/images/Logo.png"
                    alt="Trademarkia Logo"
                    width={155.37}
                    height={21.93}
                    className="shrink-0"
                />

                <div className="flex-1 flex justify-center">
                    <div className=" flex w-full max-w-[900px] gap-2 px-2">
                        <input
                            type="text"
                            className="flex-1 bg-white rounded-[12px] border-[#D4D4D4] border-[1px] text-[14px] font-medium text-[#636363] px-12 py-2 w-full bg-[url('/images/searchicon.png')] bg-no-repeat  bg-[20px]"
                            placeholder="Search Trademark Here eg. Mickey Mouse"
                            value={inputValue}
                            onChange={handleInputChange}
                        />
                        <button
                            className="cursor-pointer md:w-[124px] h-[50px] md:p-0 sm: p-2 rounded-[12px] bg-[#4380EC] text-white"
                            onClick={handleSearchClick}
                        >
                            Search
                        </button>
                    </div>
                </div>

                <button className="bg-transparent whitespace-nowrap text-[14px] px-3 py-2 bg-blue-500 text-[#F8FAFE] rounded-md hidden md:block">
                    Apply for trademark
                </button>
            </div>
        </header>
    );
}

export default Header;
