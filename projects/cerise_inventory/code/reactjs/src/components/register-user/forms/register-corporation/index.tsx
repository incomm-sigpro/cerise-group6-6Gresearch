import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
} from '@mui/material';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';

import { Dispatch, SetStateAction } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import * as S from './styles';

import { api } from '@/services/api';

type registerCorpProps = {
  handleClose?: Dispatch<SetStateAction<boolean>>;
};

export function RegisterCorporation({ handleClose }: registerCorpProps) {

  const validationSchema = yup.object({
    name: yup.string().required('É necessário inserir um nome'),
    cnpj: yup.number().required('É necessário inserir um nome'),
    energyConsumption: yup
      .string()
      .required('É necessário inserir um parâmetro de consumo de energia'),
    airConditioners: yup
      .string()
      .required('É necessário inserir a quantidade de ar condicionados'),
    computers: yup
      .string()
      .required('É necessário inserir a quantidade de computadores'),
    employeeTransportation: yup
      .string()
      .required(
        'É necessário inserir os valores para transporte de colaboradores'
      ),
    mainActivity: yup
      .string()
      .required('É necessário definir a atividade principal'),
    suppliers: yup.string().required('É necessário inserir os fornecedores'),
    wasteGeneration: yup
      .string()
      .required('É necessário inserir a quantidade de lixo da empresa'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      cnpj: '',
      energyConsumption: '',
      airConditioners: '',
      computers: '',
      employeeTransportation: '',
      mainActivity: '',
      suppliers: '',
      wasteGeneration: '',
    },
    validationSchema: validationSchema,

    onSubmit: values => {
      try {
        api.post('/corporation', values)
        
        alert('Empresa adicionada com sucesso!');

        window.location.reload();
      } 
      
      catch (error) {
        alert(`Não foi possível adicionar a empresa. Erro: ${error}`)
        console.log(error);
      }
    },
  });

  return (
    <>
      <CardContent>
        <S.Container>
          <Card>
            <S.ContainerHeader>
              <CardHeader
                subheader="Insira as informações"
                title="Cadastro de nova empresa"
              />
              <S.ActionsContainer>
                <AddBusinessIcon />
              </S.ActionsContainer>
            </S.ContainerHeader>
            <Divider />
            <CardContent>
              <form id="form-new-corporation" onSubmit={formik.handleSubmit}>
                <Grid mb={2} container spacing={2}>
                  <Grid item xs={6}>
                    <Input
                      onChange={formik.handleChange}
                      value={formik.values.name}
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      helperText={formik.touched.name && formik.errors.name}
                      required
                      id="name"
                      label="Nome da Empresa"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Input
                      onChange={formik.handleChange}
                      value={formik.values.cnpj}
                      error={formik.touched.cnpj && Boolean(formik.errors.cnpj)}
                      helperText={formik.touched.cnpj && formik.errors.cnpj}
                      required
                      id="cnpj"
                      label="Cnpj da Empresa"
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid mb={2} item xs={6}>
                    <Input
                      onChange={formik.handleChange}
                      value={formik.values.energyConsumption}
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      helperText={formik.touched.name && formik.errors.name}
                      required
                      id="energyConsumption"
                      label="Consumo de energia"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Input
                      onChange={formik.handleChange}
                      value={formik.values.airConditioners}
                      error={formik.touched.cnpj && Boolean(formik.errors.cnpj)}
                      helperText={formik.touched.cnpj && formik.errors.cnpj}
                      required
                      id="airConditioners"
                      label="Quantidade de ar condicionado"
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid mb={2} item xs={6}>
                    <Input
                      onChange={formik.handleChange}
                      value={formik.values.computers}
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      helperText={formik.touched.name && formik.errors.name}
                      required
                      id="computers"
                      label="Computadores"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Input
                      onChange={formik.handleChange}
                      value={formik.values.employeeTransportation}
                      error={formik.touched.cnpj && Boolean(formik.errors.cnpj)}
                      helperText={formik.touched.cnpj && formik.errors.cnpj}
                      required
                      id="employeeTransportation"
                      label="Transporte de Colaboradores"
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid mb={2} item xs={6}>
                    <Input
                      onChange={formik.handleChange}
                      value={formik.values.mainActivity}
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      helperText={formik.touched.name && formik.errors.name}
                      required
                      id="mainActivity"
                      label="Atividade Principal"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Input
                      onChange={formik.handleChange}
                      value={formik.values.suppliers}
                      error={formik.touched.cnpj && Boolean(formik.errors.cnpj)}
                      helperText={formik.touched.cnpj && formik.errors.cnpj}
                      required
                      id="suppliers"
                      label="Fornecedores"
                    />
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid mb={2} item xs={12}>
                    <Input
                      onChange={formik.handleChange}
                      value={formik.values.wasteGeneration}
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      helperText={formik.touched.name && formik.errors.name}
                      required
                      id="wasteGeneration"
                      label="Quantidade de lixo gerado"
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
        <Button onClick={() => handleClose && handleClose(false)}>Cancelar</Button>
        <Button variant="contained" type="submit" form="form-new-corporation">
          Gravar empresa
        </Button>
      </CardActions>
    </>
  );
}
