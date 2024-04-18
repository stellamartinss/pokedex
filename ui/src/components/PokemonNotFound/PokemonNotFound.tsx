import { Button } from 'primereact/button';

const PokemonNotFound = ({ clearFilter, message, submessage }: any) => {
  return (
    <div className='h-screen bg-red-600 flex items-center text-center h-100'>
      <div className='w-full content-center mt-5 pt-5'>
        <p className='text-3xl'>{message}</p>
        {clearFilter && (
          <div>
            <p className='text-sm'>
             {submessage}
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
