import { DeleteForever } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import {db} from "../../firebase";
import { deleteDoc, doc } from "firebase/firestore"
import { useAuth } from "hooks/use-auth";

const DeleteCollection = ({collectionId}) => {
    const {isAuth}= useAuth();
    // const collectionPath = "all-collections"
    // async function deleteCollection(db, collectionPath, batchSize) {
    //     const collectionRef = db.collection(collectionPath);
    //     const query = collectionRef.orderBy('__name__').limit(batchSize);
      
    //     return new Promise((resolve, reject) => {
    //       deleteQueryBatch(db, query, resolve).catch(reject);
    //     });
    //   }
      
    //   async function deleteQueryBatch(db, query, resolve) {
    //     const snapshot = await query.get();
      
    //     const batchSize = snapshot.size;
    //     if (batchSize === 0) {
    //       resolve();
    //       return;
    //     }
      
    //     const batch = db.batch();
    //     snapshot.docs.forEach((doc) => {
    //       batch.delete(doc.ref);
    //     });
    //     await batch.commit();
      
    //     process.nextTick(() => {
    //       deleteQueryBatch(db, query, resolve);
    //     });
    //   }
   

const handleDelete = async () => {
    const taskDocRef = doc(db, "/all-collections", collectionId)
    try{
      await deleteDoc(taskDocRef)
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