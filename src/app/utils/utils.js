import { differenceInSeconds } from "date-fns";

export const convertHexToRGB = (hex) => {
  // check if it's a rgba
  if (hex.match("rgba")) {
    let triplet = hex.slice(5).split(",").slice(0, -1).join(",");
    return triplet;
  }

  let c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split("");
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = "0x" + c.join("");

    return [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",");
  }
};

function currentYPosition(elm) {
  if (!window && !elm) return;

  if (elm) return elm.scrollTop;
  // Firefox, Chrome, Opera, Safari
  if (window.pageYOffset) return window.pageYOffset;
  // Internet Explorer 6 - standards mode
  if (document.documentElement && document.documentElement.scrollTop)
    return document.documentElement.scrollTop;
  // Internet Explorer 6, 7 and 8
  if (document.body.scrollTop) return document.body.scrollTop;
  return 0;
}

function elmYPosition(elm) {
  var y = elm.offsetTop;
  var node = elm;
  while (node.offsetParent && node.offsetParent !== document.body) {
    node = node.offsetParent;
    y += node.offsetTop;
  }
  return y;
}

export function scrollTo(scrollableElement, elmID) {
  var elm = document.getElementById(elmID);

  if (!elmID || !elm) {
    return;
  }

  var startY = currentYPosition(scrollableElement);
  var stopY = elmYPosition(elm);

  var distance = stopY > startY ? stopY - startY : startY - stopY;
  if (distance < 100) {
    scrollTo(0, stopY);
    return;
  }
  var speed = Math.round(distance / 50);
  if (speed >= 20) speed = 20;
  var step = Math.round(distance / 25);
  var leapY = stopY > startY ? startY + step : startY - step;
  var timer = 0;
  if (stopY > startY) {
    for (var i = startY; i < stopY; i += step) {
      setTimeout(
        (function (leapY) {
          return () => {
            scrollableElement.scrollTo(0, leapY);
          };
        })(leapY),
        timer * speed
      );
      leapY += step;
      if (leapY > stopY) leapY = stopY;
      timer++;
    }
    return;
  }
  for (let i = startY; i > stopY; i -= step) {
    setTimeout(
      (function (leapY) {
        return () => {
          scrollableElement.scrollTo(0, leapY);
        };
      })(leapY),
      timer * speed
    );
    leapY -= step;
    if (leapY < stopY) leapY = stopY;
    timer++;
  }
  return false;
}

export function getTimeDifference(date) {
  let difference = differenceInSeconds(new Date(), date);

  if (difference < 60) return `${Math.floor(difference)} sec`;
  else if (difference < 3600) return `${Math.floor(difference / 60)} min`;
  else if (difference < 86400) return `${Math.floor(difference / 3660)} h`;
  else if (difference < 86400 * 30) return `${Math.floor(difference / 86400)} d`;
  else if (difference < 86400 * 30 * 12) return `${Math.floor(difference / 86400 / 30)} mon`;
  else return `${(difference / 86400 / 30 / 12).toFixed(1)} y`;
}


/******************MY UTILITYS*******************/

export const BASE_URL_DEV = 'http://localhost:3001/boutique/'
export const BASE_URL_PROD = 'http://localhost:3001/boutique/'

export const dataTable = [
  {
    name: {
      firstName: "John",
      lastName: "Doe"
    },
    address: "261 Erdman Ford",
    city: "East Daphne",
    state: "Kentucky"
  },
  {
    name: {
      firstName: "Jane",
      lastName: "Doe"
    },
    address: "769 Dominic Grove",
    city: "Columbus",
    state: "Ohio"
  },
  {
    name: {
      firstName: "Joe",
      lastName: "Doe"
    },
    address: "566 Brakus Inlet",
    city: "South Linda",
    state: "West Virginia"
  },
  {
    name: {
      firstName: "Kevin",
      lastName: "Vandy"
    },
    address: "722 Emie Stream",
    city: "Lincoln",
    state: "Nebraska"
  },
  {
    name: {
      firstName: "Joshua",
      lastName: "Rolluffs"
    },
    address: "32188 Larkin Turnpike",
    city: "Charleston",
    state: "South Carolina"
  }
];



