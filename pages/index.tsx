import type { NextPage } from 'next';
import { useRouter } from "next/router"
import Head from 'next/head';
import Image from 'next/image';
import EduImg from "../assets/education_svg.svg";
import TechImg from "../assets/tech_svg.svg";
import NatureImg from "../assets/nature.svg";
import HealthImg from "../assets/health_svg.svg"
import Link from 'next/link';
import { CustomButton } from '../components';
import Faq from '../components/Faq';

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <div className="mb-[3rem]">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className='heading text-[2.7rem] md:text-[4rem]'>Hello, <br /> Are You Ready For <br /> <span className='bg-blu text-black block px-4 w-max text-[3rem] md:text-[4rem] rounded-md'>Crowdfunding?</span></h1>
      <p className='mt-4 w-[90%] md:w-[70%] text-base md:text-[1.7rem] leading-[1.7rem] md:leading-[2.5rem]'>Are you a <span className='text-blu'>creator</span> who needs a way to get funds from their loyal fans or you just need to raise funds for your <span className='text-blu'>campaign</span>?.</p>
      <p className='mt-4 w-[90%] md:w-[70%] text-base md:text-[1.7rem] leading-[1.7rem] md:leading-[2.5rem]'><span className='text-blu'>Darate</span> is a crowdfunding platform that allows you to do so, you can also support your favorite creators or if you're just looking to help those in need and support their campaign this is the right platform for you, built on the blockchain and fully powered by the Fantom Network.</p>
      <CustomButton btnType='button' styles='hover:scale-110 transition-all duration-300 ease-in-out shadow ml-[2rem] bg-dark mt-[2rem] text-base md:text-[1.4rem]' title='Create a campaign now!' handleClick={() => router.push("/createCampaign")} />
      {/* categories */}
      <div className="categories mt-[6rem]">
        <h2 className='text-2xl heading mb-[2rem]'>Select Campaign Category 🔥</h2>
        <div className="first grid grid-cols-1 md:grid-cols-[60%_38%] gap-4 mb-[2rem]">
          {/* education */}
          <Link href="/allCampaign/Education">
          <div className="education relative bg-orang rounded-3xl h-[20vh] md:h-[30vh] overflow-hidden">
            <h4 className='text-black heading text-3xl font-bold absolute bottom-[10%] left-[5%]'>Education</h4>
            <Image className="w-[50%] md:w-[50%] absolute bottom-0 -right-12" src={EduImg} alt="" width={20}/>
          </div>
          </Link>
          {/* technology */}
          <Link href="/allCampaign/Tech">
          <div className="education relative bg-[#B9F3FC] rounded-3xl h-[20vh] md:h-[30vh] overflow-hidden">
            <Image className="w-[50%] md:w-[85%] absolute bottom-[1rem] -right-12" src={TechImg} alt="" width={20}/>
            <h4 className='text-black heading text-3xl font-bold absolute bottom-[10%] left-[5%]'>Technology</h4>
          </div>
          </Link>
        </div>
        {/* others */}
        <Link href="/allCampaign/Others">
          <div className="education my-[2rem] relative bg-dark rounded-3xl h-[10vh] md:h-[10vh] overflow-hidden p-6 flex items-center justify-center">
            {/* <Image className="w-[50%] md:w-[85%] absolute bottom-[1rem] -right-12" src={TechImg} alt="" width={20}/> */}
            <h4 className='text-white heading text-3xl font-bold '>Others</h4>
          </div>
        </Link>
        {/* others end */}
        <div className="first grid grid-cols-1 md:grid-cols-[38%_60%] gap-4">
          {/* Nature */}
          <Link href="/allCampaign/Nature">
          <div className="education relative bg-[#E3ACF9] rounded-3xl h-[20vh] md:h-[30vh] overflow-hidden">
            <Image className="w-[50%] md:w-[60%] absolute bottom-0 -right-12" src={NatureImg} alt="" width={20}/>
            <h4 className='text-black heading text-3xl font-bold absolute bottom-[10%] left-[5%]'>Nature</h4>
          </div>
          </Link>
          {/* health */}
          <Link href="/allCampaign/HealthCare">
          <div className="education relative bg-health rounded-3xl h-[20vh] md:h-[30vh] overflow-hidden">
            <h4 className='text-black heading text-3xl font-bold absolute bottom-[10%] left-[5%]'>HealthCare</h4>
            <Image className="w-[50%] md:w-[60%] absolute bottom-0 -right-12" src={HealthImg} alt="" width={20}/>
          </div>
          </Link>
        </div>
      </div>
      {/* Creator Section */}
      <h2 className='heading text-[2rem] md:text-[3rem] mt-[5rem]'>Let's aid you <br /> in providing Funds <br /> for your favourite <br /> <span className='bg-blu text-black block px-4 w-max text-[3rem] md:text-[4rem] rounded-md'>Creator</span></h2>
      <p className='mt-[3rem] w-[90%] md:w-[70%] text-base md:text-[1.7rem] leading-[1.7rem] md:leading-[2.5rem]'>Are you looking for a creator to aid their growth or you already have the <span className='text-blu'>id</span> of your favourite <span className='text-blu'>creator</span>, begin exploring creators now.</p>
      <CustomButton btnType='button' styles='hover:scale-110 transition-all duration-300 ease-in-out shadow ml-[2rem] bg-dark mt-[2rem] text-base md:text-[1.4rem]' title='Explore Creators' handleClick={() => router.push("/creators")} />
      {/* faq */}
      <Faq />
      <CustomButton btnType='button' styles='hover:scale-110 transition-all duration-300 ease-in-out shadow ml-[2rem] bg-dark mt-[4rem] text-base md:text-[1.4rem]' title='Donate ❤️' handleClick={() => router.push("/creators/0")} />
    </div>
  )
}

export default Home
