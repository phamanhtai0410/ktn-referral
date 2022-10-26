
import React from 'react';
import imgPost1 from '@/assets/images/footer/f_img_post1.jpeg'

const FooterPosts:React.FC = () => {

    const items = [
        {
            index:1,
            images: imgPost1,
            date:"Dec 20, 2021",
            description:"METAVERSE GAME ANNOU...",
            link:"https://coinquora.com/katana-inu-p2e-metaverse-game-announces-exclusive-partnership-with-seed-thrift-ventures/"
        },
        {
            index:2,
            images: imgPost1,
            date:"Dec 20, 2021",
            description:"METAVERSE GAME ANNOU...",
            link:"https://coinquora.com/katana-inu-p2e-metaverse-game-announces-exclusive-partnership-with-seed-thrift-ventures/"
        },
        {
            index:3,
            images: imgPost1,
            date:"Dec 20, 2021",
            description:"METAVERSE GAME ANNOU...",
            link:"https://coinquora.com/katana-inu-p2e-metaverse-game-announces-exclusive-partnership-with-seed-thrift-ventures/"
        }
    ];

    const listItems = items.map((i) =>
        (
            <div key={i.index} className="pt-[16px] flex gap-x-2">
                <div className="w-1/3">
                  <a href={i.link}>
                    <img src={i.images} alt={i.images} />
                  </a>
                </div> 
                <a className='w-4/3 block text-base' href={i.link}>
                    <div className='text-[#727072]'>{i.date}</div>
                    <div className='contents text-[#eeeeee] '>
                        {i.description}
                    </div>
                </a>
            </div>
        )
    );

    return (
        <div className='hidden lg:block flex-initial w-[360px] mt-10'>
            <p className="text-[#ffffff] font-blome">Latest Posts</p>
            <div className="mt-4">
                {listItems}
            </div>
        </div>
    )

}

export default FooterPosts;