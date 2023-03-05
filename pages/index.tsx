import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import EduImg from "../assets/education_svg.svg";
import TechImg from "../assets/tech_svg.svg";
import NatureImg from "../assets/nature.svg";
import HealthImg from "../assets/health_svg.svg"

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className='heading text-[3rem] md:text-[4rem]'>Hey <br /> Ready For <br /> CrowdFunding?</h1>
      <p className='mt-4 w-[80%] md:w-[50%]'>Support creators, Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptate, temporibus consectetur! Fugiat est suscipit tempora non quasi, ex quibusdam tenetur.</p>
      {/* categories */}
      <div className="categories mt-[4rem]">
        <h2 className='text-2xl heading mb-[2rem]'>Select Category 🔥</h2>
        <div className="first grid grid-cols-1 md:grid-cols-[60%_38%] gap-4 mb-[2rem]">
          {/* education */}
          <div className="education relative bg-orang rounded-3xl h-[20vh] md:h-[30vh] overflow-hidden">
            <h4 className='text-black heading text-3xl font-bold absolute bottom-[10%] left-[5%]'>Education</h4>
            <Image className="w-[50%] md:w-[50%] absolute bottom-0 -right-12" src={EduImg} alt="" width={20}/>
          </div>
          {/* technology */}
          <div className="education relative bg-[#B9F3FC] rounded-3xl h-[20vh] md:h-[30vh] overflow-hidden">
            <Image className="w-[50%] md:w-[85%] absolute bottom-[1rem] -right-12" src={TechImg} alt="" width={20}/>
            <h4 className='text-black heading text-3xl font-bold absolute bottom-[10%] left-[5%]'>Technology</h4>
          </div>
        </div>

        <div className="first grid grid-cols-1 md:grid-cols-[38%_60%] gap-4">
          {/* Nature */}
          <div className="education relative bg-[#E3ACF9] rounded-3xl h-[20vh] md:h-[30vh] overflow-hidden">
            <Image className="w-[50%] md:w-[60%] absolute bottom-0 -right-12" src={NatureImg} alt="" width={20}/>
            <h4 className='text-black heading text-3xl font-bold absolute bottom-[10%] left-[5%]'>Nature</h4>
          </div>
          {/* health */}
          <div className="education relative bg-[#FEDEFF] rounded-3xl h-[20vh] md:h-[30vh] overflow-hidden">
            <h4 className='text-black heading text-3xl font-bold absolute bottom-[10%] left-[5%]'>HealthCare</h4>
            <Image className="w-[50%] md:w-[60%] absolute bottom-0 -right-12" src={HealthImg} alt="" width={20}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
