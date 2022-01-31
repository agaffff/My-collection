import { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import { CardMedia, CardContent, CardActions, Container, Typography, Paper, Box} from "@mui/material";
import {db} from "../../firebase";
import {collection, getDocs, query, where} from "firebase/firestore";
import Items from "components/Items/Items";
import {useAuth} from 'hooks/use-auth';
import EditCollection from "./EditCollection";
import AddItem from "components/Items/AddItem";
import { useTranslation } from "react-i18next";
import DeleteCollection from "./DeleteCollection";
import { useCounter } from "hooks/use-counter";


const Collection = ({isMyCollection}) => {
    const pathAll = 'all-collections/'


    const [collections, setCollections] = useState([]);
    const [hidden, setHidden] = useState(false);
    const CollectionRef = collection(db, pathAll);
    const {id} = useAuth();
    const {t} = useTranslation();
    const {count} = useCounter();

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
        } else {
            setHidden(true);

            // const q = query(CollectionRef, where("userId", "==", id));
            // const getCollections = async () => {
            //     const data = await getDocs(q);
            //     setCollections(data.docs.map((doc) => ({
            //         ...doc.data(),
            //         id: doc.id
            //     })));
            // }
            // getCollections();
        
            const getCollections = async () => {
                const data = await getDocs(CollectionRef);
                setCollections(data.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id
                })));
            }
            getCollections();
        }
      }, [id, count])
      
    return (
        <div>
            <main>
                <Container >
                    <Typography variant="h3">{t('editcollection.Last')}</Typography>
                    <Box container spacing={4} >
                        {collections.map((collection)=>(
                            <Paper item key={collection} >
                                <Card sx={{mt:"3rem"}} >
                                    <CardMedia 
                                    sx={{paddingTop:"10%",
                                         height:"200px"}}
                                    image={collection.image}
                                    title="image title"/>
                                    <CardContent>
                                    <Typography variant="h5">
                                   {collection.name}
                                    </Typography>
                                    <Items collectionId={collection.id} isMyCollection={isMyCollection} />

                                    </CardContent>
                                    <CardActions>
                                        <div hidden={hidden}>
                                        <EditCollection collectionId={collection.id} collectionRef={pathAll}/>
                                        <DeleteCollection collectionId={collection.id}/>
                                        <AddItem collectionId={collection.id}/>
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
