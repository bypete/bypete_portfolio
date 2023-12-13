export type SocialLink = {
  platform: string;
  url: string;
  icon: string;
  footerOnly?: boolean
};

export type SiteInfo = {
  name: string;
  title: string;
  description: string;
  url: string;
  root: string;
  og: {
    image: {
      src: string
      alt: string
    };
    title: string
    description: string
  };
  icon: string;
  socials: SocialLink[];
  feed:{
    subtitle: string;
    filename: string;
    path: string;
    id: string;
  };
  jsonfeed: {
    path: string;
    url: string;
  };
  author: {
    name: string;
    email: string;
    url: string;
  };
};

const siteInfo: SiteInfo = {
  name: "byPete",
  title: "byPete | Portfolio Site",
  description: "Pete Wallace is an experienced Front-End developer based in Surrey, UK.",
  url: "https://bypete.uk",
  root: "https://bypete.uk/",
  og: {
    image: {
      src: "/og/og__home.jpg",
      alt: "Portfolio Site",
    },
    title: "A more engaging title",
    description: "Something to entice",
  },
  icon: "/favicon.ico",
  socials: [
    {
      platform: "linkedin",
      url: "https://www.linkedin.com/in/peter-wallace-a5002a7a/",
      icon: "mdi:linkedin",
    },
    {
      platform: "github",
      url: "https://github.com/bypete-io",
      icon: "mdi:github",
    },
    {
      platform: "instagram",
      url: "https://www.instagram.com/bypete.uk/",
      icon: "mdi:instagram",
    },
  ],
  feed: {
    subtitle: "Portfolio site",
    filename: "feed.xml",
    path: "/feed/feed.xml",
    id: "https://byPete.uk/",
  },
  jsonfeed: {
    path: "/feed/feed.json",
    url: "https://byPete.uk/feed/feed.json",
  },
  author: {
    name: "Peter Wallace",
    email: "hello@byPete.uk",
    url: "https://byPete.uk/about/",
  },
};

export default siteInfo