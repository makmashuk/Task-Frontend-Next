
import * as React from 'react';
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
import { useEffect } from 'react';
import { useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { NextPage } from 'next/types';
import { authenticateUser } from '../store/loginSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { Alert } from '@mui/material';
import { useRouter } from 'next/router';
import authService from '../services/auth.service';
import { hasCookie } from 'cookies-next';
import { setTimeout } from 'timers/promises';

const Login : NextPage =() => {

  const [email, setEmail] = useState("mak@gmail.com");
  const [password, setPassword] = useState("123");

  const loadingState = useAppSelector( (state) => state.authentication.isProcessingRequest);
  const isAuthenticated = useAppSelector( (state) => state.authentication.isAuthenticated);
  const responseError = useAppSelector( (state) => state.authentication.message);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isLoggedIn = hasCookie('isLoggedIn');
  
  const handleLoginClick = (event:any) => {
   
    event.preventDefault();
    const loginPayload = { email, password };
    dispatch(authenticateUser(loginPayload));
    
  };
  useEffect(() => {
    // if isLoggedIn turned to true redirect to /home
    if (isLoggedIn) { 
      router.push("/movies");
    }
  }, [isAuthenticated, isLoggedIn, router]); // triggers when isLoggedIn changes

  return (
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
          Sign in
        </Typography>
        
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        { responseError && <Alert severity="error">{responseError}</Alert>}
        <LoadingButton
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleLoginClick}
            loading={loadingState}
          >
            Login 
          </LoadingButton>
          <Grid container>
            <Grid item xs>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}
export default Login
