export interface SwiperClient {
  src: string | ImageMetadata
  widths?: Array
  sizes?: string
  alt: string
  url?: string
}

import afv from "~/assets/logos/afv.webp"
import bbc from "~/assets/logos/bbc.svg"
import bwin from "~/assets/logos/bwin.svg"
import elekta from "~/assets/logos/elekta.svg"
import epa from "~/assets/logos/epa.svg"
import gps from "~/assets/logos/gps.svg"
import gyl from "~/assets/logos/gyl.png"
import kalixa from "~/assets/logos/kalixa.svg"
import kring from "~/assets/logos/KRing.svg"
import mastercard from "~/assets/logos/mastercard.svg"
import mastercardrepower from "~/assets/logos/mastercard_repower.svg"
import onepay from "~/assets/logos/onepay.svg"
import optimalpayments from "~/assets/logos/optimalpayments.svg"
import oup from "~/assets/logos/oup.svg"
import twotw from "~/assets/logos/twotw.png"
import unicef from "~/assets/logos/unicef-uk.png"

export const clientSlides: SwiperClient[] = [
  {
    src: afv,
    alt: "AFV",
  },
  {
    src: bbc,
    alt: "BBC",
  },
  {
    src: bwin,
    alt: "bwin",
  },
  {
    src: elekta,
    alt: "Elekta",
  },
  {
    src: epa,
    alt: "Emerging Payments Association",
  },
  {
    src: gps,
    alt: "GPS",
  },
  {
    src: gyl,
    alt: "GamesYouLoved",
  },
  {
    src: kalixa,
    alt: "Kalixa",
  },
  {
    src: kring,
    alt: "K Ring",
  },
  {
    src: mastercard,
    alt: "Mastercard",
  },
  {
    src: mastercardrepower,
    alt: "Mastercard rePower",
  },
  {
    src: onepay,
    alt: "OnePay",
  },
  {
    src: optimalpayments,
    alt: "Optimal Payments",
  },
  {
    src: oup,
    alt: "Oxford University Press",
  },
  {
    src: twotw,
    alt: "The War of the Worlds",
  },
  {
    src: unicef,
    alt: "Unicef",
  }
]