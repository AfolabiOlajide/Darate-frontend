
import React from 'react';
import { useRouter } from 'next/router';
import { CreatorCampignProp } from '../utils';

import CreatorFundCard from './CreatorFundCard';
// import { loader } from '../assets';

interface DisplayCampaignProps {
    title: string,
    isLoading: boolean,
    campaigns: CreatorCampignProp[]
}

const DisplayCreatorCampaigns = ({ title, isLoading, campaigns }: DisplayCampaignProps) => {
    const router = useRouter();

    const handleNavigate = (campaign: CreatorCampignProp) => {
        router.push(`/campaignDetails/${campaign.pId}`)
    }
    
    return (
        <div>
        <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">{title} ({campaigns.length})</h1>

        <div className="flex flex-wrap mt-[20px] gap-[26px]">
            {isLoading && (
            // <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain" />
            <p>Loading</p>
            )}

            {!isLoading && campaigns.length === 0 && (
            <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
                You have not created any campigns yet
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

export default DisplayCreatorCampaigns