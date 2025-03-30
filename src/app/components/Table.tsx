"use client";

import Image from "next/image";
import React from "react";



type TableRow = {
  mark: string;
  logo: string,
  details: string;
  id: number,
  date3: string,
  status: string;
  date: string,
  date2: string,
  classDescription: string;
  classDescription2: string;
};

const Table = ({ data }: { data: TableRow[] }) => {
  return (
    <div className="md:w-full md:max-w-[1400px] sm: w-[300px] md:mx-auto md:p-4 sm: p-0 rounded-lg ">
   
      <table className="md:w-full sm: w-screen ">
        <thead>
          <tr className="border-b-[1.5px] border-[#E7E6E6] ">
            <th className="sm: text-[12px] md:text-[16px] md:px-10 sm: px-2 md:py-2 text-left">Mark</th>
            <th className="sm: text-[12px]  md:text-[16px] md:px-10 sm: px-2 py-2 text-left">Details</th>
            <th className="sm: text-[12px] md:text-[16px] md:px-10 sm: px-2 py-2 text-left">Status</th>
            <th className="sm: text-[12px] md:text-[16px] md:px-4 sm: px-2 py-2 text-left">Class/Description</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, index) => (
              <tr className="" key={index} >
                <td className="md:py-4 sm: py-0 px-0  mt-0 m-0">
                
                  <div className="md:w-[178px] md:h-[130px] bg-white flex items-center rounded-[11px] justify-center shadow-[0px_4.34px_68px_0px_#C6C6C640,0px_3.94px_10px_0px_#E8E8E840,0px_4px_4px_0px_#E7E7E740]">
                    <Image
                      src="/images/symbol2.png"
                      alt={row.mark}
                        width={74}
                        height={61}
                       
                        
                     className=" mt-0"
                    ></Image>
                    </div>
                 
                </td>
                <td className="md:w-[250px] sm: w-[100px] md:px-10 py-2">
                    <div className="flex flex-col md:gap-8">
                        <div className="flex flex-col  font-medium ">
                            <span className="font-bold md:text-[16px] sm: text-[12px]">{row.logo}</span>
                            <span className="md:text-[14px] sm: text-[12px]">{row.details}</span>
                            </div>
                            <div className="flex flex-col font-medium"><p className="md:text-[14px] sm: text-[10px] font-bold">{row.id}</p>
                               <p className="text-[12px] font-light">{row.date3}</p> 
                            </div>
                            </div>
                            </td>
                            <td className="md:w-[190px] md:px-10 py-2">
  <div className="flex flex-col">
    <div className="flex items-center">
      <div
        className={`w-[10px] h-[10px] rounded-full mr-2 ${
          row.status.includes("Live/Registered") ? "bg-green-600" : "bg-yellow-500"
        }`}
      ></div>
      <p className={`font-semibold sm: text-[12px] md:text-[14px] ${row.status.includes("Live/Registered") ? "text-green-600" : "text-yellow-500"}`}>
        {row.status}
      </p>
    </div>
    <div className="flex flex-col justify-between md:gap-8 sm: gap-4 text-black text-[12px] font-bold">
      <p ><span className="font-medium">on</span> {row.date}</p>
      <p className="flex items-center gap-1"><span className="font-medium"><Image src="/images/Vector.png" alt="img" width={13} height={13}></Image></span> {row.date2}</p>
    </div>
  </div>
</td>

                <td className="md:w-[315px]  md:px-4 sm: px-3 py-2">
                    <div className="flex flex-col justify-between gap-6"><p className="md:text-[14px] sm: text-[10px]">{row.classDescription}</p>
                   <div className="flex items-center justify-start gap-2 ">
                    <p className="flex items-center"><Image src="/images/symbol.png" alt="beaker" width={20} height={20}></Image> <p className="md:text-[12px] sm: text-[9px]">{row.classDescription2}</p> </p>
                   <p className="flex items-center"><Image src="/images/symbol.png" alt="beaker" width={20} height={20}></Image><p className="md:text-[12px] sm: text-[9px]">{row.classDescription2} </p></p>
                  <p className="flex items-center"> <Image src="/images/symbol.png" alt="beaker" width={20} height={20}></Image> <p className="md:text-[12px] sm: text-[9px]">{row.classDescription2} </p></p></div></div></td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center text-gray-500 px-4 py-2">
                No results found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
