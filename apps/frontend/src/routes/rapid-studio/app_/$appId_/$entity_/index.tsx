import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/rapid-studio/app_/$appId_/$entity_/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { appId, entity } = Route.useParams();
  return (
    <div>
      Hello {appId} {entity}
    </div>
  );
}
