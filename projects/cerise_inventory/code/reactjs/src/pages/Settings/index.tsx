import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  Stack,
  Typography,
} from '@mui/material';

import { useNavigate } from 'react-router-dom';

import * as S from './styles';

export function Settings() {
  const navigate = useNavigate();

  function handleChangeProfile() {
    navigate('/profile');
  }

  return (
    <S.Container>
      <S.Content>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8,
          }}
        >
          <Container maxWidth="lg">
            <h2>Configurações</h2>
            <Stack spacing={3}>
              {/* <Typography variant="h4">Configurações</Typography> */}
              {/* comeco aqui */}

              <form>
                <Card>
                  <CardHeader
                    subheader="Gerenciar notificações"
                    title="Notificações"
                  />
                  <Divider />
                  <CardContent>
                    <Grid container wrap="wrap">
                      <Grid item xs={12} sm={6} md={4}>
                        <Stack spacing={1}>
                          <Typography variant="h6">Notificações</Typography>
                          <Stack>
                            <FormControlLabel
                              control={<Checkbox defaultChecked />}
                              label="Email"
                            />
                            <FormControlLabel
                              control={<Checkbox defaultChecked />}
                              label="Notificações Push "
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Mensagens de texto"
                            />
                            <FormControlLabel
                              control={<Checkbox defaultChecked />}
                              label="Chamadas telefônicas"
                            />
                          </Stack>
                        </Stack>
                      </Grid>
                      <Grid item md={4} sm={6} xs={12}>
                        <Stack spacing={1}>
                          <Typography variant="h6">Mensagens</Typography>
                          <Stack>
                            <FormControlLabel
                              control={<Checkbox defaultChecked />}
                              label="Email"
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Notificações Push"
                            />
                            <FormControlLabel
                              control={<Checkbox defaultChecked />}
                              label="Chamadas telefônicas"
                            />
                          </Stack>
                        </Stack>
                      </Grid>
                    </Grid>
                  </CardContent>
                  <Divider />
                  <CardActions sx={{ justifyContent: 'flex-end' }}>
                    <Button variant="contained">Salvar</Button>
                  </CardActions>
                </Card>
              </form>

              <form>
                <Card>
                  <CardHeader subheader="Atualizar perfil" title="Usuário" />
                  <Divider />
                  <CardActions sx={{ justifyContent: 'flex-end' }}>
                    <Button variant="contained" onClick={handleChangeProfile}>
                      Ir para perfil
                    </Button>
                  </CardActions>
                </Card>
              </form>

              {/* final aqui */}
            </Stack>
          </Container>
        </Box>
      </S.Content>
    </S.Container>
  );
}
