import FooterFrm from "./FooterFrm";
import FooterMenu from "./FooterMenu";
import FooterPosts from "./FooterPosts";
import FooterProducts from "./FooterProducts";
import FooterSocial from "./FooterSocial";

import icHr from '@/assets/images/footer/f_hr_shadow.png'

const Footer = () => {
  return (
    <div className="bg-black w-full">
        <div className="container mx-auto">

            <div className="flex items-center justify-center relative">
                <img className="w-full h-16" src={icHr} />
                <hr className="" />
            </div>

            <FooterSocial />

            <div className="block lg:flex justify-between mt-14 md:gap-x-40">
                <FooterFrm />
                <div className="flex-auto flex flex-wrap justify-space-around lg:place-content-center lg:justify-between items-baseline space-x-10 gap-2 lg:space-x-10 pl-4 lg:pl-0">
                    <FooterProducts />
                    <FooterMenu />
                    <FooterPosts />
                </div>
            </div>

        </div>
        <div className="w-full mt-4 lg:mt-20 items-center justify-center border-[#f3a511] border-b-4 text-center">
            <div className='leading-10 text-white py-7 text-sm lg:text-base'>
                <span>KATANA INU IS A PROJECT FROM</span> <span className="text-[#e39a10]">CHAINVISION GAMES</span>
            </div>
        </div>
    </div>
  )
}

export default Footer;


