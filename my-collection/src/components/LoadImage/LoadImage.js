import { useState, useCallback, useEffect } from "react";
import {useDropzone} from "react-dropzone";
import styled from 'styled-components';

const Dropzone = styled.div`
  border: 1px dashed #ced4d9;
  border-radius:5px;
  color: #6c757d;
  display:flex;
  align-itens:center;
  justify-content:center;
  height:142px;
  img{
      height:140px
  }
  ` ; 

const LoadImage=({value, onChange})=> {

  const [loading, setLoading] = useState(false);
  const [urlImageUpload, setUrlImageUpload] = useState('');
  const [isDrop, setIsDrop] = useState(false);
  
  useEffect(() => {
    if(!isDrop)
    {
      setUrlImageUpload(value);
      console.log("typeof(value)"+typeof(value));
    }
  }, [value]);
  

const onDrop = useCallback((acceptedFiles) => {
            console.log("typeof(acceptedFiles): "+typeof(acceptedFiles));
            setLoading(true);
            onChange(acceptedFiles[0]); 
            setIsDrop(true);
            setUrlImageUpload(URL.createObjectURL(acceptedFiles[0]));
            setLoading(false);
 },[]);
    
    const {getRootProps, getInputProps} = useDropzone({
        onDrop,
        multiple:false,
        accept:'image/*',
     })

  return (
    <Dropzone {...getRootProps()}>
      <input type="file" {...getInputProps()} />
      {
        value ? (
            <img src={urlImageUpload}/>
        ) :  loading  ? (
            <span>Loading</span>
        ) : (
            <span> Drag and Drop</span>
        )
      }
    </Dropzone>
  )
}

export default LoadImage