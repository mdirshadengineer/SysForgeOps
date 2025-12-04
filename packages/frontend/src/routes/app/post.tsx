import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/post")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>This is post page</div>;
}
