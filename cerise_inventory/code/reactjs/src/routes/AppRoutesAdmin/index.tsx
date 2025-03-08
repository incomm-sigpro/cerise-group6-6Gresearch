import { Routes, Route } from 'react-router-dom';

import { Home } from '@/pages/Home';
import { Profile } from '@/pages/Profile';
import { Inventories } from '@/pages/Inventories';
import { Inventory } from '@/pages/Inventories/Inventory';
import { Calendar } from '@/pages/Calendar';
import { Results } from '@/pages/Results';
import { Result } from '@/pages/Results/Result';
import { Users } from '@/pages/Users';
import { RegisterUser } from '@/pages/RegisterUser';
import { Settings } from '@/pages/Settings';

import { PrivateRoutes } from '@/components/PrivateRoutes';
import { NoMatch } from '@/pages/NoMatch';

export function AppRoutesAdmin() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/dashboard" element={<Home />} />
      <Route path="/inventories">
        <Route index element={<Inventories />} />
        <Route path="inventory/:id">
          <Route index element={<Inventory />} />
        </Route>
      </Route>
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/results">
        <Route index element={<Results />} />
        <Route path="result/:id">
          <Route index element={<Result />} />
        </Route>
      </Route>
      <Route path="/users" element={<Users />} />
      <Route path="/register-user" element={<RegisterUser />} />
      <Route path="/settings" element={<Settings />} />

      <Route path="/private" element={<PrivateRoutes />} />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
}
