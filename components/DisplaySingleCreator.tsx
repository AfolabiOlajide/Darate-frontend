
import React from 'react';
import { useRouter } from 'next/router';
import { CreatorCampignProp } from '../utils';
import { RotateSpinner } from "react-spinners-kit";

import CreatorFundCard from './CreatorFundCard';
// import { loader } from '../assets';

interface DisplaySingleCreatorProp {
    isLoading: boolean,
    campaigns: CreatorCampignProp[]
}

const DisplaySingleCreator = ({ isLoading, campaigns }: DisplaySingleCreatorProp) => {
    const router = useRouter();

    const handleNavigate = (campaign: CreatorCampignProp) => {
        router.push(`/creatorDetails/${campaign.pId}`)
    }
    
    return (
        <div>
        <div className="flex flex-wrap mt-[20px] gap-[26px]">
            {isLoading && (
            // <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain" />
            <RotateSpinner size={60} color="#1EC49E" loading={isLoading} />
            )}

            {!isLoading && campaigns.length === 0 && (
            <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
                There's no creator with this id
            </p>
            )}

            {!isLoading && campaigns.length > 0 && campaigns.map((campaign) => <CreatorFundCard 
            key={campaign.pId}
            {...campaign}
            handleClick={() => handleNavigate(campaign)}
            />)}
        </div>
        </div>
    )
}

export default DisplaySingleCreator