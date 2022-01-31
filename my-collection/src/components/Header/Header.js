import { AppBar, Container, Toolbar, Link, Paper,Grid, Typography, Box, IconButton} from "@mui/material";
import AddAPhotoRoundedIcon from '@mui/icons-material/AddAPhotoRounded';
import ButtonAuth from 'components/ButtonsAuth/ButtonAuth';
import SearchControl from 'components/SearchControl/SearchControl';
import MenuUser from 'components/MenuUser/MenuUser';
import {useTranslation} from 'react-i18next';
import { useHistory } from 'react-router-dom';



const Header = () => {
    const {push} = useHistory();
    const redirectToHome=()=>{
      push('/');
    }
    const {t} = useTranslation();
        return (
        <>
            <AppBar position="static">
                <Container>
                    <Toolbar>
                        <IconButton>
                            <AddAPhotoRoundedIcon onClick={redirectToHome}/>
                        </IconButton>
                        <Typography variant="h3" sx={{flexGrow:1}} >
                            {t('homepage.MyCollections')}
                        </Typography>
                        <Box >
                       <ButtonAuth/>
                        </Box>
                        <MenuUser/>
                    </Toolbar>
                </Container>
            </AppBar>
            <Paper >
                    <Container fixed>
                        <Grid container>
                            <Grid item md={6}>
                                <div >
                                   <SearchControl/>
                                </div>
                            </Grid>
                        </Grid>
                    </Container>
                </Paper>
        </>
    )
}

export default Header