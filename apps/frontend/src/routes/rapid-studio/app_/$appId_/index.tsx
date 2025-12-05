import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/rapid-studio/app_/$appId_/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { appId } = Route.useParams();
  return <div>App content page: {appId}</div>;
}
