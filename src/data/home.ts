export interface SwiperImage {
  src: string | ImageMetadata
  widths?: number[];
  sizes?: string;
  alt: string;
  url: string;
  wrapper?: string;
  class?: string;
}

import slide1 from "~/assets/home/profile__cutout--circle.png";
import slide2 from "~/assets/work/mykringapp/product.png";
import slide3 from "~/assets/work/onepay/product.png";
import slide4 from "~/assets/work/mykring/product.png";
import slide5 from "~/assets/work/twotw/product.png";

export const heroSlides: SwiperImage[] = [
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
    alt: "iPad mockup of twotw website",
    url: '/work/twotw',
  },
];

export interface Activity {
  preposition: string
  role: string
}

export const roles: Activity[] = [
  { preposition: 'work in', role: 'Front-End Development' },
  { preposition: 'work on', role: 'Ui/UX Design' },
  { preposition: 'create', role: 'inspired products' },
  { preposition: 'build', role: 'E-mail layouts' },
  { preposition: 'oversee', role: 'Content management' },
];

