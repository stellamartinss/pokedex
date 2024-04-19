import { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { caughtPokemons, getCaughtPokemonsBy } from '../../services/pokemon';
import { Paginator } from 'primereact/paginator';
import { useNavigate } from 'react-router-dom';
import { ProgressSpinner } from 'primereact/progressspinner';
import { getAbilities } from '../../services/ability';
import Filters from '../../components/Filters/Filters';
import PokemonCard from '../../components/PokemonCard.tsx/PokemonCard';
import PokemonNotFound from '../../components/PokemonNotFound/PokemonNotFound';
import { Pokemon } from '../../common/types/pokemon';
import { Filter, PokemonFilter } from '../../common/types/filter/filter';

const initialFilterValue = {
  ability: '',
  type: '',
};

const CaughtPokemons = () => {
  const navigate = useNavigate();

  const [pokemonDataList, setPokemonDataList] = useState([]);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [pageData, setPageData] = useState({
    first: 0,
    rows: 20,
    count: 0,
    page: 0,
  });
  const [selectedPokeFilters, setSelectedPokeFilters] = useState<PokemonFilter>(
    {
      ability: '',
      type: '',
    }
  );

  const calculateOffsetByPage = (page: number) => (page + 1) * pageData.rows;

  const onPageChange = async (event: any) => {
    const page = calculateOffsetByPage(event.page);
    setPageData((prev) => ({
      ...prev,
      page: page,
      first: event.first,
      rows: event.rows,
    }));
    await mutateCaughtPokemons({ page: page });

    setPokemonDataList(data.results);
  };

  const {
    data,
    isLoading,
    mutate: mutateCaughtPokemons,
  } = useMutation({
    mutationFn: ({ page }: { page: number }) => caughtPokemons({ page: page }),
    mutationKey: ['caughtPokemons'],
  });

  const { data: initialFilters } = useQuery({
    queryFn: () => getAbilities(),
    queryKey: ['fetchExperiment'],
  });

  const { data: filterPokemonData, mutate: mutateFilterPokemons } = useMutation(
    {
      mutationFn: ({ page, filters }: { page: number; filters: string }) =>
        getCaughtPokemonsBy({ page: page, filters: filters }),
      mutationKey: ['filterCatchPokemonsBy'],
    }
  );

  const prepareFilter = async ({ field, value }: Filter) => {
    setSelectedPokeFilters((prev) => {
      const updatedFilters = {
        ...prev,
        [field]: typeof value === 'string' ? value : value.name,
      };

      if (updatedFilters.ability.length > 4 || updatedFilters.type) {
        mutateFilterPokemons({
          page: 0,
          filters: `ability=${updatedFilters.ability}&type=${updatedFilters.type}`,
        });
      }

      setPokemonDataList(filterPokemonData);

      return updatedFilters;
    });
  };

  const clearFilter = async () => {
    await mutateCaughtPokemons({ page: calculateOffsetByPage(pageData.first) });
    setPokemonDataList(data.results);

    setSelectedPokeFilters(initialFilterValue);
  };

  const chooseSetOfContent = () => {
    if (selectedPokeFilters.ability !== '' || selectedPokeFilters.type !== '') {
      if (filterPokemonData && filterPokemonData.length > 0) {
        return listTemplate(filterPokemonData);
      } else {
        return (
          <PokemonNotFound
            message={'You have no pokemon with this type or ability'}
            clearFilter={clearFilter}
          />
        );
      }
    } else if (pokemonDataList.length <= 0) {
      return (
        <PokemonNotFound
          message={'You haven\'t caught any Pokémon yet.'}
        />
      );
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
    mutateCaughtPokemons({ page: calculateOffsetByPage(pageData.first) });
  }, []);

  useEffect(() => {
    listTemplate(pokemonDataList);
  }, [pokemonDataList]);

  const goToPokemonDetails = (id: number) => {
    navigate(`/${id}`);
  };

  const listTemplate = (items: Pokemon[]) => {
    if (!items || items.length === 0) return null;

    let list = items.map((pokemon: Pokemon, index: number) => {
      return (
        <PokemonCard
          goToPokemonDetails={goToPokemonDetails}
          pokemon={pokemon}
          key={pokemon.id}
        />
      );
    });

    return <div className='grid grid-nogutter'>{list}</div>;
  };

  return (
    <>
      {!isLoading ? (
        <div className='card'>
          <div className='flex flex-wrap align-items-center justify-content-between'>
            <h1 className='text-5xl'>Caught</h1>
            <Filters
              initialFilters={initialFilters}
              prepareFilter={prepareFilter}
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

export default CaughtPokemons;
