import * as React from 'react';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Scrollbars from 'react-custom-scrollbars-2';
import Box from '@mui/material/Box';

const stringToColor = (string: string) => {
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

const stringAvatar = (name: string) => {
    return {
        sx: {
        bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1] ? name.split(' ')[1][0] : ''}`,
    };
}


const formatDate = (d: Date, isShort: Boolean = true) => {
    if ( isShort )
    {
        let month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();
        
        if (day.length < 2) day = '0' + day;
        
        return [month, day, year].join('/');
    }    
    else
    {
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let month = months[d.getMonth()], day = '' + d.getDate(), year = d.getFullYear(), week = days[d.getDay()];
        if ( day.length < 2 ) day = '0' + day;
        return week + ', ' + month + ' ' + day + ', ' + year;
    }
}

const formatTime = (d: Date) => {
    let hour = '' + d.getHours(),
    min = '' + d.getMinutes();

    if (min.length < 2) 
        min = '0' + min;

    return [hour, min].join(':');
}



const Chat = (props: any) => {
    const dummy = props.dummy, align = props.align;
    const secondarys = dummy.map((chat: any, index: number) => {
        return (
            <ListItemText key={index} 
                primary={chat.message}
                primaryTypographyProps={{
                    display: 'inline-block', 
                    minWidth: 50,
                    color: 'rgb(37, 36, 35)',
                    bgcolor: 'rgba(0, 0, 0, 0.05)', 
                    padding: 0.75, 
                    pr: 2,
                    pl: 2,
                    fontSize: '0.8rem', 
                    textAlign: 'left',
                    ml: align=='right' ? 5 : 0,
                    mr: align=='left' ? 5 : 0,
                    borderRadius: align == 'right' ? index == 0 ? '8px 8px 0 8px' : '8px 0 0 8px' : index == dummy.length-1 ? '0 8px 8px 8px' : '0 8px 8px 0'
                }}
                sx={{m: 0.2}}
            />
        )
    });
    return(
        <ListItem
            sx={{alignItems: 'flex-start', textAlign: align}}
        >       
            {align=='left' &&          
            <ListItemAvatar>
                <Avatar {...stringAvatar('Smart Dev')} />
            </ListItemAvatar>}
            <ListItemText
                disableTypography = {true}
                primary={<Typography sx={{fontSize: '0.8rem', color: 'rgba(0,0,0,0.6)'}}>
                    {(align=='left' ? 'Smart Dev, ' : '') + formatTime(dummy[0].createDate)}
                </Typography>}
                secondary={<List>{secondarys}</List>}
            />
        </ListItem>
    );
} 

const ChatHistory = (props: any) => {
    let myId = '1';
    const chats = [
        {sender: '1', receiver: '2', message: 'Hi', createDate: new Date('6/22/2022 15:20:50')},
        {sender: '1', receiver: '2', message: 'by the way, would like to transfer as much as possible. so let me know how much can you transfer?', createDate: new Date('6/22/2022 15:21:50')},
        {sender: '1', receiver: '2', message: 'Hi', createDate: new Date('6/22/2022 15:30:50')},
        {sender: '1', receiver: '2', message: 'u there?', createDate: new Date('6/22/2022 15:30:50')},
        {sender: '2', receiver: '1', message: 'Hi', createDate: new Date('6/22/2022 15:30:50')},
        {sender: '2', receiver: '1', message: 'How are you', createDate: new Date('6/22/2022 15:30:50')},
        {sender: '2', receiver: '1', message: 'I mean that prevent to login from more than two computer at once', createDate: new Date('6/22/2022 15:30:50')},
        {sender: '1', receiver: '2', message: 'Hi', createDate: new Date('6/22/2022 15:31:50')},
        {sender: '2', receiver: '1', message: 'Hi', createDate: new Date('6/22/2022 15:31:50')},
    ];

    let prevSender = chats[0].sender, prevDate = chats[0].createDate, chatDummy: Array<any> = [], chatList = [], index = 0;
    for( let i = 0; i < chats.length; i++ )
    {
        let chat = chats[i];
        if ( prevSender != chat.sender || chat.createDate.getTime() - prevDate.getTime() >= 60*1000 )
        {
            chatList.push(<Chat key={index++} dummy={chatDummy} align={prevSender == myId ? 'right' : 'left'} />);
            chatDummy = [];
        }

        chatDummy.push(chat);
        prevSender = chat.sender;
        prevDate = chat.createDate;
    }
    if ( chatDummy.length > 0 )
    {
        chatList.push(<Chat key={index++} dummy={chatDummy} align={prevSender == myId ? 'right' : 'left'} />);
    }

    return (
        <Box
            sx = {{
                height: 'calc(100vh - 150px)',
                overflow: 'auto'
            }}
        >
        <Scrollbars universal={true}>
        <List>
            {chatList}
        </List>
        </Scrollbars>
        </Box>
    );
}

export default ChatHistory;
