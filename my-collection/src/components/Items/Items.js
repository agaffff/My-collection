import { useState, useEffect } from "react";

 
import Card from '@mui/material/Card';
import { DeleteForever } from "@mui/icons-material";
import { Grid, CardMedia, CardContent, CardActions, Button, IconButton, Container, Typography} from "@mui/material";
import {db} from "../../firebase";
import {collection, getDocs, addDoc} from "firebase/firestore";
import {useAuth} from 'hooks/use-auth';
import EditItem from "./EditItem";
import DeleteItem from "./DeleteItem";

const Items = ({collectionId, isMyCollection,itemId}) => {

    const pathItems = 'all-collections/'+collectionId+'/items/';
    const [items, setItems] = useState([]);
    const itemsCollectionRef = collection(db, pathItems);
    const {isAuth} = useAuth();
    const [hidden, setHidden] = useState(false);
    

    console.log("render Items collectionId:"+collectionId+" isMyCollection:"+isMyCollection )
    
    
    useEffect(() => {
        console.log("useEffect: collectionId"+collectionId+" isMyCollection:"+isMyCollection+" isAuth:"+isAuth )
        if(isAuth && isMyCollection)
        setHidden(false);
        else
        setHidden(true);

        const getItems= async ()=>{
        const data = await getDocs(itemsCollectionRef);
        setItems(data.docs.map((doc)=>({...doc.data(), id:doc.id})));
        }
        getItems();
      }, [isMyCollection, isAuth])
    
      
    return (
        <div>
            <Container maxWidth="md" sx={{display:"flex", flexDirection:"row", flexWrap:"wrap", justifyContent :"space-evenly"}} >
                    {items.map((item)=>(
                <Grid item key={item} >
                    <Card sx={{mt:"3rem", mb:"6rem", height:250, width:250 }}>
                        <CardMedia
                            sx={{paddingTop:"50%" }}
                            // image="https://source.unsplash.com/random"
                            image={item.img}
                            title="image title"/>
                                  
                        <CardContent>
                            <Typography variant="h7">
                                {item.name}
                            </Typography>

                        </CardContent>
                        <CardActions >
                            <div hidden={hidden}>
                            <EditItem  size="small" color="primary" itemId={item.id} collectionRef={pathItems}/>
                                <DeleteItem itemId={item.id} collectionRef={pathItems}/>
                               </div>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
              
            </Container>
        </div>
    )
}

export default Items
