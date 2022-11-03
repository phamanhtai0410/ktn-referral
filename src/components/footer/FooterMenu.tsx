const FooterMenu = () =>{

    const items = ["Contact Us","Discord","Medium","Reddit","ChainVision Games","Privacy","Terms Of Service","Cookies Policy"]
    const listItems = items.map((number) =>
        <li key={number} className="text-[#b4b4b5] pt-[10px] cursor-pointer">{number}</li>
    );

    return (
        <div className="mt-10">
            <p className="text-[#ffffff] font-blome">Need help? </p>
            <ul className="mt-4">
                {listItems}
            </ul>
        </div>
    )

}

export default FooterMenu;