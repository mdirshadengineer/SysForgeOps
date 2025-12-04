import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/rapid-studio/app_/$appId_/$entity_/$entityId",
)({
  params: {
    parse: ({ appId, entity, entityId }) => {
      if (entityId === "1") {
        entityId = "110";
      }
      if (appId === "incident") {
        appId = "problem";
      }
      return {
        appId,
        entity,
        entityId,
      };
    },
  },
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useParams();
  console.log(params.appId);
  console.log(params.entityId);
  return (
    <div>
      {" "}
      Page for Module and it's entity view App ID: {params.appId} - App Entity:{" "}
      {params.entity} - Entity ID: {params.entityId}
    </div>
  );
}
