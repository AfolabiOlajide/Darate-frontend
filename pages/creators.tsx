import React, { useState, useEffect } from 'react'
import DisplayCreatorCampaigns from '../components/DisplayCreatorCampaigns';
import { useAppContext } from '../context';
import Loader from '../components/Loader';
import { CreatorCampignProp } from '../utils';
import DisplaySingleCreator from '../components/DisplaySingleCreator';

const Creators = () => {
    const [ isLoading, setIsLoading ] = useState(false);
    const [creatorCampaigns, setCreatorCampaigns] = useState([]);
    const [singleCreator, setSingleCreator] = useState([]);
    const [creatorId, setCreatorId] = useState();
    const { address, contract, getCreatorCampaigns } = useAppContext();

    const getSingleCreator = () => {
        const filteredCreator = creatorCampaigns.filter((campaign: CreatorCampignProp) => campaign.pId === Number(creatorId));

        setSingleCreator(filteredCreator)
    }

    const handleFormInputChange = (e: any) => {
        console.log(e.target.value)
        setCreatorId(e.target.value)
        getSingleCreator()
    }

    const fetchCampaigns = async () => {
        setIsLoading(true);
        const data2 = await getCreatorCampaigns();
        setCreatorCampaigns(data2);
        setIsLoading(false);
    }

    useEffect(() => {
        if(contract) fetchCampaigns();
    }, [contract]);


    return (
        <div>
            {isLoading && <Loader text='Fetching Creators' />}
            <div className="search mb-[2rem] flex justify-center items-center w-full">
                <input type="number" 
                className='remove-arrows border-[1px] border-[#3a3a43] bg-transparent p-3 outline-none focus:ring focus:ring-blu focus:border-none rounded-md w-[20rem] placeholder:text-[#4b5264] tracking-[1rem]' 
                placeholder='creator id'
                onChange={(e) => handleFormInputChange(e)} />
            </div>
            
            { creatorId ? (
                <DisplaySingleCreator 
                isLoading={isLoading} 
                campaigns={singleCreator} />
            ) : (
                <DisplayCreatorCampaigns
            title="All Creators"
            isLoading={isLoading}
            campaigns={creatorCampaigns} />
            ) }
            
        </div>
    )
}

export default Creators;