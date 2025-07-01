import * as S from './styles';

import { LinearProgressProps } from '@mui/material';

export function ProgressBar(props: LinearProgressProps) {
  return <S.StyledLinearProgres {...props} />;
}
