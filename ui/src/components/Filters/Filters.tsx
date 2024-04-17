import { Dropdown } from 'primereact/dropdown';

interface FiltersProps {
  selectedPokeFilters: any;
  initialFilters: any;
  prepareFilter: any;
}

const Filters: React.FC<FiltersProps> = ({
  selectedPokeFilters,
  initialFilters,
  prepareFilter,
}): JSX.Element => {
  return (
    <div className='flex align-items-center justify-content-between'>
      <div>
        <Dropdown
          value={selectedPokeFilters.ability}
          onChange={(e) => prepareFilter({ field: 'ability', value: e.value })}
          options={initialFilters?.abilities?.results}
          optionLabel='name'
          editable
          placeholder='Select an ability'
          className='w-full md:w-14rem'
        />
      </div>
      <div>
        <Dropdown
          value={selectedPokeFilters.type}
          onChange={(e) => prepareFilter({ field: 'type', value: e.value })}
          options={initialFilters?.type?.results}
          optionLabel='name'
          editable
          placeholder='Select a type'
          className='w-full md:w-14rem'
        />
      </div>
    </div>
  );
};

export default Filters;
