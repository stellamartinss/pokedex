import { useNavigate, useParams } from 'react-router-dom';
import { ProgressSpinner } from 'primereact/progressspinner';
import { catchPokemon, getPokemonDetails } from '../../services/pokemon';
import { useMutation, useQuery } from 'react-query';
import { Button } from 'primereact/button';
import PokemonNotFound from '../../components/PokemonNotFound/PokemonNotFound';
import { useEffect, useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import CatchGame from '../../components/CatchGame/CatchGame';

const PokemonDetails = () => {
  const { id } = useParams();
  const toast = useRef<Toast>(null);
  const navigate = useNavigate();

  const [visible, setVisible] = useState(false);
  const [gameResult, setGameResult] = useState('');

  const { data, isLoading } = useQuery({
    queryFn: () => getPokemonDetails(id ? id : '1'),
    queryKey: ['fetchPokemon'],
    enabled: !!id,
  });

  const {
    mutate: mutateCatchPokemon,
    data: catchPokemonData,
    isSuccess,
    isError,
  } = useMutation({
    mutationFn: (id: number) => catchPokemon(id),
    mutationKey: ['catchPokemon'],
  });

  if (isLoading) {
    return <ProgressSpinner />;
  }

  if (!isLoading && !data) {
    return <PokemonNotFound message='404 - Pokemon not found' />;
  }

  const handleCatchPokemon = async () => {
    await mutateCatchPokemon(data.id);

    if (isSuccess) {
      toast.current?.show({
        severity: 'success',
        summary: 'Caught',
        detail: `${data.name} is yours now`,
      });
    } else if (isError) {
      toast.current?.show({
        severity: 'error',
        summary: 'Oops!',
        detail: `Something got wrong`,
      });
    }
  };

  const handleBattleToCatch = () => {
    setVisible(true);
    handleCatchPokemon();
  };

  const dialog = (
    <Dialog
      header='Battle field'
      visible={visible}
      style={{ width: '50vw', height: '50vw' }}
      onHide={() => setVisible(false)}
    >
      <div className='col-12 smy-3 pt-5 px-5'>
        <div className='grid grid-nogutter mt-3'>
          <div className='col-12 mb-5 flex justify-content-center'>
            <p className='text-3xl'>
              Eat 5 food to get{' '}
              <strong className='capitalize'>{data.name}</strong>
            </p>
          </div>
          <div className='col-12 mb-5 flex justify-content-center'>
            <CatchGame setGameResult={setGameResult} setVisible={setVisible} />
          </div>
        </div>
      </div>
    </Dialog>
  );

  return (
    <div
      className='col-12 sm:col-12 lg:col-12 xl:col-12 p-2  my-3 h-screen'
      key={data.id}
      onKeyDown={(e) => e.preventDefault}
    >
      {dialog}
      <Toast ref={toast} />
      <div className='grid grid-nogutter capitalize'>
        <div className='col-12 sm:col-12 lg:col-4 xl:col-4 p-2 capitalize my-3 '>
          <img
            className='w-9 shadow-2 border-round bg-white'
            src={`${data.image}`}
            alt={data.name}
          />
        </div>
        <div className='col-12  card-shadow sm:col-12 lg:col-8 xl:col-8 p-2 capitalize my-3 bg-red-500 text-white pt-5 px-5'>
          <div className='grid grid-nogutter mt-3'>
            <div className='col-12 mb-5'>
              <p className='text-3xl'>{data.name}</p>
            </div>
            <div className='col-12 md:col-6'>
              <h5 className='text-sm'>Height</h5>
              <p className='text-3xl'>{data.height}</p>
            </div>
            <div className='col-12 md:col-6'>
              <h5 className='text-sm'>Weight</h5>
              <p className='text-3xl'>{data.weight}</p>
            </div>
            <div className='col-12 md:col-6'>
              <h5 className='text-sm'>Abilities</h5>
              <p className='text-3xl'>{data?.abilities}</p>
            </div>
            <div className='col-12 md:col-6'>
              <h5 className='text-sm'>Type:</h5>
              <p className='text-3xl'>{data.type}</p>
            </div>
            <div className='col-12 flex justify-content-center mt-5'>
              <Button
                className='bg-red-700 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-full'
                icon='pi pi-heart'
                disabled={catchPokemonData?.caught || data?.caught}
                onClick={() => {
                  handleCatchPokemon();
                }}
              >
                <span className='ml-2'>
                  {catchPokemonData?.caught || data?.caught
                    ? 'Caught'
                    : 'Catch'}
                </span>
              </Button>
            </div>
            {!(catchPokemonData?.caught || data?.caught) && (
              <div className='col-12 flex justify-content-center mt-5'>
                <Button
                  className='bg-red-700 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-full'
                  icon='pi pi-trophy'
                  disabled={catchPokemonData?.caught || data?.caught}
                  onClick={() => {
                    handleBattleToCatch();
                  }}
                >
                  <span className='ml-2'>Battle to Catch</span>
                </Button>
              </div>
            )}
            {gameResult && (
              <div className='col-12 flex justify-content-center mt-5 lowercase'>
                <span>
                  You battled for <strong>{data.name}</strong>, and won!
                </span>
              </div>
            )}
          </div>
        </div>
        <div className='col-12 '>
          <div className='flex align-items-center justify-content-end'>
            <Button onClick={() => navigate(-1)} className='text-red-200'>Go back</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetails;
