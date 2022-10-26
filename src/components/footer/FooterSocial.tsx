
import React from 'react';
import icLogo from '@/assets/images/footer/f_logo.png'
import icSocial from '@/assets/images/footer/f_ic_social.png'

const FooterSocial:React.FC = () =>{
    return (
        <div className="block lg:flex justify-between">
            <div className='content cursor-pointer pt-8'>
                <img src={icLogo} className='w-48 mx-auto lg:mx-0' alt='logo' />
            </div>
            <div className='content cursor-pointer pt-8'>
                <img src={icSocial} className='mx-auto lg:mx-0' alt='logo' />
            </div>
        </div>
    )
}

export default FooterSocial;