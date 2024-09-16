import { Carousel } from "flowbite-react";
import { fetchPublishedBanner } from '@/data/actions/banner';

export default async function CarouselHome() {
    let BannerData: any = null;
    BannerData = await fetchPublishedBanner()
    return (<>
        <div className="mx-4 h-56 sm:h-64 xl:h-80 2xl:h-96">
            {
                BannerData ? <>
                    <Carousel slideInterval={2500}>
                        {
                            BannerData && BannerData.map((banner: any, ind: number) => (
                                <a href={banner.link} target="_banner" key={ind}>
                                    <img src={`/uploads/banners/${banner.image}`} alt={banner.name} className='rounded-ee-none' />
                                </a>

                            ))
                        }
                    </Carousel>
                </> : <>
                    <Carousel>
                        <img src="https://flowbite.com/docs/images/carousel/carousel-1.svg" alt="..." />
                        <img src="https://flowbite.com/docs/images/carousel/carousel-2.svg" alt="..." />
                        <img src="https://flowbite.com/docs/images/carousel/carousel-3.svg" alt="..." />
                        <img src="https://flowbite.com/docs/images/carousel/carousel-4.svg" alt="..." />
                        <img src="https://flowbite.com/docs/images/carousel/carousel-5.svg" alt="..." />
                    </Carousel>
                </>
            }
        </div>
    </>)

}