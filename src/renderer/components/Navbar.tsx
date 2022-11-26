import { Button } from 'style/styledComponents';
import styled from 'styled-components';
import todoIcon from '../../images/todo_icon.svg';
import calendarIcon from '../../images/calendar_icon.svg';
import chartIcon from '../../images/chart_icon.svg';

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 30px;

  width: 100%;
  > ${Button} {
    margin: 0 20px;
  }
`;

const Navbar = () => {
  return (
    <Container>
      <Button>
        <img src={todoIcon} alt="todoIcon icon" />
      </Button>
      <Button>
        <img src={calendarIcon} alt="calendarIcon icon" />
      </Button>
      <Button>
        <img src={chartIcon} alt="chartIcon icon" />
      </Button>
    </Container>
  );
};
export default Navbar;
