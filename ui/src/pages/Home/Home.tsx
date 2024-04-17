import React, { SetStateAction, useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { fetchPokemons, getPokemonsBy } from '../../services/pokemon';
import { Paginator } from 'primereact/paginator';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { ProgressSpinner } from 'primereact/progressspinner';
import { getAbilities } from '../../services/ability';
import { Dropdown } from 'primereact/dropdown';
import Filters from '../../components/Filters/Filters';
import { Pokemon } from '../../common/classes/Pokemon/Pokemon';
import PokemonCard from '../../components/PokemonCard.tsx/PokemonCard';

const Home = () => {
  const navigate = useNavigate();

  const [pokemonDataList, setPokemonDataList] = useState([]);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [pageData, setPageData] = useState({
    first: 0,
    rows: 20,
    count: 0,
    page: 0,
  });
  const [selectedPokeFilters, setSelectedPokeFilters] = useState({
    ability: '',
    type: '',
  });

  const calculateOffsetByPage = (page: number) => (page + 1) * pageData.rows;

  const onPageChange = async (event: any) => {
    const page = calculateOffsetByPage(event.page);
    setPageData((prev) => ({
      ...prev,
      page: page,
      first: event.first,
      rows: event.rows,
    }));
    await mutateFetchPokemons({ page: page });

    setPokemonDataList(data.results);
  };

  const {
    data,
    isLoading,
    mutate: mutateFetchPokemons,
  } = useMutation({
    mutationFn: ({ page }: { page: number }) => fetchPokemons({ page: page }),
    mutationKey: ['fetchExperiment'],
  });

  const { data: initialFilters, refetch: refetchGetAbilities } = useQuery({
    queryFn: () => getAbilities(),
    queryKey: ['fetchExperiment'],
  });

  const { data: filterPokemonData, mutate: mutateFilterPokemons } = useMutation(
    {
      mutationFn: ({ page, filters }: { page: number; filters: string }) =>
        getPokemonsBy({ page: page, filters: filters }),
      mutationKey: ['filterPokemons'],
    }
  );

  const prepareFilter = async ({
    field,
    value,
  }: {
    field: string;
    value: string | { name: string; url: string };
  }) => {
    setSelectedPokeFilters((prev) => {
      const updatedFilters = {
        ...prev,
        [field]: typeof value === 'string' ? value : value.name,
      };

      // Call mutateFilterPokemons with the updated filters
      mutateFilterPokemons({
        page: 0,
        filters: `ability=${updatedFilters.ability}&type=${updatedFilters.type}`,
      });

      setPokemonDataList(filterPokemonData)

      return updatedFilters;
    });
  };

  const chooseSetOfContent = () => {
    
    if (selectedPokeFilters.ability !== '') {
      if (filterPokemonData) {
        return listTemplate(filterPokemonData);
      } else {
        return <span>No pokemon found </span>;
      }
    } else {
      return listTemplate(pokemonDataList);
    }
  };

  useEffect(() => {
    if (isFirstLoad) {
      if (data) {
        setPokemonDataList(data.results);
        setIsFirstLoad(false);
        setPageData((prev) => ({
          ...prev,
          count: data.count,
        }));
      }
    }
  }, [data, isFirstLoad]);

  useEffect(() => {
    mutateFetchPokemons({ page: calculateOffsetByPage(pageData.first) });
  }, []);

  useEffect(() => {
    listTemplate(pokemonDataList);
  }, [pokemonDataList]);

  const goToPokemonDetails = (id: number) => {
    navigate(`/${id}`);
  };

  const itemTemplate = (pokemon: any, index: any) => {
    return (
      <PokemonCard
        goToPokemonDetails={goToPokemonDetails}
        pokemon={pokemon}
        key={pokemon.id}
      />
    );
  };

  const listTemplate = (items: any) => {
    if (!items || items.length === 0) return null;

    let list = items.map((pokemon: any, index: number) => {
      return itemTemplate(pokemon, index);
    });

    return <div className='grid grid-nogutter'>{list}</div>;
  };

  return (
    <>
      {!isLoading ? (
        <div className='card'>
          <div className='flex align-items-center justify-content-between'>
            <h1 style={{ fontSize: '40px' }}>Pokedéx</h1>
          </div>
          <div className='flex align-items-center justify-content-between'>
            <Filters
              initialFilters={initialFilters}
              prepareFilter={prepareFilter}
              selectedPokeFilters={selectedPokeFilters}
            />
          </div>

          {chooseSetOfContent()}
          <Paginator
            first={pageData.first}
            rows={pageData.rows}
            totalRecords={pageData.count}
            rowsPerPageOptions={[20]}
            onPageChange={onPageChange}
          />
        </div>
      ) : (
        <ProgressSpinner />
      )}
    </>
  );
};

export default Home;
