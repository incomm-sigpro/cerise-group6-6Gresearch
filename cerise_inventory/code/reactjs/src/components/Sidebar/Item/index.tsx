import * as S from './styles';
import { ReactElement, useEffect, useState } from 'react';

export type itemProps = {
  isActive: boolean;
  content?: string;
  icon?: ReactElement | string;
  onClick?: () => void;
  isOpenedSidebar?: boolean;
};

export function Item({
  isActive,
  content,
  icon,
  onClick,
  isOpenedSidebar,
}: itemProps) {
  const [showLabel, setShowLabel] = useState(!isOpenedSidebar);

  useEffect(() => {
    setTimeout(() => {
      setShowLabel(!showLabel);
    }, 200);
  }, [isOpenedSidebar]);

  return (
    <S.Container fullWidth onClick={onClick} $active={isActive}>
      {icon}
      {showLabel && <span>{content}</span>}
    </S.Container>
  );
}
