import * as S from './styles';

import { Box, Container } from '@mui/material';

import { Card } from '@/components/Card';
import { Chart } from '@/components/Chart';
import { ApexOptions } from 'apexcharts';

type ChartProps = Array<{
  chart: {
    id: string;
    type:
      | 'line'
      | 'area'
      | 'bar'
      | 'pie'
      | 'donut'
      | 'radialBar'
      | 'scatter'
      | 'bubble'
      | 'heatmap'
      | 'candlestick'
      | 'boxPlot'
      | 'radar'
      | 'polarArea'
      | 'rangeBar'
      | 'rangeArea'
      | 'treemap';
  };
  colors: string[];
  xaxis: {
    categories: string[];
  };
  series: ApexOptions['series'];
}>;

export function Home() {
  const cards = [
    {
      type: 'budget',
      title: 'ORÇAMENTO',
      value: 24000,
      lastMonth: 21120,
    },
    {
      type: 'customers',
      title: 'TOTAL DE CLIENTES',
      value: 1600,
      lastMonth: 1856,
    },
    {
      type: 'task',
      title: 'PROGRESSO DE TAREFAS',
      value: 75.5,
    },
    {
      type: 'profit',
      title: 'LUCRO TOTAL',
      value: 15000,
    },
  ];

  const charts: ChartProps = [
    {
      chart: {
        id: 'Usuários Cadastrados nesta semana',
        type: 'bar',
      },
      colors: ['#6BBF17', '#4E8C0F', '#BBDDF2', '#5E6B76', '#A2B3C4'],
      xaxis: {
        categories: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'],
      },
      series: [
        {
          name: 'Usuários Cadastrados neste dia',
          data: [0, 5, 24, 35, 51],
        },
      ],
    },
    {
      chart: {
        id: 'Locais de acesso',
        type: 'bar',
      },
      colors: ['#6BBF17', '#4E8C0F', '#BBDDF2', '#5E6B76', '#A2B3C4'],
      xaxis: {
        categories: ['Celular', 'Computador', 'Tablet'],
      },
      series: [
        {
          name: 'Local de acesso',
          data: [100, 250, 5],
        },
      ],
    },
    {
      chart: {
        id: 'Locais de acesso',
        type: 'line',
      },
      colors: ['#6BBF17', '#4E8C0F', '#BBDDF2', '#5E6B76', '#A2B3C4'],
      xaxis: {
        categories: ['Celular', 'Computador', 'Tablet'],
      },
      series: [
        {
          name: 'Local de acesso',
          data: [100, 250, 5],
        },
      ],
    },
    {
      chart: {
        id: 'Locais de acesso-donut',
        type: 'line',
      },
      colors: ['#6BBF17', '#4E8C0F', '#BBDDF2', '#5E6B76', '#A2B3C4'],
      xaxis: {
        categories: ['Celular', 'Computador', 'Tablet'],
      },
      series: [
        {
          name: 'Local de acesso',
          data: [100, 250, 5],
        },
      ],
    },
  ];

  return (
    <S.Container container>
      <S.Content container item>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8,
          }}
        >
          <Container maxWidth="xl">
            <h2>Dashboard</h2>
            <S.CardsContainer container>
              {cards.map(card => (
                <Card
                  key={card.title}
                  type={card.type}
                  title={card.title}
                  value={card.value}
                  lastMonth={card.lastMonth}
                />
              ))}
            </S.CardsContainer>
            <S.ChartsContainer item xs={12}>
              {charts.map((chart, index) => {
                return (
                  <Chart
                    key={index}
                    options={chart}
                    series={chart.series}
                    type={chart.chart.type || 'bar'}
                    width={500}
                    height={320}
                  />
                );
              })}
            </S.ChartsContainer>
            {/* <h1>Alou</h1> */}
            {/* <S.Footer>Feito por Cerise</S.Footer> */}
          </Container>
        </Box>
      </S.Content>
    </S.Container>
  );
}
