export interface Caption {
  title?: string;
  copy?: string;
  label?: string;
}

export interface SwiperImage {
  src: ImageMetadata
  widths?: number[];
  sizes?: string;
  alt: string;
  url: string;
  wrapper?: string;
  class?: string;
  caption?: Caption;
}

import shirley from "~/assets/work/shirleychauffeurs/product.png";
import mykringapp from "~/assets/work/mykringapp/product.png";
import onepay from "~/assets/work/onepay/product.png";
import mykring from "~/assets/work/mykring/product.png";
import twotw from "~/assets/work/twotw/product.png";

export const heroSlides: SwiperImage[] = [

  {
    src: shirley,
    alt: "laptop and mobile showing site in use",
    url: '/work/shirleychauffeurs/',
    caption: {
      title: 'Shirley Chauffeurs',
      copy: 'Branding and Online',
      label: 'bottom-fluid-xl left-0 md:left-auto md:bottom-[15%] md:right-[45%]',
    },
  }, {
    src: mykringapp,
    alt: "3 phones showing the myKRing app in use",
    url: '/work/mykring-app/',
    caption: {
      title: 'MyKRing app',
      copy: 'iOS + Android solution',
      label: 'bottom-fluid-xl left-0 md:left-auto md:bottom-[20%] md:right-[15%]',
    },
  },
  {
    src: onepay,
    alt: "laptop and mobile",
    url: '/work/onepay/',
    caption: {
      title: 'OnePay',
      copy: 'Fast, easy, efficient wage payments',
      label: 'bottom-fluid-xl left-0 md:left-auto md:bottom-[15%] md:left-[40%]',
    },
  },
  {
    src: mykring,
    alt: "Two floating phones showing responsive websites",
    url: '/work/mykring/',
    caption: {
      title: 'K Ring ',
      copy: 'Mobile-first responsive site',
      label: 'bottom-fluid-xl left-0 md:left-auto md:bottom-[25%] md:right-[15%]',
    },
  },
];

export interface Activity {
  subject: string
  preposition: string
  role: string
}

export const roles: Activity[] = [
  { subject: "I'm an", preposition: "experienced", role: "Creative Developer" },
  { subject: "I adopt a", preposition: 'mobile first', role: 'dev approach' },
  { subject: "I build", preposition: 'engaging', role: 'landing pages' },
  { subject: "I like to", preposition: "work in", role: "FrontEnd Development" },
  { subject: "I'm focused", preposition: 'on', role: 'Ui/UX Design' },
  { subject: "I like to", preposition: 'oversee', role: 'Content management' },
];

