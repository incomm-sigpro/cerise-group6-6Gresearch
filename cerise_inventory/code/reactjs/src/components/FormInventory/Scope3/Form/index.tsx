import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory';

import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
// import ReactInputMask from 'react-input-mask';
import * as S from './styles';
import { dictn } from '../airports';

import { api } from '@/services/api';

export function FormScope3() {
  const [inventory, setInventory] = useState<any>({});
  const [inventoryItems, setInventoryItems] = useState<any>([]);
  const [categories, setCategories] = useState<any>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [sources, setSources] = useState<any>([]);
  const [selectedSource, setSelectedSource] = useState<any>('');
  const measurementUnit = 'km';
  const [selectedUF, setSelectedUF] = useState<string>('');
  const [selectedOrigin, setSelectedOrigin] = useState<string>('');
  const [selectedDestination, setSelectedDestination] = useState<string>('');

  const navigate = useNavigate();

  const validationSchema = yup.object({
    categoryId: yup.string().required('É necessário selecionar uma categoria'),
    sourceId: yup.string().required('É necessário selecionar uma fonte'),
    uf: yup.string().required('É necessário selecionar uma UF'),
    description: yup
      .string()
      .max(191, 'A descrição deve conter no máximo 2048 caracteres'),
    origin: yup.string().required('É necessário selecionar uma origem'),
    destination: yup.string().required('É necessário selecionar um destino'),
    quantity: yup
      .string()
      .required('É necessário inserir um valor')
      .matches(/^[0-9,.]*$/, 'A quantidade deve conter apenas números'),
    passenger: yup
      .number()
      .integer('O valor deve ser um número inteiro')
      .required('É necessário inserir um valor'),
    segment: yup
      .number()
      .integer('O valor deve ser um número inteiro')
      .required('É necessário inserir um valor'),
  });

  const formik = useFormik({
    initialValues: {
      categoryId: '',
      sourceId: '',
      uf: '',
      description: '',
      origin: '',
      destination: '',
      quantity: '',
      passenger: '',
      segment: '',
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      try {
        api
          .post('/inventory_items', {
            scope: 'SCOPE_03',
            categoryId: values.categoryId,
            sourceId: values.sourceId,
            uf: values.uf,
            description: JSON.stringify({
              text: values.description,
              origin: values.origin,
              destination: values.destination,
            }),
            quantity: Number(values.quantity.replace(/\D/g, '.')),
            passenger: Number(values.passenger),
            segment: Number(values.segment),
            inventoryId: inventory.id,
          })
          .then(response => {
            localStorage.setItem(
              '@cerise-backend:inventoryItems',
              JSON.stringify([...inventoryItems, response.data])
            );

            alert('Item de inventário criado com sucesso!');

            window.location.reload();
            navigate('/inventories');
          })
          .catch(error => {
            alert('Não foi possível criar o item de inventário.');
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    },
  });

  function handleCategorySelection(selectedCategory: any) {
    setSelectedCategory(selectedCategory.value);
    formik.values.categoryId = selectedCategory.value;
  }

  function handleSourceSelection(selectedSource: any) {
    const sourceData = sources.find(
      (source: any) => source.id === selectedSource.value
    );
    setSelectedSource(sourceData);
    formik.values.sourceId = selectedSource.value;
  }

  function handleUFSelection(selectedUF: any) {
    setSelectedUF(selectedUF.value);
    formik.values.uf = selectedUF.value;
  }

  function handleOriginSelection(selectedOrigin: any) {
    setSelectedOrigin(selectedOrigin.value);
    formik.values.origin = selectedOrigin.value;
  }

  function handleDestinationSelection(selectedDestination: any) {
    setSelectedDestination(selectedDestination.value);
    formik.values.destination = selectedDestination.value;
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

  useEffect(() => {
    formik.values.categoryId = selectedCategory;
  }, [selectedCategory]);

  useEffect(() => {
    formik.values.sourceId = selectedSource.id ? selectedSource.id : '';
  }, [selectedSource]);

  useEffect(() => {
    formik.values.uf = selectedUF;
  }, [selectedUF]);

  useEffect(() => {
    formik.values.origin = selectedOrigin;
  }, [selectedOrigin]);

  useEffect(() => {
    formik.values.destination = selectedDestination;
  }, [selectedDestination]);

  return (
    <>
      <CardContent>
        <S.Container>
          <Card>
            <S.ContainerHeader>
              <CardHeader subheader="Escopo 3" title="Item de inventário" />
              <S.ActionsContainer>
                <InventoryIcon />
              </S.ActionsContainer>
            </S.ContainerHeader>
            <Divider />
            <CardContent>
              <form id="form-scope-3" onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <InputLabel id="category-label">Categoria *</InputLabel>
                      <Select
                        onChange={(event: any) =>
                          handleCategorySelection(event.target)
                        }
                        value={formik.values.categoryId || ''}
                        required
                        labelId="category-label"
                        id="category"
                        name="category"
                        label="Categoria"
                      >
                        <MenuItem value=" ">
                          <em>Selecione uma categoria</em>
                        </MenuItem>
                        {categories &&
                          categories
                            .filter(
                              (category: any) => category.scope === 'SCOPE_03'
                            )
                            .sort((a: any, b: any) =>
                              a.name.localeCompare(b.name)
                            )
                            .map((category: any, index: number) => (
                              <MenuItem key={index} value={category.id}>
                                {category.name}
                              </MenuItem>
                            ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={5}>
                    <FormControl fullWidth>
                      <InputLabel id="source-label">Fonte *</InputLabel>
                      <Select
                        onChange={(event: any) =>
                          handleSourceSelection(event.target)
                        }
                        value={formik.values.sourceId || ''}
                        required
                        labelId="source-label"
                        id="source"
                        title="Classificação estrita das fontes de emissão de gases de efeito estufa."
                        name="source"
                        label="Fonte"
                      >
                        <MenuItem value="">
                          <em>Selecione uma fonte</em>
                        </MenuItem>
                        {sources &&
                          sources
                            .filter(
                              (source: any) => source.scope === 'SCOPE_03'
                            )
                            .filter(
                              (source: any) =>
                                source.categoryId === selectedCategory
                            )
                            .sort((a: any, b: any) =>
                              a.name.localeCompare(b.name)
                            )
                            .map((source: any, index: number) => (
                              <MenuItem key={index} value={source.id}>
                                {source.name}
                              </MenuItem>
                            ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={1}>
                    <FormControl fullWidth>
                      <InputLabel id="uf-label">UF *</InputLabel>
                      <Select
                        onChange={(event: any) =>
                          handleUFSelection(event.target)
                        }
                        value={formik.values.uf || ''}
                        required
                        labelId="uf-label"
                        id="uf"
                        name="uf"
                        label="UF"
                      >
                        <MenuItem value="">
                          <em>Selecione uma UF</em>
                        </MenuItem>
                        <MenuItem key={0} value={'AC'}>
                          AC
                        </MenuItem>
                        <MenuItem key={1} value={'AL'}>
                          AL
                        </MenuItem>
                        <MenuItem key={2} value={'AP'}>
                          AP
                        </MenuItem>
                        <MenuItem key={3} value={'AM'}>
                          AM
                        </MenuItem>
                        <MenuItem key={4} value={'BA'}>
                          BA
                        </MenuItem>
                        <MenuItem key={5} value={'CE'}>
                          CE
                        </MenuItem>
                        <MenuItem key={6} value={'DF'}>
                          DF
                        </MenuItem>
                        <MenuItem key={7} value={'ES'}>
                          ES
                        </MenuItem>
                        <MenuItem key={8} value={'GO'}>
                          GO
                        </MenuItem>
                        <MenuItem key={9} value={'MA'}>
                          MA
                        </MenuItem>
                        <MenuItem key={10} value={'MT'}>
                          MT
                        </MenuItem>
                        <MenuItem key={11} value={'MS'}>
                          MS
                        </MenuItem>
                        <MenuItem key={12} value={'MG'}>
                          MG
                        </MenuItem>
                        <MenuItem key={13} value={'PA'}>
                          PA
                        </MenuItem>
                        <MenuItem key={14} value={'PB'}>
                          PB
                        </MenuItem>
                        <MenuItem key={15} value={'PR'}>
                          PR
                        </MenuItem>
                        <MenuItem key={16} value={'PE'}>
                          PE
                        </MenuItem>
                        <MenuItem key={17} value={'PI'}>
                          PI
                        </MenuItem>
                        <MenuItem key={18} value={'RJ'}>
                          RJ
                        </MenuItem>
                        <MenuItem key={19} value={'RN'}>
                          RN
                        </MenuItem>
                        <MenuItem key={20} value={'RS'}>
                          RS
                        </MenuItem>
                        <MenuItem key={21} value={'RO'}>
                          RO
                        </MenuItem>
                        <MenuItem key={22} value={'RR'}>
                          RR
                        </MenuItem>
                        <MenuItem key={23} value={'SC'}>
                          SC
                        </MenuItem>
                        <MenuItem key={24} value={'SP'}>
                          SP
                        </MenuItem>
                        <MenuItem key={25} value={'SE'}>
                          SE
                        </MenuItem>
                        <MenuItem key={26} value={'TO'}>
                          TO
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      onChange={formik.handleChange}
                      value={formik.values.description}
                      fullWidth
                      error={
                        formik.touched.description &&
                        Boolean(formik.errors.description)
                      }
                      helperText={
                        formik.touched.description && formik.errors.description
                      }
                      id="description"
                      placeholder="Seu texto aqui ..."
                      title="Descreva a utilização da fonte de emissão de gases de efeito estufa"
                      label="Descrição"
                      variant="outlined"
                    />
                  </Grid>
                  {selectedSource.name === 'Viagens em Aeronaves' ? (
                    <>
                      <Grid item xs={3}>
                        <FormControl fullWidth>
                          <InputLabel id="origin-label">Origem *</InputLabel>
                          <Select
                            onChange={event =>
                              handleOriginSelection(event.target)
                            }
                            value={formik.values.origin || ''}
                            required
                            labelId="origin-label"
                            id="origin"
                            name="origin"
                            label="Origem *"
                          >
                            <MenuItem value="">
                              <em>Selecione uma origem</em>
                            </MenuItem>
                            {dictn &&
                              Object.keys(dictn).map(
                                (airport: any, index: number) => (
                                  <MenuItem key={index} value={airport}>
                                    {airport}
                                  </MenuItem>
                                )
                              )}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={3}>
                        <FormControl fullWidth>
                          <InputLabel id="category-label">Destino *</InputLabel>
                          <Select
                            onChange={event =>
                              handleDestinationSelection(event.target)
                            }
                            value={formik.values.destination || ''}
                            required
                            labelId="destination-label"
                            id="destination"
                            name="destination"
                            label="Destino *"
                          >
                            <MenuItem value="">
                              <em>Selecione uma destino</em>
                            </MenuItem>
                            {dictn &&
                              Object.keys(dictn).map(
                                (airport: any, index: number) => (
                                  <MenuItem key={index} value={airport}>
                                    {airport}
                                  </MenuItem>
                                )
                              )}
                          </Select>
                        </FormControl>
                      </Grid>
                    </>
                  ) : (
                    <>
                      <Grid item xs={3}>
                        {/* <ReactInputMask
                          onChange={formik.handleChange}
                          value={formik.values.origin}
                          fullWidth
                          error={
                            formik.touched.origin &&
                            Boolean(formik.errors.origin)
                          }
                          helperText={
                            formik.touched.origin && formik.errors.origin
                          }
                          required
                          id="origin"
                          label="Origem"
                          placeholder="CEP de origem"
                          mask="99999-999"
                          maskChar="_"
                        >
                          {(inputProps: any) => <TextField {...inputProps} />}
                        </ReactInputMask> */}
                      </Grid>
                      <Grid item xs={3}>
                        {/* <ReactInputMask
                          onChange={formik.handleChange}
                          value={formik.values.destination}
                          fullWidth
                          error={
                            formik.touched.destination &&
                            Boolean(formik.errors.destination)
                          }
                          helperText={
                            formik.touched.destination &&
                            formik.errors.destination
                          }
                          required
                          id="destination"
                          label="Destino"
                          placeholder="CEP de destino"
                          mask="99999-999"
                          maskChar="_"
                        >
                          {(inputProps: any) => <TextField {...inputProps} />}
                        </ReactInputMask> */}
                      </Grid>
                    </>
                  )}
                  <Grid
                    item
                    xs={6}
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: '1rem',
                    }}
                  >
                    <Grid item xs={6}>
                      <TextField
                        onChange={formik.handleChange}
                        value={formik.values.passenger}
                        fullWidth
                        error={
                          formik.touched.passenger &&
                          Boolean(formik.errors.passenger)
                        }
                        helperText={
                          formik.touched.passenger && formik.errors.passenger
                        }
                        required
                        id="passenger"
                        label="N. de passageiros"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        onChange={formik.handleChange}
                        value={formik.values.segment}
                        fullWidth
                        error={
                          formik.touched.segment &&
                          Boolean(formik.errors.segment)
                        }
                        helperText={
                          formik.touched.segment && formik.errors.segment
                        }
                        required
                        id="segment"
                        label="N. de trechos"
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: '1rem',
                    }}
                  >
                    <Grid item xs={6}>
                      <TextField
                        onChange={formik.handleChange}
                        value={formik.values.quantity}
                        fullWidth
                        error={
                          formik.touched.quantity &&
                          Boolean(formik.errors.quantity)
                        }
                        helperText={
                          formik.touched.quantity && formik.errors.quantity
                        }
                        required
                        id="quantity"
                        label="Quantidade"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        value={measurementUnit}
                        fullWidth
                        id="unit"
                        label="Unidade"
                        variant="outlined"
                        disabled={true}
                      />
                    </Grid>
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
        <Button variant="contained" type="submit" form="form-scope-3">
          Gravar
        </Button>
      </CardActions>
    </>
  );
}
