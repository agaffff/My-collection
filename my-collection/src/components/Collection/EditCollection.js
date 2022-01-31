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
import { getStorage, ref , uploadBytesResumable, getDownloadURL } from "firebase/storage";
import LoadImage from 'components/LoadImage/LoadImage';
import {useDispatch} from 'react-redux';
import {setCounter} from 'store/slices/counterSlice';


const EditCollection=({collectionId})=> {
const [Name, setName] = useState('');
const [Thema, setThema] = useState('');
const [Description, setDescription] = useState('');
const [image, setImage] = useState('');
const [AdvancedFields, setAdvancedFields] = useState('');
const dispatch =useDispatch();

const {t} = useTranslation();
const [open, setOpen] = useState(false);
const {isAuth} = useAuth();

const getCollectionById = async () => {
  const docRef = doc(db, "all-collections", collectionId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    
    setName(docSnap.data().name);
    setThema(docSnap.data().thema);
    setDescription(docSnap.data().description);
    setImage(docSnap.data().image);
    setAdvancedFields(docSnap.data().advancedfields);
  } else {
    console.log("No such document!");
  }
}

const changeCounter = ()=>{
  dispatch(setCounter({
      count: Math.floor(Math.random() * 100) + 1
}))};

const handleUpdateCollection = async (e) => {
  e.preventDefault()
  
  if ((typeof image) == "string" || (typeof image == "undefined")) {
    console.log("handleUpdateCollection updateCollection('')");
    updateCollection('');
  } else {
    console.log("handleUpdateCollection updateCollectionAndImage()");
    updateCollectionAndImage();
  }
  
  handleClose();
}

  const updateCollectionAndImage = async () => {
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
          updateCollection(downloadURL);
        });
      }
    );
  }
  
  const updateCollection= async (newUrl)=> {
  const taskDocRef = doc(db, "all-collections", collectionId)
  try{
    if(newUrl == ''){
    await updateDoc(taskDocRef, {
      name:Name,
     thema:Thema, 
     description:Description,
     advancedFields:AdvancedFields 
    })
    changeCounter();
  } else{ 
    await updateDoc(taskDocRef, {
      name:Name,
     thema:Thema, 
     image:newUrl,
     description:Description,
     advancedFields:AdvancedFields 
    })
    changeCounter();
  }
} catch (err) {
    alert(err);
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
          <LoadImage value={image} onChange={setImage}/>
         
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
          <Button onClick={handleUpdateCollection} >{t('button.Save')}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}


export default EditCollection
