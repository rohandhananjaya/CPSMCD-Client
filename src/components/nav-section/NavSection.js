import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { NavLink as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import { Box, List, ListItemText } from '@mui/material';
//
import { StyledNavItem, StyledNavItemIcon } from './styles';


// ----------------------------------------------------------------------

NavSection.propTypes = {
  data: PropTypes.array,
};

export default function NavSection({ data = [], ...other }) {
  const user = useSelector((state) => state.auth);
  const [userType, setUserType] = useState('--');
  const navigate = useNavigate();
  useEffect(() => {
    if(user.user === null){
      navigate('/login',{replace:true});
    }else{
      setUserType(user.user.type)
    }
  }, [user]);
  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {data.map((item) => (
          <NavItem key={item.title} item={item} user={userType} />
        ))}
      </List>
    </Box>
  );
}

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
};

function NavItem({ item, user }) {
  const { title, path, icon, info } = item;


  if (item.user.includes(user)) {
  return (
    <StyledNavItem
      component={RouterLink}
      to={path}
      sx={{
        '&.active': {
          color: 'text.primary',
          bgcolor: 'action.selected',
          fontWeight: 'fontWeightBold',
        },
      }}
    >
      <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>

      <ListItemText disableTypography primary={title} />

      {info && info}
    </StyledNavItem>
  );
}
}
