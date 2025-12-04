import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/rapid-studio/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Rapid studio landing page</div>;
}
