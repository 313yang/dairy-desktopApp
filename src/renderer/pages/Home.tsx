import Navbar from 'renderer/components/Navbar';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  > header {
    font-size: 69px;
    margin-bottom: 120px;
  }
`;
const Home = () => {
  return (
    <>
      <Container>
        <div></div>
      </Container>
      <Navbar />
    </>
  );
};

export default Home;
