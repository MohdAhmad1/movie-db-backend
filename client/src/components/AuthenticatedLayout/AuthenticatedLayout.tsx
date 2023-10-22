import { AppShell } from "@mantine/core";
import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";

function AuthenticatedLayout() {
  return (
    <AppShell navbar={{ width: 300, breakpoint: "sm" }} padding="md">
      <Navbar />

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}

export default AuthenticatedLayout;
