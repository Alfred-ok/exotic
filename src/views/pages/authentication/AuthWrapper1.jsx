// material-ui
/*
import { styled } from '@mui/material/styles';
import img from "../../../assets/images/The-Hottest-Modern-Wallpapers.jpg"

// ==============================|| AUTHENTICATION 1 WRAPPER ||============================== //

const AuthWrapper1 = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  backgroundImage:`URL(${img})`,
  minHeight: '100vh'
}));

export default AuthWrapper1;*/


import { styled } from '@mui/material/styles';
import img from "../../../assets/images/download17.jpg";

// ==============================|| AUTHENTICATION 1 WRAPPER ||============================== //

const AuthWrapper1 = styled('div')(({ theme }) => ({
  position: 'relative',
  backgroundImage: `url(${img})`,
  backgroundSize: 'contain',
  backgroundPosition: 'center',
  minHeight: '100vh',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(30, 53, 201, 0.3)', // <-- semi-transparent black overlay
    zIndex: 1
  },
  '& > *': {
    position: 'relative',
    zIndex: 2 // Ensures children are above the overlay
  }
}));

export default AuthWrapper1;

