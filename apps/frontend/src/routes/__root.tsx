import type { fetchPosts } from "@/__mocks__/fetchPosts";
import type { QueryClient } from "@tanstack/react-query";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import React from "react";

// Create a root route using the createRootRouteWithContext<{...}>() function and pass it whatever types you would like to be available in your router context.
export const Route = createRootRouteWithContext<{
  fetchPosts: typeof fetchPosts;
  queryClient: QueryClient;
}>()({
  component: RootComponent,
}); // NOTE: the double call is on purpose, since createRootRouteWithContext is a factory ;)

function RootComponent() {
  return (
    <React.Fragment>
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </React.Fragment>
  );
}
