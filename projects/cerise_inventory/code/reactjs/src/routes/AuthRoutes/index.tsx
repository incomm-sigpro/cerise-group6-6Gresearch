import { Routes, Route } from 'react-router-dom';
import { Login } from '../../pages/Auth/Login';
import { SignUp } from '../../pages/Auth/SignUp';

export function AuthRoutes() {
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      <Route path="/profile" element={<Login />} />
      <Route path="/dashboard" element={<Login />} />
      <Route path="/inventories">
        <Route index element={<Login />} />
        <Route path="inventory/:id">
          <Route index element={<Login />} />
        </Route>
      </Route>
      <Route path="/calendar" element={<Login />} />
      <Route path="/results">
        <Route index element={<Login />} />
        <Route path="result/:id">
          <Route index element={<Login />} />
        </Route>
      </Route>
      <Route path="/users" element={<Login />} />
      <Route path="/register-user" element={<Login />} />
      <Route path="/settings" element={<Login />} />
    </Routes>
  );
}
