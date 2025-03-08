import * as S from './styles';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import GroupIcon from '@mui/icons-material/Group';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { ProgressBar } from '../ProgressBar';

type CardProps = {
  type: string;
  title: string;
  value: number;
  lastMonth?: number;
};

export function Card({ type, title, value, lastMonth }: CardProps) {
  function formatNumber(value: number): string {
    if (value >= 1000) {
      const suffixes: string[] = ['', 'k', 'M', 'B', 'T'];
      const suffixNum: number = Math.floor(('' + value).length / 3);
      let shortValue: number = parseFloat(
        (suffixNum !== 0
          ? value / Math.pow(1000, suffixNum)
          : value
        ).toPrecision(2)
      );
      if (shortValue % 1 !== 0) {
        shortValue = parseFloat(shortValue.toFixed(1));
      }
      return shortValue + suffixes[suffixNum];
    }
    return value.toString();
  }

  const iconMap: Record<CardProps['type'], JSX.Element> = {
    budget: <AttachMoneyIcon />,
    customers: <GroupIcon />,
    task: <FormatListBulletedIcon />,
    profit: <AttachMoneyIcon />,
  };

  const icon = iconMap[type] || iconMap.default;

  const difference: number = lastMonth ? value - lastMonth : 0;

  const prefix: Record<CardProps['type'], string> = {
    budget: 'R$',
    customers: '',
    task: '%',
    profit: 'R$',
  };

  const data = prefix[type];

  return (
    <S.Container>
      <S.Contents>
        <S.MainContents>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span>{title}</span>
            <h1>
              {type === 'task'
                ? `${formatNumber(value)} ${data} `
                : `${data} ${formatNumber(value)}`}
            </h1>
          </div>

          <S.MainIcon type={type}>{icon}</S.MainIcon>
        </S.MainContents>
        {lastMonth && (
          <S.SecondaryContents difference={difference}>
            {difference < 0 && <ArrowDownwardIcon />}
            {difference > 0 && <ArrowUpwardIcon />}
            <span>{(((value - lastMonth) / lastMonth) * 100).toFixed(1)}%</span>
            <span>desde o mês passado</span>
          </S.SecondaryContents>
        )}
        {type === 'task' ? (
          <S.SecondaryContents difference={difference}>
            <ProgressBar
              aria-checked
              variant="determinate"
              value={value}
              style={{ width: '100%', marginRight: '4px' }}
            />
          </S.SecondaryContents>
        ) : null}
      </S.Contents>
    </S.Container>
  );
}
