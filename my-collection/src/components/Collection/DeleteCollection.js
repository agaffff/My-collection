import { DeleteForever } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import {db} from "../../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import {useDispatch} from 'react-redux';
import {setCounter} from 'store/slices/counterSlice';

const DeleteCollection = ({collectionId}) => {

const dispatch =useDispatch();

const changeCounter = ()=>{
  dispatch(setCounter({
      count: Math.floor(Math.random() * 100) + 1
}))}; 

const handleDelete = async () => {
    const taskDocRef = doc(db, "/all-collections", collectionId)
    try{
      await deleteDoc(taskDocRef)
      changeCounter();
    } catch (err) {
      alert(err)
    }
  }

  return(
    <IconButton>
    <DeleteForever onClick={handleDelete} />
    </IconButton>
  )
}

  export default DeleteCollection