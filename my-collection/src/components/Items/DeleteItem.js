import { DeleteForever } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import {db} from "../../firebase";
import { deleteDoc, doc } from "firebase/firestore"

const DeleteItem = ({itemId,collectionRef}) => {
 console.log("itemId "+itemId +" collectionRef "+collectionRef);
const handleDelete = async () => {
    const taskDocRef = doc(db, collectionRef, itemId)
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

  export default DeleteItem