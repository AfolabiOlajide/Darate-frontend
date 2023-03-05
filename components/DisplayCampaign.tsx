
import React from 'react';
import { useRouter } from 'next/router';
import { NormalCampaignProp } from '../utils';
import { RotateSpinner } from "react-spinners-kit";

import FundCard from './FundCard';
// import { loader } from '../assets';

interface DisplayCampaignProps {
    title: string,
    isLoading: boolean,
    campaigns: NormalCampaignProp[]
}

const DisplayCampaigns = ({ title, isLoading, campaigns }: DisplayCampaignProps) => {
    const router = useRouter();

    const handleNavigate = (campaign: NormalCampaignProp) => {
        router.push(`/campaignDetails/${campaign.pId}`)
    }
    
    return (
        <div>
        <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">{title} ({campaigns.length})</h1>

        <div className="flex flex-wrap mt-[20px] gap-[26px]">
            {isLoading && (
            // <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain" />
            <RotateSpinner size={60} color="#1EC49E" loading={isLoading} />
            )}

            {!isLoading && campaigns.length === 0 && (
            <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
                You have not created any campigns yet
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

export default DisplayCampaigns