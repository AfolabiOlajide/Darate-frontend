import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import truncateEthAddress from 'truncate-eth-address'
import { ComponentProps } from '../utils';
import { BsGrid } from "react-icons/bs";
import { TiUserOutline } from "react-icons/ti";
import { GoMegaphone } from "react-icons/go";
import { IoIosPeople } from "react-icons/io";
import { FaPen } from "react-icons/fa";
import Link from 'next/link';
import { useNetworkMismatch, useDisconnect, } from "@thirdweb-dev/react";

import { useAppContext } from '../context';
import Loader from './Loader';
import { toast } from 'react-toastify';
import CustomButton from './CustomButton';

const MainLayout = ({children}: ComponentProps) => {
    const isMismatched = useNetworkMismatch();
    const [ isLoading, setIsLoading ] = useState(false);
    const disconnect = useDisconnect();
    const { address, connect } = useAppContext()
    const router = useRouter();
    // Fantom testnet id: 4002
    // Fantom network id: 250
    const connectToMetamask = async() => {
        setIsLoading(true)
        await connect()
        setIsLoading(false)
        
    }

    const disconnectWallet = async () => {
        setIsLoading(true)
        await disconnect();
        setIsLoading(false)
    }

    useEffect(() => {
        if(isMismatched){
            toast.warn("please switch to the Fantom Network")
        }

    }, [address])
    

    return (
        <>
            { isLoading && <Loader text='connecting wallet in progress'/> }
            <div className='bg-black text-white'>
                <main className='w-full p-2 md:w-[90%] lg:w-[70%] mx-auto min-h-screen pb-[7rem] md:pb-6'>
                    <div className="top-bar mb-[4rem] flex justify-between items-center">
                        <Link href="/">
                            <h1 className='heading text-[3rem]'>Darate</h1>
                        </Link>
                        <div className="nav-links hidden md:flex items-center gap-6">
                            <Link href="/allCampaign" className={`p-2 ${router.asPath === "/allCampaign" && "bg-blu/20" } rounded-md`}>
                                <span className={`md:text-[1rem] lg:text-[1.5rem] heading ${router.asPath === "/allCampaign" ? "text-blu" : "text-slate-500"}`}>Campaigns</span>
                            </Link>
                            <Link href="/creators" className={`p-2 ${router.asPath === "/creators" && "bg-blu/20" } rounded-md`}>
                                <span className={`md:text-[1rem] lg:text-[1.5rem] heading ${router.asPath === "/creators" ? "text-blu" : "text-slate-500"}`}>Creators</span>
                            </Link>
                            <Link href="/createCampaign" className={`p-2 ${router.asPath === "/createCampaign" && "bg-blu/20" } rounded-md`}>
                                <span className={`md:text-[1rem] lg:text-[1.5rem] heading ${router.asPath === "/createCampaign" ? "text-blu" : "text-slate-500"}`}>Create</span>
                            </Link>
                            <Link href="/profile" className={`p-2 ${router.asPath === "/profile" && "bg-blu/20" } rounded-md`}>
                                <span className={`md:text-[1rem] lg:text-[1.5rem] heading ${router.asPath === "/profile" ? "text-blu" : "text-slate-500"}`}>Profile</span>
                            </Link>
                        </div>
                        {/* button */}
                        <CustomButton btnType='button' styles='hover:scale-110 transition-all duration-300 ease-in-out shadow bg-dark  text-base md:text-[1.4rem]' title={address ? truncateEthAddress(address) : "Connect Wallet"} handleClick={() => {
                            if(address) disconnectWallet()
                            else connectToMetamask()
                        }}/>
                        {/* <div className="btn block bg-blu p-2 rounded-md cursor-pointer" onClick={() => {
                                if(address) disconnectWallet()
                                else connectToMetamask()
                            }}>
                            <span className='text-black heading font-bold md:text-[1rem] lg:text-[1.5rem]'>{address ? truncateEthAddress(address) : "Connect Wallet"}</span>
                        </div> */}
                    </div>
                    {children}
                </main>
                <nav className="side-bar md:hidden bg-ash/60 backdrop-blur-[2rem] fixed bottom-0 left-0 right-0 p-4 h-max flex flex-row gap-2 md:flex-col items-center justify-center">
                    <div className="flex flex-row gap-[1.5rem]">
                        <Link href="/" className={`p-2 ${router.asPath === "/" && "bg-blu/20" } rounded-md`}>
                            <BsGrid className={`text-[2rem] ${router.asPath === "/" ? "text-blu" : "text-slate-300"}`}/>
                        </Link>
                        <Link href="/allCampaign" className={`p-2 ${router.asPath === "/allCampaign" && "bg-blu/20" } rounded-md`}>
                            <GoMegaphone className={`text-[2rem] ${router.asPath === "/allCampaign" ? "text-blu" : "text-slate-300"}`}/>
                        </Link>
                        <Link href="/creators" className={`p-2 ${router.asPath === "/creators" && "bg-blu/20" } rounded-md`}>
                            <IoIosPeople className={`text-[2.5rem] ${router.asPath === "/creators" ? "text-blu" : "text-slate-300"}`}/>
                        </Link>
                        <Link href="/createCampaign" className={`p-2 ${router.asPath === "/createCampaign" && "bg-blu/20" } rounded-md`}>
                            <FaPen className={`text-[1.8rem] ${router.asPath === "/createCampaign" ? "text-blu" : "text-slate-300"}`}/>
                        </Link>
                        <Link href="/profile" className={`p-2 ${router.asPath === "/profile" && "bg-blu/20" } rounded-md`}>
                            <TiUserOutline className={`text-[2rem] ${router.asPath === "/profile" ? "text-blu" : "text-slate-300"}`}/>
                        </Link>
                    </div>
                </nav>
            </div>
        </>
    )
}

export default MainLayout