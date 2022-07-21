
import * as React from 'react';
import AuthContext from '../../contexts/AuthContext';

import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Popover from '@mui/material/Popover';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import Popper from '@mui/material/Popper';
import Paper from '@mui/material/Paper';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Box from '@mui/material/Box';
import PiggiesPopper from '../Widgets/PPopper';

function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

function stringAvatar(name: string) {
    return {
        sx: {
        bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1] ? name.split(' ')[1][0] : ''}`,
    };
}

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
        transform: 'scale(.8)',
        opacity: 1,
        },
        '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
        },
    },
}));

const Header = (props: any) => {
    const authContext = React.useContext(AuthContext);
    const user = authContext.user;

    const [open, setOpen] = React.useState<boolean>(false);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setOpen((prev)=>!prev);
    };

    const handleClose = () => {
      setOpen(false);
    }

    const onLogout = () => {
      authContext.logout();
    }

    return (
        <>
          <ListItem
            secondaryAction={
              <PiggiesPopper
                open={open}
                placement='bottom'
                onClose={handleClose}
                anchorEl={
                  <IconButton edge="end" aria-label="setting" onClick={handleClick}>
                      <MoreHorizIcon />
                  </IconButton>
                }
              >
                  <List
                    sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                  >
                    <ListItemButton sx={{pt: 0, pb: 0}}>
                      <ListItemText primary="Setting" sx={{pr: 5}} primaryTypographyProps={{fontSize: 14}}/>
                    </ListItemButton>
                  </List>
                  <Divider/>
                  <List
                    sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                  >
                    <ListItemButton sx={{pt: 0, pb: 0}} onClick={onLogout}>
                      <ListItemText primary="Sign out" sx={{pr: 5}} primaryTypographyProps={{fontSize: 14}}/>
                    </ListItemButton>
                  </List>
              </PiggiesPopper>
            }
          >
            <ListItemAvatar>
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                variant="dot"
              >
                <Avatar {...stringAvatar(`${user?.firstname.toUpperCase()} ${user?.lastname.toUpperCase()}`)} />
              </StyledBadge>
            </ListItemAvatar>
            <ListItemText
              className={'ellipsis'}
              // inset={true}
              primary={`${user?.firstname} ${user?.lastname}`}
              primaryTypographyProps={{
                fontWeight: 'bold',
                }}
              secondary={'Set a status'} />
          </ListItem>
        </>
    );
}

export default Header;