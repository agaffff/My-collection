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

const EditItem=({itemId,collectionRef}) => {

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

const handleUpdateItem = async (e) => {
      e.preventDefault()

      console.log("(typeof image):" +(typeof image))

      if ((typeof image) == "string" || (typeof image == "undefined")) {
        console.log("handleUpdateItem updateItem('')");
        updateItem('');
      } else {
        console.log("handleUpdateItem updateItemAndImage()");
        updateItemAndImage();
      }
      handleClose();
}

const updateItemAndImage = async () => {
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
        updateItem(downloadURL);
      });
    }
  );
}

  const updateItem = async (newUrl) => {
    const taskDocRef = doc(db, collectionRef, itemId)
    try {
      if (newUrl == '') {
        console.log("Обновляем без картинки");
        await updateDoc(taskDocRef, {
          name: Name,
          tag: Tag
        })
      } else {
        console.log("Обновляем с новой картинкой");
        console.log("newUrl:"+newUrl);
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