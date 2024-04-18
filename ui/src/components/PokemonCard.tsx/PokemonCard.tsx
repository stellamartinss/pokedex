import './style.css';

const PokemonCard = ({ goToPokemonDetails, pokemon }: any): JSX.Element => {
  return (
    <div
      className='col-12 sm:col-6 lg:col-12 xl:col-3 p-2 capitalize my-3 pointer hvr-float-shadow'
      key={pokemon.id}
      onClick={() => goToPokemonDetails(pokemon.id)}
    >
      <div className='p-4 border-1 surface-border surface-card border-round rounded-lg	 card-shadow'>
        <div className='flex flex-wrap align-items-center justify-content-between gap-2'></div>
        <div>
          {pokemon.caught && (
            <i className='pi pi-heart-fill text-red-600	' style={{ fontSize: '2rem' }}></i>
          )}
        </div>
        <div className='flex flex-column align-items-center gap-3 py-5'>
          <img
            className='w-9 shadow-2 border-round'
            src={`${pokemon.image}`}
            alt={pokemon.name}
          />
          <div className='text-2xl font-bold'>{pokemon.name}</div>
          <div>
            <span className='font-semibold'> {pokemon.type}</span>
          </div>
        </div>
        <div className='flex align-items-center justify-content-between'>
          <span>
            Height:
            <span className='text-2xl font-semibold'> {pokemon.height}</span>
          </span>
          <span>
            Weight:
            <span className='text-2xl font-semibold'> {pokemon.weight}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
