import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useTranslation} from 'react-i18next';
import {db} from "../../firebase";
import {collection, getDocs, addDoc} from "firebase/firestore";
import { useState, useEffect } from 'react';
import {useAuth} from 'hooks/use-auth';


const AddCollection=({pathEdit})=> {

const [newName, setNewName] = useState('');
const [newThema, setNewThema] = useState('');
const [newDescription, setNewDescription] = useState('');
const [newImage, setNewImage] = useState('');
const [newAdvancedFields, setNewAdvancedFields] = useState('');

const path = 'all-collections/';
const CollectionRef = collection(db, path);

const {t} = useTranslation();
const {id} = useAuth();
// useEffect(() => {
//     const getCollection = async ()=>{
//     const data = await getDocs(CollectionRef);
//     setCollection(data.docs.map((doc)=>({...doc.data(), id:doc.id})));

//     }
//     getCollection();
//   }, [])

const createCollection= async ()=>{
    //await setDoc(doc(db, "cities", "new-city-id"), data);
  await addDoc(CollectionRef, {name:newName,
     thema:newThema, 
     description:newDescription, 
     image:newImage, 
     advancedfields:newAdvancedFields,
    userId:id ,
    dateCreate: new Date()});

    handleClose();
}



  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button color="inherit" variant="outlined" onClick={handleClickOpen}>
      {t('button.ButtonAddCollection')}
      </Button>
      <Dialog open={open} onClose={handleClose}>
      
        <DialogTitle>{t('editcollection.Collection')}</DialogTitle>
        <DialogContent>
          <DialogContentText>
          {t('editcollection.Pleasefillintheinformationaboutthecollection')}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label={t('editcollection.Name')}
            type="text"
            fullWidth
            variant="standard"
            onChange={(e)=>{setNewName(e.target.value)}}
          />
           <TextField
            autoFocus
            margin="dense"
            id="thema"
            label={t('editcollection.Thema')}
            type="text"
            fullWidth
            variant="standard"
            onChange={(e)=>{setNewThema(e.target.value)}}
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label={t('editcollection.Description')}
            type="text"
            fullWidth
            variant="standard"
            onChange={(e)=>{setNewDescription(e.target.value)}}
          />
          <TextField
            autoFocus
            margin="dense"
            id="image"
            label={t('editcollection.Image')}
            type="url"
            fullWidth
            variant="standard"
            onChange={(e)=>{setNewImage(e.target.value)}}
          />
          <TextField
            autoFocus
            margin="dense"
            id="advancedfields"
            label={t('editcollection.Advanced fields')}
            type="text"
            fullWidth
            variant="standard"
            onChange={(e)=>{setNewAdvancedFields(e.target.value)}}
          />
          
           
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t('button.Cancel')}</Button>
          <Button onClick={createCollection} >{t('button.Save')}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}


export default AddCollection
