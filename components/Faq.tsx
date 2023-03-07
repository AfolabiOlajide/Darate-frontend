import Link from 'next/link';
import React, { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BsArrowRightShort } from "react-icons/bs"

function Faq() {
    const [faqs, setFaqs] = useState([
        {
            question: "How many creator campaign can I create",
            answer:
                "There is only one creator campaign allowed for each registered user.",
            open: true
        },
        {
            question: "How can i add the Fantom Network to my metamask",
            answer: "Go to Chainlist.org then connect to your metamask wallet, search for Fantom and then click to add to metamask",
            open: false
        },
        {
            question:
                "Is there a limit to the number of campaigns I can create.",
            answer: "No, there is no limit, you can create as many campaigns as you want.",
            open: false
        },
        {
            question: "How do I get a my image link",
            answer: "For now we do not support the upload of images, you can search the web for the image you want using website like pexel and paste in the field available.",
            open: false
        },
        {
            question: "Are we paying a fee to use this platform",
            answer: "You are not required to pay any fee, just create your campaign, share and enjoy your funds.",
            open: false
        },
        {
            question: "I love this platform, how do i donate towards the growth",
            answer: "Thanks for the consideration we so much appreciate, you can click the link below the FAQs or search for the creator ID of 0",
            open: false
        }
    ]);

    const toggleFAQ = (index: number) => {
        setFaqs(
            faqs.map((faq, i) => {
                if (i === index) {
                faq.open = !faq.open;
                } else {
                faq.open = false;
                }
        
                return faq;
            })
            );
        };

    return (
        <div className='mt-[6rem]'>
            <h1 className='text-4xl heading font-medium text-center my-6'>Frequently Asked Questions</h1>
            <p className='mb-12 text-center text-slate-400'>What questions do you have in your mind, browse through our most asked questions</p>
            {/* faqs */}
            <div className="flex flex-col space-y-6">
                { faqs.map((faq, i) => (
                    <div className="rounded-xl bg-dark shadow-lg shadow-teal/80" key={i}>
                        <div className={`question ${faq.open ? "" : ""}  p-6 flex gap-4 justify-between items-center`}  >
                            <h1 className="font-bold text-blu" onClick={() => toggleFAQ(i)}>{faq.question}</h1>
                            {faq.open ? <AiOutlineMinus className='text-blu cursor-pointer' onClick={() => toggleFAQ(i)} /> : <AiOutlinePlus className='text-blu cursor-pointer' onClick={() => toggleFAQ(i)}/>}
                        </div>
                        <div className={`answer ${faq.open? "block" : "hidden"} bg-lightTeal`}>
                            <p className='text-slate-400 p-6'>{faq.answer}</p>
                        </div>
                    </div>
                )) }
            </div>
        </div>
    )
}

export default Faq;