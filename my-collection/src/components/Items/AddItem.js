import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useTranslation} from 'react-i18next';
import {db} from "../../firebase";
import {collection, getDocs, addDoc, doc} from "firebase/firestore";
import { useState, useEffect } from 'react';
import {useAuth} from 'hooks/use-auth';


const AddItem=({perem}) => {

const [newName, setNewName] = useState('');
const [newTag, setNewTag] = useState('');

const path = 'all-collections/';
const CollectionRef = collection(db, path);

const {t} = useTranslation();
const {id,isAuth} = useAuth();
// useEffect(() => {
//     const getCollection = async ()=>{
//     const data = await getDocs(CollectionRef);
//     setCollection(data.docs.map((doc)=>({...doc.data(), id:doc.id})));

//     }
//     getCollection();
//   }, [])

const createItem= async ()=>{
  const itemsRef =collection(db, "all-collections/"+perem+"/items");
  await addDoc(itemsRef, {
    name:newName,
    tag:newTag, 
    userId:id ,
    dateCreate: new Date()});
   console.log("Added new item");
   handleClose();
}
//const res = await db.collection('items').doc('DC').delete();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


    return (
        <>
           <Button  disabled={!isAuth} type='link' onClick={handleClickOpen}>
      {t('button.ButtonAddItem')}
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
            id="tag"
            label={t('editcollection.Tag')}
            type="text"
            fullWidth
            variant="standard"
            onChange={(e)=>{setNewTag(e.target.value)}}
          />
         
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t('button.Cancel')}</Button>
          <Button onClick={createItem} >{t('button.Save')}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}


export default AddItem