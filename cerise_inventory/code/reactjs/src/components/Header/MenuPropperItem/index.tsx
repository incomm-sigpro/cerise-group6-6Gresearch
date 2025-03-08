import * as S from './styles';

interface MenuPopperItemProps {
  icon: React.ReactNode;
  title: string;
  callback: () => void;
}

export default function MenuPopperItem({
  icon,
  title,
  callback,
}: MenuPopperItemProps) {
  return (
    <S.ItemsPopperContent onClick={callback}>
      <S.IconContent>{icon}</S.IconContent>
      {title}
    </S.ItemsPopperContent>
  );
}
