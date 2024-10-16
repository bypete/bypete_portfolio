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

import mykringapp from "~/assets/work/mykringapp/product.png";
import onepay from "~/assets/work/onepay/product.png";
import mykring from "~/assets/work/mykring/product.png";
import twotw from "~/assets/work/twotw/product.png";

export const heroSlides: SwiperImage[] = [

  {
    src: mykringapp,
    alt: "3 phones showing the myKRing app in use",
    url: '/work/mykring-app/',
    caption: {
      title: 'MyKRing app',
      copy: 'iOS + Android solution',
      label: 'bottom-fl-space-xl left-0 md:left-auto md:bottom-[20%] md:right-[15%]',
    },
  },
  {
    src: onepay,
    alt: "laptop and mobile",
    url: '/work/onepay/',
    caption: {
      title: 'OnePay',
      copy: 'Fast, easy, efficient wage payments',
      label: 'bottom-fl-space-xl left-0 md:left-auto md:bottom-[15%] md:left-[40%]',
    },
  },
  {
    src: mykring,
    alt: "Two floating phones showing responsive websites",
    url: '/work/mykring/',
    caption: {
      title: 'K Ring ',
      copy: 'Mobile-first responsive site',
      label: 'bottom-fl-space-xl left-0 md:left-auto md:bottom-[25%] md:right-[15%]',
    },
  },
  {
    src: twotw,
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

