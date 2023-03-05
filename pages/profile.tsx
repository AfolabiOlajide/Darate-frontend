import React, { useState, useEffect } from 'react';
import { useRouter } from "next/router"
import DisplayCampaigns from '../components/DisplayCampaign';
import DisplayCreatorCampaigns from '../components/DisplayCreatorCampaigns';
import { useAppContext } from '../context';
import Loader from '../components/Loader';

const Profile = () => {
    const router = useRouter()
    const [ isLoading, setIsLoading ] = useState(false);
    const [userCampaigns, setUserCampaigns] = useState([]);
    const [userCreatorCampaign, setUserCreatorCampaign] = useState([]);
    const { address, contract, getUserCampaigns, getUserCreatorCampaigns } = useAppContext();

    const fetchCampaigns = async () => {
        setIsLoading(true);
        const data = await getUserCampaigns();
        const data2 = await getUserCreatorCampaigns();
        setUserCampaigns(data);
        setUserCreatorCampaign(data2);
        console.log(userCampaigns)
        console.log(userCreatorCampaign)
        setIsLoading(false);
    }

    useEffect(() => {
        if(contract) fetchCampaigns();
    }, [contract]);

    return (
        <>
            <div>
                {isLoading && <Loader />}
                <div className="flex flex-col gap-[3rem]">
                    <DisplayCampaigns 
                    title="Campaigns"
                    isLoading={isLoading}
                    campaigns={userCampaigns} />

                    <DisplayCreatorCampaigns
                    title="Creator Campaign"
                    isLoading={isLoading}
                    campaigns={userCreatorCampaign} />
                </div>
            </div>
        </>
    )
}

export default Profile;