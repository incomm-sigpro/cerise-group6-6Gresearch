import * as S from './styles';

import logo from '@/assets/logos/logo-cerise.png';
import { Section } from './Section/index';
import { Item } from './Item/index';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BookIcon from '@mui/icons-material/Book';
import InventoryIcon from '@mui/icons-material/Inventory';
import GroupIcon from '@mui/icons-material/Group';
import SettingsIcon from '@mui/icons-material/Settings';

import { Header } from '../Header';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { debounce } from 'lodash';

export type SidebarProps = {
  children: React.ReactNode;
  hasPermission: boolean;
};

export type HandleProps = {
  navigateTo: string;
};

export function Sidebar({ children, hasPermission }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState('');
  const [isOpened, setIsOpened] = useState(true);
  const [hideLogo, setHideLogo] = useState(isOpened);

  useEffect(() => {
    setActiveItem(location.pathname);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setHideLogo(!hideLogo);
    }, 200);
  }, [isOpened]);

  const handleClick = ({ navigateTo }: HandleProps) => {
    setActiveItem(navigateTo);

    if (navigateTo.startsWith('http')) {
      window.open(navigateTo, '_blank');
    } else {
      navigate(navigateTo);
    }
  };

  const handleChangeSettings = () => {
    navigate('/settings');
  };

  const items = hasPermission
    ? [
        {
          title: 'Dashboard',
          icon: <SignalCellularAltIcon />,
          navigateTo: '/dashboard',
        },
        {
          title: 'Inventários',
          icon: <InventoryIcon />,
          navigateTo: '/inventories',
        },
        {
          title: 'Calendário',
          icon: <CalendarMonthIcon />,
          navigateTo: '/calendar',
        },
        {
          title: 'CERISE',
          icon: <BookIcon />,
          navigateTo: 'https://website-cerise.vercel.app/',
        },
        {
          title: 'Usuários',
          icon: <GroupIcon />,
          navigateTo: '/users',
        },
      ]
    : [
        {
          title: 'Dashboard',
          icon: <SignalCellularAltIcon />,
          navigateTo: '/dashboard',
        },
        {
          title: 'Inventários',
          icon: <InventoryIcon />,
          navigateTo: '/inventories',
        },
        {
          title: 'Calendário',
          icon: <CalendarMonthIcon />,
          navigateTo: '/calendar',
        },
        {
          title: 'CERISE',
          icon: <BookIcon />,
          navigateTo: 'https://website-cerise.vercel.app/',
        },
      ];

  return (
    <S.Container>
      <S.Nav $opened={isOpened}>
        <S.NavHeader>
          <IconButton
            aria-label="fechar"
            onClick={debounce(() => setIsOpened(!isOpened), 200)}
          >
            {!hideLogo ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
          {!hideLogo && <img src={logo} alt="Imagem logo Cerise" />}
        </S.NavHeader>
        <Section />
        <S.ItemsContainer>
          {items.map((item, index) => {
            return (
              <Item
                key={index}
                onClick={() => handleClick(item)}
                content={item.title}
                icon={item.icon}
                isActive={item.navigateTo === activeItem}
                isOpenedSidebar={isOpened}
              />
            );
          })}
        </S.ItemsContainer>
        <Section />
        <S.Footer>
          <Item
            onClick={handleChangeSettings}
            content={'Configurações'}
            icon={<SettingsIcon />}
            isActive={'/settings' === activeItem}
            isOpenedSidebar={isOpened}
          />
        </S.Footer>
      </S.Nav>
      <S.Main $opened={isOpened}>
        <Header
          isOpenedSideBar={isOpened}
          onInputChange
          hasPermission={hasPermission}
        />
        {children}
      </S.Main>
    </S.Container>
  );
}
