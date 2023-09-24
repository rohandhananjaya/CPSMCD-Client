// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
    user: ['Officer', 'Farmer'	,'Buyer','Seller'],
  },
  {
    title: 'Crops List',
    path: '/dashboard/crop-manager',
    icon: icon('ic_crop'),
    user: ['Officer', 'Farmer' ,'Buyer'],
  },
  {
    title: 'My Crops',
    path: '/dashboard/user',
    icon: icon('ic_user'),
    user: ['Farmer'	,'Buyer'],
  },
  {
    title: 'Shop',
    path: '/dashboard/products',
    icon: icon('ic_cart'),
    user: ['Farmer','Seller'],
  },
  {
    title: 'Help',
    path: '/dashboard/help',
    icon: icon('ic_blog'),
    user: ['Officer', 'Farmer'	,'Buyer','Seller'],
  },

];

export default navConfig;
