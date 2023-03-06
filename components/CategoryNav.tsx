import React from 'react';
import Link from 'next/link';


const CategoryNav = () => {
    return (
        <div className="flex flex-wrap gap-[1.5rem] mb-[3rem]">
            {/* all */}
            <Link href="/allCampaign/all">
            <div className={`hold flex flex-col gap-2 items-center cursor-pointer`}>
                <span className={`block rounded-md py-2 px-5 bg-dark text-[1rem]`}>All</span>
            </div>
            </Link>
            {/* education */}
            <Link href="/allCampaign/Education">
            <div className={`hold flex flex-col gap-2 items-center cursor-pointer`}>
                <span className={`block rounded-md py-2 px-5 bg-orang text-black text-[1rem]`}>Education</span>
            </div>
            </Link>
            {/* tech */}
            <Link href="/allCampaign/Tech">
            <div className={`hold flex flex-col gap-2 items-center cursor-pointer`}>
                <span className={`block rounded-md py-2 px-5 bg-tech text-black text-[1rem]`}>Tech</span>
            </div>
            </Link>
            {/* nature */}
            <Link href="/allCampaign/Nature">
            <div className={`hold flex flex-col gap-2 items-center cursor-pointer`}>
                <span className={`block rounded-md py-2 px-5 bg-nature text-black text-[1rem]`}>Nature</span>
            </div>
            </Link>
            {/* health */}
            <Link href="/allCampaign/HealthCare">
            <div className={`hold flex flex-col gap-2 items-center cursor-pointer`}>
                <span className={`block rounded-md py-2 px-5 bg-health text-black text-[1rem]`}>HealthCare</span>
            </div>
            </Link>
            {/* others */}
            <Link href="/allCampaign/Others">
            <div className={`hold flex flex-col gap-2 items-center cursor-pointer`}>
                <span className={`block rounded-md py-2 px-5 bg-dark text-[1rem]`}>Others</span>
            </div>
            </Link>
        </div>
    )
}

export default CategoryNav