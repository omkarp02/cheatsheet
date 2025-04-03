import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";

type RouterContext = {
  token: string | null;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <Outlet />
    </>
  ),
});
