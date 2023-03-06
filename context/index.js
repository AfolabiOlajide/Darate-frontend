import React, { useContext, createContext,  } from 'react';

import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { EditionMetadataWithOwnerOutputSchema } from '@thirdweb-dev/sdk';

const appContext = createContext();

export const AppContextProvider = ({ children }) => {
    const { contract } = useContract('0x94031981529CE412087aAC46Cb43ccd6D6f7e19C'); // replace with smart contract address 
    const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign');
    const { mutateAsync: createCreatorCampaign } = useContractWrite(contract, 'createCreatorCampaign');

    const address = useAddress();
    const connect = useMetamask();

    const publishCampaign = async (form) => {
        try {
        const data = await createCampaign([
            address, // owner
            form.title, // title
            form.description, // description
            form.category, // category
            form.target,
            new Date(form.deadline).getTime(), // deadline,
            form.image
        ])

        console.log("contract call success", data)
        } catch (error) {
        console.log("contract call failure", error)
        }
    }

    const publishCreatorCampaign = async (form) => {
        try {
        const data = await createCreatorCampaign([
            address, // owner
            form.name, // title
            form.description, // description
            form.image
        ])

        console.log("contract call success", data)
        } catch (error) {
        console.log("contract call failure", error)
        }
    }

    const getCampaigns = async () => {
        const campaigns = await contract.call('getCampaigns');

        const parsedCampaings = campaigns.map((campaign, i) => ({
        owner: campaign.owner,
        title: campaign.title,
        description: campaign.description,
        category: campaign.category,
        target: ethers.utils.formatEther(campaign.targetAmount.toString()),
        deadline: campaign.deadline.toNumber(),
        amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
        image: campaign.image,
        pId: i
        }));

        return parsedCampaings;
    }

    const getCreatorCampaigns = async () => {
        const campaigns = await contract.call('getCreatorCampaigns');

        const parsedCampaings = campaigns.map((campaign, i) => ({
        owner: campaign.owner,
        name: campaign.name,
        description: campaign.description,
        amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
        image: campaign.image,
        pId: i
        }));

        return parsedCampaings;
    }

    const getUserCampaigns = async () => {
        const allCampaigns = await getCampaigns();

        const filteredCampaigns = allCampaigns.filter((campaign) => campaign.owner === address);

        return filteredCampaigns;
    }

    const getUserCreatorCampaigns = async () => {
        const allCampaigns = await getCreatorCampaigns();

        const filteredCampaigns = allCampaigns.filter((campaign) => campaign.owner === address);

        return filteredCampaigns;
    }

    const donate = async (pId, amount) => {
        const data = await contract.call('donateToCampaign', pId, { value: ethers.utils.parseEther(amount)});

        return data;
    }

    const donateCreator = async (pId, amount) => {
        const data = await contract.call('donateToCreatorCampaign', pId, { value: ethers.utils.parseEther(amount)});

        return data;
    }

    const getDonations = async (pId) => {
        const donations = await contract.call('getDonators', pId);
        const numberOfDonations = donations[0].length;

        const parsedDonations = [];

        for(let i = 0; i < numberOfDonations; i++) {
        parsedDonations.push({
            donator: donations[0][i],
            donation: ethers.utils.formatEther(donations[1][i].toString())
        })
        }

        return parsedDonations;
    }

    const getCreatorDonations = async (pId) => {
        const donations = await contract.call('getCreatorDonators', pId);
        const numberOfDonations = donations[0].length;

        const parsedDonations = [];

        for(let i = 0; i < numberOfDonations; i++) {
        parsedDonations.push({
            donator: donations[0][i],
            donation: ethers.utils.formatEther(donations[1][i].toString())
        })
        }

        return parsedDonations;
    }



    return (
        <appContext.Provider
        value={{ 
            address,
            contract,
            connect,
            createCampaign: publishCampaign,
            createCreatorCampaign: publishCreatorCampaign,
            getCampaigns,
            getCreatorCampaigns,
            getUserCampaigns,
            getUserCreatorCampaigns,
            donate,
            donateCreator,
            getDonations,
            getCreatorDonations
        }}
        >
        {children}
        </appContext.Provider>
    )
}

export const useAppContext = () => useContext(appContext);