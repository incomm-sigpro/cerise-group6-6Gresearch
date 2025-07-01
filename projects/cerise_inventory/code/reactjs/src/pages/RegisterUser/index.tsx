import { useFormik } from 'formik';
import * as yup from 'yup';
import { api } from '@/services/api';

import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import CustomModal from '@/components/Modal';
import { RegisterCorporation } from '@/components/register-user/forms/register-corporation';

import AddIcon from '@mui/icons-material/Add';

import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  Stack,
  Typography
} from '@mui/material';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/AuthProvider';
import { useNavigate } from 'react-router-dom';

type corporationTypes = {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  cnpj: string;
  energyConsumption: string;
  airConditioners: string;
  computers: string;
  employeeTransportation: string;
  mainActivity: string;
  suppliers: string;
  wasteGeneration: string;
};

export function RegisterUser() {
  const [openFormModal, setOpenFormModal] = useState(false);

  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [corporations, setCorporations] = useState<corporationTypes[]>([]);

  const validationSchema = yup.object({
    name: yup.string().required('É necessário inserir um nome'),
    email: yup
      .string()
      .email('Insira um email válido')
      .required('É necessário inserir o email'),
    birthday: yup
      .date()
      .required('É necessário inserir uma data de nascimento'),
    corporation: yup.string(),
    permissionGroup: yup.object({
      role: yup.string().required('É necessário escolher uma role'),
    }),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      isActive: true,
      birthday: '',
      corporation: '',
      permissionGroup: { role: '' },
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      const dateOfBirth = new Date(values.birthday);
      values.birthday = dateOfBirth.toISOString();
      try {
        api.post(`/user/`, values);
        alert('Usuário cadastrado com sucesso!');
      } catch (error) {
        console.log(error);
      }
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await api.get(`/corporation/`);
        setCorporations(results.data);
      } catch (error: any) {
        console.log(error);
        if ((error = 'Unauthorized')) {
          signOut();
          navigate('/');
        }
      }
    };

    fetchData();
  }, []);

  const userTypes = [
    {
      value: 'user',
      label: 'Usuário',
    },
    {
      value: 'IS_SUPPORT',
      label: 'Suporte',
    },
    {
      value: 'IS_ADMIN',
      label: 'Admin',
    },
  ];

  return (
    corporations && (
      <Box
        component="main"
        sx={{
          py: 8,
          px: 12,
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3}>
            <div>
              <Typography variant="h4">Cadastro de Usuário</Typography>
            </div>
            <div>
              <Grid container spacing={3}>
                <Grid xs={12} md={6} lg={12}>
                  <form
                    autoComplete="off"
                    noValidate
                    onSubmit={formik.handleSubmit}
                  >
                    <Card>
                      <CardHeader
                        subheader="Insira as informações do usuário"
                        title="Informações"
                      />
                      <CardContent sx={{ pt: 0 }}>
                        <Box>
                          <Grid justifyContent={'space-around'} container>
                            <Grid marginBottom={2} xs={12} md={5}>
                              <Input
                                label="Nome Completo"
                                name="name"
                                onChange={formik.handleChange}
                                required
                                value={formik.values.name}
                              />
                            </Grid>
                            <Grid xs={12} md={5}>
                              <Input
                                label="Endereço de Email"
                                name="email"
                                onChange={formik.handleChange}
                                required
                                value={formik.values.email}
                              />
                            </Grid>
                            <Grid marginBottom={2} xs={12} md={5}>
                              <Input
                                label="Senha"
                                name="password"
                                onChange={formik.handleChange}
                                type="password"
                                value={formik.values.password}
                              />
                            </Grid>
                            <Grid xs={12} md={5}>
                              <Input
                                label="Data de nascimento"
                                name="birthday"
                                onChange={formik.handleChange}
                                type="date"
                                required
                                value={formik.values.birthday}
                              />
                            </Grid>
                            {corporations.length > 0 && (
                              <>
                                <Grid sx={{ display: 'flex' }} xs={12} md={5}>
                                  <Input
                                    label="Selecione corporação"
                                    name="corporation"
                                    onChange={formik.handleChange}
                                    required
                                    select
                                    SelectProps={{ native: true }}
                                    value={formik.values.corporation}
                                  >
                                    <option value="">
                                      Selecione a empresa
                                    </option>
                                    {corporations.map(option => (
                                      <option
                                        key={option?.id}
                                        value={option?.name}
                                      >
                                        {option?.name}
                                      </option>
                                    ))}
                                  </Input>
                                  <Button
                                    onClick={() => {
                                      setOpenFormModal(true);
                                    }}
                                    sx={{ width: '5%', marginLeft: '5px' }}
                                  >
                                    <AddIcon />
                                  </Button>
                                </Grid>
                              </>
                            )}
                            <Grid xs={12} md={5}>
                              <Input

                                label="Selecione tipo de usuário"
                                name="permissionGroup.role"
                                onChange={formik.handleChange}
                                required
                                select
                                SelectProps={{ native: true }}
                                value={formik.values.permissionGroup.role}
                              >
                                <option value="">
                                  Selecione o tipo de usuário
                                </option>
                                {userTypes.map(option => (
                                  <option
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </option>
                                ))}
                              </Input>
                            </Grid>
                          </Grid>
                        </Box>
                      </CardContent>
                      <Divider />
                      <CardActions
                        sx={{
                          display: 'flex',
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                          width: '100%',
                        }}
                      >
                        <Button sx={{ width: '50%' }} type="submit">
                          Cadastrar
                        </Button>
                      </CardActions>
                    </Card>
                  </form>
                </Grid>
              </Grid>
            </div>
          </Stack>
        </Container>
        <CustomModal
          open={openFormModal}
          onClose={() => setOpenFormModal(false)}
        >
          <RegisterCorporation handleClose={setOpenFormModal} />
        </CustomModal>
      </Box>
    )
  );
}
