import React from 'react'
import { RotateSpinner } from "react-spinners-kit";

interface LoaderProp{
    text?: string
}

const Loader = ({ text }: LoaderProp) => {
    return (
        <div className="fixed inset-0 z-10 h-screen bg-[rgba(0,0,0,0.7)] flex items-center justify-center flex-col">
            <RotateSpinner size={150} color="#1EC49E" />
            <p className='text-[#959191] text-2xl mt-[2rem]'>{text}</p>
        </div>
    )
}

export default Loader