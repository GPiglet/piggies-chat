import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import ChatHistory from '../ChatHistory';
import FriendHeader from '../Header/FriendHeader';
import SendIcon from '@mui/icons-material/Send';
import { SelectFriendContext } from '../../contexts/FriendContext';

const InputMessageField = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: 50,
    backgroundColor: alpha(theme.palette.common.black, 0.04),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.black, 0.05),
    },
    marginTop: 4,
    marginLeft: theme.spacing(2),
    width: '100%'
    
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: 15,
      paddingLeft: 30,
      paddingRight: 30,
      fontSize: 13,
    },
}));

const ChatContent = React.forwardRef((props: any, ref) => {
    const selectFriendContext = React.useContext(SelectFriendContext);

    return (
        <Box ref={ref}
            sx = {{
                width: '100%',
                boxShadow: 'rgb(0 0 0 / 20%) 0px -5px 8px 0px',
            }}
        >
            
            {selectFriendContext.user && <>
            <FriendHeader refLeftSide={props.refLeftSide} refChatContent={ref} />
            <Divider />
            <ChatHistory />
            
            <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={0}
            >
                <InputMessageField>
                <StyledInputBase fullWidth={true}
                    placeholder="Type a message"
                />
                </InputMessageField>
                <IconButton color="primary" aria-label="Send a message" sx={{mr: 2}}>
                    <SendIcon fontSize="large" />
                </IconButton>
            </Stack>
            </>}
            {!selectFriendContext.user &&
                <Box
                    sx={{
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Typography variant="h2" align="center">
                        Welcome Piglet!
                    </Typography>
                </Box>
            }
            
        </Box>
    );
})

export default ChatContent;
