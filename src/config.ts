import JsSandwich from './assets/projects/javascript-concept-sandwich-cover.png'
import RaycastExt from './assets/projects/raycast-plugin.png'
import AstroLeo from './assets/projects/astro-leo-theme-preview.png'
import GhostPay from './assets/projects/ghostpay-screenshot.png'
import MyProGuide from './assets/projects/my-pro-guide.png'

export const SITE_FAVICON = "/favicon.png";
export const SITE_LOGO = "/logo.png";
export const SITE_TITLE = "Powersandwich";
export const SITE_DESCRIPTION =
  `
  Powersandwich is a place where I document my learning and exploration of new knowledge. The name is inspired by my JavaScript book, "JavaScriptConcept Sandwich", but the content is not limited to JavaScript. It may also cover areas such as AI, Blockchain, and other software-related topics.
`;
export const ME_AVATAR = "/avatar.jpeg";
export const LANGUAGES = ['en', 'zh'];

export const MENUS = [
  {
    title: "About Me",
    link: "/me",
    target: "_self",
  },
  {
    title: "Posts",
    link: "/en/posts",
    target: "_self",
  },
  {
    title: "Github",
    link: "https://github.com/moojing",
    target: "_blank",
    icon: "github",
  },
];

export const FOOTER_CONTENT = "Powersandwich. All rights reserved.";

export const CONTACTS = {
  linkedIn: "https://www.linkedin.com/in/mu-jing-tsai/",
  github: "https://github.com/moojing",
  email: "mailto:moojitsai@gmail.com",
};

export const SLOGAN = "A bite a day keeps bugs away.";
export const ME_DESCRIPTION =
  `I am a passionate front-end developer with 4 years of experience in JavaScript and the author of a book on the
      subject. I enjoy exploring new advancements in software engineering. After transitioning from backend to frontend
      development, I have reignited my passion for new technologies. <br/> <br/> Currently, as a front-end programmer with a deep
      interest in blockchain, I am committed to contributing to this rapidly evolving field. I’ve successfully
      collaborated with developers in a Growth Squad to build experimental and innovative projects.`;

export const CV_LINK = 'https://flowcv.com/resume/wgn4reukrb4l'
export const WORK_EXPERIENCE = [
  {
    company: "protto Co. Ltd.",
    position: "Sr. Frontend Engineer",
    startDate: "2022",
    endDate: "2024",
  },

  {
    company: "AppWorks Blockchain Program",
    position: "Trainee",
    startDate: "2023",
    endDate: "2023",
  },

  {
    company: "Snapask Taiwan",
    position: "Frontend Engineer",
    startDate: "2020",
    endDate: "2022",
  },

  {
    company: "Chaintech Technology",
    position: "Frontend Engineer",
    startDate: "2018",
    endDate: "2020",
  },
];


export const PROJECTS = [
  {
    id: "my-pro-guide",
    title: "My Pro Guide",
    description: "This is a guide platform for travelers to find the best guide for their trip.",
    image: MyProGuide,
    externalLink: "https://guide.myproguide.com/",
    link: "https://guide.myproguide.com/",
    details:[
      'Built with Nuxt.js, Shadcn Vue, Tailwind, and TypeScript',
      'Allow guides to register and receive reviews and tips from travelers',
      'Allow travelers to find the best guide for their trip',
    ]
  },
  {
    id: "raycast-extension-coinmarketcap-price-crawler",
    title: "Raycast Extension - Coinmarketcap Price Crawler",
    description: "This is an open source project build with Raycast, and it's a crawler to get the price of cryptocurrencies.",
    image: RaycastExt,
    externalLink: "https://www.raycast.com/SonicSpark/coinmarketcap-crypto-price-crawler",
    link: "/projects/raycast-extension-coinmarketcap-price-crawler",
    details:[
      'Make price inquiry easier',
      'Built with React API',
      'An open source project',
    ]
  },
  {
    id: "eth-rome-ghostpay",
    title: "ETHRome Hackathon Project - GhostPay",
    description: "GhostPay is a private payment dapp, allowing users to send and receive crypto privately, with just an URL instead of wallet address.",
    image: GhostPay,
    externalLink: "https://github.com/porco-rosso-j/eth-rome-2023",
    link: "https://taikai.network/ethrome/hackathons/ethrome-23/projects/clnfwynab00eswu01pbnmnjif/idea",
    details:[
      'Built with Railgun, a private payment protocol enabling end-to-end encrypted transactions',
      'Won the bounty of Privacy Track',
    ]
  },
  {
    id: "javascript-concept-sandwich",
    title: "My Book - JavaScript Concept Sandwich",
    description: "This is the first JavaScript technical book I wrote. I participated in a writing competition. In this competition, I decided to try expressing the JavaScript knowledge I had acquired. In the end, I won an award in the competition.",
    image: JsSandwich,
    link: "/projects/javascript-concept-sandwich",
    externalLink: "https://www.tenlong.com.tw/products/9789864347575",
    details: [
      "Explaining how JavaScript works through illustrations.",
      "Making it easier for people who want to learn JavaScript.",
      "Won an award in the competition.",
    ],
  },
  {
    id: "astro-leo-theme",
    title: "Astro Blog Theme - Leo",
    description: "Leo is an Astro theme built with Tailwind that gives you a sense of exploration in the universe and is designed to make writing posts easy.",
    image: AstroLeo,
    externalLink: "https://astro.build/themes/details/astro-theme-leo/",
    link: "/en/posts/how-i-build-this-blog",
    details:[
      'The astro theme that is built for my blog, which is this website',
      'Built with Astro, Tailwind, and TypeScript',
      'I used three.js to create this starry background',
    ]
  },
  
];
export const GOOGLE_GTAG = "GTM-P6FNQVBP";