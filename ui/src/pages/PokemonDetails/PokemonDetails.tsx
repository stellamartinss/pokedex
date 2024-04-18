import { useParams } from 'react-router-dom';
import { ProgressSpinner } from 'primereact/progressspinner';
import { catchPokemon, getPokemonDetails } from '../../services/pokemon';
import { useMutation, useQuery } from 'react-query';
import { Button } from 'primereact/button';

const PokemonDetails = () => {
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryFn: () => getPokemonDetails(id ? id : '1'),
    queryKey: ['fetchPokemon'],
    enabled: !!id,
  });

  const {
    data: catchPokemonData,
    isLoading: isLoadingPokemon,
    mutate: mutateCatchPokemon,
  } = useMutation({
    mutationFn: (id: number) => catchPokemon(id),
    mutationKey: ['catchPokemon'],
  });

  if (isLoading) {
    return <ProgressSpinner />;
  }

  if (!isLoading && !data) {
    return <div>Pokémon not found</div>;
  }

  return (
    <div
      className='col-12 sm:col-12 lg:col-12 xl:col-12 p-2 capitalize my-3'
      key={data.id}
    >
      <div className='grid grid-nogutter'>
        <div className='col-12 sm:col-12 lg:col-4 xl:col-4 p-2 capitalize my-3'>
          <img
            className='w-9 shadow-2 border-round'
            src={`${data.image}`}
            alt={data.name}
          />
        </div>
        <div className='col-12 sm:col-12 lg:col-6 xl:col-6 p-2 capitalize my-3 bg-red-500 text-white'>
          <div className='grid grid-nogutter mt-3'>
            <div className='col-6'>
              <h5 className='text-sm'>Height</h5>
              <p className='text-3xl'>{data.height}</p>
            </div>
            <div className='col-6'>
              <h5 className='text-sm'>Weight</h5>
              <p className='text-3xl'>{data.weight}</p>
            </div>
            <div className='col-6'>
              <h5 className='text-sm'>Abilities</h5>
              <p className='text-3xl'>{data?.abilities.join(', ')}</p>
            </div>
            <div className='col-6'>
              <h5 className='text-sm'>Type:</h5>
              <p className='text-3xl'>{data.type}</p>
            </div>{' '}
            <div className='col-12'>
              <Button
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded'
                icon='pi pi-heart'
                onClick={() => mutateCatchPokemon(data.id)}
              >
                Catch
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetails;
