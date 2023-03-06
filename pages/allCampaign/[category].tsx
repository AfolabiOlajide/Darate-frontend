import React, { useState, useEffect } from 'react';
import { useRouter } from "next/router";

import { useAppContext } from '../../context';
import DisplayByCategory from '../../components/DisplayByCategory';
import { NormalCampaignProp } from '../../utils';
import Loader from '../../components/Loader';
import { FiArrowLeft } from 'react-icons/fi';

const CampaignCategory = () => {
    const router = useRouter();
    const { category } = router.query
    const [ isLoading, setIsLoading ] = useState(false);
    const [campaigns, setCampaigns] = useState([]);
    const { contract, getCampaigns } = useAppContext();

    const fetchCampaigns = async () => {
        setIsLoading(true);
        const data = await getCampaigns();
        if(category === "all"){
            setCampaigns(data)
        }else{
            const filteredData = data.filter((campaign: NormalCampaignProp) => campaign.category === category);
            setCampaigns(filteredData);
        }
        
        setIsLoading(false);
    }

    useEffect(() => {
        if(contract) fetchCampaigns();
    }, [contract]);

    return (
        <div>
            {isLoading && <Loader text='Fetching Campaigns'/>}
            <div className="back -mt-[2rem] mb-[2rem] cursor-pointer w-max" onClick={() => router.back()}>
                <FiArrowLeft className='w-[2rem] h-[2rem]' />
            </div>
            <DisplayByCategory 
            title="Campaigns"
            isLoading={isLoading}
            campaigns={campaigns} />
        </div>
    )
}

export default CampaignCategory