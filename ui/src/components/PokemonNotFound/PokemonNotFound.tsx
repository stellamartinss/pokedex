import { Button } from 'primereact/button';

const PokemonNotFound = ({ clearFilter, message }: any) => {
  return (
    <div className='h-screen bg-red-600 flex items-center text-center h-100'>
      <div className='w-full content-center mt-5 pt-5'>
        <p className='text-3xl'>{message}</p>
        {clearFilter && (
          <div>
            <p className='text-sm'>
              I'm currently searching within a{' '}
              <strong>database of 100 Pokémon</strong>. Unfortunately, I haven't
              found a method in the API to filter Pokémon by ability or type
              without loading all of them, and searching through all would be
              quite resource-intensive in terms of processing.
            </p>
            <Button
              className=' mt-5 rounded-full bg-red-700 hover:bg-red-500 text-white font-bold py-2 px-4 "'
              icon='pi pi-sync'
              onClick={() => clearFilter()}
            >
              <span className='ml-3'>Clear Filter</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonNotFound;
