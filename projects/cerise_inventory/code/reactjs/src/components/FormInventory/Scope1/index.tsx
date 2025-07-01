import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
} from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import * as S from './styles';

import { useState, useEffect } from 'react';

import { FormScope1 } from './Form';
import { EditFormScope1 } from './EditForm';
import CustomModal from '@/components/Modal';

import { api } from '../../../services/api';

interface Scope1Props {
  handleNext: () => void;
}

export function Scope1({ handleNext }: Scope1Props) {
  const [openFormModal, setOpenFormModal] = useState<boolean>(false);
  const [openEditFormModal, setOpenEditFormModal] = useState<boolean>(false);
  const [inventory, setInventory] = useState<any>({});
  const [inventoryItems, setInventoryItems] = useState<any>([]);
  const [categories, setCategories] = useState<any>([]);
  const [sources, setSources] = useState<any>([]);

  const getColumnWidth = (value: number | string) => {
    if (typeof value === 'number') return value;
    const maxLength = Math.max(value.length);
    return maxLength * 10;
  };

  const rowsScope_01 = inventoryItems.filter(
    (item: any) => item.scope === 'SCOPE_01'
  );

  const rows =
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

  const columns: GridColDef[] =
    rowsScope_01.length > 0
      ? [
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
          {
            field: 'actions',
            headerName: 'Actions',
            width: getColumnWidth(75),
            renderCell: (params: any) => (
              <>
                <EditIcon
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleEditInventoryItem(params)}
                />
                <DeleteIcon
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    handleDelete(params);
                  }}
                />
              </>
            ),
          },
        ]
      : [
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

  function handleEditInventoryItem(params: GridValueGetterParams) {
    localStorage.setItem(
      '@cerise-backend:editingInventoryItem',
      JSON.stringify(params.row.id)
    );
    setOpenEditFormModal(true);
  }

  function handleDelete(params: GridValueGetterParams) {
    const deleteConfirmation = confirm(
      'Você tem certeza que quer excluir este item de inventário?'
    );

    if (deleteConfirmation) {
      api.delete(`/inventory_items/${params.row.id}`);

      const remainingItems = inventoryItems.filter(
        (item: any) => item.id !== params.row.id
      );

      localStorage.setItem(
        '@cerise-backend:inventoryItems',
        JSON.stringify(remainingItems)
      );
      setInventoryItems(remainingItems);

      alert('Item de inventário excluído com sucesso!');
    }

    window.location.reload();
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
    localStorage.removeItem('@cerise-backend:inventoryItems');

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
  }, []);

  return (
    <>
      <CardContent>
        <S.Container>
          <Card>
            <S.ContainerHeader>
              <CardHeader
                subheader={inventory.name}
                title="Itens do Inventário"
              />
              <S.ActionsContainer>
                <S.AddButton
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => setOpenFormModal(true)}
                >
                  Adicionar
                </S.AddButton>
              </S.ActionsContainer>
            </S.ContainerHeader>
            <Divider />
            <CardContent>
              <DataGrid
                rows={rows}
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
          </Card>
          <CustomModal
            open={openFormModal}
            onClose={() => setOpenFormModal(false)}
          >
            <FormScope1 />
          </CustomModal>
          <CustomModal
            open={openEditFormModal}
            onClose={() => setOpenEditFormModal(false)}
          >
            <EditFormScope1 />
          </CustomModal>
        </S.Container>
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button variant="contained" onClick={() => handleNext()}>
          Próximo
        </Button>
      </CardActions>
    </>
  );
}
