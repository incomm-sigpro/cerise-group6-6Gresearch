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

import { FormScope2 } from './Form';
import { EditFormScope2 } from './EditForm';
import CustomModal from '@/components/Modal';

import { api } from '../../../services/api';

interface Scope2Props {
  handleNext: () => void;
  handleBack: () => void;
}

export function Scope2({ handleNext, handleBack }: Scope2Props) {
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

  const rowsScope_02 = inventoryItems.filter(
    (item: any) => item.scope === 'SCOPE_02'
  );

  const rows =
    rowsScope_02.length > 0
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
            amount: `
          Jan: ${item.quantityJan.replace(/\D/g, ',')};
          Feb: ${item.quantityFeb.replace(/\D/g, ',')};
          Mar: ${item.quantityMar.replace(/\D/g, ',')};
          Apr: ${item.quantityApr.replace(/\D/g, ',')};
          May: ${item.quantityMay.replace(/\D/g, ',')};
          Jun: ${item.quantityJun.replace(/\D/g, ',')};
          Jul: ${item.quantityJul.replace(/\D/g, ',')};
          Aug: ${item.quantityAug.replace(/\D/g, ',')};
          Sep: ${item.quantitySep.replace(/\D/g, ',')};
          Oct: ${item.quantityOct.replace(/\D/g, ',')};
          Nov: ${item.quantityNov.replace(/\D/g, ',')};
          Dec: ${item.quantityDec.replace(/\D/g, ',')}
        `,
          };
        })
      : [
          {
            id: '',
            description: 'Não há itens cadastrados!',
          },
        ];

  const columns: GridColDef[] =
    rowsScope_02.length > 0
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
      'Você tem certeza que quer excluir o inventário?'
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
                title="Itens de Inventário"
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
                onRowClick={e => console.log(e)}
              />
            </CardContent>
          </Card>
          <CustomModal
            open={openFormModal}
            onClose={() => setOpenFormModal(false)}
          >
            <FormScope2 />
          </CustomModal>
          <CustomModal
            open={openEditFormModal}
            onClose={() => setOpenEditFormModal(false)}
          >
            <EditFormScope2 />
          </CustomModal>
        </S.Container>
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button variant="contained" onClick={() => handleBack()}>
          Voltar
        </Button>
        <Button variant="contained" onClick={() => handleNext()}>
          Próximo
        </Button>
      </CardActions>
    </>
  );
}