export const data1 = [
  {
    firstName: 'Dusty',
    lastName: 'Kuvalis',
    email: 'Randy63@yahoo.com',
    jobTitle: 'Chief Creative Technician',
    salary: 52729,
    startDate: '3/20/2014',
    signatureCatchPhrase: 'Cross-platform disintermediate workforce',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/106.jpg',
  },
  {
    firstName: "D'angelo",
    lastName: 'Moen',
    email: 'Andrew88@hotmail.com',
    jobTitle: 'Forward Response Engineer',
    salary: 71964,
    startDate: '3/9/2018',
    signatureCatchPhrase: 'Virtual local support',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/420.jpg',
  },
  {
    firstName: 'Devan',
    lastName: 'Reinger',
    email: 'Melissa_Lockman@hotmail.com',
    jobTitle: 'Customer Intranet Consultant',
    salary: 72551,
    startDate: '8/12/2020',
    signatureCatchPhrase: 'Pre-emptive composite hierarchy',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1091.jpg',
  },
  {
    firstName: 'Leonardo',
    lastName: 'Langworth',
    email: 'Chadrick.Goldner87@gmail.com',
    jobTitle: 'Senior Security Manager',
    salary: 57801,
    startDate: '7/25/2017',
    signatureCatchPhrase: 'Progressive real-time core',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/639.jpg',
  },
  {
    firstName: 'Douglas',
    lastName: 'Denesik',
    email: 'Dante.Deckow@hotmail.com',
    jobTitle: 'Legacy Security Assistant',
    salary: 23792,
    startDate: '4/12/2020',
    signatureCatchPhrase: 'Operative well-modulated info-mediaries',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/394.jpg',
  },
  {
    firstName: 'Jameson',
    lastName: 'Mayer',
    email: 'Rosamond_Schuster@yahoo.com',
    jobTitle: 'Regional Division Planner',
    salary: 80916,
    startDate: '10/30/2017',
    signatureCatchPhrase: 'Front-line intermediate firmware',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1205.jpg',
  },
  {
    firstName: 'Madaline',
    lastName: 'Quitzon',
    email: 'Alex_Grimes82@hotmail.com',
    jobTitle: 'Corporate Paradigm Strategist',
    salary: 68052,
    startDate: '1/17/2018',
    signatureCatchPhrase: 'Right-sized high-level algorithm',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/432.jpg',
  },
  {
    firstName: 'Wilfrid',
    lastName: 'Vandervort',
    email: 'Buddy.Torphy@gmail.com',
    jobTitle: 'Legacy Functionality Specialist',
    salary: 85573,
    startDate: '8/4/2014',
    signatureCatchPhrase: 'Focused interactive secured line',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1131.jpg',
  },
  {
    firstName: 'Chelsie',
    lastName: 'Mraz',
    email: 'Ladarius_Thiel70@yahoo.com',
    jobTitle: 'Forward Infrastructure Representative',
    salary: 51062,
    startDate: '1/6/2021',
    signatureCatchPhrase: 'Diverse attitude-oriented migration',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1099.jpg',
  },
  {
    firstName: 'Hassie',
    lastName: 'Bruen',
    email: 'Clair76@gmail.com',
    jobTitle: 'Human Paradigm Designer',
    salary: 61196,
    startDate: '4/28/2016',
    signatureCatchPhrase: 'Upgradable composite methodology',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/401.jpg',
  },
  {
    firstName: 'Daisy',
    lastName: 'Hane',
    email: 'Alverta7@hotmail.com',
    jobTitle: 'National Configuration Manager',
    salary: 25394,
    startDate: '3/2/2020',
    signatureCatchPhrase: 'Exclusive next generation initiative',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/436.jpg',
  },
  {
    firstName: 'Wilbert',
    lastName: 'Monahan',
    email: 'Cydney.Jakubowski9@yahoo.com',
    jobTitle: 'Internal Interactions Associate',
    salary: 79355,
    startDate: '4/5/2017',
    signatureCatchPhrase: 'Total asynchronous strategy',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/74.jpg',
  },
  {
    firstName: 'Heloise',
    lastName: 'Purdy',
    email: 'Celestino.Kassulke@yahoo.com',
    jobTitle: 'Global Identity Architect',
    salary: 109257,
    startDate: '12/18/2020',
    signatureCatchPhrase: 'User-friendly tertiary service-desk',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1107.jpg',
  },
  {
    firstName: 'Moises',
    lastName: 'McClure',
    email: 'Arturo29@yahoo.com',
    jobTitle: 'Internal Marketing Orchestrator',
    salary: 155037,
    startDate: '9/23/2014',
    signatureCatchPhrase: 'Public-key exuding complexity',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/484.jpg',
  },
  {
    firstName: 'Rahsaan',
    lastName: 'Bauch',
    email: 'Angelita39@yahoo.com',
    jobTitle: 'Dynamic Data Planner',
    salary: 158595,
    startDate: '3/31/2015',
    signatureCatchPhrase: 'Decentralized 6th generation archive',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1015.jpg',
  },
  {
    firstName: 'Lorenzo',
    lastName: 'Moore',
    email: 'Emma_Becker33@yahoo.com',
    jobTitle: 'Customer Division Representative',
    salary: 73983,
    startDate: '8/22/2020',
    signatureCatchPhrase: 'Reactive fresh-thinking local area network',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/88.jpg',
  },
  {
    firstName: 'Richard',
    lastName: 'Bartoletti',
    email: 'Hayden84@gmail.com',
    jobTitle: 'Future Communications Technician',
    salary: 169001,
    startDate: '10/13/2018',
    signatureCatchPhrase: 'Streamlined logistical access',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/897.jpg',
  },
  {
    firstName: 'Ulises',
    lastName: 'Beatty',
    email: 'Jessie_Kirlin39@yahoo.com',
    jobTitle: 'Future Markets Associate',
    salary: 92008,
    startDate: '10/17/2017',
    signatureCatchPhrase: 'Monitored object-oriented interface',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/956.jpg',
  },
  {
    firstName: 'Hattie',
    lastName: 'Stehr',
    email: 'Betty78@hotmail.com',
    jobTitle: 'Internal Directives Orchestrator',
    salary: 120554,
    startDate: '12/17/2014',
    signatureCatchPhrase: 'Organic bi-directional groupware',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/448.jpg',
  },
  {
    firstName: 'Kane',
    lastName: 'Marquardt',
    email: 'Myron.Schaefer45@yahoo.com',
    jobTitle: 'Product Research Orchestrator',
    salary: 95231,
    startDate: '2/28/2020',
    signatureCatchPhrase: 'Stand-alone holistic strategy',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/461.jpg',
  },
  {
    firstName: 'Brittany',
    lastName: 'Legros',
    email: 'Rachelle44@yahoo.com',
    jobTitle: 'Chief Web Specialist',
    salary: 40908,
    startDate: '7/27/2016',
    signatureCatchPhrase: 'Reactive multi-tasking internet solution',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/862.jpg',
  },
  {
    firstName: 'Joana',
    lastName: 'Witting',
    email: 'Elyssa.Wiegand@hotmail.com',
    jobTitle: 'Legacy Quality Strategist',
    salary: 136966,
    startDate: '8/22/2017',
    signatureCatchPhrase: 'Extended asynchronous moderator',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/795.jpg',
  },
  {
    firstName: 'Marshall',
    lastName: 'Gottlieb',
    email: 'Myron53@gmail.com',
    jobTitle: 'Internal Web Designer',
    salary: 155176,
    startDate: '12/25/2020',
    signatureCatchPhrase: 'Business-focused bifurcated access',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/524.jpg',
  },
  {
    firstName: 'Nolan',
    lastName: 'Abbott',
    email: 'Sigurd.Murazik17@yahoo.com',
    jobTitle: 'Principal Operations Strategist',
    salary: 161534,
    startDate: '8/3/2021',
    signatureCatchPhrase: 'Robust bifurcated initiative',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1095.jpg',
  },
  {
    firstName: 'Guadalupe',
    lastName: 'Goyette',
    email: 'Derek.Senger15@yahoo.com',
    jobTitle: 'Internal Accountability Executive',
    salary: 20297,
    startDate: '6/17/2020',
    signatureCatchPhrase: 'Networked tangible definition',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/322.jpg',
  },
  {
    firstName: 'Frankie',
    lastName: 'Balistreri',
    email: 'Gladyce85@gmail.com',
    jobTitle: 'District Integration Facilitator',
    salary: 57549,
    startDate: '3/16/2021',
    signatureCatchPhrase: 'Diverse 24/7 open system',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/103.jpg',
  },
  {
    firstName: 'Jimmie',
    lastName: 'Altenwerth',
    email: 'Kaya37@hotmail.com',
    jobTitle: 'International Brand Architect',
    salary: 90316,
    startDate: '9/1/2019',
    signatureCatchPhrase: 'Decentralized 5th generation functionalities',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/113.jpg',
  },
  {
    firstName: 'Ryder',
    lastName: "O'Hara",
    email: 'Korey_Mueller@gmail.com',
    jobTitle: 'Product Intranet Developer',
    salary: 111388,
    startDate: '5/8/2021',
    signatureCatchPhrase: 'Multi-layered didactic firmware',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/29.jpg',
  },
  {
    firstName: 'Nolan',
    lastName: 'Mayer',
    email: 'Remington.DAmore63@hotmail.com',
    jobTitle: 'Internal Research Orchestrator',
    salary: 46528,
    startDate: '2/21/2017',
    signatureCatchPhrase: 'Open-source stable encoding',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/915.jpg',
  },
  {
    firstName: 'Ashley',
    lastName: 'Wolf',
    email: 'Polly_Parker@gmail.com',
    jobTitle: 'National Infrastructure Specialist',
    salary: 132645,
    startDate: '9/25/2019',
    signatureCatchPhrase: 'Open-architected well-modulated data-warehouse',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/721.jpg',
  },
  {
    firstName: 'Florida',
    lastName: 'Kiehn',
    email: 'Wilhelm_Deckow93@hotmail.com',
    jobTitle: 'International Applications Technician',
    salary: 65835,
    startDate: '8/9/2015',
    signatureCatchPhrase: 'Ameliorated upward-trending benchmark',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1066.jpg',
  },
  {
    firstName: 'Monica',
    lastName: 'Crooks',
    email: 'Sabina_Kerluke36@hotmail.com',
    jobTitle: 'Dynamic Infrastructure Representative',
    salary: 70473,
    startDate: '3/27/2015',
    signatureCatchPhrase: 'Monitored context-sensitive frame',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/81.jpg',
  },
  {
    firstName: 'Callie',
    lastName: 'Kub',
    email: 'Theo.Jakubowski57@hotmail.com',
    jobTitle: 'Legacy Operations Supervisor',
    salary: 50844,
    startDate: '8/19/2019',
    signatureCatchPhrase: 'Stand-alone stable moderator',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/489.jpg',
  },
  {
    firstName: 'Wellington',
    lastName: 'Treutel',
    email: 'Gail54@yahoo.com',
    jobTitle: 'Central Response Technician',
    salary: 37148,
    startDate: '3/22/2017',
    signatureCatchPhrase: 'Innovative background capability',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/951.jpg',
  },
  {
    firstName: 'Ethyl',
    lastName: 'Rempel',
    email: 'Joseph_Schoen96@yahoo.com',
    jobTitle: 'Corporate Configuration Director',
    salary: 139956,
    startDate: '8/17/2016',
    signatureCatchPhrase: 'Function-based analyzing hardware',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/718.jpg',
  },
  {
    firstName: 'Lora',
    lastName: 'Harvey',
    email: 'Jeanne25@yahoo.com',
    jobTitle: 'Senior Configuration Coordinator',
    salary: 49911,
    startDate: '10/7/2021',
    signatureCatchPhrase: 'Reactive 24/7 monitoring',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/147.jpg',
  },
  {
    firstName: 'Dock',
    lastName: 'Rolfson',
    email: 'Toney.Jenkins@hotmail.com',
    jobTitle: 'Central Data Coordinator',
    salary: 161196,
    startDate: '11/8/2014',
    signatureCatchPhrase: 'Cross-group reciprocal knowledge base',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/21.jpg',
  },
  {
    firstName: 'Loma',
    lastName: 'Dach',
    email: 'Margarette_Schumm39@hotmail.com',
    jobTitle: 'International Response Assistant',
    salary: 165993,
    startDate: '3/8/2014',
    signatureCatchPhrase: 'Robust 3rd generation capacity',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1028.jpg',
  },
  {
    firstName: 'Anibal',
    lastName: 'Ruecker',
    email: 'Florencio.Kunze43@hotmail.com',
    jobTitle: 'Principal Program Analyst',
    salary: 112371,
    startDate: '5/26/2016',
    signatureCatchPhrase: 'Sharable 24 hour info-mediaries',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/313.jpg',
  },
  {
    firstName: 'Javon',
    lastName: 'Kling',
    email: 'Tyrese28@yahoo.com',
    jobTitle: 'Senior Solutions Director',
    salary: 153271,
    startDate: '3/2/2014',
    signatureCatchPhrase: 'Total incremental throughput',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1248.jpg',
  },
  {
    firstName: 'Cassidy',
    lastName: 'Schiller',
    email: 'Filomena_Waters@hotmail.com',
    jobTitle: 'Principal Interactions Associate',
    salary: 144280,
    startDate: '10/28/2020',
    signatureCatchPhrase: 'Front-line object-oriented matrices',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/402.jpg',
  },
  {
    firstName: 'Laila',
    lastName: 'Olson',
    email: 'Marc78@yahoo.com',
    jobTitle: 'Lead Paradigm Planner',
    salary: 71824,
    startDate: '6/16/2021',
    signatureCatchPhrase: 'Public-key 24 hour extranet',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/681.jpg',
  },
  {
    firstName: 'Merle',
    lastName: 'Schultz',
    email: 'Calista.Leuschke56@yahoo.com',
    jobTitle: 'Dynamic Program Officer',
    salary: 63090,
    startDate: '7/19/2019',
    signatureCatchPhrase: 'Right-sized bi-directional utilisation',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/41.jpg',
  },
  {
    firstName: 'Brennan',
    lastName: 'Roberts',
    email: 'Anna.Schmitt@gmail.com',
    jobTitle: 'Internal Optimization Administrator',
    salary: 148660,
    startDate: '4/2/2017',
    signatureCatchPhrase: 'Enterprise-wide mission-critical algorithm',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/87.jpg',
  },
  {
    firstName: 'Derick',
    lastName: 'Lebsack',
    email: 'Kristin_Fisher67@gmail.com',
    jobTitle: 'Customer Marketing Associate',
    salary: 162803,
    startDate: '2/17/2018',
    signatureCatchPhrase: 'Visionary tertiary encoding',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/416.jpg',
  },
  {
    firstName: 'Brown',
    lastName: 'Deckow',
    email: 'Alvis78@hotmail.com',
    jobTitle: 'Investor Infrastructure Specialist',
    salary: 82617,
    startDate: '10/27/2019',
    signatureCatchPhrase: 'Multi-channelled high-level core',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/759.jpg',
  },
  {
    firstName: 'Leo',
    lastName: 'Schmidt',
    email: 'Lucinda.Schmitt@gmail.com',
    jobTitle: 'Internal Directives Facilitator',
    salary: 107179,
    startDate: '7/7/2018',
    signatureCatchPhrase: 'Assimilated 4th generation complexity',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/793.jpg',
  },
  {
    firstName: 'Desiree',
    lastName: 'Braun',
    email: 'Francis23@yahoo.com',
    jobTitle: 'Lead Research Orchestrator',
    salary: 144783,
    startDate: '11/14/2017',
    signatureCatchPhrase: 'Fully-configurable demand-driven hub',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/352.jpg',
  },
  {
    firstName: 'Grant',
    lastName: 'Sporer',
    email: 'Maximus.Schuppe84@gmail.com',
    jobTitle: 'Future Optimization Orchestrator',
    salary: 43339,
    startDate: '8/13/2019',
    signatureCatchPhrase: 'Cross-platform content-based complexity',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1237.jpg',
  },
  {
    firstName: 'Bertha',
    lastName: 'Watsica',
    email: 'Emmett.Monahan30@yahoo.com',
    jobTitle: 'Principal Metrics Analyst',
    salary: 45793,
    startDate: '4/10/2017',
    signatureCatchPhrase: 'Down-sized empowering infrastructure',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/931.jpg',
  },
  {
    firstName: 'Ashleigh',
    lastName: 'Kessler',
    email: 'Zoe95@gmail.com',
    jobTitle: 'Product Solutions Agent',
    salary: 94366,
    startDate: '4/4/2018',
    signatureCatchPhrase: 'Multi-tiered upward-trending attitude',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/168.jpg',
  },
  {
    firstName: 'Napoleon',
    lastName: 'Dickens',
    email: 'Joey_MacGyver66@gmail.com',
    jobTitle: 'Human Communications Developer',
    salary: 123117,
    startDate: '3/20/2015',
    signatureCatchPhrase: 'Decentralized clear-thinking budgetary management',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/287.jpg',
  },
  {
    firstName: 'Colin',
    lastName: 'Block',
    email: 'Alia97@hotmail.com',
    jobTitle: 'Central Mobility Associate',
    salary: 152432,
    startDate: '8/28/2020',
    signatureCatchPhrase: 'Future-proofed context-sensitive function',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/247.jpg',
  },
  {
    firstName: 'Dallas',
    lastName: 'Stark',
    email: 'Jaeden_Cole@yahoo.com',
    jobTitle: 'Lead Interactions Facilitator',
    salary: 97413,
    startDate: '7/21/2021',
    signatureCatchPhrase: 'Cross-group content-based budgetary management',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/178.jpg',
  },
  {
    firstName: 'Kirsten',
    lastName: 'Reichel',
    email: 'Gertrude17@yahoo.com',
    jobTitle: 'Future Paradigm Facilitator',
    salary: 135336,
    startDate: '3/10/2015',
    signatureCatchPhrase: 'Team-oriented heuristic neural-net',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/19.jpg',
  },
  {
    firstName: 'Petra',
    lastName: 'Lakin',
    email: 'Jimmie32@yahoo.com',
    jobTitle: 'Direct Paradigm Consultant',
    salary: 35672,
    startDate: '6/27/2020',
    signatureCatchPhrase: 'Business-focused attitude-oriented support',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/318.jpg',
  },
  {
    firstName: 'Clifton',
    lastName: 'Erdman',
    email: 'Mitchel_Mohr32@hotmail.com',
    jobTitle: 'Human Configuration Technician',
    salary: 138721,
    startDate: '2/26/2016',
    signatureCatchPhrase: 'Integrated coherent structure',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/223.jpg',
  },
  {
    firstName: 'Meagan',
    lastName: 'Zemlak',
    email: 'Alfonzo56@hotmail.com',
    jobTitle: 'Corporate Assurance Administrator',
    salary: 69790,
    startDate: '9/12/2020',
    signatureCatchPhrase: 'User-friendly holistic portal',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/786.jpg',
  },
  {
    firstName: 'Mortimer',
    lastName: 'Thompson',
    email: 'Josie.Marks@hotmail.com',
    jobTitle: 'Internal Response Developer',
    salary: 32300,
    startDate: '4/10/2021',
    signatureCatchPhrase: 'Cloned bandwidth-monitored ability',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1196.jpg',
  },
  {
    firstName: 'Ima',
    lastName: 'Nader',
    email: 'Heaven97@hotmail.com',
    jobTitle: 'Lead Implementation Associate',
    salary: 113894,
    startDate: '1/19/2016',
    signatureCatchPhrase: 'Multi-lateral secondary analyzer',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/208.jpg',
  },
  {
    firstName: 'Amani',
    lastName: 'Mills',
    email: 'Roel98@yahoo.com',
    jobTitle: 'Forward Applications Agent',
    salary: 43182,
    startDate: '7/3/2020',
    signatureCatchPhrase: 'Synchronised 3rd generation neural-net',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/577.jpg',
  },
  {
    firstName: 'Della',
    lastName: 'Reilly',
    email: 'Clay_Thompson@hotmail.com',
    jobTitle: 'Legacy Identity Architect',
    salary: 75492,
    startDate: '9/24/2014',
    signatureCatchPhrase: 'Optional radical migration',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/774.jpg',
  },
  {
    firstName: 'Erika',
    lastName: 'Hamill',
    email: 'Americo.Lakin91@yahoo.com',
    jobTitle: 'Regional Marketing Strategist',
    salary: 141949,
    startDate: '4/22/2014',
    signatureCatchPhrase: 'Monitored multi-state software',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/483.jpg',
  },
  {
    firstName: 'Hannah',
    lastName: 'Rutherford',
    email: 'Jayde.Gaylord@yahoo.com',
    jobTitle: 'Global Applications Coordinator',
    salary: 32414,
    startDate: '1/18/2021',
    signatureCatchPhrase: 'Expanded next generation Graphical User Interface',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1068.jpg',
  },
  {
    firstName: 'Bernice',
    lastName: 'Grimes',
    email: 'Johnson_Kris86@gmail.com',
    jobTitle: 'Customer Assurance Officer',
    salary: 131333,
    startDate: '4/29/2018',
    signatureCatchPhrase: 'Multi-tiered upward-trending pricing structure',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/272.jpg',
  },
  {
    firstName: 'Cayla',
    lastName: 'Glover',
    email: 'Chanel81@yahoo.com',
    jobTitle: 'Customer Usability Consultant',
    salary: 36880,
    startDate: '11/4/2016',
    signatureCatchPhrase: 'Phased foreground service-desk',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/963.jpg',
  },
  {
    firstName: 'Gerard',
    lastName: 'Dibbert',
    email: 'Tierra_King@gmail.com',
    jobTitle: 'National Research Liaison',
    salary: 124275,
    startDate: '4/15/2019',
    signatureCatchPhrase: 'Organic grid-enabled initiative',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/501.jpg',
  },
  {
    firstName: 'Crystel',
    lastName: 'Gutmann',
    email: 'Haleigh.Jenkins@gmail.com',
    jobTitle: 'Regional Tactics Facilitator',
    salary: 74744,
    startDate: '9/11/2021',
    signatureCatchPhrase: 'Seamless attitude-oriented pricing structure',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/943.jpg',
  },
  {
    firstName: 'Esther',
    lastName: 'Schamberger',
    email: 'Gene_Schumm7@yahoo.com',
    jobTitle: 'Senior Usability Coordinator',
    salary: 165191,
    startDate: '11/12/2018',
    signatureCatchPhrase: 'Multi-lateral explicit policy',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/909.jpg',
  },
  {
    firstName: 'Shane',
    lastName: 'Fadel',
    email: 'Brannon_Goyette@yahoo.com',
    jobTitle: 'Legacy Accounts Executive',
    salary: 126982,
    startDate: '1/26/2015',
    signatureCatchPhrase: 'Integrated fault-tolerant internet solution',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/533.jpg',
  },
  {
    firstName: 'Travis',
    lastName: 'Orn',
    email: 'Margaretta3@gmail.com',
    jobTitle: 'Future Intranet Consultant',
    salary: 117563,
    startDate: '6/4/2019',
    signatureCatchPhrase: 'Organic dedicated synergy',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/327.jpg',
  },
  {
    firstName: 'Ephraim',
    lastName: 'Jerde',
    email: 'Lela_Abbott@gmail.com',
    jobTitle: 'Global Operations Manager',
    salary: 64658,
    startDate: '2/5/2018',
    signatureCatchPhrase: 'Business-focused value-added product',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/852.jpg',
  },
  {
    firstName: 'Jessy',
    lastName: 'Huel',
    email: 'Daniella20@gmail.com',
    jobTitle: 'Internal Web Developer',
    salary: 107263,
    startDate: '5/8/2018',
    signatureCatchPhrase: 'Distributed impactful moratorium',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1075.jpg',
  },
  {
    firstName: 'Coty',
    lastName: 'Fadel',
    email: 'Garth20@yahoo.com',
    jobTitle: 'Dynamic Accountability Representative',
    salary: 22128,
    startDate: '8/23/2018',
    signatureCatchPhrase: 'De-engineered zero administration utilisation',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/703.jpg',
  },
  {
    firstName: 'Davin',
    lastName: 'Kreiger',
    email: 'Myles_Brekke83@hotmail.com',
    jobTitle: 'Principal Factors Analyst',
    salary: 54712,
    startDate: '8/9/2021',
    signatureCatchPhrase: 'Customer-focused mobile local area network',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/697.jpg',
  },
  {
    firstName: 'Ashly',
    lastName: 'Gerlach',
    email: 'Omari_Swaniawski@hotmail.com',
    jobTitle: 'Internal Response Producer',
    salary: 98757,
    startDate: '3/20/2020',
    signatureCatchPhrase: 'Multi-layered 5th generation contingency',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1071.jpg',
  },
  {
    firstName: 'Cristina',
    lastName: 'Hessel',
    email: 'Jessica_Stanton@hotmail.com',
    jobTitle: 'Corporate Solutions Engineer',
    salary: 86074,
    startDate: '9/11/2014',
    signatureCatchPhrase: 'Team-oriented demand-driven flexibility',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/802.jpg',
  },
  {
    firstName: 'Antoinette',
    lastName: 'Torp',
    email: 'Yesenia_Tremblay@hotmail.com',
    jobTitle: 'Forward Quality Orchestrator',
    salary: 134875,
    startDate: '11/12/2021',
    signatureCatchPhrase: 'Future-proofed leading edge knowledge user',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/519.jpg',
  },
  {
    firstName: 'Gunner',
    lastName: 'Daugherty',
    email: 'Alexandro7@yahoo.com',
    jobTitle: 'National Identity Coordinator',
    salary: 57932,
    startDate: '3/27/2020',
    signatureCatchPhrase: 'Robust hybrid approach',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/546.jpg',
  },
  {
    firstName: 'Lura',
    lastName: 'Stanton',
    email: 'Jeremie52@hotmail.com',
    jobTitle: 'Senior Directives Specialist',
    salary: 101724,
    startDate: '11/29/2014',
    signatureCatchPhrase: 'Assimilated clear-thinking secured line',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1229.jpg',
  },
  {
    firstName: 'Percy',
    lastName: 'Lebsack',
    email: 'Shaniya_Kozey@yahoo.com',
    jobTitle: 'International Creative Director',
    salary: 140411,
    startDate: '10/7/2019',
    signatureCatchPhrase: 'Future-proofed even-keeled Graphical User Interface',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/623.jpg',
  },
  {
    firstName: 'Reynold',
    lastName: 'Daniel',
    email: 'Kay_Dicki26@hotmail.com',
    jobTitle: 'Human Tactics Orchestrator',
    salary: 75114,
    startDate: '9/5/2016',
    signatureCatchPhrase: 'Front-line fault-tolerant contingency',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/653.jpg',
  },
  {
    firstName: 'Selena',
    lastName: 'Hermiston',
    email: 'Abe90@yahoo.com',
    jobTitle: 'Chief Operations Representative',
    salary: 85694,
    startDate: '8/12/2018',
    signatureCatchPhrase: 'Operative multi-tasking standardization',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/644.jpg',
  },
  {
    firstName: 'Waldo',
    lastName: 'Beahan',
    email: 'Dusty8@hotmail.com',
    jobTitle: 'Central Web Supervisor',
    salary: 106969,
    startDate: '3/15/2018',
    signatureCatchPhrase: 'Fundamental grid-enabled database',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/622.jpg',
  },
  {
    firstName: 'Delmer',
    lastName: 'Stroman',
    email: 'Marjory.Baumbach@hotmail.com',
    jobTitle: 'International Assurance Director',
    salary: 107387,
    startDate: '1/10/2020',
    signatureCatchPhrase: 'Cloned needs-based moderator',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/37.jpg',
  },
  {
    firstName: 'Mack',
    lastName: 'Morissette',
    email: 'Zachery.Cormier@gmail.com',
    jobTitle: 'Direct Configuration Consultant',
    salary: 59084,
    startDate: '6/7/2015',
    signatureCatchPhrase: 'Assimilated systematic parallelism',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/441.jpg',
  },
  {
    firstName: 'Precious',
    lastName: 'Murazik',
    email: 'Hillard.McKenzie66@gmail.com',
    jobTitle: 'Global Creative Associate',
    salary: 53331,
    startDate: '8/18/2018',
    signatureCatchPhrase: 'Managed asymmetric hierarchy',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/347.jpg',
  },
  {
    firstName: 'Lacy',
    lastName: 'Daugherty',
    email: 'Garrick.Berge@hotmail.com',
    jobTitle: 'Product Security Architect',
    salary: 158553,
    startDate: '9/23/2019',
    signatureCatchPhrase: 'Compatible motivating matrices',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/150.jpg',
  },
  {
    firstName: 'Deshawn',
    lastName: 'Abernathy',
    email: 'Stanton57@hotmail.com',
    jobTitle: 'Global Tactics Agent',
    salary: 84738,
    startDate: '1/3/2021',
    signatureCatchPhrase: 'Function-based executive conglomeration',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/580.jpg',
  },
  {
    firstName: 'Gregoria',
    lastName: 'Wiza',
    email: 'Madge.Wuckert97@hotmail.com',
    jobTitle: 'Global Metrics Executive',
    salary: 46516,
    startDate: '9/25/2020',
    signatureCatchPhrase: 'Automated asynchronous success',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/195.jpg',
  },
  {
    firstName: 'Rudy',
    lastName: 'Wisoky',
    email: 'Haleigh.Reichel74@hotmail.com',
    jobTitle: 'Central Operations Agent',
    salary: 23440,
    startDate: '3/18/2014',
    signatureCatchPhrase: 'Stand-alone systematic implementation',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/462.jpg',
  },
  {
    firstName: 'Otho',
    lastName: 'Leannon',
    email: 'Malika41@yahoo.com',
    jobTitle: 'Principal Accounts Coordinator',
    salary: 116848,
    startDate: '6/28/2021',
    signatureCatchPhrase: 'Stand-alone background installation',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1079.jpg',
  },
  {
    firstName: 'Estrella',
    lastName: 'Keeling',
    email: 'Meta_Ortiz78@gmail.com',
    jobTitle: 'Forward Applications Supervisor',
    salary: 90509,
    startDate: '10/16/2015',
    signatureCatchPhrase: 'Adaptive zero administration portal',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/372.jpg',
  },
  {
    firstName: 'Lori',
    lastName: 'Romaguera',
    email: 'Adam_White@gmail.com',
    jobTitle: 'Global Brand Producer',
    salary: 94791,
    startDate: '11/26/2018',
    signatureCatchPhrase: 'Networked human-resource artificial intelligence',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/389.jpg',
  },
  {
    firstName: 'Zack',
    lastName: 'Sipes',
    email: 'Kendall_Kuhlman@yahoo.com',
    jobTitle: 'Forward Implementation Specialist',
    salary: 136016,
    startDate: '3/23/2020',
    signatureCatchPhrase: 'Streamlined grid-enabled support',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/843.jpg',
  },
  {
    firstName: 'Colleen',
    lastName: 'Cassin',
    email: 'Brad_Wunsch@yahoo.com',
    jobTitle: 'Corporate Applications Administrator',
    salary: 72690,
    startDate: '12/17/2015',
    signatureCatchPhrase: 'Profound local challenge',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/383.jpg',
  },
  {
    firstName: 'Rosendo',
    lastName: 'Legros',
    email: 'Scarlett3@yahoo.com',
    jobTitle: 'Corporate Applications Executive',
    salary: 73870,
    startDate: '11/27/2015',
    signatureCatchPhrase: 'Diverse exuding paradigm',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/752.jpg',
  },
  {
    firstName: 'Bernhard',
    lastName: "O'Conner",
    email: 'Kristopher52@hotmail.com',
    jobTitle: 'Central Metrics Designer',
    salary: 26864,
    startDate: '12/12/2015',
    signatureCatchPhrase: 'Compatible composite product',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1155.jpg',
  },
  {
    firstName: 'Hulda',
    lastName: 'Lakin',
    email: 'Tia.Tremblay43@gmail.com',
    jobTitle: 'Global Implementation Administrator',
    salary: 20393,
    startDate: '8/19/2020',
    signatureCatchPhrase: 'Open-architected coherent support',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/418.jpg',
  },
  {
    firstName: 'Pauline',
    lastName: 'Schmeler',
    email: 'Monroe_Murphy31@gmail.com',
    jobTitle: 'International Infrastructure Administrator',
    salary: 151997,
    startDate: '6/30/2018',
    signatureCatchPhrase: 'De-engineered executive migration',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/47.jpg',
  },
  {
    firstName: 'Jordyn',
    lastName: 'Effertz',
    email: 'Bria_Cruickshank26@hotmail.com',
    jobTitle: 'Global Brand Producer',
    salary: 64894,
    startDate: '8/25/2014',
    signatureCatchPhrase: 'Cross-group radical solution',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1174.jpg',
  },
  {
    firstName: 'Natalia',
    lastName: 'Flatley',
    email: 'Noah_Bartell@hotmail.com',
    jobTitle: 'Central Integration Facilitator',
    salary: 46753,
    startDate: '2/23/2022',
    signatureCatchPhrase: 'Quality-focused client-driven help-desk',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1151.jpg',
  },
  {
    firstName: 'Tremaine',
    lastName: 'Miller',
    email: 'Harvey14@gmail.com',
    jobTitle: 'Future Tactics Architect',
    salary: 41043,
    startDate: '3/8/2021',
    signatureCatchPhrase: 'Configurable hybrid standardization',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1029.jpg',
  },
  {
    firstName: 'Elroy',
    lastName: 'Stark',
    email: 'Adam.Schowalter2@yahoo.com',
    jobTitle: 'International Intranet Facilitator',
    salary: 139167,
    startDate: '8/9/2015',
    signatureCatchPhrase: 'Cross-group local projection',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1222.jpg',
  },
  {
    firstName: 'Betsy',
    lastName: 'Schimmel',
    email: 'Charity.Huel22@gmail.com',
    jobTitle: 'National Marketing Manager',
    salary: 100912,
    startDate: '8/26/2016',
    signatureCatchPhrase: 'Streamlined uniform toolset',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/264.jpg',
  },
  {
    firstName: 'Tommie',
    lastName: 'Blanda',
    email: 'Adella11@gmail.com',
    jobTitle: 'Internal Factors Developer',
    salary: 33687,
    startDate: '6/19/2018',
    signatureCatchPhrase: 'Focused didactic encryption',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1001.jpg',
  },
  {
    firstName: 'Savannah',
    lastName: 'Witting',
    email: 'Jeremie13@yahoo.com',
    jobTitle: 'Senior Usability Producer',
    salary: 32533,
    startDate: '2/24/2018',
    signatureCatchPhrase: 'Optional 3rd generation moderator',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1052.jpg',
  },
  {
    firstName: 'Caesar',
    lastName: 'Botsford',
    email: 'Torey.Reichert18@hotmail.com',
    jobTitle: 'Regional Factors Developer',
    salary: 70379,
    startDate: '9/7/2020',
    signatureCatchPhrase: 'Polarised 4th generation circuit',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/611.jpg',
  },
  {
    firstName: 'Thea',
    lastName: 'Schamberger',
    email: 'Estell_Blick6@yahoo.com',
    jobTitle: 'Global Accountability Director',
    salary: 103625,
    startDate: '7/6/2018',
    signatureCatchPhrase: 'Team-oriented coherent benchmark',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/42.jpg',
  },
  {
    firstName: 'Michele',
    lastName: 'Hermiston',
    email: 'Levi.Davis@gmail.com',
    jobTitle: 'Principal Functionality Developer',
    salary: 110009,
    startDate: '3/19/2020',
    signatureCatchPhrase: 'Public-key demand-driven budgetary management',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/925.jpg',
  },
  {
    firstName: 'Johanna',
    lastName: 'Johnston',
    email: 'Berneice97@yahoo.com',
    jobTitle: 'Dynamic Response Agent',
    salary: 45886,
    startDate: '9/25/2017',
    signatureCatchPhrase: 'Synergized analyzing support',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/49.jpg',
  },
  {
    firstName: 'Jarret',
    lastName: 'Rau',
    email: 'Hermann_Graham83@gmail.com',
    jobTitle: 'Forward Optimization Planner',
    salary: 87408,
    startDate: '6/1/2021',
    signatureCatchPhrase: 'Advanced scalable info-mediaries',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/327.jpg',
  },
  {
    firstName: 'Kylee',
    lastName: 'Cummings',
    email: 'Caroline51@gmail.com',
    jobTitle: 'Corporate Tactics Planner',
    salary: 141978,
    startDate: '4/13/2015',
    signatureCatchPhrase: 'Innovative 24/7 interface',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1223.jpg',
  },
  {
    firstName: 'Rylan',
    lastName: 'Frami',
    email: 'Rosalee_Bergstrom51@hotmail.com',
    jobTitle: 'Legacy Markets Producer',
    salary: 77110,
    startDate: '4/9/2020',
    signatureCatchPhrase: 'Ergonomic incremental attitude',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1040.jpg',
  },
  {
    firstName: 'Ezekiel',
    lastName: 'Russel',
    email: 'Johanna.Fahey24@gmail.com',
    jobTitle: 'Regional Accountability Consultant',
    salary: 108973,
    startDate: '1/4/2022',
    signatureCatchPhrase: 'Devolved homogeneous migration',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/55.jpg',
  },
  {
    firstName: 'Barney',
    lastName: 'Jast',
    email: 'Dameon79@yahoo.com',
    jobTitle: 'Investor Creative Assistant',
    salary: 55270,
    startDate: '3/3/2017',
    signatureCatchPhrase: 'Business-focused bandwidth-monitored ability',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/562.jpg',
  },
  {
    firstName: 'Moriah',
    lastName: 'Smitham',
    email: 'Albin_Parker@gmail.com',
    jobTitle: 'International Program Developer',
    salary: 98799,
    startDate: '9/25/2019',
    signatureCatchPhrase: 'Digitized impactful migration',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/749.jpg',
  },
  {
    firstName: 'Korey',
    lastName: 'Feeney',
    email: 'Lennie66@hotmail.com',
    jobTitle: 'Central Paradigm Specialist',
    salary: 52735,
    startDate: '2/22/2017',
    signatureCatchPhrase: 'Distributed system-worthy frame',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/236.jpg',
  },
  {
    firstName: 'Laurie',
    lastName: 'Torp',
    email: 'Daisha98@hotmail.com',
    jobTitle: 'District Research Planner',
    salary: 27126,
    startDate: '6/13/2016',
    signatureCatchPhrase: 'Reactive bi-directional paradigm',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/392.jpg',
  },
  {
    firstName: 'Oscar',
    lastName: 'Swaniawski',
    email: 'Eli64@yahoo.com',
    jobTitle: 'Human Implementation Manager',
    salary: 95518,
    startDate: '4/5/2014',
    signatureCatchPhrase: 'Versatile neutral leverage',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/613.jpg',
  },
  {
    firstName: 'Paul',
    lastName: "O'Keefe",
    email: 'Dell20@hotmail.com',
    jobTitle: 'International Security Manager',
    salary: 100812,
    startDate: '2/20/2019',
    signatureCatchPhrase: 'Future-proofed multi-tasking secured line',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1194.jpg',
  },
  {
    firstName: 'Jerod',
    lastName: 'Deckow',
    email: 'Guy51@hotmail.com',
    jobTitle: 'Direct Solutions Engineer',
    salary: 102099,
    startDate: '7/26/2021',
    signatureCatchPhrase: 'Phased 3rd generation functionalities',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1204.jpg',
  },
  {
    firstName: 'Deion',
    lastName: 'Medhurst',
    email: 'Juwan0@gmail.com',
    jobTitle: 'District Tactics Consultant',
    salary: 22577,
    startDate: '9/20/2020',
    signatureCatchPhrase: 'Synchronised executive solution',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/907.jpg',
  },
  {
    firstName: 'Vida',
    lastName: 'Considine',
    email: 'Pearline_Legros@yahoo.com',
    jobTitle: 'District Markets Manager',
    salary: 108348,
    startDate: '3/3/2020',
    signatureCatchPhrase: 'Optional optimizing matrix',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/460.jpg',
  },
  {
    firstName: 'Rosina',
    lastName: 'Kshlerin',
    email: 'Aryanna85@gmail.com',
    jobTitle: 'Principal Response Technician',
    salary: 117529,
    startDate: '7/20/2016',
    signatureCatchPhrase: 'Profound static project',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1215.jpg',
  },
  {
    firstName: 'Troy',
    lastName: 'Prohaska',
    email: 'Tania_McLaughlin70@hotmail.com',
    jobTitle: 'Principal Directives Analyst',
    salary: 95202,
    startDate: '7/25/2014',
    signatureCatchPhrase: 'Virtual zero tolerance moratorium',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/89.jpg',
  },
  {
    firstName: 'Jadyn',
    lastName: 'Tromp',
    email: 'Margarette.Abshire24@yahoo.com',
    jobTitle: 'Product Assurance Manager',
    salary: 21766,
    startDate: '7/1/2019',
    signatureCatchPhrase: 'Re-contextualized mission-critical challenge',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1136.jpg',
  },
  {
    firstName: 'Jerald',
    lastName: 'Heller',
    email: 'Maximo28@yahoo.com',
    jobTitle: 'Regional Identity Orchestrator',
    salary: 116164,
    startDate: '7/10/2017',
    signatureCatchPhrase: 'Customizable even-keeled time-frame',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/654.jpg',
  },
];

