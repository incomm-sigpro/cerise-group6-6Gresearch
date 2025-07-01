import { BrowserRouter } from 'react-router-dom';
import { useAuth } from '../hooks/AuthProvider';

import { AppRoutesAdmin } from './AppRoutesAdmin';
import { AppRoutesUser } from './AppRoutesUser';
import { AuthRoutes } from './AuthRoutes';
import { Sidebar } from '../components/Sidebar';

export function Routes() {
  const { user } = useAuth();
  let admin_auth: boolean = false;
  if (user.email) {
    admin_auth = user.permissionGroup.role === 'IS_ADMIN';
  }

  return (
    <BrowserRouter>
      {user.token ? (
        admin_auth ? (
          <Sidebar hasPermission={admin_auth}>
            <AppRoutesAdmin />
          </Sidebar>
        ) : (
          <Sidebar hasPermission={admin_auth}>
            <AppRoutesUser />
          </Sidebar>
        )
      ) : (
        <AuthRoutes />
      )}
    </BrowserRouter>
  );
}
