import { createFileRoute } from "@tanstack/react-router";
import { Fragment } from "react/jsx-runtime";

export const Route = createFileRoute("/app/")({
  component: RouteComponent,

  loader: async ({ context: { fetchPosts } }) => {
    return await fetchPosts();
  },
});

function RouteComponent() {
  const data = Route.useLoaderData();
  console.log(data);
  return (
    <div>
      <div>This is Main App Page</div>
      <ul>
        {data.map((item) => (
          <Fragment key={item.id}>
            <li>{item.id}</li>
            <li>{item.completed}</li>
            <li>{item.title}</li>
          </Fragment>
        ))}
      </ul>
    </div>
  );
}
