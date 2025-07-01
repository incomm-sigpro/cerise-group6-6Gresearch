import { Box, Card, Container } from '@mui/material';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';

import * as S from './styles';

export function Calendar() {
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
          <Container maxWidth="xl">
            <h2>Calendário</h2>
            <Card sx={{ p: 2 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DateCalendar', 'DateCalendar']}>
                  <DemoItem label="Calendário de eventos">
                    <DateCalendar defaultValue={dayjs('2022-04-17')} />
                  </DemoItem>
                </DemoContainer>
              </LocalizationProvider>
            </Card>
          </Container>
        </Box>
      </S.Content>
    </S.Container>
  );
}
