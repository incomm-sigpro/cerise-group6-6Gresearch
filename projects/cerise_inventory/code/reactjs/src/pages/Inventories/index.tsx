import { Card, CardContent, CardHeader, Divider } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import * as S from './styles';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { FormInventory } from '@/components/FormInventory';
import CustomModal from '@/components/Modal';

import { api } from '../../services/api';

export function Inventories() {
  const [openFormModal, setOpenFormModal] = useState<boolean>(false);
  const [inventories, setInventories] = useState<any>([]);
  const navigate = useNavigate();

  const getColumnWidth = (value: number | string) => {
    if (typeof value === 'number') return value;
    const maxLength = Math.max(value.length);
    return maxLength * 10;
  };

  const rows =
    inventories.length > 0
      ? inventories.map((inventory: any) => {
          return {
            id: inventory.id,
            name: inventory.name,
            year: inventory.year,
            status: inventory.status,
          };
        })
      : [
          {
            id: '',
            name: 'Não há inventários cadastrados!',
          },
        ];

  const columns: GridColDef[] =
    inventories.length > 0
      ? [
          {
            field: 'name',
            headerName: 'Nome',
            width: getColumnWidth(150),
          },
          {
            field: 'year',
            headerName: 'Ano',
            width: getColumnWidth(80),
          },
          {
            field: 'status',
            headerName: 'Status',
            width: getColumnWidth(150),
          },
          {
            field: 'actions',
            headerName: 'Actions',
            width: getColumnWidth(100),
            renderCell: (params: any) => (
              <>
                <EditIcon
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    handleEdit(params);
                  }}
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
            field: 'name',
            headerName: 'Nome',
            width: getColumnWidth(150),
          },
          {
            field: 'year',
            headerName: 'Ano',
            width: getColumnWidth(80),
          },
          {
            field: 'status',
            headerName: 'Status',
            width: getColumnWidth(150),
          },
        ];

  function handleEdit(params: GridValueGetterParams) {
    if (params.row.status !== 'PREENCHENDO') {
      alert('Você não pode editar este inventário');
      return;
    }

    localStorage.setItem(
      '@cerise-backend:editingInventory',
      JSON.stringify(params.row.id)
    );

    navigate(`/inventories/inventory/${params.row.id}`);
  }

  function handleDelete(params: GridValueGetterParams) {
    const deleteConfirmation = confirm(
      'Você tem certeza que quer excluir o inventário?'
    );

    if (deleteConfirmation) {
      api.delete(`/inventory/${params.row.id}`);

      const remainingInventories = inventories.filter(
        (inventory: any) => inventory.id !== params.row.id
      );

      localStorage.setItem(
        '@cerise-backend:inventories',
        JSON.stringify(remainingInventories)
      );
      setInventories(remainingInventories);

      alert('Inventário excluído com sucesso?');
    }

    window.location.reload();
  }

  useEffect(() => {
    setInventories(
      JSON.parse(
        localStorage.getItem('@cerise-backend:inventories')
          ? (localStorage.getItem('@cerise-backend:inventories') as string)
          : '[]'
      )
    );
  }, []);

  return (
    <S.Container>
      <S.Content>
        <Card>
          <S.ContainerHeader>
            <CardHeader subheader="Meus inventários" title="Inventários" />
            <S.ActionsContainer>
              <S.AddButton
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setOpenFormModal(true)}
              >
                Novo inventário
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
              // onRowClick={e => console.log(e)}
            />
          </CardContent>
          <Divider />
        </Card>
        <CustomModal
          open={openFormModal}
          onClose={() => setOpenFormModal(false)}
        >
          <FormInventory />
        </CustomModal>
      </S.Content>
    </S.Container>
  );
}
