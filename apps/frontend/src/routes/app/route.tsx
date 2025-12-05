import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/app")({
  component: AppLayoutComponent,
});

function AppLayoutComponent() {
  return (
    <div>
      This is App Layout
      <div>
        <Outlet />
      </div>
    </div>
  );
}
