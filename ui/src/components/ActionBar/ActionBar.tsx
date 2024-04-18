import { Menubar } from 'primereact/menubar';
import { useNavigate } from 'react-router-dom';

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
      icon: 'pi pi-face-smile',
      command: () => {
        navigate('/caught-pokemons');
      },
    },
  ];

  return <Menubar model={items} />;
};

export default ActionBar;
