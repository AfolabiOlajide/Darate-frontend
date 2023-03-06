import React, { useState, useEffect } from 'react'
import DisplayCampaigns from '../../components/DisplayCampaign';
import DisplayCreatorCampaigns from '../../components/DisplayCreatorCampaigns';
import { useAppContext } from '../../context';
import Loader from '../../components/Loader';
import CategoryNav from '../../components/CategoryNav';

const AllCampaigns = () => {
    const [ isLoading, setIsLoading ] = useState(false);
    const [campaigns, setCampaigns] = useState([]);
    const [creatorCampaigns, setCreatorCampaigns] = useState([]);
    const { contract, getCampaigns, getCreatorCampaigns } = useAppContext();

    const fetchCampaigns = async () => {
        setIsLoading(true);
        const data = await getCampaigns();
        const data2 = await getCreatorCampaigns();
        setCampaigns(data);
        setCreatorCampaigns(data2);
        setIsLoading(false);
    }

    useEffect(() => {
        if(contract) fetchCampaigns();
    }, [contract]);


    return (
        <div>
            {/* category list */}
            <CategoryNav />

            {isLoading && <Loader text='Fetching Campaigns' />}
            <div className="flex flex-col gap-[3rem]">
            <DisplayCampaigns 
            title="All Campaigns"
            isLoading={isLoading}
            campaigns={campaigns} />

            <DisplayCreatorCampaigns
            title="All Creators"
            isLoading={isLoading}
            campaigns={creatorCampaigns} />
            </div>
        </div>
    )
}

export default AllCampaigns;