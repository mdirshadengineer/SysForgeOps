import "./styles/globals.css";

import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { StrictMode } from "react";
import { fetchPosts } from "./__mocks__/fetchPosts";
import { ThemeProvider } from "./theme/theme-provider";

const queryClient = new QueryClient();

// // Set up a Router instance
const router = createRouter({
  routeTree: routeTree,
  defaultPreload: "intent",
  scrollRestoration: true,
  context: {
    fetchPosts: fetchPosts, // inject when the related route is rendered
    queryClient,
  },
});

// Register things for typesafety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

declare module "@tanstack/react-query" {
  interface Register {
    // Use unknown so call sites must narrow explicitly.
    defaultError: unknown;
  }
}

const rootElement = document.getElementById("root")!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
          <RouterProvider router={router} />
        </ThemeProvider>
        <ReactQueryDevtools
          initialIsOpen={true}
          position="bottom"
          buttonPosition="top-right"
        />
      </QueryClientProvider>
    </StrictMode>,
  );
}
