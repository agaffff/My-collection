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
import { getStorage, ref , uploadBytesResumable, getDownloadURL } from "firebase/storage";
import LoadImage from 'components/LoadImage/LoadImage';
import {useDispatch} from 'react-redux';
import {setCounter} from 'store/slices/counterSlice';


const AddCollection=()=> {

const [newName, setNewName] = useState('');
const [newThema, setNewThema] = useState('');
const [newDescription, setNewDescription] = useState('');
const [newAdvancedFields, setNewAdvancedFields] = useState('');
const dispatch =useDispatch();

const path = 'all-collections/';
const CollectionRef = collection(db, path);

const {t} = useTranslation();
const {id} = useAuth();
const [image, setImage] = useState('');

const changeCounter = ()=>{
  dispatch(setCounter({
      count: Math.floor(Math.random() * 100) + 1
}))};

const handleCreateCollection = async (e) => {
  e.preventDefault()
  
  if ((typeof image) == "string" || (typeof image == "undefined")) {
    console.log("handleUpdateCollection updateCollection('')");
    createCollection('');
  } else {
    console.log("handleUpdateCollection updateCollectionAndImage()");
    createCollectionAndImage();
  }
  
  handleClose();
}

const createCollectionAndImage = async () => {
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
        createCollection(downloadURL);
      });
    }
  );
}

const createCollection = async (newUrl) => {
  await addDoc(CollectionRef, {
    name: newName,
    thema: newThema,
    description: newDescription,
    image: newUrl,
    advancedfields: newAdvancedFields,
    userId: id,
    dateCreate: new Date()
  });
  changeCounter();
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
      <Button type='link' onClick={handleClickOpen}>
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
          <LoadImage value={image} onChange={setImage}/>
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
          <Button onClick={handleCreateCollection} >{t('button.Save')}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}


export default AddCollection
