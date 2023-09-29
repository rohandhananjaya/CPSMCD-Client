// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
    user: ['Officer', 'Farmer', 'Buyer', 'Seller'],
  },
  {
    title: 'Crop Manager',
    path: '/dashboard/crop-manager',
    icon: icon('ic_crop'),
    user: ['Officer', 'Farmer'],
  },
  {
    title: 'My Cultivations',
    path: '/dashboard/cultivations',
    icon: icon('ic_user'),
    user: ['Farmer'],
  },
  {
    title: 'Marketplace',
    path: '/dashboard/products',
    icon: icon('ic_cart'),
    user: ['Farmer', 'Seller'],
  },
  {
    title: 'My Products',
    path: '/dashboard/my-products',
    icon: icon('ic_shop'),
    user: ['Seller'],
  },
  {
    title: 'Auction',
    path: '/dashboard/auction',
    icon: icon('ic_shop'),
    user: ['Buyer'],
  },
  {
    title: 'Help',
    path: '/dashboard/help',
    icon: icon('ic_blog'),
    user: ['Officer', 'Farmer', 'Buyer', 'Seller'],
  },

];

export default navConfig;
