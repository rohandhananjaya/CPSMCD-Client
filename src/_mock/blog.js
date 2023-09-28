import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

const POST_TITLES = [
  'Introducing New Organic Pesticides for Healthier Crops',
  'Breakthrough in Soil Fertility: The Future of Farming',
  'The Impact of Climate Change on Crop Yield',
  'Sustainable Farming: Techniques for the Modern Farmer',
  'New Fertilizer Formula Promises Bigger Harvests',
  'The Role of Technology in Precision Agriculture',
  'Water Conservation Techniques in Agriculture',
  'The Rise of Vertical Farming and Its Benefits',
  'Organic vs. Conventional Farming: A Comparative Study',
  'The Importance of Crop Rotation for Soil Health',
  'Innovative Farming Equipment to Boost Productivity',
  'The Global Impact of Genetically Modified Crops',
  'Natural Pest Control Methods for Sustainable Farming',
  'Exploring the Benefits of Drip Irrigation Systems',
  'The Future of Farming: Hydroponics and Aquaponics',
  'Agricultural Policies and Their Impact on Small-scale Farmers',
  'The Role of Bees in Pollination and Crop Yield',
  'Challenges and Solutions in Organic Farming',
  'The Science Behind Soil pH and Plant Growth',
  'A Guide to Safe and Effective Fertilizer Use',
  'Understanding the Basics of Composting',
  'The Importance of Seed Quality in Crop Production',
  'Tackling Weeds: Natural Methods to Protect Your Crops',
  'The Role of Drones in Modern Agriculture',
];

const posts = [...Array(23)].map((_, index) => ({
  id: faker.datatype.uuid(),
  cover: `/assets/images/covers/cover_${index + 1}.jpg`,
  title: POST_TITLES[index + 1],
  createdAt: faker.date.past(),
  view: faker.datatype.number(),
  comment: faker.datatype.number(),
  share: faker.datatype.number(),
  favorite: faker.datatype.number(),
  author: {
    name: faker.name.fullName(),
    avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  },
}));

export default posts;
