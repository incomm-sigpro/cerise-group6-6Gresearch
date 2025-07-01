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
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import * as S from './styles';

import { api } from '@/services/api';

export function EditFormScope1() {
  const [inventoryItems, setInventoryItems] = useState<any>([]);
  const [inventoryItemId, setInventoryItemId] = useState<string>('');
  const [categories, setCategories] = useState<any>([]);
  const [selectedCategory, setSelectedCategory] = useState<any>([]);
  const [sources, setSources] = useState<any>([]);
  const [measurementUnit, setMeasurementUnit] = useState<string>('');

  const navigate = useNavigate();

  const validationSchema = yup.object({
    categoryId: yup.string(),
    sourceId: yup.string(),
    uf: yup.string(),
    description: yup
      .string()
      .max(191, 'A descrição deve conter no máximo 2048 caracteres'),
    quantity: yup
      .string()
      .matches(/^[0-9,.]*$/, 'A quantidade deve conter apenas números'),
  });

  const formik = useFormik({
    initialValues: {
      categoryId: '',
      sourceId: '',
      uf: '',
      description: '',
      quantity: '',
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      try {
        api
          .put(`/inventory_items/${inventoryItemId}`, {
            categoryId: values.categoryId,
            sourceId: values.sourceId,
            uf: values.uf,
            description: values.description,
            quantity: Number(values.quantity.replace(/\D/g, '.')),
          })
          .then(() => {
            inventoryItems.filter((item: any) => {
              if (item.id === inventoryItemId) {
                item.categoryId = values.categoryId;
                item.sourceId = values.sourceId;
                item.uf = values.uf;
                item.description = values.description;
                item.quantity = values.quantity.replace(/\D/g, '.');
              }
            });

            localStorage.setItem(
              '@cerise-backend:inventoryItems',
              JSON.stringify(inventoryItems)
            );

            alert('Item de inventário atualizado com sucesso!');

            window.location.reload();
            navigate('/inventories');
          })
          .catch(error => {
            alert('Não foi possível atualizar o item de inventário.');
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
    setMeasurementUnit(sourceData.measurementUnit);
    formik.values.sourceId = selectedSource.value;
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
    const inventoryItems = cacheInventoryItems
      ? JSON.parse(cacheInventoryItems)
      : api
          .get(`/inventory_items/${editingInventory}`)
          .then(response => {
            const items = response.data;
            localStorage.setItem(
              '@cerise-backend:inventoryItems',
              JSON.stringify(items)
            );
            return items;
          })
          .catch(error => {
            console.log(error);
          });
    setInventoryItems(inventoryItems);

    const inventoryItemId = JSON.parse(
      localStorage.getItem('@cerise-backend:editingInventoryItem')
        ? (localStorage.getItem(
            '@cerise-backend:editingInventoryItem'
          ) as string)
        : ''
    );
    setInventoryItemId(inventoryItemId);

    const inventoryItem = inventoryItems.find(
      (item: any) => item.id === inventoryItemId
    );
    setSelectedCategory(inventoryItem.categoryId);
    formik.values.categoryId = inventoryItem.categoryId;
    formik.values.sourceId = inventoryItem.sourceId;
    formik.values.uf = inventoryItem.uf;
    formik.values.description = inventoryItem.description;
    formik.values.quantity = inventoryItem.quantity.replace(/\./g, ',');
  }, []);

  return (
    <>
      <CardContent>
        <S.Container>
          <Card>
            <S.ContainerHeader>
              <CardHeader
                subheader="Escopo 1"
                title="Atualiza item de inventário"
              />
              <S.ActionsContainer>
                <InventoryIcon />
              </S.ActionsContainer>
            </S.ContainerHeader>
            <Divider />
            <CardContent>
              <form id="form-scope-1" onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <InputLabel id="category-label">Categoria *</InputLabel>
                      <Select
                        onChange={event =>
                          handleCategorySelection(event.target)
                        }
                        value={formik.values.categoryId}
                        labelId="category-label"
                        id="category"
                        title="Classificação abrangente das fontes de emissão de gases de efeito estufa."
                        name="category"
                        label="Categoria"
                      >
                        <MenuItem value="">
                          <em>Selecione uma categoria</em>
                        </MenuItem>
                        {categories &&
                          categories
                            .filter(
                              (category: any) => category.scope === 'SCOPE_01'
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
                        onChange={event => handleSourceSelection(event.target)}
                        value={formik.values.sourceId}
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
                              (source: any) => source.scope === 'SCOPE_01'
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
                        onChange={event =>
                          (formik.values.uf = event.target.value)
                        }
                        value={formik.values.uf}
                        labelId="uf-label"
                        id="uf"
                        title="Unidade da federação onde foi gerada a emissão."
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
                        id="quantity"
                        placeholder="000,00"
                        title="Utilize a vírgula (000,00) para separar os decimais"
                        label="Quantidade"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        value={measurementUnit}
                        fullWidth
                        id="unit"
                        title="Unidade de medida referente à fonte inserida. Carregada automaticamente"
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
        <Button variant="contained" type="submit" form="form-scope-1">
          Gravar
        </Button>
      </CardActions>
    </>
  );
}
