import { AppBar, Container, Toolbar, Paper,Grid, Typography, Box, IconButton} from "@mui/material";
import AddAPhotoRoundedIcon from '@mui/icons-material/AddAPhotoRounded';
import ButtonAuth from 'components/ButtonsAuth/ButtonAuth';
import SearchControl from 'components/SearchControl/SearchControl';

const HeaderPage = () => {
        return (
        <>
            <AppBar position="static">
                <Container>
                    <Toolbar>
                        <IconButton>
                            <AddAPhotoRoundedIcon/>
                        </IconButton>
                        <Typography variant="h3" sx={{flexGrow:1}} >
                            My Collection
                        </Typography>
                        <Box >
                       <ButtonAuth/>
                        </Box>
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

export default HeaderPage