export let data2 = [
  {
    "_id": "655126bff2376c95b68c5c85",
    "date": null,
    "name": "Base Pan Stik",
    "reference": "SAND 50",
    "description": "Alta cobertura marca Max Factor",
    "purchasePrice": 14000,
    "salePrice": 30000,
    "discount": 0,
    "stock": 2,
    "outputs": 0,
    "photo": "https://afrodita-back.ecommercepayments.ovh/afrodita/foto/2023_11_17_IMG_0554.jpg",
    "category": "65502dbf8f7edc4b8fb4573c",
    "state": "Activo",
    "__v": 0
  },
  {
    "_id": "65512f64f2376c95b68c5c9b",
    "date": null,
    "name": "Base MAYBELLINE ",
    "reference": "334 WAR SUN",
    "description": "Base Americana Alta Cobertura",
    "purchasePrice": 28000,
    "salePrice": 58000,
    "discount": 0,
    "stock": 0,
    "outputs": 0,
    "photo": "https://afrodita-back.ecommercepayments.ovh/afrodita/foto/2024_01_09_IMG_0557.jpg",
    "category": "65502dbf8f7edc4b8fb4573c",
    "state": "Inactivo",
    "__v": 0
  },
  {
    "_id": "65513376f2376c95b68c5cb5",
    "date": null,
    "name": "Polvo Compacto IMAN PRO",
    "reference": "#03",
    "description": "Polvo Compacto",
    "purchasePrice": 8500,
    "salePrice": 25000,
    "discount": 0,
    "stock": 0,
    "outputs": 0,
    "photo": "https://afrodita-back.ecommercepayments.ovh/afrodita/foto/2024_01_09_IMG_0561.jpg",
    "category": "65502dbf8f7edc4b8fb4573c",
    "state": "Inactivo",
    "__v": 0
  },
  {
    "_id": "6551309cf2376c95b68c5ca1",
    "date": null,
    "name": "Polvo Suelto",
    "reference": "Y805",
    "description": "ROMMANTIC RAIN BANANA",
    "purchasePrice": 5500,
    "salePrice": 18000,
    "discount": 0,
    "stock": 0,
    "outputs": 0,
    "photo": "https://afrodita-back.ecommercepayments.ovh/afrodita/foto/2024_01_09_IMG_0561.jpg",
    "category": "65502dbf8f7edc4b8fb4573c",
    "state": "Inactivo",
    "__v": 0
  },
  {
    "_id": "65512c41f2376c95b68c5c8b",
    "date": null,
    "name": "Base Dolce Bella ",
    "reference": "PAN STIK 04",
    "description": "Base en Roll On",
    "purchasePrice": 9000,
    "salePrice": 28000,
    "discount": 0,
    "stock": 2,
    "outputs": 0,
    "photo": "https://afrodita-back.ecommercepayments.ovh/afrodita/foto/2024_01_09_7cdc7fbb-7738-4752-82ec-fd15702d9ef3.jpg",
    "category": "65502dbf8f7edc4b8fb4573c",
    "state": "Activo",
    "__v": 0
  },
  {
    "_id": "6556dc8ce7e7723bceb14c14",
    "date": null,
    "name": "Corrector LA COLORS",
    "reference": "614 Nude",
    "description": "Corrector GO UP",
    "purchasePrice": 4200,
    "salePrice": 15000,
    "discount": 0,
    "stock": 5,
    "outputs": 0,
    "photo": "https://afrodita-back.ecommercepayments.ovh/afrodita/foto/2024_01_09_IMG_0561.jpg",
    "category": "65502dbf8f7edc4b8fb4573c",
    "state": "Activo",
    "__v": 0
  },
  {
    "_id": "655134c8f2376c95b68c5cc1",
    "date": null,
    "name": "Corrector Romantic Queen ",
    "reference": "319",
    "description": "Corrector Alta Cobertura",
    "purchasePrice": 2800,
    "salePrice": 15000,
    "discount": 0,
    "stock": 0,
    "outputs": 0,
    "photo": "https://afrodita-back.ecommercepayments.ovh/afrodita/foto/2024_01_09_IMG_0561.jpg",
    "category": "65502dbf8f7edc4b8fb4573c",
    "state": "Inactivo",
    "__v": 0
  },
  {
    "_id": "6556e3dce7e7723bceb14cec",
    "date": null,
    "name": "Brocha Lengua de Gato",
    "reference": "Pequeña Mantra",
    "description": "",
    "purchasePrice": 1800,
    "salePrice": 7000,
    "discount": 0,
    "stock": 1,
    "outputs": 0,
    "photo": "https://afrodita-back.ecommercepayments.ovh/afrodita/foto/2024_01_09_IMG_0561.jpg",
    "category": "6556e16be7e7723bceb14cbe",
    "state": "Activo",
    "__v": 0
  },
  {
    "_id": "6556dd81e7e7723bceb14c26",
    "date": null,
    "name": "Brocha Base",
    "reference": "Ruby Face",
    "description": "",
    "purchasePrice": 4200,
    "salePrice": 10000,
    "discount": 0,
    "stock": 3,
    "outputs": 0,
    "photo": "https://afrodita-back.ecommercepayments.ovh/afrodita/foto/2024_01_09_IMG_0561.jpg",
    "category": "65502dbf8f7edc4b8fb4573c",
    "state": "Activo",
    "__v": 0
  },
  {
    "_id": "6556e250e7e7723bceb14cda",
    "date": null,
    "name": "Sombra Glitter Sfr Girl",
    "reference": "02 SFR",
    "description": "",
    "purchasePrice": 5600,
    "salePrice": 18000,
    "discount": 0,
    "stock": 1,
    "outputs": 0,
    "photo": "https://afrodita-back.ecommercepayments.ovh/afrodita/foto/2024_01_09_IMG_0561.jpg",
    "category": "6556e16be7e7723bceb14cbe",
    "state": "Activo",
    "__v": 0
  },
  {
    "_id": "6556e2f2e7e7723bceb14ce2",
    "date": null,
    "name": "Sombra Paulis",
    "reference": "PM-06",
    "description": "",
    "purchasePrice": 10000,
    "salePrice": 30000,
    "discount": 0,
    "stock": 1,
    "outputs": 0,
    "photo": "https://afrodita-back.ecommercepayments.ovh/afrodita/foto/2024_01_09_IMG_0561.jpg",
    "category": "6556e16be7e7723bceb14cbe",
    "state": "Activo",
    "__v": 0
  },
  {
    "_id": "6556e391e7e7723bceb14ce8",
    "date": null,
    "name": "Pestañas Enteras ",
    "reference": "BEAUTY RAIN",
    "description": "",
    "purchasePrice": 3166,
    "salePrice": 9000,
    "discount": 0,
    "stock": 2,
    "outputs": 0,
    "photo": "https://afrodita-back.ecommercepayments.ovh/afrodita/foto/2024_01_09_IMG_0561.jpg",
    "category": "6556e16be7e7723bceb14cbe",
    "state": "Activo",
    "__v": 0
  },
  {
    "_id": "6560c49bf38e19af5d44ff80",
    "date": null,
    "name": "Lapiz Café",
    "reference": "Kiss Beauty",
    "description": "",
    "purchasePrice": 1000,
    "salePrice": 3000,
    "discount": 0,
    "stock": 2,
    "outputs": 0,
    "photo": "https://afrodita-back.ecommercepayments.ovh/afrodita/foto/2024_01_09_IMG_0561.jpg",
    "category": "6556e189e7e7723bceb14cc1",
    "state": "Activo",
    "__v": 0
  },
  {
    "_id": "6560c4cef38e19af5d44ff82",
    "date": null,
    "name": "Brochas Cejas",
    "reference": "Cabo Naranja",
    "description": "",
    "purchasePrice": 800,
    "salePrice": 2000,
    "discount": 0,
    "stock": 14,
    "outputs": 0,
    "photo": "https://afrodita-back.ecommercepayments.ovh/afrodita/foto/2024_01_09_IMG_0561.jpg",
    "category": "6556e189e7e7723bceb14cc1",
    "state": "Activo",
    "__v": 0
  },
  {
    "_id": "6560c64ef38e19af5d44ff90",
    "date": null,
    "name": "Contorno de Ojos Karité",
    "reference": "24k Gold",
    "description": "",
    "purchasePrice": 4200,
    "salePrice": 12000,
    "discount": 0,
    "stock": 2,
    "outputs": 0,
    "photo": "https://afrodita-back.ecommercepayments.ovh/afrodita/foto/2024_01_09_Contorno_de_Ojos_Karité.jpg",
    "category": "6556e196e7e7723bceb14cc3",
    "state": "Activo",
    "__v": 0
  },
  {
    "_id": "659d6f65bfbf542a46c69d7a",
    "date": null,
    "name": "Paleta Beauty glazed",
    "reference": "BERRy",
    "description": "Paleta Beauty glazed",
    "purchasePrice": 9000,
    "salePrice": 18000,
    "discount": 0,
    "stock": 1,
    "outputs": 0,
    "photo": "https://afrodita-back.ecommercepayments.ovh/afrodita/foto/2024_01_09_IMG_0561.jpg",
    "category": "6556e16be7e7723bceb14cbe",
    "state": "Activo",
    "__v": 0
  },
  {
    "_id": "659d702dbfbf542a46c69d7d",
    "date": null,
    "name": "Paleta Paulis",
    "reference": "PM-10",
    "description": "Cristal",
    "purchasePrice": 9000,
    "salePrice": 18000,
    "discount": 0,
    "stock": 1,
    "outputs": 0,
    "photo": "https://afrodita-back.ecommercepayments.ovh/afrodita/foto/2024_01_09_IMG_0561.jpg",
    "category": "6556e16be7e7723bceb14cbe",
    "state": "Activo",
    "__v": 0
  },
  {
    "_id": "659d7ae9bfbf542a46c69dad",
    "date": null,
    "name": "Brochas Trendy",
    "reference": " OJOS X6",
    "description": "kit basico de ojos x6",
    "purchasePrice": 9000,
    "salePrice": 20000,
    "discount": 0,
    "stock": 2,
    "outputs": 0,
    "photo": "https://afrodita-back.ecommercepayments.ovh/afrodita/foto/2024_01_09_IMG_0561.jpg",
    "category": "6556e16be7e7723bceb14cbe",
    "state": "Activo",
    "__v": 0
  },
  {
    "_id": "659d8345bfbf542a46c69dcb",
    "date": null,
    "name": "Cepilos Faciales",
    "reference": "LUNA MINi",
    "description": "Cepillos Faciales",
    "purchasePrice": 5000,
    "salePrice": 12000,
    "discount": 0,
    "stock": 2,
    "outputs": 0,
    "photo": "https://afrodita-back.ecommercepayments.ovh/afrodita/foto/2024_01_09_limpiador_facial_forever.JPG",
    "category": "6556e196e7e7723bceb14cc3",
    "state": "Activo",
    "__v": 0
  },
  {
    "_id": "659d8c00bfbf542a46c69de7",
    "date": null,
    "name": "Velo terapia Mara",
    "reference": "CEREZA",
    "description": "Velo terapia Mara",
    "purchasePrice": 6000,
    "salePrice": 12000,
    "discount": 0,
    "stock": 1,
    "outputs": 0,
    "photo": "https://afrodita-back.ecommercepayments.ovh/afrodita/foto/2024_01_09_IMG_0561.jpg",
    "category": "6556e196e7e7723bceb14cc3",
    "state": "Activo",
    "__v": 0
  },
  {
    "_id": "659d8c83bfbf542a46c69de9",
    "date": null,
    "name": "Rubor Romantic Beauty ",
    "reference": "TERRA COTTa",
    "description": "Rubor Romantic Beauty ",
    "purchasePrice": 5000,
    "salePrice": 9000,
    "discount": 0,
    "stock": 2,
    "outputs": 0,
    "photo": "https://afrodita-back.ecommercepayments.ovh/afrodita/foto/2024_01_09_IMG_0561.jpg",
    "category": "65502dbf8f7edc4b8fb4573c",
    "state": "Activo",
    "__v": 0
  },
  {
    "_id": "659eedcfbfbf542a46c6a17b",
    "date": null,
    "name": "Deliniador Perlado Trendy",
    "reference": "PEARL EYELINER",
    "description": "Deliniador Perlado Trendy",
    "purchasePrice": 3500,
    "salePrice": 7000,
    "discount": 0,
    "stock": 1,
    "outputs": 0,
    "photo": "https://afrodita-back.ecommercepayments.ovh/afrodita/foto/2024_01_09_IMG_0561.jpg",
    "category": "6556e16be7e7723bceb14cbe",
    "state": "Activo",
    "__v": 0
  },
  {
    "_id": "6556e001e7e7723bceb14c40",
    "date": null,
    "name": "Contorno Ralo",
    "reference": "01 Ralo",
    "description": "",
    "purchasePrice": 4800,
    "salePrice": 12000,
    "discount": 0,
    "stock": 1,
    "outputs": 0,
    "photo": "https://afrodita-back.ecommercepayments.ovh/afrodita/foto/2024_01_09_IMG_0561.jpg",
    "category": "65502dbf8f7edc4b8fb4573c",
    "state": "Activo",
    "__v": 0
  },
  {
    "_id": "6556e079e7e7723bceb14c46",
    "date": null,
    "name": "Bunny Blender ",
    "reference": "Pink Key",
    "description": "",
    "purchasePrice": 2000,
    "salePrice": 10000,
    "discount": 0,
    "stock": 6,
    "outputs": 0,
    "photo": "https://afrodita-back.ecommercepayments.ovh/afrodita/foto/2024_01_12_IMG_0590.jpg",
    "category": "65502dbf8f7edc4b8fb4573c",
    "state": "Activo",
    "__v": 0
  },
  {
    "_id": "6560c8aaf38e19af5d44ffa5",
    "date": null,
    "name": "Tinta de Labios Manzimiao",
    "reference": "RD02",
    "description": "",
    "purchasePrice": 2800,
    "salePrice": 7000,
    "discount": 0,
    "stock": 1,
    "outputs": 0,
    "photo": "https://afrodita-back.ecommercepayments.ovh/afrodita/foto/2024_01_09_IMG_0561.jpg",
    "category": "6556e1ade7e7723bceb14cc5",
    "state": "Activo",
    "__v": 0
  },
  {
    "_id": "659d86eebfbf542a46c69dd5",
    "date": null,
    "name": "Deliniador Trendy ",
    "reference": "UNICORN POp",
    "description": "Deliniador Trendy",
    "purchasePrice": 2500,
    "salePrice": 5000,
    "discount": 0,
    "stock": 7,
    "outputs": 0,
    "photo": "https://afrodita-back.ecommercepayments.ovh/afrodita/foto/2024_01_09_IMG_0561.jpg",
    "category": "6556e16be7e7723bceb14cbe",
    "state": "Activo",
    "__v": 0
  },
  {
    "_id": "659d8a01bfbf542a46c69ddf",
    "date": null,
    "name": "Mascara Ruby Rose",
    "reference": "TROPICo",
    "description": "Mascara Ruby Rose",
    "purchasePrice": 2500,
    "salePrice": 7000,
    "discount": 0,
    "stock": 1,
    "outputs": 0,
    "photo": "https://afrodita-back.ecommercepayments.ovh/afrodita/foto/2024_01_09_IMG_0561.jpg",
    "category": "6556e16be7e7723bceb14cbe",
    "state": "Activo",
    "__v": 0
  },
  {
    "_id": "655133d7f2376c95b68c5cb8",
    "date": null,
    "name": "Polvo Compacto SAMY",
    "reference": "9 EBANO",
    "description": "Polvo SAMY",
    "purchasePrice": 7500,
    "salePrice": 15000,
    "discount": 0,
    "stock": 0,
    "outputs": 0,
    "photo": "https://afrodita-back.ecommercepayments.ovh/afrodita/foto/2024_01_09_IMG_0564.jpg",
    "category": "65502dbf8f7edc4b8fb4573c",
    "state": "Inactivo",
    "__v": 0
  },
  {
    "_id": "6556dfa5e7e7723bceb14c3c",
    "date": null,
    "name": "Rubor Sfr Color",
    "reference": "04 Blush",
    "description": "",
    "purchasePrice": 4200,
    "salePrice": 10000,
    "discount": 0,
    "stock": 0,
    "outputs": 0,
    "photo": "https://afrodita-back.ecommercepayments.ovh/afrodita/foto/2024_01_09_IMG_0561.jpg",
    "category": "65502dbf8f7edc4b8fb4573c",
    "state": "Inactivo",
    "__v": 0
  },
  {
    "_id": "6560c831f38e19af5d44ff9f",
    "date": null,
    "name": "Tinta de Labios Manzimiao",
    "reference": "OR01",
    "description": "",
    "purchasePrice": 2800,
    "salePrice": 7000,
    "discount": 0,
    "stock": 0,
    "outputs": 0,
    "photo": "https://afrodita-back.ecommercepayments.ovh/afrodita/foto/2024_01_09_IMG_0561.jpg",
    "category": "6556e1ade7e7723bceb14cc5",
    "state": "Inactivo",
    "__v": 0
  }
]

