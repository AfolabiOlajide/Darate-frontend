import Image from 'next/image';

import Image404 from "../assets/404.svg"

const NotFound = () => {
    return (
        <div className='flex justify-center items-center h-[80vh] w-full flex-col'>
            <Image src={Image404} className="w-[50rem]" width={20} alt="404" />
            <p className='mt-[4rem] font-bold text-[2rem] md:text-[3rem] text-[#34403d]'>Nothing Found</p>
        </div>
    )
}

export default NotFound