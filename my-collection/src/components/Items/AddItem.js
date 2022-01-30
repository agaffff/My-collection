import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useTranslation} from 'react-i18next';
import {db} from "../../firebase";
import {collection, addDoc} from "firebase/firestore";
import { useState} from 'react';
import {useAuth} from 'hooks/use-auth';
import LoadImage from 'components/LoadImage/LoadImage';
import { getStorage, ref , uploadBytesResumable, getDownloadURL } from "firebase/storage";


const AddItem=({collectionId}) => {

const [newName, setNewName] = useState('');
const [newTag, setNewTag] = useState('');
const {t} = useTranslation();
const {id,isAuth} = useAuth();
const [image, setImage] = useState('');


const handleCreateItem = async (e) => {
  e.preventDefault()

  if ((typeof image) == "string" || (typeof image == "undefined")) {
    createItem('');
  } else {
    createItemAndImage();
  }
  handleClose();
}

const createItemAndImage = async () => {
const storage = getStorage();
// Create the file metadata
/** @type {any} */
const metadata = {
contentType: 'image/jpeg'
};

// Upload file and metadata to the object 'images/image_***.jpg'
const storageRef = ref(storage, 'images/' + image.name);
const uploadTask = uploadBytesResumable(storageRef, image, metadata);

uploadTask.on('state_changed',
(snapshot) => {
  const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  console.log('Upload is ' + progress + '% done');
  switch (snapshot.state) {
    case 'paused':
      console.log('Upload is paused');
      break;
    case 'running':
      console.log('Upload is running');
      break;
  }
},
(error) => {
  switch (error.code) {
    case 'storage/unauthorized':
      console.log('User doesn t have permission to access the object');
      break;
    case 'storage/canceled':
      console.log('User canceled the upload');
      break;
    case 'storage/unknown':
      console.log('Unknown error occurred, inspect error.serverResponse');
      break;
  }
},
() => {
  // Upload completed successfully, now we can get the download URL
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    console.log('File available at: ', downloadURL);
    createItem(downloadURL);
  });
}
);
}

const createItem= async (newUrl)=>{
  const itemsRef =collection(db, "all-collections/"+collectionId+"/items");
  try {
  await addDoc(itemsRef, {
    name:newName,
    tag:newTag, 
    img: newUrl,
    userId:id ,
    dateCreate: new Date()});
   console.log("Added new item");
  } catch (err) {
    alert(err);
  }
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
         <LoadImage value={image} onChange={setImage}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t('button.Cancel')}</Button>
          <Button onClick={handleCreateItem} >{t('button.Save')}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}


export default AddItem