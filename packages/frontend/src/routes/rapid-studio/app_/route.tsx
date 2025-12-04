import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/rapid-studio/app_")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      Modules layout
      <Outlet />
    </div>
  );
}
