import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useTranslation} from 'react-i18next';
import {db} from "../../firebase";
import {getDoc, doc} from "firebase/firestore";
import { useState} from 'react';
import {useAuth} from 'hooks/use-auth';
import { updateDoc } from "firebase/firestore";


const EditItem=({itemId,collectionRef}) => {

const [Name, setName] = useState('');
const [Tag, setTag] = useState('');
const [open, setOpen] = useState(false);

const {t} = useTranslation();
const {isAuth} = useAuth();

const getItemById = async () => {
  const docRef = doc(db, collectionRef, itemId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    setName(docSnap.data().name);
    setTag(docSnap.data().tag);
  } else {
    console.log("No such document!");
  }
}
//const res = await db.collection('items').doc('DC').delete();
const handleUpdateItem = async (e) => {
  e.preventDefault()
  const taskDocRef = doc(db, collectionRef, itemId)
  try{
    await updateDoc(taskDocRef, {
      name:Name,
     tag:Tag, 
    })
    handleClose()
  } catch (err) {
    alert(err);
  }    
}
  
  const handleClickOpen = () => {
    getItemById();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


    return (
        <>
           <Button  disabled={!isAuth} color="inherit" variant="outlined" onClick={handleClickOpen}>
      {t('button.ButtonEditItem')}
      </Button>
      <Dialog open={open} >
      
        <DialogTitle>{t('editcollection.Item')}</DialogTitle>
        <DialogContent>
          <DialogContentText>
          {t('editcollection.Pleasefillintheinformationabouttheitem')}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label={t('editcollection.Name')}
            type="text"
            fullWidth
            variant="standard"
            value={Name}
            onChange={(e)=>{setName(e.target.value)}}
          />
           <TextField
            autoFocus
            margin="dense"
            id="tag"
            label={t('editcollection.Tag')}
            type="text"
            fullWidth
            variant="standard"
            value={Tag}
            onChange={(e)=>{setTag(e.target.value)}}
          />
         
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t('button.Cancel')}</Button>
          <Button onClick={handleUpdateItem} >{t('button.Save')}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}


export default EditItem