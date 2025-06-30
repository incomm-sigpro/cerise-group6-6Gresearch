import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import PeopleIcon from '@mui/icons-material/People';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import InventoryIcon from '@mui/icons-material/Inventory';
import FilePresentIcon from '@mui/icons-material/FilePresent';

import { Avatar, ClickAwayListener, IconButton, Popper } from '@mui/material';

import * as S from './styles';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import emptyImage from '../../assets/images/empty-profile.png';
import { useAuth } from '../../hooks/AuthProvider';
import { api } from '../../services/api';

import { Input } from '../Input';
import MenuPopperItem from './MenuPopperItem';
import { ThemeToggle } from '../ThemeToggle';

interface HeaderProps {
  onInputChange: any;
  isOpenedSideBar: boolean;
  hasPermission: boolean;
}

export function Header({
  onInputChange,
  isOpenedSideBar,
  hasPermission,
}: HeaderProps) {
  const [search, setSearch] = useState('');
  const { signOut, user } = useAuth();
  const navigate = useNavigate();

  const [anchorFunctionalitiesEl, setAnchorFunctionalitiesEl] =
    useState<null | HTMLElement>(null);
  const [anchorMessagesEl, setAnchorMessagesEl] = useState<null | HTMLElement>(
    null
  );
  const [anchorContactsEl, setAnchorContactsEl] = useState<null | HTMLElement>(
    null
  );

  const handleFunctionalitiesClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorFunctionalitiesEl(
      anchorFunctionalitiesEl ? null : event.currentTarget
    );
  };

  const handleMessagesClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorMessagesEl(anchorMessagesEl ? null : event.currentTarget);
  };

  const handleContactsClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorContactsEl(anchorContactsEl ? null : event.currentTarget);
  };

  const handleFunctionalitiesClickAway = () => {
    setAnchorFunctionalitiesEl(null);
  };

  const handleMessagesClickAway = () => {
    setAnchorMessagesEl(null);
  };

  const handleContactsClickAway = () => {
    setAnchorContactsEl(null);
  };

  const openFunctionalities = Boolean(anchorFunctionalitiesEl);
  const idFunctionalities = openFunctionalities ? 'simple-popper' : undefined;

  const openMessages = Boolean(anchorMessagesEl);
  const idMessages = openMessages ? 'simple-popper' : undefined;

  const openContacts = Boolean(anchorContactsEl);
  const idContacts = openContacts ? 'simple-popper' : undefined;

  const handleKey = async (event: any) => {
    if (event.code === 'Enter' || event.code === 'NumpadEnter') {
      console.log(search);
      const response = await api.get(`/notes?title=${search}`);
      console.log(response.data);
      onInputChange(response.data);
    }
  };

  const handleSignOut = () => {
    navigate('/');
    signOut();
  };

  const avatarUrl = user.avatar
    ? `${api.defaults.baseURL}/files/${user.avatar}`
    : emptyImage;

  return (
    <S.Container $opened={isOpenedSideBar}>
      <S.Search>
        <Input
          placeholder="O que deseja encontrar?"
          variant="standard"
          icon={<SearchIcon sx={{ ml: 1 }} />}
          onChange={e => setSearch(e.target.value)}
          onKeyDown={e => handleKey(e)}
        />
      </S.Search>

      <S.Profile>
        <ThemeToggle />
        
        <ClickAwayListener onClickAway={handleContactsClickAway}>
          <IconButton
            aria-label="contacts"
            aria-describedby={idContacts}
            onClick={handleContactsClick}
            title="Contatos"
          >
            <PeopleIcon />

            <Popper
              id={idContacts}
              open={openContacts}
              anchorEl={anchorContactsEl}
            >
              <S.PopperContent>
                <S.HeaderPopperContent>Contatos</S.HeaderPopperContent>
                <S.BodyPopperContent>
                  <MenuPopperItem
                    title="Nenhum contato ..."
                    callback={() => {
                      console.log('Nenhum contato');
                    }}
                  />
                </S.BodyPopperContent>
              </S.PopperContent>
            </Popper>
          </IconButton>
        </ClickAwayListener>

        <ClickAwayListener onClickAway={handleMessagesClickAway}>
          <IconButton
            aria-label="messages"
            aria-describedby={idMessages}
            onClick={handleMessagesClick}
            title="Mensagens"
          >
            <NotificationsActiveIcon />

            <Popper
              id={idMessages}
              open={openMessages}
              anchorEl={anchorMessagesEl}
            >
              <S.PopperContent>
                <S.HeaderPopperContent>Mensagens</S.HeaderPopperContent>
                <S.BodyPopperContent>
                  <MenuPopperItem
                    title="Nenhuma mensagem ..."
                    callback={() => {
                      console.log('Nenhuma mensagem');
                    }}
                  />
                </S.BodyPopperContent>
              </S.PopperContent>
            </Popper>
          </IconButton>
        </ClickAwayListener>

        <ClickAwayListener onClickAway={handleFunctionalitiesClickAway}>
          <IconButton
            aria-label="functionalities"
            aria-describedby={idFunctionalities}
            onClick={handleFunctionalitiesClick}
            title="Funcionalidades"
          >
            <Avatar
              alt={`Foto do usuário ${user.name}`}
              sx={{ width: 26, height: 26 }}
              src={user.avatar ? avatarUrl : undefined} // TODO: colocar url do avatar no lugar de avatarUrl
            >
              {user.name?.slice(0, 1)}
            </Avatar>

            {hasPermission ? (
              <Popper
                id={idFunctionalities}
                open={openFunctionalities}
                anchorEl={anchorFunctionalitiesEl}
              >
                <S.PopperContent>
                  <S.HeaderPopperContent>{user.name}</S.HeaderPopperContent>
                  <S.BodyPopperContent>
                    <MenuPopperItem
                      icon={<SignalCellularAltIcon />}
                      title="Dashboard"
                      callback={() => {
                        navigate('/dashboard');
                      }}
                    />
                    <MenuPopperItem
                      icon={<InventoryIcon />}
                      title="Inventários"
                      callback={() => {
                        navigate('/inventories');
                      }}
                    />
                    <MenuPopperItem
                      icon={<CalendarMonthIcon />}
                      title="Calendário"
                      callback={() => {
                        navigate('/calendar');
                      }}
                    />
                    <MenuPopperItem
                      icon={<PeopleIcon />}
                      title="Usuários"
                      callback={() => {
                        navigate('/users');
                      }}
                    />
                    <MenuPopperItem
                      icon={<SettingsIcon />}
                      title="Configurações"
                      callback={() => {
                        navigate('/settings');
                      }}
                    />
                    <MenuPopperItem
                      icon={<AccountBoxIcon />}
                      title="Perfil"
                      callback={() => {
                        navigate('/profile');
                      }}
                    />
                    <MenuPopperItem
                      icon={<LogoutIcon />}
                      title="Sair"
                      callback={handleSignOut}
                    />
                  </S.BodyPopperContent>
                </S.PopperContent>
              </Popper>
            ) : (
              <Popper
                id={idFunctionalities}
                open={openFunctionalities}
                anchorEl={anchorFunctionalitiesEl}
              >
                <S.PopperContent>
                  <S.HeaderPopperContent>{user.name}</S.HeaderPopperContent>
                  <S.BodyPopperContent>
                    <MenuPopperItem
                      icon={<SignalCellularAltIcon />}
                      title="Dashboard"
                      callback={() => {
                        navigate('/dashboard');
                      }}
                    />
                    <MenuPopperItem
                      icon={<InventoryIcon />}
                      title="Inventários"
                      callback={() => {
                        navigate('/inventories');
                      }}
                    />
                    <MenuPopperItem
                      icon={<CalendarMonthIcon />}
                      title="Calendário"
                      callback={() => {
                        navigate('/calendar');
                      }}
                    />
                    <MenuPopperItem
                      icon={<SettingsIcon />}
                      title="Configurações"
                      callback={() => {
                        navigate('/settings');
                      }}
                    />
                    <MenuPopperItem
                      icon={<AccountBoxIcon />}
                      title="Perfil"
                      callback={() => {
                        navigate('/profile');
                      }}
                    />
                    <MenuPopperItem
                      icon={<LogoutIcon />}
                      title="Sair"
                      callback={handleSignOut}
                    />
                  </S.BodyPopperContent>
                </S.PopperContent>
              </Popper>
            )}
          </IconButton>
        </ClickAwayListener>
      </S.Profile>
    </S.Container>
  );
}
