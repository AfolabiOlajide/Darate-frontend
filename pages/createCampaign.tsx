import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useNetworkMismatch, useNetwork } from "@thirdweb-dev/react"
import { ethers } from "ethers";
import { BiMoneyWithdraw } from "react-icons/bi"

import { useAppContext } from '../context';
import { CustomButton, FormField } from '../components';
import { checkIfImage } from "../utils"
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import Head from 'next/head';
import { FiArrowLeft } from 'react-icons/fi';

const CreateCampaign = () => {
    const isMismatched = useNetworkMismatch();
    const [{ data, error, loading }, ] = useNetwork();
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false);
    const { address, createCampaign, createCreatorCampaign } = useAppContext();
    const [form, setForm] = useState({
        name: "",
        title: "",
        description: "",
        category: "HealthCare",
        deadline: "",
        target: "",
        image: "",
    });
    const [CampaignType, setCampaignType] = useState("normal");

    const handleFormFieldChange = (fieldName: any, e: any) => {
        setForm({ ...form, [fieldName]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if(!address){
            return toast.warn("Please Connect your wallet");
        }
        if(isMismatched){
            return toast.warn("please switch to the Scroll Sepolia network");
        }

        checkIfImage(form.image, async(exists) => {
            if(exists){
                setIsLoading(true);
                if(CampaignType === "normal"){
                    await createCampaign({ ...form, target: ethers.utils.parseUnits(form.target, 18) }).catch(() => {
                        router.push('/createCampaign');
                        toast.error("an error occurred");
                    });
                }else if(CampaignType === "creator"){
                    await createCreatorCampaign({ ...form}).catch(() => {
                        router.push('/createCampaign');
                        toast.error("an error occurred");
                    })
                }
                setIsLoading(false);
                router.push('/profile');
                toast.error("an error occurred");
            }else{
                toast.warn("provide a valid Image url");
                setForm({...form, image: ""});
            }
        })
    };

    const handleCampaignType = (e: any) => {
        setCampaignType(e.target.value)
    }


    return (
        <>
        <Head>
            <title>Darate | Create Campaign</title>
            <link rel="icon" href="/fantom-ftm-logo.svg" />
        </Head>
        <div className="back -mt-[2rem] mb-[3rem] w-max cursor-pointer" onClick={() => router.back()}>
            <FiArrowLeft className='w-[2rem] h-[2rem]' />
        </div>
        <div className='bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4'>
            { isLoading && <Loader text='Transaction in progress' /> }
            <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-blu rounded-[10px]">
                <h1 className="heading font-bold sm:text-[25px] text-[18px] leading-[38px] text-black">Start a Campaign</h1>
            </div>

            {/* form */}
            <form onSubmit={handleSubmit} className="w-full mt-[65px] flex flex-col gap-[30px]">
                {/* Campaign type */}
                <div className="flex-1 flex flex-col">
                    <span className='font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]'>Campaign Type <span className='text-red-400'>*</span> (you can only have one creator campaign, read FAQ to learn more)</span>
                    <select name="Campaign type" placeholder='Category' className='flex-1 py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent text-[#4b5264] text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]' id="" onChange={(e) => handleCampaignType( e)}>
                        <option className='text-black' value="normal">Normal Campaign</option>
                        <option className='text-black' value="creator">Creator</option>
                    </select>
                </div>
                <div className="flex flex-wrap gap-[40px]">
                    {CampaignType === "creator" && <FormField 
                        labelName="Your Name"
                        placeholder="John Doe"
                        inputType="text"
                        value={form.name}
                        handleChange={(e) => handleFormFieldChange("name", e)}
                    />}
                    { CampaignType === "normal" && <FormField 
                        labelName="Campaign Title"
                        placeholder="Write a title for your campaign"
                        inputType="text"
                        value={form.title}
                        handleChange={(e) => handleFormFieldChange("title", e)}
                    />}
                    {CampaignType === "normal" && <div className="flex-1 flex flex-col">
                        <span className='font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]'>Category <span className='text-red-400'>*</span></span>
                        <select name="Category" placeholder='Category' className='flex-1 py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent text-[#4b5264] text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]' id="" onChange={(e) => handleFormFieldChange("category", e)}>
                            <option className='text-black' value="HealthCare">Health Care</option>
                            <option className='text-black' value="Education">Education</option>
                            <option className='text-black' value="Nature">Nature</option>
                            <option className='text-black' value="Tech">Tech</option>
                            <option className='text-black' value="Others">Others</option>
                        </select>
                    </div>}
                </div>
                <FormField 
                    labelName="Description"
                    placeholder="Write a description of your campaign"
                    isTextArea
                    value={form.description}
                    handleChange={(e) => handleFormFieldChange("description", e)}
                />
                {/* you will get 100% of the rasied amount */}
                <div className="w-full flex justify-start items-center p-4 bg-blu h-[120px] rounded-[10px]">
                    <BiMoneyWithdraw className='w-[40px] h-[40px] text-black' />
                    <h4 className="font-bold text-[25px] text-black ml-[20px] heading">You will get 100% of the raised amount</h4>
                </div>
                {CampaignType === "normal" && <div className="flex flex-wrap gap-[40px]">
                    <FormField 
                        labelName="Goal"
                        placeholder="FTM 20"
                        inputType="number"
                        value={form.target}
                        handleChange={(e) => handleFormFieldChange("target", e)}
                    />
                    <FormField 
                        labelName="End Date"
                        placeholder="End date"
                        inputType="date"
                        value={form.deadline}
                        handleChange={(e) => handleFormFieldChange("deadline", e)}
                    />
                </div>}
                <FormField 
                    labelName="Campaign image"
                    placeholder="Place image URL of your campaign"
                    inputType="url"
                    value={form.image}
                    handleChange={(e) => handleFormFieldChange('image', e)}
                />
                <div className="flex justify-center items-center mt-[40px]">
                    <CustomButton 
                    btnType="submit"
                    title="Submit new campaign"
                    styles="bg-blu text-black"
                    />
                </div>
            </form>
        </div>
        </>
    )
}

export default CreateCampaign