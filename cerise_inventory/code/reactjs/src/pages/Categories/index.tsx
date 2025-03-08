import { DataGrid, GridColDef } from '@mui/x-data-grid';
import * as S from './styles';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';

import EditIcon from '@mui/icons-material/Edit';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  InputAdornment,
  TextField,
} from '@mui/material';

export function Categories() {
  const inventories = [
    {
      id: '1',
      name: 'Name of category',
      year: '2023',
      status: 'Status',
    },
    {
      id: '2',
      name: 'Name of category',
      year: '2023',
      status: 'Status',
    },
    {
      id: '3',
      name: 'Name of category',
      year: '2023',
      status: 'Status',
    },
  ];

  const rows = inventories.map((inventory: any) => {
    return {
      id: inventory.id,
      name: inventory.name,
      year: inventory.year,
      status: inventory.status,
    };
  });

  // const getColumnWidth = (value: number | string) => {
  //   if (typeof value === 'number') return value;
  //   const maxLength = Math.max(value.length);
  //   return maxLength * 10;
  // };

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      flex: 1,
    },
    {
      field: 'name',
      headerName: 'Nome',
      flex: 1,
    },
    {
      field: 'year',
      headerName: 'Ano',
      flex: 1,
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,

      align: 'center',
      headerAlign: 'center',
      renderCell: (params: any) => (
        <EditIcon
          style={{ cursor: 'pointer' }}
          onClick={() => {
            console.log(params);
          }}
        />
      ),
    },
  ];

  return (
    <S.Container maxWidth="xl">
      <Card style={{ borderRadius: '10px' }}>
        <S.ContainerHeader>
          <CardHeader
            // subheader="Categorias de inventários"
            title="Categorias"
          />
          <S.ActionsContainer>
            <S.AddButton
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => console.log(true)}
            >
              Nova Categoria
            </S.AddButton>
          </S.ActionsContainer>
        </S.ContainerHeader>
        <Divider />
        <CardContent>
          <S.Search>
            <TextField
              id="outlined-basic"
              variant="outlined"
              placeholder="Pesquisar"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </S.Search>
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
        <Divider />
      </Card>
    </S.Container>
  );
}
