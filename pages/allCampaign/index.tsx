import React, { useState, useEffect } from 'react'
import DisplayCampaigns from '../../components/DisplayCampaign';
import DisplayCreatorCampaigns from '../../components/DisplayCreatorCampaigns';
import { useAppContext } from '../../context';
import Loader from '../../components/Loader';
import CategoryNav from '../../components/CategoryNav';
import Head from 'next/head';
import { CreatorCampignProp } from '../../utils';
import DisplaySingleCreator from '../../components/DisplaySingleCreator';
import DisplaySingleCampaign from '../../components/DisplaySingleCampaign';

const AllCampaigns = () => {
    const [ isLoading, setIsLoading ] = useState(false);
    const [campaigns, setCampaigns] = useState([]);
    const [creatorCampaigns, setCreatorCampaigns] = useState([]);
    const [singleCreator, setSingleCreator] = useState([]);
    const [singleCampaign, setSingleCampaign] = useState([]);
    const [creatorId, setCreatorId] = useState("");
    const [campaignId, setCampaignId] = useState("");
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

    const handleFormInputChange = (e: any) => {
        if(e.target.value === ""){
            setSingleCampaign([])
            setSingleCreator([])
        }else{
        const filteredCreator = creatorCampaigns.filter((campaign: CreatorCampignProp) => campaign.pId == Number(e.target.value));
        const filteredCampaign = campaigns.filter((campaign: CreatorCampignProp) => campaign.pId == Number(e.target.value));
        setSingleCampaign(filteredCampaign);
        setSingleCreator(filteredCreator);
        }

        setCreatorId(e.target.value);
        setCampaignId(e.target.value);
    }


    return (
        <div>
            <Head>
                <title>Darate | Campaigns</title>
                <link rel="icon" href="../fantom-ftm-logo.svg" />
            </Head>
            <div className="search mb-[2rem] flex justify-center items-center w-full">
                <input type="number" 
                className='remove-arrows border-[1px] border-[#3a3a43] bg-transparent p-3 outline-none focus:ring focus:ring-blu focus:border-none rounded-md w-[20rem] placeholder:text-[#4b5264] tracking-[1rem]' 
                placeholder='creator id'
                onChange={(e) => handleFormInputChange(e)} />
            </div>

            {/* category list */}
            <CategoryNav />


            {isLoading && <Loader text='Fetching Campaigns' />}

            <div className="flex flex-col gap-[3rem]">
            { (singleCampaign.length === 0 && campaignId.length === 0) ? (
                <DisplayCampaigns 
                title="All Campaigns"
                isLoading={isLoading}
                campaigns={campaigns} />
            ) : (
                <DisplaySingleCampaign 
                isLoading={isLoading} 
                campaigns={singleCampaign} />
                
            ) }

            {/* <DisplayCampaigns 
            title="All Campaigns"
            isLoading={isLoading}
            campaigns={campaigns} /> */}

            { (singleCreator.length === 0 && creatorId.length === 0) ? (
                <DisplayCreatorCampaigns
                title="All Creators"
                isLoading={isLoading}
                campaigns={creatorCampaigns} />
            ) : (
                <DisplaySingleCreator 
                isLoading={isLoading} 
                campaigns={singleCreator} />
                
            ) }
            </div>
        </div>
    )
}

export default AllCampaigns;