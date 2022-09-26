import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useAppDispatch } from '../../store/hooks';
import authService from '../../services/auth.service';
import  { logout } from '../../store/loginSlice'
import { useRouter } from 'next/router';
import { deleteCookie } from 'cookies-next';
export default function AppToolBar() {

    const router = useRouter();
    const handelLogout = ()=>{
        //removing cookie from server
        deleteCookie('isLoggedIn');
        //removing token from localStorage
        authService.logout();
        //redirecting to login 
        router.push('/');
    }

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Movies
          </Typography>
          <Button color="inherit" onClick={handelLogout} >Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
    </div>
  );
}
