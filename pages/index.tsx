import * as React from 'react';
import { NextPage } from 'next';
import { styled, alpha } from '@mui/material/styles';
import Head from 'next/head';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import ChatHistory from '../components/ChatHistory';
import FriendHeader from '../components/Header/FriendHeader';
import FriendList from '../components/FriendList';
import Divider from '@mui/material/Divider';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import { SelectFriendContext } from '../contexts/FriendContext';

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

const Home: NextPage = () => {
    const [selectedFriend, setSelectedFriend] = React.useState(null);
    const selectFriendContext = React.useContext(SelectFriendContext);
    const selectFriend = (user: any) => {
        setSelectedFriend(user);
    };

    return (    
        <SelectFriendContext.Provider value={{user: selectedFriend, selectFriend}} >
            <Head>
                <title>Piggies Chat</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <CssBaseline />
            <Box
                sx = {{
                    display: 'flex'
                }}
            >
                <Box
                    sx = {{
                        width: {xs: '100%', sm: 420},
                        
                    }}
                >
                    <Header />
                    <SearchBar />
                    <FriendList />
                </Box>
                <Box
                    sx = {{
                        width: '100%',
                        display: { xs: 'none', sm: 'block'},
                        boxShadow: 'rgb(0 0 0 / 20%) 0px -5px 8px 0px',
                    }}
                >
                    
                    {selectFriendContext.user && <>
                    <FriendHeader />
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
                    
                </Box>
            </Box>
            
            <Footer />
        </SelectFriendContext.Provider>
    )
}

export default Home;