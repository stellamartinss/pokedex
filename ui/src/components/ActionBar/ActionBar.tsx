import { Menu } from 'primereact/menu';

const ActionBar = (): JSX.Element => {
  let items = [
    { label: 'New', icon: 'pi pi-plus' },
    { label: 'Search', icon: 'pi pi-search' },
  ];

  return <Menu model={items} />;
};

export default ActionBar;
