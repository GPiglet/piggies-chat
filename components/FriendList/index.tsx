import * as React from 'react';
import {styled} from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Popover from '@mui/material/Popover';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import CheckIcon from '@mui/icons-material/Check';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Scrollbars from 'react-custom-scrollbars-2';
import Box from '@mui/material/Box';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';

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

const FriendList = (props: any) => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const friends = [
        {
            username: 'Smart Dev',
            message: 'Hi',
            writeDate: '6/11/2022'
        },
        {
            username: 'Black Jack',
            message: 'How are you',
            writeDate: '6/11/2022'
        },
        {
            username: 'Harry Poto',
            message: 'AASDODKFWP',
            writeDate: '6/11/2022'
        },
        {
            username: 'Steve L',
            message: 'Are you there?',
            writeDate: '6/11/2022'
        },
        {
            username: 'Wolf Han',
            message: 'Hello',
            writeDate: '6/11/2022'
        },
        {
            username: 'Worker Fa',
            message: 'Hi',
            writeDate: '6/11/2022'
        }
    ];

    const friendItems = friends.map((friend, index) => {
        return(
            <ListItem
                key={index}
                button
                // onClick={this.onClick.bind(this, friend)}
                sx = {index == 0 ? {
                    bgcolor: 'rgba(0,0,0,0.08)'
                } : {}}
            >                
                <ListItemAvatar>
                    <StyledBadge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant="dot"
                    >
                        <Avatar {...stringAvatar(friend.username)} />
                    </StyledBadge>
                </ListItemAvatar>
                <ListItemText
                    primary={friend.username}
                    secondary={friend.message}
                    primaryTypographyProps={{overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'pre', fontSize: '0.9rem', width: '86%'}}
                    secondaryTypographyProps={{overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'pre', fontSize: '0.75rem'}} />
                <ListItemSecondaryAction sx={{top: '40%'}}>
                    <Typography variant="overline" sx={{color: 'rgba(0, 0, 0, 0.6)'}}>
                        {friend.writeDate}
                    </Typography>
                </ListItemSecondaryAction>
            </ListItem>
        )
        
    });
    return (
        <>
            <Button aria-describedby={id} onClick={handleClick} size="small" endIcon={<ExpandMoreIcon />} sx={{marginTop: 4, textTransform: 'none'}}>Recent chats</Button>        
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
                }}
            >
                <List
                    sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader" sx={{lineHeight: 3}}>
                            Sort by
                        </ListSubheader>
                    }
                    >
                    <ListItemButton sx={{pt: 0, pb: 0}}>
                        <ListItemText primary="Sort by Time" sx={{pr: 5}} primaryTypographyProps={{fontSize: 14}}/>
                        <CheckIcon fontSize="small" color="primary"/>
                    </ListItemButton>
                    <ListItemButton sx={{pt: 0, pb: 0}}>
                        <ListItemText primary="Sort by Unread" sx={{pr: 5}} primaryTypographyProps={{fontSize: 14}}/>
                        <CheckIcon fontSize="small" color="primary" sx={{display: 'none'}}/>
                    </ListItemButton>
                </List>
                <Divider/>
                <List
                    sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader" sx={{lineHeight: 3}}>
                            More
                        </ListSubheader>
                    }
                    >
                    <ListItemButton sx={{pt: 0, pb: 0}}>
                        <ListItemText primary="Show favorites" sx={{pr: 5}} primaryTypographyProps={{fontSize: 14}}/>
                        <CheckIcon fontSize="small" color="primary" sx={{display: 'none'}}/>
                    </ListItemButton>
                </List>

            </Popover>
            <Box
                sx = {{
                    height: 'calc(100vh - 188px)',
                    overflow: 'auto'
                }}
            >
            <Scrollbars universal={true}>
            <List>
                {friendItems}
            </List>
            </Scrollbars>
            </Box>
        </>
    );
}

export default FriendList;
