import { DeleteForever } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import {db} from "../../firebase";
import { deleteDoc, doc } from "firebase/firestore"

const DeleteCollection = ({collectionId}) => {
   
const handleDelete = async () => {
    const taskDocRef = doc(db, "/all-collections", collectionId)
    try{
      await deleteDoc(taskDocRef)
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