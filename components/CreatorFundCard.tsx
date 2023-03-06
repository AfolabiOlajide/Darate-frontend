import Image from 'next/image';
import React from 'react';
// import { AiOutlineTag } from "react-icons/ai"

import Pixel from "../assets/pixel.png"
import { CreatorCampignProp } from '../utils';

const CreatorFundCard = ({ owner, name, description, amountCollected, image, handleClick }: CreatorCampignProp) => {
    
    return (
        <div className={`sm:w-[288px] w-full rounded-[15px] bg-[#1c1c24] cursor-pointer`} onClick={handleClick}>
        <img src={image} alt="fund" className="w-full h-[210px] md:h-[158px] object-cover rounded-t-[10px]"/>

        <div className="flex flex-col p-4">

            {/* name description */}
            <div className="block">
            <h3 className={`heading font-bold text-[2rem] text-white text-left leading-[26px] truncate`}>{name}</h3>
            <p className={`mt-[5px]    font-normal text-[#808191] text-left leading-[18px] truncate`}>{description}</p>
            </div>

            <div className="flex items-center mt-[20px] gap-[12px]">
            <div className="w-[30px] h-[30px] rounded-full flex justify-center overflow-hidden items-center bg-[#13131a]">
                <Image src={Pixel} alt="user" width={20} className="w-full h-full object-cover"/>
            </div>
            <p className={`flex-1 font-normal text-[12px] text-[#808191] truncate`}>by <span className={`text-[#b2b3bd]`}>{owner}</span></p>
            </div>
        </div>
        </div>
    )
}

export default CreatorFundCard