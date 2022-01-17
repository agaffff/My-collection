import { useState, useEffect } from "react";
import {db} from "../../firebase";
import {collection, getDocs, addDoc} from "firebase/firestore";

export default function ListCollection() {
    const [photos, setPhotos] = useState([]);
    const [newPhotoName, setNewPhotoName] = useState("");
    const [newPhotoTag, setnewPhotoTag] = useState("");

    const photosCollectionRef = collection(db, 'photos');

    useEffect(() => {
      const getPhotos = async ()=>{
      const data = await getDocs(photosCollectionRef);
      setPhotos(data.docs.map((doc)=>({...doc.data(), id:doc.id})));

      }
     getPhotos();
    }, [])

  const createPhoto= async ()=>{
    await addDoc(photosCollectionRef, {name:newPhotoName, tag:newPhotoTag, value:1});
  }
  return (
        <div>
          <h1>ListCollection</h1> 
          <input onChange={(e)=>{setNewPhotoName(e.target.value)}}placeholder="Name" ></input>
          <input onChange={(e)=>{setnewPhotoTag(e.target.value)}}placeholder="Tag" ></input>

          <button onClick={createPhoto} >Create</button>

           {photos.map((photo)=>{
             return(
               <div>
                  {''}
                    <p >Name: {photo.name}</p>
                    <p >Name: {photo.tag}</p>
                  
               </div>
             );

             })}
        </div>
    )
}
