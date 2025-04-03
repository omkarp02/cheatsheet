import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ context }) => {
    const token = context.token;
    if (!token) {
      throw redirect({ to: "/login" });
    }
  },
});
