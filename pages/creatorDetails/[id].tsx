import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FiArrowLeft } from "react-icons/fi"; 
import { useNetworkMismatch, } from "@thirdweb-dev/react";
// import { ethers } from 'ethers';

import { useAppContext } from '../../context';
import Loader from '../../components/Loader';
import { CustomButton } from '../../components';
import CountBox from '../../components/CountBox';
import { CreatorCampignProp } from '../../utils';
import Pixel from "../../assets/pixel.png"
import Image from 'next/image';
import { toast } from 'react-toastify';

interface Donors{
    donator: string[],
    donation: string[]
}

const CreatorDetails = () => {
    const isMismatched = useNetworkMismatch();
    const router = useRouter()
    const { id } = router.query;
    const { donateCreator, getCreatorDonations, contract, address, getCreatorCampaigns } = useAppContext();

    const [isLoading, setIsLoading] = useState(false);
    const [amount, setAmount] = useState('');
    const [donators, setDonators] = useState<Donors[]>([]);
    const [ campaign, setCampaign ] = useState<CreatorCampignProp>({
        owner: "",
        name: "",
        description: "",
        amountCollected: "",
        image: "",
        pId: 0,
    });

    const fetchCampaign = async () => {
        setIsLoading(true)
        const data = await getCreatorCampaigns();
        setIsLoading(false)

        const filteredCampaign = data.filter((campaign: CreatorCampignProp) => campaign.pId.toString() == id);
        setCampaign({
            owner: filteredCampaign[0].owner,
            name: filteredCampaign[0].name,
            description: filteredCampaign[0].description,
            amountCollected: filteredCampaign[0].amountCollected,
            image: filteredCampaign[0].image,
            pId: filteredCampaign[0].pId,
        });
    }

    const fetchDonators = async () => {
        const data = await getCreatorDonations(id);

        setDonators(data);
    }

    useEffect(() => {
        if(contract) fetchDonators();
        if(contract) fetchCampaign();
    }, [contract])

    const handleDonate = async () => {
        if(!address){
            return toast.warn("Please connect wallet");
        }
        if(isMismatched){
            return toast.warn("please switch network to Fantom testnet")
        }
        setIsLoading(true);

        await donateCreator(campaign.pId, amount); 

        router.push(`/allCampaign`);
        setIsLoading(false);
    }

    return (
        <div>
        {isLoading && <Loader text='Transaction in progress' />}
        <div className="back -mt-[2rem] w-max cursor-pointer" onClick={() => router.back()}>
            <FiArrowLeft className='w-[2rem] h-[2rem]' />
        </div>
        <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
            <div className="flex-1 flex-col">
            <img src={campaign.image} alt="campaign" className="w-full h-[410px] object-cover rounded-xl"/>
            </div>

            <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
            {address === campaign.owner && <CountBox title={`Total Raised`} value={campaign.amountCollected} />}
            <CountBox title="Total Backers" value={donators.length} />
            </div>
        </div>

        <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
            <div className="flex-[2] flex flex-col gap-[40px]">
            <div>
                <h4 className="heading font-bold text-[2rem] text-white uppercase">{campaign.name}</h4>

                <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
                <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                    <Image src={Pixel} alt="user" width={20} className="w-[60%] h-[60%] object-contain"/>
                </div>
                <div>
                    <h4 className="  font-semibold text-[14px] text-white break-all">{campaign.owner}</h4>
                </div>
                </div>
            </div>

            <div>
                <h4 className="  font-semibold text-[18px] text-white uppercase">Story</h4>

                <div className="mt-[20px]">
                    <p className="  font-normal text-[16px] text-[#808191] leading-[26px] text-justify">{campaign.description}</p>
                </div>
            </div>

            <div>
                <h4 className="  font-semibold text-[18px] text-white uppercase">Donators</h4>

                <div className="mt-[20px] flex flex-col gap-4">
                    {donators.length > 0 ? donators.map((item, index) => (
                    <div key={`${item.donator}-${index}`} className="flex justify-between items-center gap-4">
                        <p className="  font-normal text-[16px] text-[#b2b3bd] leading-[26px] break-all">{index + 1}. {item.donator}</p>
                        <p className="  font-normal text-[16px] text-[#808191] leading-[26px] break-ll">{item.donation}</p>
                    </div>
                    )) : (
                    <p className="  font-normal text-[16px] text-[#808191] leading-[26px] text-justify">No donators yet. Be the first one!</p>
                    )}
                </div>
            </div>
            </div>

            <div className="flex-1">
            <h4 className="  font-semibold text-[18px] text-white uppercase">Fund</h4>   

            <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
                <p className="  fount-medium text-[20px] leading-[30px] text-center text-[#808191]">
                Fund this campaign
                </p>
                <div className="mt-[30px]">
                <input 
                    type="number"
                    placeholder="FTM 20"
                    step="0.2"
                    className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent   text-white text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />

                <div className="my-[20px] p-4 bg-[#13131a] rounded-[10px]">
                    <h4 className="  font-semibold text-[14px] leading-[22px] text-white">Back this creator because you believe in them.</h4>
                    <p className="mt-[20px]   font-normal leading-[22px] text-[#808191]">Support their campaign for no reward, just because you appreciate what they do.</p>
                </div>

                <CustomButton 
                    btnType="button"
                    title="Fund Campaign"
                    styles="w-full bg-[#8c6dfd]"
                    handleClick={handleDonate}
                />
                </div>
            </div>
            </div>
        </div>
        </div>
    )
}

export default CreatorDetails