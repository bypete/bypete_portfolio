export interface NavItem {
  label: string;
  url: string;
  children?: NavItem[];
}

export const navigation: NavItem[] = [
  {
      label: 'About',
      url: '/about/',
  },
  {
      label: 'Work',
      url: '/work/',
      children: [
          {
              label: 'MyKRing App',
              url: '/work/mykring-app/',
          },
          {
              label: 'K Ring',
              url: '/work/mykring/',
          },
          {
              label: 'OnePay',
              url: '/work/onepay/',
          },
          {
              label: 'AF&V Privilege MasterCard',
              url: '/work/afv/',
          },
          {
              label: 'Eastside Locks',
              url: '/work/eastsidelocks/',
          },
          {
              label: 'Elekta',
              url: '/work/elekta/',
          },
          {
              label: 'Emerging Payments Association',
              url: '/work/epa/',
          },
          {
              label: 'GamesYouLoved',
              url: '/work/gyl/',
          },
          {
              label: 'Kalixa',
              url: '/work/kalixa/',
          },
          {
              label: "Jeff Wayne's Musical version of The War of the Worlds",
              url: '/work/twotw/',
          },
      ],
  },
  {
    label: 'Connect',
    url: '/connect/',
  },
];

export const footerNavigation: NavItem[] = [
  {
    label: 'Contact',
    url: '/connect/',
  },
  {
      label: 'Legal notices',
      url: '/about/legal/',
  },
];