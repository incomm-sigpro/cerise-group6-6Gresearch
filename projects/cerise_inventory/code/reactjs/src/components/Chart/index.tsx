import * as S from './styles';
import OGChart from 'react-apexcharts';
import { Props } from 'react-apexcharts';

export function Chart(props: Props) {
  return (
    <S.Container>
      <span>{props.options?.chart?.id}</span>
      {
        
        <OGChart {...props} />
      }
    </S.Container>
  );
}
