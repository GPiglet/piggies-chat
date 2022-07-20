import * as React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router'
import {AuthContext, UserType} from '../contexts/AuthContext';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Copyright from '../components/Footer/Copyright';
import PiggiesSnackbar from '../components/Widgets/PSnackbar';

const theme = createTheme();

const SignUpPage: NextPage = () => {
  const router = useRouter();
  const authContext = React.useContext(AuthContext);
  const [openErrorSnackbar, setOpenErorSnackbar] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const user:UserType = {
      firstname: data.get('firstname')?.toString()||'',
      lastname: data.get('lastname')?.toString()||'',
      email: data.get('email')?.toString()||'',
      password: data.get('password')?.toString()||'',
    }

    if ( !user.firstname || !user.lastname || !user.email || !user.password )
    {
      setErrorMessage('All input is required.');
      setOpenErorSnackbar(true);
      return;
    }

    const onError = (err: any) => {
      if ( err.response ) {
        setOpenErorSnackbar(true);
        setErrorMessage(err.response.data);
      }
    }

    authContext.signup(user, 
      (user: any) => {
        router.push({pathname: '/login', query: user})
      },
      onError
    )
  };

  const onCloseSnackbar = () => {
    setOpenErorSnackbar(false);
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstname"
                  required
                  fullWidth
                  id="firstname"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastname"
                  label="Last Name"
                  name="lastname"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                /> 
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>
          <Link href="/login" variant="body2">
            Already have an account? Sign in
          </Link>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
      <PiggiesSnackbar open={openErrorSnackbar} onClose={onCloseSnackbar} message={errorMessage}/>
    </ThemeProvider>
  );
}

export default SignUpPage;