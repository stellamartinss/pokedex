import { Menubar } from 'primereact/menubar';
import { useNavigate } from 'react-router-dom';
import "./style.css"

const ActionBar = (): JSX.Element => {
  const navigate = useNavigate();

  let items = [
    {
      label: 'Home',
      icon: 'pi pi-home',
      command: () => {
        navigate('/');
      },
    },
    {
      label: 'Caught',
      icon: 'pi pi-heart',
      command: () => {
        navigate('/caught-pokemons');
      },
    },
  ];

  return <Menubar model={items} className='bg-red-700 box-shadow' color='white' />;
};

export default ActionBar;
