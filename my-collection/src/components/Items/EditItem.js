import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useTranslation} from 'react-i18next';
import { db } from "../../firebase";
import { getDoc, doc } from "firebase/firestore";
import { getStorage, ref , uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useState} from 'react';
import { useAuth } from 'hooks/use-auth';
import { updateDoc } from "firebase/firestore";
import LoadImage from 'components/LoadImage/LoadImage';
import {useDispatch} from 'react-redux';
import {setCounter} from 'store/slices/counterSlice';

const EditItem=({itemId,collectionRef}) => {

const dispatch =useDispatch();
const [Name, setName] = useState('');
const [Tag, setTag] = useState('');
const [image, setImage] = useState(null);
const [open, setOpen] = useState(false);
const {t} = useTranslation();
const {isAuth} = useAuth();

const getItemById = async () => {
  const docRef = doc(db, collectionRef, itemId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    setName(docSnap.data().name);
    setTag(docSnap.data().tag);
    setImage(docSnap.data().img);
  } else {
    console.log("No such document!");
  }
};

const changeCounter = ()=>{
    dispatch(setCounter({
        count: Math.floor(Math.random() * 100) + 1
  }))};

const handleUpdateItem = async (e) => {
      e.preventDefault()
      if ((typeof image) == "string" || (typeof image == "undefined")) {
        updateItem('');
      } else {
        updateItemAndImage();
      }
      changeCounter();
      handleClose();
}

const updateItemAndImage = async () => {
  const storage = getStorage();
  const metadata = {
    contentType: 'image/jpeg'
  };

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
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at: ', downloadURL);
        updateItem(downloadURL);
      });
    }
  );
}

  const updateItem = async (newUrl) => {
    const taskDocRef = doc(db, collectionRef, itemId)
    try {
      if (newUrl == '') {
        await updateDoc(taskDocRef, {
          name: Name,
          tag: Tag
        })
      } else {
        await updateDoc(taskDocRef, {
          name: Name,
          tag: Tag,
          img: newUrl
        })
      }
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
      <Button  disabled={!isAuth} type='link' onClick={handleClickOpen}>
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

        <LoadImage value={image} onChange={setImage}/>
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