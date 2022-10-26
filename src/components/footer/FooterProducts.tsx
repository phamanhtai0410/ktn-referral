import React from 'react';

const FooterProducts:React.FC = () =>{

    const items = ["Pancakeswap","Uniswap","Whitepaper","Roadmap","Tokenomics","FAQ"];
    const listItems = items.map((number) =>
        <li key={number} className="text-[#b4b4b5] pt-[10px] cursor-pointer">{number}</li>
    );

    return (
        <div className='mt-10'>
            <p className="text-[#ffffff] font-blome">Products</p>
            <ul className="mt-4">
                {listItems}
            </ul>
        </div>
    )

}

export default FooterProducts;