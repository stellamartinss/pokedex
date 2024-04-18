import { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { fetchPokemons, getPokemonsBy } from '../../services/pokemon';
import { Paginator } from 'primereact/paginator';
import { useNavigate } from 'react-router-dom';
import { ProgressSpinner } from 'primereact/progressspinner';
import { getAbilities } from '../../services/ability';
import Filters from '../../components/Filters/Filters';
import PokemonCard from '../../components/PokemonCard.tsx/PokemonCard';
import { Panel } from 'primereact/panel';
import { Button } from 'primereact/button';
import PokemonNotFound from '../../components/PokemonNotFound/PokemonNotFound';

const initialFilterValue = {
  ability: '',
  type: '',
};

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
  const [selectedPokeFilters, setSelectedPokeFilters] =
    useState(initialFilterValue);

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

  const { data: initialFilters } = useQuery({
    queryFn: () => getAbilities(),
    queryKey: ['fetchExperiment'],
  });

  const {
    data: filterPokemonData,
    isLoading: isLoadingFilterPokemonData,
    mutate: mutateFilterPokemons,
  } = useMutation({
    mutationFn: ({ page, filters }: { page: number; filters: string }) =>
      getPokemonsBy({ page: page, filters: filters }),
    mutationKey: ['filterPokemons'],
  });

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

      mutateFilterPokemons({
        page: 0,
        filters: `ability=${updatedFilters.ability}&type=${updatedFilters.type}`,
      });

      setPokemonDataList(filterPokemonData);

      return updatedFilters;
    });
  };

  const clearFilter = async () => {
    await mutateFetchPokemons({ page: calculateOffsetByPage(pageData.first) });
    setPokemonDataList(data.results);

    setSelectedPokeFilters(initialFilterValue);
  };

  const chooseSetOfContent = () => {
    if (selectedPokeFilters.ability !== '') {
      if (filterPokemonData && filterPokemonData.length > 0) {
        return listTemplate(filterPokemonData);
      } else {
        return (
          <PokemonNotFound
            message={'No pokemon found'}
            submessage={
              <p>
                {' '}
                I'm currently searching within a{' '}
                <strong>database of 100 Pokémon</strong>. Unfortunately, I
                haven't found a method in the API to filter Pokémon by ability
                or type without loading all of them, and searching through all
                would be quite resource-intensive in terms of processing.
              </p>
            }
            clearFilter={clearFilter}
          />
        );
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

  const listTemplate = (items: any) => {
    if (!items || items.length === 0) return null;

    let list = items.map((pokemon: any, index: number) => {
      return (
        <PokemonCard
          goToPokemonDetails={goToPokemonDetails}
          pokemon={pokemon}
          key={pokemon.id}
        />
      );
    });

    return <div className='grid grid-nogutter '>{list}</div>;
  };

  return (
    <>
      {!isLoading ? (
        <div className=''>
          <div className='sm:flex align-items-center justify-content-between'>
            <h1 className='text-3xl'>Pokedéx</h1>
            <Filters
              initialFilters={initialFilters}
              prepareFilter={prepareFilter}
              initialFilterValue={initialFilterValue}
              selectedPokeFilters={selectedPokeFilters}
              clearFilter={clearFilter}
            />
          </div>

          {chooseSetOfContent()}
          <Paginator
            first={pageData.first}
            rows={pageData.rows}
            totalRecords={pageData.count}
            rowsPerPageOptions={[20]}
            onPageChange={onPageChange}
            className='bg-red-700 text-white box-shadow'
          />
        </div>
      ) : (
        <div className='flex align-items-center justify-content-center'>
          <ProgressSpinner color='white' />
        </div>
      )}
    </>
  );
};

export default Home;
