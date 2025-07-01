import { Outlet } from "react-router-dom";
import { Menu } from "../Menu";

export function PrivateRoutes() {
  return (
    <>
      <Menu />
      <hr />

      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet />
    </>
  )
}