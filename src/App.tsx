import ReactQueryProvider from "@/components/provider/react-query-provider";
import { ThemeProvider } from "@/components/provider/theme-provider";
import { AuthProvider } from "@/hooks/auth/auth-provider";
import { routeTree } from "@/routeTree.gen";
import { useToken } from "@/store/authStore";
import { createRouter, RouterProvider } from "@tanstack/react-router";

// Create a new router instance
export const router = createRouter({
  routeTree,
  context: { token: undefined! },
});

// Register the router instance for type safetyasd
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  const token = useToken();

  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <ReactQueryProvider>
          <RouterProvider router={router} context={{ token: token }} />
        </ReactQueryProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
