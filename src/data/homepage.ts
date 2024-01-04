import slide1 from "~/assets/homepage/profile__cutout--circle.png";
import slide2 from "~/assets/homepage/slide__3mobile.png";
import slide3 from "~/assets/homepage/slide__laptop.png";
import slide4 from "~/assets/homepage/slide__2mobile.png";
import slide5 from "~/assets/homepage/slide__ipad.png";

export interface SwiperImage {
  src: string
  title: string
  alt: string
  url?: string
  wrapper?: string
  class?: string
}

const homepageSwiper: SwiperImage[] = [
  {
    src: slide1,
    alt: "Headshot of Peter Wallace",
    url: '/about/',
    wrapper: 'rounded-full  aspect-square short:my-8 w-[20rem] h-[20rem] md:w-[30rem] md:h-[30rem] max-w-[calc(100vw-6rem)] max-h-[calc(100vw-6rem)] md:max-w-[calc(100svh-(var(--headerheight)*2))] md:max-h-[calc(100svh-(var(--headerheight)*2))] p-3 flex items-end justify-center bg-white bg-gradient-to-b from-white to-gray-200 drop-shadow-circle shadow-black/20',
    class: 'w-full auto',
  },
  {
    src: slide2,
    alt: "3 phones showing the myKRing app in use",
    url: '/work/mykring-app',
  },
  {
    src: slide3,
    alt: "laptop and mobile",
    url: '/work/onepay',
  },
  {
    src: slide4,
    alt: "Two floating phones showing responsive websites",
    url: '/work/onepay',
  },
  {
    src: slide5,
    alt: "iPad mockup of twotw websit",
    url: '/work/twotw',
  },
];

export default homepageSwiper;