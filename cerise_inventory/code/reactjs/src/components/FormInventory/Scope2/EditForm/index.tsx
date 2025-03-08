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
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
} from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory';

import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import * as S from './styles';

import { api } from '@/services/api';

export function EditFormScope2() {
  const [inventoryItems, setInventoryItems] = useState<any>([]);
  const [inventoryItemId, setInventoryItemId] = useState<string>('');
  const [categories, setCategories] = useState<any>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [sources, setSources] = useState<any>([]);
  const measurementUnit: string = 'MWh';

  const validationSchema = yup.object({
    categoryId: yup.string(),
    sourceId: yup.string(),
    uf: yup.string(),
    description: yup
      .string()
      .max(191, 'A descrição deve conter no máximo 2048 caracteres'),
    quantityJan: yup
      .string()
      .matches(/^[0-9,.]*$/, 'A quantidade deve conter apenas números'),
    quantityFeb: yup
      .string()
      .matches(/^[0-9,.]*$/, 'A quantidade deve conter apenas números'),
    quantityMar: yup
      .string()
      .matches(/^[0-9,.]*$/, 'A quantidade deve conter apenas números'),
    quantityApr: yup
      .string()
      .matches(/^[0-9,.]*$/, 'A quantidade deve conter apenas números'),
    quantityMay: yup
      .string()
      .matches(/^[0-9,.]*$/, 'A quantidade deve conter apenas números'),
    quantityJun: yup
      .string()
      .matches(/^[0-9,.]*$/, 'A quantidade deve conter apenas números'),
    quantityJul: yup
      .string()
      .matches(/^[0-9,.]*$/, 'A quantidade deve conter apenas números'),
    quantityAug: yup
      .string()
      .matches(/^[0-9,.]*$/, 'A quantidade deve conter apenas números'),
    quantitySep: yup
      .string()
      .matches(/^[0-9,.]*$/, 'A quantidade deve conter apenas números'),
    quantityOct: yup
      .string()
      .matches(/^[0-9,.]*$/, 'A quantidade deve conter apenas números'),
    quantityNov: yup
      .string()
      .matches(/^[0-9,.]*$/, 'A quantidade deve conter apenas números'),
    quantityDec: yup
      .string()
      .matches(/^[0-9,.]*$/, 'A quantidade deve conter apenas números'),
  });

  const formik = useFormik({
    initialValues: {
      categoryId: '',
      sourceId: '',
      uf: '',
      description: '',
      quantityJan: '',
      quantityFeb: '',
      quantityMar: '',
      quantityApr: '',
      quantityMay: '',
      quantityJun: '',
      quantityJul: '',
      quantityAug: '',
      quantitySep: '',
      quantityOct: '',
      quantityNov: '',
      quantityDec: '',
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
            quantityJan: Number(values.quantityJan.replace(/\D/g, '.')),
            quantityFeb: Number(values.quantityFeb.replace(/\D/g, '.')),
            quantityMar: Number(values.quantityMar.replace(/\D/g, '.')),
            quantityApr: Number(values.quantityApr.replace(/\D/g, '.')),
            quantityMay: Number(values.quantityMay.replace(/\D/g, '.')),
            quantityJun: Number(values.quantityJun.replace(/\D/g, '.')),
            quantityJul: Number(values.quantityJul.replace(/\D/g, '.')),
            quantityAug: Number(values.quantityAug.replace(/\D/g, '.')),
            quantitySep: Number(values.quantitySep.replace(/\D/g, '.')),
            quantityOct: Number(values.quantityOct.replace(/\D/g, '.')),
            quantityNov: Number(values.quantityNov.replace(/\D/g, '.')),
            quantityDec: Number(values.quantityDec.replace(/\D/g, '.')),
          })
          .then(() => {
            inventoryItems.filter((item: any) => {
              if (item.id === inventoryItemId) {
                item.categoryId = values.categoryId;
                item.sourceId = values.sourceId;
                item.uf = values.uf;
                item.description = values.description;
                item.quantityJan = values.quantityJan.replace(/\D/g, '.');
                item.quantityFeb = values.quantityFeb.replace(/\D/g, '.');
                item.quantityMar = values.quantityMar.replace(/\D/g, '.');
                item.quantityApr = values.quantityApr.replace(/\D/g, '.');
                item.quantityMay = values.quantityMay.replace(/\D/g, '.');
                item.quantityJun = values.quantityJun.replace(/\D/g, '.');
                item.quantityJul = values.quantityJul.replace(/\D/g, '.');
                item.quantityAug = values.quantityAug.replace(/\D/g, '.');
                item.quantitySep = values.quantitySep.replace(/\D/g, '.');
                item.quantityOct = values.quantityOct.replace(/\D/g, '.');
                item.quantityNov = values.quantityNov.replace(/\D/g, '.');
                item.quantityDec = values.quantityDec.replace(/\D/g, '.');
              }
            });

            localStorage.setItem(
              '@cerise-backend:inventoryItems',
              JSON.stringify(inventoryItems)
            );

            alert('Item de inventário atualizado com sucesso!');

            window.location.reload();
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
    formik.values.quantityJan = inventoryItem.quantityJan.replace(/\./g, ',');
    formik.values.quantityFeb = inventoryItem.quantityFeb.replace(/\./g, ',');
    formik.values.quantityMar = inventoryItem.quantityMar.replace(/\./g, ',');
    formik.values.quantityApr = inventoryItem.quantityApr.replace(/\./g, ',');
    formik.values.quantityMay = inventoryItem.quantityMay.replace(/\./g, ',');
    formik.values.quantityJun = inventoryItem.quantityJun.replace(/\./g, ',');
    formik.values.quantityJul = inventoryItem.quantityJul.replace(/\./g, ',');
    formik.values.quantityAug = inventoryItem.quantityAug.replace(/\./g, ',');
    formik.values.quantitySep = inventoryItem.quantitySep.replace(/\./g, ',');
    formik.values.quantityOct = inventoryItem.quantityOct.replace(/\./g, ',');
    formik.values.quantityNov = inventoryItem.quantityNov.replace(/\./g, ',');
    formik.values.quantityDec = inventoryItem.quantityDec.replace(/\./g, ',');
  }, []);

  return (
    <>
      <CardContent>
        <S.Container>
          <Card>
            <S.ContainerHeader>
              <CardHeader
                subheader="Escopo 2"
                title="Atualiza item de inventário"
              />
              <S.ActionsContainer>
                <InventoryIcon />
              </S.ActionsContainer>
            </S.ContainerHeader>
            <Divider />
            <CardContent>
              <form id="form-scope-2" onSubmit={formik.handleSubmit}>
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
                              (category: any) => category.scope === 'SCOPE_02'
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
                          (formik.values.sourceId = event.target.value)
                        }
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
                              (source: any) => source.scope === 'SCOPE_02'
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
                      title="Descreva a utilização da fonte de emissão de gases de efeito estufa"
                      label="Descrição"
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
                  <Grid
                    item
                    xs={6}
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: '1rem',
                    }}
                  ></Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginTop: '1rem' }}>
                  <Grid item xs={4}>
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 200 }} aria-label="simple table">
                        <TableBody>
                          {/* January */}
                          <TableRow
                            key={0}
                            sx={{
                              '&:last-child td, &:last-child th': { border: 0 },
                            }}
                          >
                            <TableCell component="th">Janeiro</TableCell>
                            <TableCell align="right">
                              <TextField
                                onChange={formik.handleChange}
                                value={formik.values.quantityJan}
                                fullWidth
                                error={
                                  formik.touched.quantityJan &&
                                  Boolean(formik.errors.quantityJan)
                                }
                                helperText={
                                  formik.touched.quantityJan &&
                                  formik.errors.quantityJan
                                }
                                required
                                id="quantityJan"
                                label="Quantidade"
                                variant="outlined"
                              />
                            </TableCell>
                          </TableRow>
                          {/* February */}
                          <TableRow
                            key={1}
                            sx={{
                              '&:last-child td, &:last-child th': { border: 0 },
                            }}
                          >
                            <TableCell component="th">Fevereiro</TableCell>
                            <TableCell align="right">
                              <TextField
                                onChange={formik.handleChange}
                                value={formik.values.quantityFeb}
                                fullWidth
                                error={
                                  formik.touched.quantityFeb &&
                                  Boolean(formik.errors.quantityFeb)
                                }
                                helperText={
                                  formik.touched.quantityFeb &&
                                  formik.errors.quantityFeb
                                }
                                required
                                id="quantityFeb"
                                label="Quantidade"
                                variant="outlined"
                              />
                            </TableCell>
                          </TableRow>
                          {/* March */}
                          <TableRow
                            key={2}
                            sx={{
                              '&:last-child td, &:last-child th': { border: 0 },
                            }}
                          >
                            <TableCell component="th">Março</TableCell>
                            <TableCell align="right">
                              <TextField
                                onChange={formik.handleChange}
                                value={formik.values.quantityMar}
                                fullWidth
                                error={
                                  formik.touched.quantityMar &&
                                  Boolean(formik.errors.quantityMar)
                                }
                                helperText={
                                  formik.touched.quantityMar &&
                                  formik.errors.quantityMar
                                }
                                required
                                id="quantityMar"
                                label="Quantidade"
                                variant="outlined"
                              />
                            </TableCell>
                          </TableRow>
                          {/* April */}
                          <TableRow
                            key={3}
                            sx={{
                              '&:last-child td, &:last-child th': { border: 0 },
                            }}
                          >
                            <TableCell component="th">Abril</TableCell>
                            <TableCell align="right">
                              <TextField
                                onChange={formik.handleChange}
                                value={formik.values.quantityApr}
                                fullWidth
                                error={
                                  formik.touched.quantityApr &&
                                  Boolean(formik.errors.quantityApr)
                                }
                                helperText={
                                  formik.touched.quantityApr &&
                                  formik.errors.quantityApr
                                }
                                required
                                id="quantityApr"
                                label="Quantidade"
                                variant="outlined"
                              />
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>

                  <Grid item xs={4}>
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 200 }} aria-label="simple table">
                        <TableBody>
                          {/* May */}
                          <TableRow
                            key={4}
                            sx={{
                              '&:last-child td, &:last-child th': { border: 0 },
                            }}
                          >
                            <TableCell component="th">Maio</TableCell>
                            <TableCell align="right">
                              <TextField
                                onChange={formik.handleChange}
                                value={formik.values.quantityMay}
                                fullWidth
                                error={
                                  formik.touched.quantityMay &&
                                  Boolean(formik.errors.quantityMay)
                                }
                                helperText={
                                  formik.touched.quantityMay &&
                                  formik.errors.quantityMay
                                }
                                required
                                id="quantityMay"
                                label="Quantidade"
                                variant="outlined"
                              />
                            </TableCell>
                          </TableRow>
                          {/* June */}
                          <TableRow
                            key={5}
                            sx={{
                              '&:last-child td, &:last-child th': { border: 0 },
                            }}
                          >
                            <TableCell component="th">Junho</TableCell>
                            <TableCell align="right">
                              <TextField
                                onChange={formik.handleChange}
                                value={formik.values.quantityJun}
                                fullWidth
                                error={
                                  formik.touched.quantityJun &&
                                  Boolean(formik.errors.quantityJun)
                                }
                                helperText={
                                  formik.touched.quantityJun &&
                                  formik.errors.quantityJun
                                }
                                required
                                id="quantityJun"
                                label="Quantidade"
                                variant="outlined"
                              />
                            </TableCell>
                          </TableRow>
                          {/* July */}
                          <TableRow
                            key={6}
                            sx={{
                              '&:last-child td, &:last-child th': { border: 0 },
                            }}
                          >
                            <TableCell component="th">Julho</TableCell>
                            <TableCell align="right">
                              <TextField
                                onChange={formik.handleChange}
                                value={formik.values.quantityJul}
                                fullWidth
                                error={
                                  formik.touched.quantityJul &&
                                  Boolean(formik.errors.quantityJul)
                                }
                                helperText={
                                  formik.touched.quantityJul &&
                                  formik.errors.quantityJul
                                }
                                required
                                id="quantityJul"
                                label="Quantidade"
                                variant="outlined"
                              />
                            </TableCell>
                          </TableRow>
                          {/* August */}
                          <TableRow
                            key={7}
                            sx={{
                              '&:last-child td, &:last-child th': { border: 0 },
                            }}
                          >
                            <TableCell component="th">Agosto</TableCell>
                            <TableCell align="right">
                              <TextField
                                onChange={formik.handleChange}
                                value={formik.values.quantityAug}
                                fullWidth
                                error={
                                  formik.touched.quantityAug &&
                                  Boolean(formik.errors.quantityAug)
                                }
                                helperText={
                                  formik.touched.quantityAug &&
                                  formik.errors.quantityAug
                                }
                                required
                                id="quantityAug"
                                label="Quantidade"
                                variant="outlined"
                              />
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                  <Grid item xs={4}>
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 200 }} aria-label="simple table">
                        <TableBody>
                          {/* September */}
                          <TableRow
                            key={8}
                            sx={{
                              '&:last-child td, &:last-child th': { border: 0 },
                            }}
                          >
                            <TableCell component="th">Setembro</TableCell>
                            <TableCell align="right">
                              <TextField
                                onChange={formik.handleChange}
                                value={formik.values.quantitySep}
                                fullWidth
                                error={
                                  formik.touched.quantitySep &&
                                  Boolean(formik.errors.quantitySep)
                                }
                                helperText={
                                  formik.touched.quantitySep &&
                                  formik.errors.quantitySep
                                }
                                required
                                id="quantitySep"
                                label="Quantidade"
                                variant="outlined"
                              />
                            </TableCell>
                          </TableRow>
                          {/* October */}
                          <TableRow
                            key={9}
                            sx={{
                              '&:last-child td, &:last-child th': { border: 0 },
                            }}
                          >
                            <TableCell component="th">Outubro</TableCell>
                            <TableCell align="right">
                              <TextField
                                onChange={formik.handleChange}
                                value={formik.values.quantityOct}
                                fullWidth
                                error={
                                  formik.touched.quantityOct &&
                                  Boolean(formik.errors.quantityOct)
                                }
                                helperText={
                                  formik.touched.quantityOct &&
                                  formik.errors.quantityOct
                                }
                                required
                                id="quantityOct"
                                label="Quantidade"
                                variant="outlined"
                              />
                            </TableCell>
                          </TableRow>
                          {/* November */}
                          <TableRow
                            key={10}
                            sx={{
                              '&:last-child td, &:last-child th': { border: 0 },
                            }}
                          >
                            <TableCell component="th">Novembro</TableCell>
                            <TableCell align="right">
                              <TextField
                                onChange={formik.handleChange}
                                value={formik.values.quantityNov}
                                fullWidth
                                error={
                                  formik.touched.quantityNov &&
                                  Boolean(formik.errors.quantityNov)
                                }
                                helperText={
                                  formik.touched.quantityNov &&
                                  formik.errors.quantityNov
                                }
                                required
                                id="quantityNov"
                                label="Quantidade"
                                variant="outlined"
                              />
                            </TableCell>
                          </TableRow>
                          {/* December */}
                          <TableRow
                            key={11}
                            sx={{
                              '&:last-child td, &:last-child th': { border: 0 },
                            }}
                          >
                            <TableCell component="th">Dezembro</TableCell>
                            <TableCell align="right">
                              <TextField
                                onChange={formik.handleChange}
                                value={formik.values.quantityDec}
                                fullWidth
                                error={
                                  formik.touched.quantityDec &&
                                  Boolean(formik.errors.quantityDec)
                                }
                                helperText={
                                  formik.touched.quantityDec &&
                                  formik.errors.quantityDec
                                }
                                required
                                id="quantityDec"
                                label="Quantidade"
                                variant="outlined"
                              />
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
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
        <Button variant="contained" type="submit" form="form-scope-2">
          Gravar
        </Button>
      </CardActions>
    </>
  );
}
