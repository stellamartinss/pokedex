import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { fetchPokemons } from '../../services/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Paginator } from 'primereact/paginator';

const Home = () => {
  const [pokemonDataList, setPokemonDataList] = useState([]);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [pageData, setPageData] = useState({
    first: 0,
    rows: 20,
    count: 0,
    page: 0,
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
    isError,
    mutate: mutateFetchPokemons,
  } = useMutation({
    mutationFn: ({ page }: { page: number }) => fetchPokemons({ page: page }),
    mutationKey: ['fetchExperiment'],
  });

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

  return (
    <div>
      <DataTable
        value={pokemonDataList}
        tableStyle={{ minWidth: '50rem' }}
        loading={isLoading}
      >
        <Column field='name' header='Name'></Column>
        <Column field='height' header='Height'></Column>
        <Column
          field='type'
          header='Type'
          body={(rowData) => (
              rowData.type.join(', ')
          )}
        ></Column>
        <Column field='url' header='Url'></Column>
      </DataTable>
      <Paginator
        first={pageData.first}
        rows={pageData.rows}
        totalRecords={pageData.count}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default Home;
