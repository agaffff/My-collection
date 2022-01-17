import { AppBar, Container, Toolbar, Typography, Box, Paper, Grid, IconButton, CardMedia, CardContent, CardActions, Button} from "@mui/material";
import AddAPhotoRoundedIcon from '@mui/icons-material/AddAPhotoRounded';
import SearchControl from 'components/SearchControl/SearchControl'; 
import ButtonAuth from 'components/ButtonsAuth/ButtonAuth';
import Card from '@mui/material/Card';
import { DeleteForever } from "@mui/icons-material";


const HeaderPage = () => {
    const cards = [1,2,3,4,5,6] 
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

            <main>
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
                <Container maxWidth="md" >
                    <Typography variant="h3">Последние добавленные картинки</Typography>
                    <Grid container spacing={4} >
                        {cards.map((card)=>(
                            <Grid item key={card} xs={12} sm={6} md={4} >
                                <Card sx={{mt:"3rem"}}>
                                    <CardMedia
                                    sx={{paddingTop:"50%"}}
                                    image="https://source.unsplash.com/random"
                                    title="image title"/>
                                    <CardContent>
                                    <Typography variant="h5">
                                        красивая фотка
                                    </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" color="primary">Edit</Button>
                                        <IconButton>
                                        <DeleteForever/>
                                        </IconButton>
                                    </CardActions>
                                </Card>

                            </Grid>
                        ))}

                    </Grid>

                </Container>
            </main>
        </>
    )
}

export default HeaderPage
