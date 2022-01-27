import Container from '@mui/material/Container';
import Collection from 'components/Collection/Collection';
import Header from 'components/Header/Header';

const MyHomePage = () => {
  return (
    <>
      <Header />
      <Collection isMyCollection={true} />
      <Container
        sx={{ mt: "1rem" }}>
      </Container>
    </>
  )
}

export default MyHomePage