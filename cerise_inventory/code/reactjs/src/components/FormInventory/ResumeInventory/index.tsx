import {
  Button,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import CheckIcon from '@mui/icons-material/Check';

import * as S from './styles';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { api } from '../../../services/api';

interface SummaryProps {
  handleBack: () => void;
}

export function ResumeInventory({ handleBack }: SummaryProps) {
  const [inventory, setInventory] = useState<any>({});
  const [inventories, setInventories] = useState<any>([]);
  const [inventoryItems, setInventoryItems] = useState<any>([]);
  const [categories, setCategories] = useState<any>([]);
  const [sources, setSources] = useState<any>([]);

  const navigate = useNavigate();

  const getColumnWidth = (value: number | string) => {
    if (typeof value === 'number') return value;
    const maxLength = Math.max(value.length);
    return maxLength * 10;
  };

  const rowsScope_01 = inventoryItems.filter(
    (item: any) => item.scope === 'SCOPE_01'
  );

  const rowsScope_02 = inventoryItems.filter(
    (item: any) => item.scope === 'SCOPE_02'
  );

  const rowsScope_03 = inventoryItems.filter(
    (item: any) => item.scope === 'SCOPE_03'
  );

  const rows_01 =
    rowsScope_01.length > 0
      ? rowsScope_01.map((item: any) => {
          return {
            id: item.id,
            uf: item.uf,
            description: item.description,
            category: categories
              ? categories.find(
                  (category: any) => category.id === item.categoryId
                ).name
              : [],
            source: sources
              ? sources.find((source: any) => source.id === item.sourceId).name
              : [],
            amount: item.quantity.replace(/\D/g, ','),
          };
        })
      : [
          {
            id: '',
            description: 'Não há itens cadastrados!',
          },
        ];

  const rows_02 =
    rowsScope_01.length > 0
      ? rowsScope_02.map((item: any) => {
          return {
            id: item.id,
            uf: item.uf,
            description: item.description,
            category: categories
              ? categories.find(
                  (category: any) => category.id === item.categoryId
                ).name
              : [],
            source: sources
              ? sources.find((source: any) => source.id === item.sourceId).name
              : [],
            amount: item.quantity.replace(/\D/g, ','),
          };
        })
      : [
          {
            id: '',
            description: 'Não há itens cadastrados!',
          },
        ];

  const rows_03 =
    rowsScope_01.length > 0
      ? rowsScope_03.map((item: any) => {
          return {
            id: item.id,
            uf: item.uf,
            description: `
              ${JSON.parse(item.description).text};
              Origin: ${JSON.parse(item.description).origin};
              Destination: ${JSON.parse(item.description).destination};
              `,
            category: categories
              ? categories.find(
                  (category: any) => category.id === item.categoryId
                ).name
              : [],
            source: sources
              ? sources.find((source: any) => source.id === item.sourceId).name
              : [],
            amount: item.quantity.replace(/\D/g, ','),
          };
        })
      : [
          {
            id: '',
            description: 'Não há itens cadastrados!',
          },
        ];

  const columns: GridColDef[] = [
    {
      field: 'description',
      headerName: 'Descrição',
      width: getColumnWidth(200),
    },
    {
      field: 'uf',
      headerName: 'UF',
      width: 100,
    },
    {
      field: 'category',
      headerName: 'Categoria',
      width: getColumnWidth(190),
    },
    {
      field: 'source',
      headerName: 'Fonte',
      width: getColumnWidth(120),
    },
    {
      field: 'amount',
      headerName: 'Quantidade',
      width: getColumnWidth(100),
    },
  ];

  function handleFulfillment() {
    console.log(inventory);
    console.log(inventories);
    const fulfillmentConfirmation = confirm(
      'Deseja confirmar o preenchimento do inventário?'
    );

    if (!fulfillmentConfirmation) return;

    api
      .put(`/inventory/${inventory.id}`, {
        ...inventory,
        status: 'ANALISANDO',
      })
      .then(() => {
        localStorage.removeItem('@cerise-backend:editingInventory');
        localStorage.removeItem('@cerise-backend:inventoryItems');

        inventories.filter((item: any) => {
          if (item.id === inventory.id) {
            item.status = 'ANALISANDO';
          }
        });
        setInventories(inventories);

        localStorage.setItem(
          '@cerise-backend:inventories',
          JSON.stringify(inventories)
        );

        alert('Inventário enviado para análise!');

        navigate('/dashboard');
      });
  }

  useEffect(() => {
    setCategories(
      JSON.parse(
        localStorage.getItem('@cerise-backend:categories')
          ? (localStorage.getItem('@cerise-backend:categories') as string)
          : '[]'
      )
    );
  }, []);

  useEffect(() => {
    setSources(
      JSON.parse(
        localStorage.getItem('@cerise-backend:sources')
          ? (localStorage.getItem('@cerise-backend:sources') as string)
          : '[]'
      )
    );
  }, []);

  useEffect(() => {
    const cacheEditingInventory = localStorage.getItem(
      '@cerise-backend:editingInventory'
    );
    const editingInventory: string = cacheEditingInventory
      ? JSON.parse(cacheEditingInventory)
      : '';

    const cacheInventoryItems = localStorage.getItem(
      '@cerise-backend:inventoryItems'
    );
    cacheInventoryItems
      ? setInventoryItems(JSON.parse(cacheInventoryItems))
      : api
          .get(`/inventory_items/${editingInventory}`)
          .then(response => {
            const items = response.data;
            localStorage.setItem(
              '@cerise-backend:inventoryItems',
              JSON.stringify(items)
            );
            setInventoryItems(items ? items : []);
          })
          .catch(error => {
            console.log(error);
          });

    const cacheInventories = localStorage.getItem(
      '@cerise-backend:inventories'
    );

    cacheInventories
      ? setInventory(
          JSON.parse(cacheInventories).find(
            (inventory: any) => inventory.id === editingInventory
          )
        )
      : api.get(`/inventory/${editingInventory}`).then(response => {
          setInventory(response.data);
        });

    cacheInventories
      ? setInventories(JSON.parse(cacheInventories))
      : api.get(`/inventory/`).then(response => {
          setInventories(response.data);
        });
  }, []);

  return (
    <>
      <S.ContainerHeader>
        <CardHeader
          subheader={`Confirmação dos dados de ${inventory.name}`}
          title="Resumo"
        />
        <S.ActionsContainer>
          <S.AddButton
            color="secondary"
            variant="contained"
            startIcon={<CheckIcon />}
            onClick={() => handleFulfillment()}
          >
            Confirmar
          </S.AddButton>
        </S.ActionsContainer>
      </S.ContainerHeader>
      <Divider />
      <S.ContainerHeader>
        <CardHeader subheader="Escopo 1" title="" />
      </S.ContainerHeader>
      <CardContent>
        <DataGrid
          rows={rows_01}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </CardContent>
      <Divider />
      <Divider />
      <S.ContainerHeader>
        <CardHeader subheader="Escopo 2" title="" />
      </S.ContainerHeader>
      <CardContent>
        <DataGrid
          rows={rows_02}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </CardContent>
      <Divider />
      <Divider />
      <S.ContainerHeader>
        <CardHeader subheader="Escopo 3" title="" />
      </S.ContainerHeader>
      <CardContent>
        <DataGrid
          rows={rows_03}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button variant="contained" onClick={() => handleBack()}>
          Voltar
        </Button>
      </CardActions>
    </>
  );
}
