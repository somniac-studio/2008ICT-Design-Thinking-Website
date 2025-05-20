
import type { Initiative } from '@/types';

export const mockInitiatives: Initiative[] = [
  {
    //an ongoing project
    id: 'init-1',
    slug: 'green-brisbane-2030',
    title: 'Green Brisbane 2030',
    summary: 'A plan to increase green spaces and promote sustainable urban development.',
    imageUrl: 'https://placehold.co/600x400.png',
    goals: ['Increase parklands by 20%', 'Plant 1 million new trees', 'Promote rooftop gardens'],
    status: 'Ongoing',
    content: 'Green Brisbane 2030 is our commitment to making Brisbane a more verdant and liveable city. We are working with communities, businesses, and environmental groups to achieve ambitious targets for green space expansion, tree planting, and innovative urban greening solutions like vertical gardens and community orchards. This initiative also focuses on enhancing biodiversity and improving air quality across the city.'
  },
  {
    // a planned future project
    id: 'init-2',
    slug: 'brisbane-smart-city-connect',
    title: 'Brisbane Smart City Connect',
    summary: 'Leveraging technology to improve city services, transport, and connectivity.',
    imageUrl: 'https://placehold.co/600x400.png',
    goals: ['Implement city-wide free Wi-Fi', 'Optimize traffic flow with smart signals', 'Develop a unified city services app'],
    status: 'Planned',
    content: 'The Brisbane Smart City Connect initiative aims to harness the power of technology to create a more efficient, sustainable, and connected urban environment. Key projects include the deployment of a comprehensive IoT network, development of intelligent transportation systems, and the creation of digital platforms that provide citizens with seamless access to city services and information. We envision a future where data-driven insights improve the quality of life for all Brisbane residents.'
  },
  {
    //a previously complete project
    id: 'init-3',
    slug: 'community-arts-revitalization',
    title: 'Community Arts Revitalization',
    summary: 'Supporting local artists and cultural programs to enrich Brisbane\'s vibrant arts scene.',
    imageUrl: 'https://placehold.co/600x400.png',
    goals: ['Increase funding for public art installations', 'Provide grants for local artists', 'Establish new community art centers'],
    status: 'Completed',
    content: 'The Community Arts Revitalization project was a successful endeavor to bolster Brisbane\'s cultural landscape. Through increased funding, grants, and the establishment of new facilities, we empowered local artists and made art more accessible to all communities. This initiative has resulted in numerous public art installations, vibrant cultural festivals, and a stronger, more engaged arts community across the city.'
  },
];
