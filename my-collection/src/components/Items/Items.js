import { useState, useEffect } from "react";

 
import Card from '@mui/material/Card';
import { DeleteForever } from "@mui/icons-material";
import { Grid, CardMedia, CardContent, CardActions, Button, IconButton, Container, Typography} from "@mui/material";
import {db} from "../../firebase";
import {collection, getDocs, addDoc} from "firebase/firestore";
import {useAuth} from 'hooks/use-auth';
import EditItem from "./EditItem";

const Items = ({collectionId}) => {

    const pathItems = 'all-collections/'+collectionId+'/items/';
    const [items, setItems] = useState([]);
    const itemsCollectionRef = collection(db, pathItems);
    const {isAuth} = useAuth();
    
    
    useEffect(() => {
        const getItems= async ()=>{
        const data = await getDocs(itemsCollectionRef);
        setItems(data.docs.map((doc)=>({...doc.data(), id:doc.id})));
  
        }
        getItems();
      }, [])
    
      
    return (
        <div>
            <Container maxWidth="md" sx={{display:"flex", flexDirection:"row", flexWrap:"wrap", justifyContent :"space-evenly"}} >
                    {items.map((item)=>(
                <Grid item key={item} >
                    <Card sx={{mt:"3rem", mb:"6rem", height:250, width:250 }}>
                        <CardMedia
                            sx={{paddingTop:"50%" }}
                            image="https://source.unsplash.com/random"
                            title="image title"/>
                                  
                        <CardContent>
                            <Typography variant="h5">
                                {item.name}
                            </Typography>

                        </CardContent>
                        <CardActions >
                            <EditItem disabled={!isAuth} size="small" color="primary" itemId={item.id} collectionRef={pathItems}/>
                               <IconButton disabled={!isAuth} >
                               <DeleteForever/>
                               </IconButton>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
              
            </Container>
        </div>
    )
}

export default Items
