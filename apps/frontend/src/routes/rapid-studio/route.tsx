import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/rapid-studio")({
  component: RapidStudioLayout,
});

function RapidStudioLayout() {
  return (
    <div>
      This is Rapid studio layout
      <div>
        <Outlet />
      </div>
    </div>
  );
}
