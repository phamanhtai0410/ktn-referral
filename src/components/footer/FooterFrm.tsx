
const FooterFrm = () =>{
    return (
        <div className="flex-none w-full lg:w-[328px] mt-10 p-4 lg:p-0">
            <div className='text-white'>
                <h4 className="font-blome tracking-[.175em]">Don't miss our latest news</h4>
                <div className='pt-6 relative'>
                    <input
                    placeholder='Email Address'
                    className='bg-transparent appearance-none border border-zinc-500 rounded-3xl w-full py-2 px-4 h-14 text-gray-300 leading-relaxed focus:outline-none'
                    />
                    <button type='submit' className='btn-footer'>
                        Get News
                    </button>
                </div>
            </div>
            <div className="mt-10">
                <h4 className='text-white font-blome'>Disclaimer</h4>
                <p className='text-[#b4b4b5] pt-6'>Nothing in this website constitutes financial advice, and it is always recommended to consult a qualified financial advisor before participating in any token or NFT purchases.</p>
            </div>
        </div>
    )

}

export default FooterFrm;