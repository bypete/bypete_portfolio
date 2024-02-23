export interface Caption {
  title?: string;
  copy?: string;
  label?: string;
}

export interface SwiperImage {
  src: string | ImageMetadata
  widths?: number[];
  sizes?: string;
  alt: string;
  url: string;
  wrapper?: string;
  class?: string;
  caption?: Caption;
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
    url: '/work/mykring-app/',
    caption: {
      title: 'MyKRing app',
      copy: 'iOS + Android solution',
      label: 'bottom-fl-space-xl left-0 md:left-auto md:bottom-[20%] md:right-[15%]',
    },
  },
  {
    src: slide3,
    alt: "laptop and mobile",
    url: '/work/onepay/',
    caption: {
      title: 'OnePay',
      copy: 'Fast, easy, efficient wage payments',
      label: 'bottom-fl-space-xl left-0 md:left-auto md:bottom-[15%] md:left-[40%]',
    },
  },
  {
    src: slide4,
    alt: "Two floating phones showing responsive websites",
    url: '/work/mykring/',
    caption: {
      title: 'K Ring ',
      copy: 'Mobile-first responsive site',
      label: 'bottom-fl-space-xl left-0 md:left-auto md:bottom-[25%] md:right-[15%]',
    },
  },
  {
    src: slide5,
    alt: "iPad mockup of twotw website",
    url: '/work/twotw/',
    caption: {
      title: 'TWOTW',
      copy: 'Jeff Wayne\'s Musical Version',
      label: 'bottom-fl-space-xl left-0 md:left-auto md:bottom-[10%] md:left-[33%]',
    },
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

