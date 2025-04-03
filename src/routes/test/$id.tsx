import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/test/$id')({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();

  return <div>Hello "/test/{id}"!</div>;
}
