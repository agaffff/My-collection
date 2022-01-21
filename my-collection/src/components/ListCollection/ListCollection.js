import { useState, useEffect } from "react";
import {db} from "../../firebase";
import {collection, getDocs, addDoc} from "firebase/firestore";

export default function ListCollection({path}) {
    const [books, setBooks] = useState([]);
    const [newBookName, setNewBookName] = useState("");
    const [newBookTag, setNewBookTag] = useState("");
    const pathAll = 'all-collections/'
    const booksCollectionRef = collection(db, path);

   

    useEffect(() => {
      const getBooks = async ()=>{
      const data = await getDocs(booksCollectionRef);
      setBooks(data.docs.map((doc)=>({...doc.data(), id:doc.id})));

      }
     getBooks();
    }, [])

  const createBook= async ()=>{
    await addDoc(booksCollectionRef, {name:newBookName, tag:newBookTag, value:1});
  }
  return (
        <div style={{ height: 400, width: '100%' }}>
          <h1>ListCollection</h1> 
          <input onChange={(e)=>{setNewBookName(e.target.value)}}placeholder="Name book" ></input>
          <input onChange={(e)=>{setNewBookTag(e.target.value)}}placeholder="Tag" ></input>

          <button onClick={createBook} >Create</button>

           {books.map((book)=>{
             return(
               <div>
                  {''}
                    <p >Name: {book.name}</p>
                    <p >Name: {book.tag}</p>
                  
               </div>
             );

             })}
        </div>
    )
}
