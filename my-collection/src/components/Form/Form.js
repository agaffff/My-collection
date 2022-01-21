import {useState,useEffect} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useTranslation} from 'react-i18next';

import Avatar from '@mui/material/Avatar';

import CssBaseline from '@mui/material/CssBaseline';

import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';



const Form = ({title, handleClick}) => {
    const [email, setEmail] =useState('');
    const [pass, setPass] = useState('');
    const [hidden, setHidden] = useState(false);
    const {t} = useTranslation();
  
     useEffect(() => {
       setHidden(title == 'SignUp' ? true:false)
     }, [])

    


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
          {t('logininfo.'+title)}
          </Typography>
          <Box component="form"  noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              name="email"
              label={t('logininfo.EmailAddress')}
             
              value={email}
              autoComplete="email"
              onChange={(e)=> setEmail(e.target.value)}
              autoFocus
            /> 
              
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label={t('logininfo.Password')}
              value={pass}
              type="password"
              id="password"
              onChange={(e)=> setPass(e.target.value)}
              autoComplete="current-password"
              
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() =>handleClick(email,pass)}
            >
              {t('logininfo.'+title)}
            </Button>
            <Grid container>
               <Grid item>
                <Link href="register" hidden = {hidden} variant="body2">
                {t('logininfo.DontHaveAnAccountSignUp')}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        
      </Container>


     )
 }

export default Form
