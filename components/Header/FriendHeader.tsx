
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { SelectFriendContext } from '../../contexts/FriendContext';
import * as React from 'react';

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
    const selectFriendContext = React.useContext(SelectFriendContext);

    const gotoFriendList = () => {
        const refLeftSide = props.refLeftSide;
        const refChatContent = props.refChatContent;
        refLeftSide.current.style.display = 'block';
        if ( window.innerWidth < 600 )
            refChatContent.current.style.display = 'none';
    };
    
    return (
        <ListItem
            // button
            // onClick={this.onClick.bind(this, friend)}
            secondaryAction={
                <IconButton edge="end" aria-label="setting">
                    <MoreHorizIcon />
                </IconButton>
                }
        >
            <IconButton sx={{display: {sm: 'none'}, mr: 2}} aria-label="Go to friend list" onClick={gotoFriendList}>
                <ArrowBackIcon />
            </IconButton>
            <ListItemAvatar>
                <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                >
                    <Avatar {...stringAvatar(selectFriendContext.user.username)} />
                </StyledBadge>
            </ListItemAvatar>
            <ListItemText
                className={'ellipsis'}
                // inset={true}
                primary={selectFriendContext.user.username}
                secondary={'Last seen 17h ago'} />
        </ListItem>
    );
}

export default Header;