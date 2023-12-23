import Swiper from "swiper";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

export default function CarouselCard() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        slidesPerView={10}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className="text-white w-auto"
      >
        {trending &&
          trending.map((item: any) => (
            <SwiperSlide key={item.id}>
              <Image
                width={200}
                height={200}
                src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                alt={item.title}
                className="object-cover rounded-md"
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
}
