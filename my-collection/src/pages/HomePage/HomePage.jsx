import ListCollection from 'components/ListCollection/ListCollection';
import HeaderPage from 'pages/HeaderPage/HeaderPage';
import Container from '@mui/material/Container';



const HomePage = () => {
 

  return (
    <>

      <HeaderPage />
      <Container 
      sx={{mt:"1rem"}}>
      <ListCollection />
      </Container>
      
      

    </>
  )
}

export default HomePage
