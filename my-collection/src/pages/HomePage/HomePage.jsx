import Container from '@mui/material/Container';
import Collection from 'components/Collection/Collection';
import Header from 'components/Header/Header';

const HomePage = () => {
  return (
    <>
      <Header />
      <Collection/>
      <Container 
      sx={{mt:"1rem"}}>
      </Container>
    </>
  )
}

export default HomePage
