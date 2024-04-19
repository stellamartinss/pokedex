import { Dropdown } from 'primereact/dropdown';
import './style.css';
import { Button } from 'primereact/button';
import { FiltersProps } from '../../common/types/filter/filter';



const Filters = ({
  selectedPokeFilters,
  initialFilters,
  prepareFilter,
  clearFilter,
}: FiltersProps): JSX.Element => {
  return (
    <div className='flex flex-wrap justify-between items-center'>
      <div>
        <Dropdown
          value={selectedPokeFilters.ability}
          onChange={(e) => prepareFilter({ field: 'ability', value: e.value })}
          options={initialFilters?.abilities?.results}
          optionLabel='name'
          editable
          placeholder='Select an ability'
          className='w-full md:w-14rem mr-2 my-1 '
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
          className='w-full md:w-14rem my-1'
        />
      </div>
      {(selectedPokeFilters.ability || selectedPokeFilters.type) && (
        <div>
          <Button
            className='rounded-full bg-red-700 hover:bg-red-500 text-white font-bold py-2 px-4  my-1 "'
            onClick={() => clearFilter()}
          >
            Clear
          </Button>
        </div>
      )}
    </div>
  );
};

export default Filters;
