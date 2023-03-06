import Link from 'next/link';
import React, { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BsArrowRightShort } from "react-icons/bs"

function Faq() {
    const [faqs, setFaqs] = useState([
        {
            question: "Question 1",
            answer:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa blanditiis animi natus dicta ipsam magni, aliquam delectus voluptatum. Animi, eius!",
            open: true
        },
        {
            question: "Question 2",
            answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa blanditiis animi natus dicta ipsam magni, aliquam delectus voluptatum. Animi, eius!",
            open: false
        },
        {
            question:
                "Question 3",
            answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa blanditiis animi natus dicta ipsam magni, aliquam delectus voluptatum. Animi, eius!",
            open: false
        },
        {
            question: "Question 4",
            answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa blanditiis animi natus dicta ipsam magni, aliquam delectus voluptatum. Animi, eius!",
            open: false
        },
        {
            question: "Question 5",
            answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa blanditiis animi natus dicta ipsam magni, aliquam delectus voluptatum. Animi, eius!",
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
                        <div className={`question ${faq.open ? "" : ""}  p-6 flex gap-4 justify-between items-center`}>
                            <h1 className="font-bold text-White">{faq.question}</h1>
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