import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory';

import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import * as S from './styles';

import { api } from '../../services/api';
import { useAuth } from '@/hooks/AuthProvider';

export function FormInventory() {
  const [inventories, setInventories] = useState<any>([]);
  const { user } = useAuth();

  const validationSchema = yup.object({
    year: yup
      .string()
      .oneOf(['2023', '2022'], 'O ano deve ser 2023 (atual) ou 2022 (anterior)')
      .required('É necessário inserir um ano'),
    name: yup
      .string()
      .min(6, 'O nome deve conter no mínimo 6 caracteres')
      .required('É necessário inserir um nome'),
  });

  const formik = useFormik({
    initialValues: {
      year: '',
      name: '',
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      try {
        api
          .post('/inventory', {
            userId: user.id,
            ...values,
            status: 'PREENCHENDO',
          })
          .then(response => {
            localStorage.setItem(
              '@cerise-backend:inventories',
              JSON.stringify([...inventories, response.data])
            );

            alert('Inventário criado com sucesso!');

            window.location.reload();
          });
      } catch (error) {
        console.log(error);
      }
    },
  });

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
    <>
      <CardContent>
        <S.Container>
          <Card>
            <S.ContainerHeader>
              <CardHeader
                subheader="Insira as informçaões"
                title="Novo Inventário"
              />
              <S.ActionsContainer>
                <InventoryIcon />
              </S.ActionsContainer>
            </S.ContainerHeader>
            <Divider />
            <CardContent>
              <form id="form-new-inventory" onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      onChange={formik.handleChange}
                      value={formik.values.name}
                      fullWidth
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      helperText={formik.touched.name && formik.errors.name}
                      required
                      id="name"
                      label="Nome"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      onChange={formik.handleChange}
                      value={formik.values.year}
                      fullWidth
                      error={formik.touched.year && Boolean(formik.errors.year)}
                      helperText={formik.touched.year && formik.errors.year}
                      required
                      id="year"
                      label="Ano"
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
              </form>
            </CardContent>
            <Divider />
          </Card>
        </S.Container>
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button variant="contained" type="submit" form="form-new-inventory">
          Gravar
        </Button>
      </CardActions>
    </>
  );
}
