import ListCollection from 'components/ListCollection/ListCollection';
import HeaderPage from 'pages/HeaderPage/HeaderPage';
import Container from '@mui/material/Container';
import Collection from 'components/Collection/Collection';



const HomePage = () => {
 const pathItems = 'all-collections/collection-books/items/';
 const pathCollections = 'all-collections/';



  return (
    <>
 
      <HeaderPage />
      <Collection/>
      <Container 
      sx={{mt:"1rem"}}>
     
      <ListCollection path = {pathItems} />
      </Container>
    ) 
     
)
</>
  )
}

export default HomePage
