import { useState, useEffect } from "react";
 
import Card from '@mui/material/Card';
import { DeleteForever } from "@mui/icons-material";
import { CardMedia, CardContent, CardActions, Button, IconButton, Container, Typography, Paper, Box} from "@mui/material";
import {db} from "../../firebase";
import {collection, getDocs, addDoc} from "firebase/firestore";
import Items from "components/Items/Items";
import {useAuth} from 'hooks/use-auth';
import EditItem from "components/EditItem/EditItem";






const Collection = () => {
    
    const pathAll = 'all-collections/'

    const [collections, setCollections] = useState([]);
    const CollectionRef = collection(db, pathAll);
    const {isAuth} = useAuth();

    useEffect(() => {
        const getCollections = async ()=>{
        const data = await getDocs(CollectionRef);
        setCollections(data.docs.map((doc)=>({...doc.data(), id:doc.id})));
  
        }
        getCollections();
      }, [])
    
    return (
        <div>
             <main>
                
                
                <Container >
                    <Typography variant="h3">Последние добавленные картинки</Typography>
                    <Box container spacing={4} >
                        {collections.map((collection)=>(
                            <Paper item key={collection} >
                                <Card sx={{mt:"3rem"}}
                                    >
                                    <CardMedia
                                    sx={{paddingTop:"10%",
                                         
                                         height:"100px"}}
                                                     
                                    image="https://source.unsplash.com/random"
                                    title="image title"/>
                                    <CardContent>
                                    <Typography variant="h5">
                                   {collection.name}
                                   
                                    </Typography>
                                    <Items collectionId={collection.id}  />

                                    </CardContent>
                                    <CardActions>
                                        <Button disabled={!isAuth} size="small" color="primary">Edit</Button>
                                        <IconButton disabled={!isAuth}>
                                        <DeleteForever/>
                                        </IconButton>
                                        <EditItem perem={collection.id}/>
                                    </CardActions>
                                </Card>

                            </Paper>
                        ))}

                    </Box>

                </Container>
               
            </main>
        </div>
    )
}

export default Collection
