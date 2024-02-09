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
import slide2 from "~/content/work/mykringapp/product.png";
import slide3 from "~/content/work/onepay/product.png";
import slide4 from "~/content/work/mykring/product.png";
import slide5 from "~/content/work/twotw/product.png";

export const heroSlides: SwiperImage[] = [

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

