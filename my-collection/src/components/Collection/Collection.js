import { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import { DeleteForever } from "@mui/icons-material";
import { CardMedia, CardContent, CardActions, IconButton, Container, Typography, Paper, Box} from "@mui/material";
import {db} from "../../firebase";
import {collection, getDocs, query, where, onSnapshot} from "firebase/firestore";
import Items from "components/Items/Items";
import {useAuth} from 'hooks/use-auth';
import EditCollection from "./EditCollection";
import AddItem from "components/Items/AddItem";
import { useTranslation } from "react-i18next";
import DeleteCollection from "./DeleteCollection";

const Collection = ({isMyCollection}) => {
    const pathAll = 'all-collections/'

    const [collections, setCollections] = useState([]);
    const [hidden, setHidden] = useState(false);
    const CollectionRef = collection(db, pathAll);
    const {isAuth, id} = useAuth();
    const {t} = useTranslation();

    

    // const q = query(collection(db, "all-collections/"), where("state", "==", "CA"));
    // const unsubscribe = onSnapshot(q, (querySnapshot) => {
    //   const cities = [];
    //   querySnapshot.forEach((doc) => {
    //       cities.push(doc.data().name);
    //   });
    //   console.log("Current cities in CA: ", cities.join(", "));
    // });


    useEffect(() => {
        if (isMyCollection) {
            setHidden(false);
           
            const q = query(CollectionRef, where("userId", "==", id));
            const getCollections = async () => {
                const data = await getDocs(q);
                setCollections(data.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id
                })));
            }
            getCollections();
        }
        else
        {
            setHidden(true);
            const getCollections = async () => {
                const data = await getDocs(CollectionRef);
                setCollections(data.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id
                })));
            }
            getCollections();
        }
      }, [id])

    return (
        <div>
            <main>
                <Container >
                    <Typography variant="h3">{t('editcollection.Last')}</Typography>
                    <Box container spacing={4} >
                        {collections.map((collection)=>(
                            <Paper item key={collection} >
                                <Card sx={{mt:"3rem"}}>
                                    <CardMedia
                                    sx={{paddingTop:"10%",
                                         
                                         height:"100px"}}
                                                     
                                    image="https://source.unsplash.com/random"
                                    title="image title"/>
                                    <CardContent>
                                    <Typography variant="h5">
                                   {collection.name}
                                   
                                    </Typography>
                                    <Items collectionId={collection.id} isMyCollection={isMyCollection} />

                                    </CardContent>
                                    <CardActions>
                                        <div hidden={hidden}>
                                        <EditCollection collectionId={collection.id}/>
                                        <DeleteCollection collectionId={collection.id}/>
                                        <AddItem perem={collection.id}/>
                                        </div>
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
