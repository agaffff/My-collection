import { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import { Grid, CardMedia, CardContent, CardActions, Container, Typography} from "@mui/material";
import {db} from "../../firebase";
import {collection, getDocs} from "firebase/firestore";
import {useAuth} from 'hooks/use-auth';
import EditItem from "./EditItem";
import DeleteItem from "./DeleteItem";
import { useCounter } from "hooks/use-counter";

const Items = ({collectionId, isMyCollection}) => {

    const pathItems = 'all-collections/'+collectionId+'/items/';
    const [items, setItems] = useState([]);
    const itemsCollectionRef = collection(db, pathItems);
    const {isAuth} = useAuth();
    const [hidden, setHidden] = useState(false);
    const {count} = useCounter();
    

    useEffect(() => {
        if(isAuth && isMyCollection)
        setHidden(false);
        else
        setHidden(true);

        const getItems= async ()=>{
        const data = await getDocs(itemsCollectionRef);
        setItems(data.docs.map((doc)=>({...doc.data(), id:doc.id})));
        }
        getItems();
      }, [isMyCollection, isAuth, count])
    
      
    return (
        <div>
            <Container maxWidth="md" sx={{display:"flex", flexDirection:"row", flexWrap:"wrap", justifyContent :"space-evenly"}} >
                    {items.map((item)=>(
                <Grid item key={item} >
                    <Card sx={{mt:"3rem", mb:"6rem", height:250, width:250 }}>
                        <CardMedia
                            sx={{paddingTop:"50%" }}
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
