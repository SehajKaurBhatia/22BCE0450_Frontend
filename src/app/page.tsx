"use client";

import Image from "next/image";
import { MdOutlineFilterAlt } from "react-icons/md";
import { IoShareSocialOutline } from "react-icons/io5";
import Toggle from "./components/Toggle";
import OwnerSearch from "./components/OwnerSearch";
import { useState, useMemo } from "react";
import Table from "./components/Table";
import { useSearch } from "./components/SearchContext";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  EmailIcon,
} from "react-share";
export default function Home() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleNativeShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "Check this out!",
        text: "I found this interesting.",
        url: currentUrl,
      });
    } else {
      setIsDropdownOpen(!isDropdownOpen); 
    }
  };
  const [activeFilter, setActiveFilter] = useState<string>("All");
    const mockData = [
        {
            mark: "Meta Logo",
            logo: "Meta Logo",
            details: "Facebook Inc,",
            id: 3634748,
            date3: "26th Jan 2020",
            status: "Live/Registered",
            date: "26 June 2020",
            date2: "26 Dec 2027",
            classDescription: "Computer services, Social Media, Networking, Virtual Communities, Community",
            classDescription2: "Class 45",
        },
        {
            mark: "Meta Logo",
            logo: "Meta Logo",
            details: "Facebook Inc,",
            id: 3634748,
            date3: "26th Jan 2020",
            status: "Live/Registered",
            date: "26 June 2020",
            date2: "26 Dec 2027",
            classDescription: "Computer services, Social Media, Networking, Virtual Communities, Community",
            classDescription2: "Class 45",
        },
        {
            mark: "Tesla Logo",
            logo: "Tesla Logo",
            details: "Tesla, Inc.",
            id: 3634748,
            date3: "26th Jan 2020",
            status: "Pending",
            date: "26 June 2020",
            date2: "26 Dec 2027",
            classDescription: "Automotive services, Electric Vehicles",
            classDescription2: "Class 45",
        },
        {
            mark: "Apple Logo",
            logo: "Apple Logo",
            details: "Apple Inc.",
            id: 3634749,
            date3: "15th Mar 2020",
            status: "Live/Registered",
            date: "15 July 2020",
            date2: "15 Jan 2028",
            classDescription: "Consumer electronics, Software, Online services",
            classDescription2: "Class 9",
        },
    ];

    const { searchQuery, searchInitiated, selectedOwners, setSelectedOwners } = useSearch();

    const handleOwnerFilter = (selectedItems: { id: number; name: string }[]) => {
        setSelectedOwners(selectedItems);
    };

    const suggestions = useMemo(() => {
      const baseWord = searchQuery.toLowerCase();
      const halfLength = Math.floor(baseWord.length / 2);
      const firstHalf = baseWord.substring(0, halfLength);
      const secondHalf = baseWord.substring(halfLength);
        return [baseWord, firstHalf,secondHalf];
    }, [searchQuery]);

    const filterData = useMemo(() => {
        if (!searchInitiated) {
            return [];
        }

        let filtered = mockData;

        
        if (searchQuery) {
            const lowerCaseQuery = searchQuery.toLowerCase();
            filtered = filtered.filter((row) =>
                row.mark.toLowerCase().includes(lowerCaseQuery) ||
                row.logo.toLowerCase().includes(lowerCaseQuery) ||
                row.details.toLowerCase().includes(lowerCaseQuery) ||
                row.classDescription.toLowerCase().includes(lowerCaseQuery)
            );
        }

      
        if (selectedOwners.length > 0) {
            const ownerNames = selectedOwners.map(owner => owner.name.toLowerCase());
            filtered = filtered.filter(row => 
                ownerNames.some(owner => 
                    row.details.toLowerCase().includes(owner)
            ));
        }

        return filtered;
    }, [mockData, searchQuery, searchInitiated, selectedOwners]);

    const trademarkCount = filterData.length;

    return (
        <div className="md:px-12 sm: px-2 py-6 bg-[#FEFEFE] text-[#4B5563] w-full h-full">
            <div className="flex flex-col justify-center gap-[20px]">
                <p className="font-800">
                    {searchInitiated
                        ? `About ${trademarkCount} Trademarks found${
                            searchQuery ? ` for "${searchQuery}"` : ''
                          }${
                            selectedOwners.length > 0 
                              ? ` from ${selectedOwners.map(o => o.name).join(', ')}`
                              : ''
                          }`
                        : "Enter a search term or click on a checkbox from the menu and click the Search button."}
                </p>
                <hr className="h-[2px] border-[2px] border-[#E7E6E6] bg-[#E7E6E6]" />
                <div className="flex items-center justify-between">
                <p className="text-[#4B5563]">
  {searchInitiated && searchQuery ? (
    <div className="flex flex-wrap items-center gap-2">
      <span>Also try searching for:</span>
      {suggestions.map((suggestion, index) => (
        <span
          key={index}
          className="inline-block px-2 py-1 bg-orange-100 border border-orange-500 rounded-md text-gray-800 font-medium"
        >
          {suggestion}
        </span>
      ))}
    </div>
  ) : ""}
</p>
                    <div className="flex justify-center gap-[20px] items-center px-20">
                        <div className="border-[1px] rounded-[8px]">
                            <button className="flex justify-center text-[12px] w-[95px] h-[42px] items-center cursor-pointer">
                                <MdOutlineFilterAlt className="w-[20px] h-[20px]" />
                                Filter
                            </button>
                        </div>
                        <div className="flex border-[1px] self-center place-content-center w-[32px] h-[32px] rounded-[50px]">
                            <button  onClick={handleNativeShare}
        className="flex items-center justify-center border-[1px] w-[32px] h-[32px] rounded-full hover:bg-gray-100"
      >
        <IoShareSocialOutline className="w-[20px] h-[20px]" />
      </button>

    
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
          <div className="p-2 flex flex-col space-y-2">
            <FacebookShareButton
              url={currentUrl}
              className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
            >
              <FacebookIcon size={24} round />
              <span>Facebook</span>
            </FacebookShareButton>

            <TwitterShareButton
              url={currentUrl}
              className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
            >
              <TwitterIcon size={24} round />
              <span>Twitter</span>
            </TwitterShareButton>

            <LinkedinShareButton
              url={currentUrl}
              className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
            >
              <LinkedinIcon size={24} round />
              <span>LinkedIn</span>
            </LinkedinShareButton>

            <EmailShareButton
              url={currentUrl}
              subject="Check this out!"
              className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
            >
              <EmailIcon size={24} round />
              <span>Email</span>
            </EmailShareButton>
          </div>
        </div>
      )}
                        </div>
                        <div className="flex place-content-center border-[1px] w-[32px] h-[32px] rounded-[50px]">
                            <button className="cursor-pointer">
                                <Image
                                    src="/images/menu.png"
                                    alt="hamburger icon"
                                    width={20}
                                    height={20}
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-5 md:flex flex-row sm: flex flex-col justify-between gap-5">
                <div className="bg-white">
                    <Table data={filterData} />
                </div>
                <div className="mt-5 flex flex-col gap-2">
                    <div className="flex flex-wrap px-5 py-5 bg-[#FFFFFF] rounded-[10px] max-w-[296px] shadow-[0px_4.34px_68px_0px_#C6C6C640,0px_3.94px_10px_0px_#E8E8E840,0px_4px_4px_0px_#E7E7E740]">
                        <p className="px-1 font-bold text-[16px]">Status</p>
                        <div className="flex flex-wrap gap-2 px-0 py-3 ">
                        <button 
    className={`cursor-pointer flex text-[14px] font-semibold border-[1px] px-[12px] h-[37px] rounded-[12px] items-center justify-center ${
      activeFilter === "All" 
        ? "border-blue-500 text-blue-500" 
        : "border-[#D1D1D1] text-gray-800"
    }`}
    onClick={() => setActiveFilter("All")}
  >
    All
  </button>
  
  <button 
    className={`cursor-pointer flex text-[14px] font-semibold border-[1px] px-[12px] h-[37px] rounded-[12px] items-center justify-center gap-1 ${
      activeFilter === "Registered" 
        ? "border-blue-500 text-blue-500" 
        : "border-[#D1D1D1] text-gray-800"
    }`}
    onClick={() => setActiveFilter("Registered")}
  >
    <p className="bg-green-600 w-[10.24px] h-[10.24px] rounded-full"></p>
    Registered
  </button>

  <button 
    className={`cursor-pointer flex text-[14px] font-semibold border-[1px] px-[12px] h-[37px] rounded-[12px] items-center justify-center gap-1 ${
      activeFilter === "Pending" 
        ? "border-blue-500 text-blue-500" 
        : "border-[#D1D1D1] text-gray-800"
    }`}
    onClick={() => setActiveFilter("Pending")}
  >
    <p className="bg-yellow-500 w-[10.24px] h-[10.24px] rounded-full"></p>
    Pending
  </button>

  <button 
    className={`cursor-pointer flex text-[14px] font-semibold border-[1px] px-[12px] h-[37px] rounded-[12px] items-center justify-center gap-1 ${
      activeFilter === "Abondened" 
        ? "border-blue-500 text-blue-500" 
        : "border-[#D1D1D1] text-gray-800"
    }`}
    onClick={() => setActiveFilter("Abondened")}
  >
    <p className="bg-red-600 w-[10.24px] h-[10.24px] rounded-full"></p>
    Abondened
  </button>

  <button 
    className={`cursor-pointer flex text-[14px] font-semibold border-[1px] px-[12px] h-[37px] rounded-[12px] items-center justify-center gap-1 ${
      activeFilter === "Others" 
        ? "border-blue-500 text-blue-500" 
        : "border-[#D1D1D1] text-gray-800"
    }`}
    onClick={() => setActiveFilter("Others")}
  >
    <p className="bg-blue-600 w-[10.24px] h-[10.24px] rounded-full"></p>
    Others
  </button>
                        </div>
                    </div>
                    <div className="px-5 py-5 bg-[#FFFFFF] rounded-[10px] max-w-[296px] max-h-[285px] shadow-[0px_4.34px_68px_0px_#C6C6C640,0px_3.94px_10px_0px_#E8E8E840,0px_4px_4px_0px_#E7E7E740]">
                        <OwnerSearch onSelectionChange={handleOwnerFilter} />
                    </div>
                    <div className="flex flex-col mt-5 px-5 py-5 bg-[#FFFFFF] rounded-[10px] max-w-[296px] shadow-[0px_4.34px_68px_0px_#C6C6C640,0px_3.94px_10px_0px_#E8E8E840,0px_4px_4px_0px_#E7E7E740]">
                        <p className="px-1">Display</p>
                        <div className="px-1 py-2">
                            <Toggle />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
