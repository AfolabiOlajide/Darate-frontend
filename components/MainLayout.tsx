import React, { useState } from 'react'
import { useRouter } from 'next/router';
import truncateEthAddress from 'truncate-eth-address'
import { ComponentProps } from '../utils';
import { BsGrid } from "react-icons/bs";
import { TiUserOutline } from "react-icons/ti";
import { GoMegaphone } from "react-icons/go";
import { FaPen } from "react-icons/fa";
import { BiMoon } from "react-icons/bi"
import { BsSun } from "react-icons/bs"
import Link from 'next/link';

import { useAppContext } from '../context';

const MainLayout = ({children}: ComponentProps) => {
    const { address, connect } = useAppContext()
    const router = useRouter();
    const [isDark, setIsDark] = useState(true);

    return (
        <div className='bg-black text-white'>
            <main className='w-full p-2 md:w-[80%] lg:w-[70%] mx-auto min-h-screen pb-[7rem] md:pb-6'>
                <div className="top-bar mb-[4rem] flex justify-between items-center">
                    <Link href="/">
                        <h1 className='heading text-[3rem]'>Darate</h1>
                    </Link>
                    <div className="nav-links hidden md:flex items-center gap-6">
                        <Link href="/allCampaign" className={`p-2 ${router.asPath === "/allCampaign" && "bg-blu/20" } rounded-md`}>
                            <span className={`md:text-[1rem] lg:text-[1.5rem] heading ${router.asPath === "/allCampaign" ? "text-blu" : "text-slate-500"}`}>Campaigns</span>
                        </Link>
                        <Link href="/createCampaign" className={`p-2 ${router.asPath === "/createCampaign" && "bg-blu/20" } rounded-md`}>
                            <span className={`md:text-[1rem] lg:text-[1.5rem] heading ${router.asPath === "/createCampaign" ? "text-blu" : "text-slate-500"}`}>Create</span>
                        </Link>
                        <Link href="/profile" className={`p-2 ${router.asPath === "/profile" && "bg-blu/20" } rounded-md`}>
                            <span className={`md:text-[1rem] lg:text-[1.5rem] heading ${router.asPath === "/profile" ? "text-blu" : "text-slate-500"}`}>Profile</span>
                        </Link>
                    </div>
                    <div className="btn block bg-blu p-2 rounded-md cursor-pointer" onClick={() => {
                            if(address) return
                            else connect()
                        }}>
                        <span className='text-black heading font-bold md:text-[1rem] lg:text-[1.5rem]'>{address ? truncateEthAddress(address) : "Connect Wallet"}</span>
                    </div>
                </div>
                {children}
            </main>
            <nav className="side-bar md:hidden bg-ash/60 backdrop-blur-[2rem] fixed bottom-1 left-1 right-1 p-4 h-max rounded-[1rem] flex flex-row gap-2 md:flex-col items-center justify-center">
                <div className="flex flex-row gap-[1.5rem]">
                    <Link href="/" className={`p-2 ${router.asPath === "/" && "bg-blu/20" } rounded-md`}>
                        <BsGrid className={`text-[2rem] ${router.asPath === "/" ? "text-blu" : "text-slate-300"}`}/>
                    </Link>
                    <Link href="/allCampaign" className={`p-2 ${router.asPath === "/allCampaign" && "bg-blu/20" } rounded-md`}>
                        <GoMegaphone className={`text-[2rem] ${router.asPath === "/allCampaign" ? "text-blu" : "text-slate-300"}`}/>
                    </Link>
                    <Link href="/createCampaign" className={`p-2 ${router.asPath === "/createCampaign" && "bg-blu/20" } rounded-md`}>
                        <FaPen className={`text-[2rem] ${router.asPath === "/createCampaign" ? "text-blu" : "text-slate-300"}`}/>
                    </Link>
                    <Link href="/profile" className={`p-2 ${router.asPath === "/profile" && "bg-blu/20" } rounded-md`}>
                        <TiUserOutline className={`text-[2rem] ${router.asPath === "/profile" ? "text-blu" : "text-slate-300"}`}/>
                    </Link>
                </div>
                <div className="justify-self-end">
                    { isDark ? (
                        <div className="p-2 bg-ash/80 backdrop-blur-[2rem] rounded-md">
                            <BsSun className='text-[2rem] text-slate-300'/>
                        </div>
                    ) : (
                        <div className="p-2 bg-white/80 rounded-md">
                            <BiMoon className='text-[2rem] text-black'/>
                        </div>
                    ) }
                </div>
            </nav>
        </div>
    )
}

export default MainLayout