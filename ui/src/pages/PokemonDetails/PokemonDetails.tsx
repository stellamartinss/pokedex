import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from 'primereact/card';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Tag } from 'primereact/tag';
import { Rating } from 'primereact/rating';
import { Button } from 'primereact/button';
import { getPokemonDetails } from '../../services/pokemon';
import { useQuery } from 'react-query';
import { Panel } from 'primereact/panel';

const PokemonDetails = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const { data, isLoading, isError, refetch } = useQuery({
    queryFn: () => getPokemonDetails(id ? id : '1'),
    queryKey: ['fetchExperiment'],
    enabled: !!id,
  });

  if (isLoading) {
    return <ProgressSpinner />;
  }

  if (!isLoading && !data) {
    return <div>Pokémon not found</div>;
  }

  return (
    <Panel>
      <div className='font-bold text-xl capitalize'>
        <h1 style={{ fontSize: '30px' }}>{data.name}</h1>
      </div>
      <img src={data.image} alt={data.name} style={{ width: '100%' }} />
      <div className='p-mt-2'>{data.description}</div>
      <div className='p-mt-2'>
        Type: <Tag value={data.type} severity='info' />
      </div>
      <div className='p-mt-2'>Height: {data.height}</div>
      <div className='p-mt-2'>Weight: {data.weight}</div>
      <div className='p-mt-2'>Abilities: {data.abilities.join(', ')}</div>
      <div className='text-right'>
        <Button
          label='Back to Home'
          className='p-mt-2'
          onClick={() => window.history.back()}
        />
      </div>
    </Panel>
  );
};

export default PokemonDetails;