export const fakeData = [
  {
    id: '1',
    firstName: 'Dylan',
    lastName: 'Murray',
    city: 'East Daphne',
    state: 'Kentucky',
    managerId: null,
    // subRows: [
    //   {
    //     id: '1.1',
    //     firstName: 'Ervin',
    //     lastName: 'Reinger',
    //     city: 'South Linda',
    //     state: 'West Virginia',
    //     managerId: '1',
    //     subRows: [
    //       {
    //         id: '1.1.1',
    //         firstName: 'Jordane',
    //         lastName: 'Homenick',
    //         city: 'South Linda',
    //         state: 'West Virginia',
    //         managerId: '1.1',
    //       },
    //       {
    //         id: '1.1.2',
    //         firstName: 'Jordan',
    //         lastName: 'Clarkson',
    //         city: 'San Francisco',
    //         state: 'California',
    //         managerId: '1.1',
    //       },
    //     ],
    //   },
    //   {
    //     id: '1.2',
    //     firstName: 'Brittany',
    //     lastName: 'McCullough',
    //     city: 'Lincoln',
    //     state: 'Nebraska',
    //     managerId: '1',
    //   },
    // ],
  },
  {
    id: '2',
    firstName: 'Raquel',
    lastName: 'Kohler',
    city: 'Columbus',
    state: 'Ohio',
    managerId: null,
    // subRows: [
    //   {
    //     id: '2.1',
    //     firstName: 'Branson',
    //     lastName: 'Frami',
    //     city: 'Charleston',
    //     state: 'South Carolina',
    //     managerId: '2',
    //   },
    // ],
  },
  {
    id: '3',
    firstName: 'Jordon',
    lastName: 'Harris',
    city: 'Perth',
    state: 'Western Australia',
    managerId: null,
    // subRows: [
    //   {
    //     id: '3.1',
    //     firstName: 'Eldora',
    //     lastName: 'Koch',
    //     city: 'Perth',
    //     state: 'Western Australia',
    //     managerId: '3',
    //   },
    //   {
    //     id: '3.2',
    //     firstName: 'Glenn',
    //     lastName: 'Crist',
    //     city: 'Darwin',
    //     state: 'Northern Territory',
    //     managerId: '3',
    //   },
    // ],
  },
];

//50 us states array
export const usStates = [
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming',
  'Puerto Rico',
  'Western Australia',
  'Northern Territory',
  'South Australia',
  'Queensland',
];

export const typeCategory = [
  "Servicio"
]

export function formatPrice(val) {
  try {
    if (val > 0) {
      let value = parseFloat(val).toFixed(0);
      value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return `$${value}`;
    } else if (val === 0) {
      return "$" + val;
    } else if (val === "") {
      return val;
    }
    return null;
  } catch (error) {
    console.error(error);
  }
}
