// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'My Crops',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },
  {
    title: 'Shop',
    path: '/dashboard/products',
    icon: icon('ic_cart'),
  },
  {
    title: 'Help',
    path: '/dashboard/help',
    icon: icon('ic_blog'),
  },
  {
    title: 'Add Crop',
    path: '/dashboard/add-crop',
    icon: icon('ic_blog'),
  },
];

export default navConfig;
