import { IoHeart } from "react-icons/io5";
import logo from '../assets/logo_withTagNew.png'
import { footer_data } from "../assets/assets";
import BuyMeACoffee from "./BuyMeACoffee";

function Footer() {
  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 bg-(--primary-color)">
        <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b  border-gray-500/30 text-gray-500">
            <div>
                <img src={logo} className="w-full sm:w-50 "/>
            </div>
            <div className="flex flex-wrap justify-evenly w-full md:w-[45%] gap-5">
                {footer_data.map((section, index)=>(
                    <div key={index}>
                        <h3 className="font-semibold text-base text-(--secondary-color) md:mb-5 mb-2">{section.title}</h3>
                        <ul className="text-sm space-y-1">
                            {section.links.map((link, i)=>(
                                <li key={i}>
                                    <a href="#" className="hover:underline transition"> 
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>

        <div className="flex justify-around items-center">
        <p className="flex items-center justify-center gap-2 py-4 text-sm md:text-base text-gray-700/90">Made by Naveen with <span className="text-red-600"><IoHeart /></span></p>

        <BuyMeACoffee/>
        </div>
        
    </div>
  )
}

export default Footer