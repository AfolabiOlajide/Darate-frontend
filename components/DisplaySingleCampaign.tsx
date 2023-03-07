
import React from 'react';
import { useRouter } from 'next/router';
import { NormalCampaignProp } from '../utils';
import { RotateSpinner } from "react-spinners-kit";

import FundCard from './FundCard';
// import { loader } from '../assets';

interface DisplayCampaignProps {
    isLoading: boolean,
    campaigns: NormalCampaignProp[]
}

const DisplaySingleCampaign = ({ isLoading, campaigns }: DisplayCampaignProps) => {
    const router = useRouter();

    const handleNavigate = (campaign: NormalCampaignProp) => {
        router.push(`/campaignDetails/${campaign.pId}`)
    }
    
    return (
        <div>
        <div className="flex flex-wrap mt-[20px] gap-[26px]">
            {isLoading && (
            // <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain" />
            <RotateSpinner size={60} color="#1EC49E" loading={isLoading} />
            )}

            {!isLoading && campaigns.length === 0 && (
            <p className="text-center w-full font-semibold text-base md:text-[1.5rem] leading-[30px] text-[#818183]">
                There's no campaign with this Id
            </p>
            )}

            {!isLoading && campaigns.length > 0 && campaigns.map((campaign) => <FundCard 
            key={campaign.pId}
            {...campaign}
            handleClick={() => handleNavigate(campaign)}
            />)}
        </div>
        </div>
    )
}

export default DisplaySingleCampaign