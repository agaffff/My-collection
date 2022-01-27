import { DeleteForever } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import {db} from "../../firebase";
import { deleteDoc, doc } from "firebase/firestore"
import { useAuth } from "hooks/use-auth";

const DeleteCollection = ({collectionId}) => {
    const {isAuth}= useAuth();
const handleDelete = async () => {
    const taskDocRef = doc(db, "all-collections", collectionId)
    try{
      //await deleteDoc(taskDocRef)
      alert("Collection "+collectionId+"will be delete");
    } catch (err) {
      alert(err)
    }
  }

  return(
    <IconButton disabled={!isAuth}>
    <DeleteForever onClick={handleDelete} />
    </IconButton>
  )
}

  export default DeleteCollection