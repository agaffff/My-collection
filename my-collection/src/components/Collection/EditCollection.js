import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useTranslation} from 'react-i18next';
import {db} from "../../firebase";
import {getDoc} from "firebase/firestore";
import { useState} from 'react';
import {useAuth} from 'hooks/use-auth';
import { doc, updateDoc } from "firebase/firestore";


const EditCollection=({collectionId})=> {
const [Name, setName] = useState('');
const [Thema, setThema] = useState('');
const [Description, setDescription] = useState('');
const [Image, setImage] = useState('');
const [AdvancedFields, setAdvancedFields] = useState('');

const {t} = useTranslation();
const [open, setOpen] = useState(false);
const {isAuth} = useAuth();

const getCollectionById = async () => {
  const docRef = doc(db, "all-collections", collectionId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    console.log("name:", docSnap.data().name);
    setName(docSnap.data().name);
    setThema(docSnap.data().thema);
    setDescription(docSnap.data().description);
    setImage(docSnap.data().image);
    setAdvancedFields(docSnap.data().advancedfields);
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
}

const handleUpdate = async (e) => {
  e.preventDefault()
  const taskDocRef = doc(db, "all-collections", collectionId)
  try{
    await updateDoc(taskDocRef, {
      name:Name,
     thema:Thema, 
     description:Description,
     image:Image,
     advancedFields:AdvancedFields 
    })
    handleClose()
  } catch (err) {
    alert(err)
  }    
}


  const handleClickOpen = () => {
    getCollectionById();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button disabled={!isAuth} size="small" color="primary" onClick={handleClickOpen}>
      {t('button.ButtonEditCollection')}
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
            value={Name}
            onChange={(e)=>{setName(e.target.value)}}
          />
           <TextField
            autoFocus
            margin="dense"
            id="thema"
            label={t('editcollection.Thema')}
            type="text"
            fullWidth
            variant="standard"
            value={Thema}
            onChange={(e)=>{setThema(e.target.value)}}
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label={t('editcollection.Description')}
            type="text"
            fullWidth
            variant="standard"
            value={Description}
            onChange={(e)=>{setDescription(e.target.value)}}
          />
          <TextField
            autoFocus
            margin="dense"
            id="image"
            label={t('editcollection.Image')}
            type="url"
            fullWidth
            variant="standard"
            value={Image}
            onChange={(e)=>{setImage(e.target.value)}}
          />
          <TextField
            autoFocus
            margin="dense"
            id="advancedfields"
            label={t('editcollection.Advanced fields')}
            type="text"
            fullWidth
            variant="standard"
            value={AdvancedFields}
            onChange={(e)=>{setAdvancedFields(e.target.value)}}
          />
          
           
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t('button.Cancel')}</Button>
          <Button onClick={handleUpdate} >{t('button.Save')}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}


export default EditCollection
