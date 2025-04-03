import { AppHeader } from "@/components/ui/header/app-header";
import Navtab from "@/components/ui/navigation/navtab";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/sidebar/app-sidebar";
import { getNavListByLink } from "@/utils/helpers";
import { createFileRoute, useLocation } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  const pathname = useLocation({ select: (location) => location.pathname });
  const navList = getNavListByLink(pathname);

  // console.log(navList);

  return (
    <div className="[--header-height:calc(theme(spacing.14))]">
      <SidebarProvider className="flex flex-col">
        <AppHeader />
        <div className="flex flex-1">
          <AppSidebar />
          <div className="flex flex-col flex-1 px-[5px]">
            {/* <Navtab className="mt-1" navList={navList?.items ?? []} /> */}
            <Navtab className="mt-1" navList={navList?.items ?? []} />
            <SidebarInset>
              <div className="flex flex-1 flex-col p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-2">
                  <div className="aspect-video rounded-xl bg-muted/50" />
                  <div className="aspect-video rounded-xl bg-muted/50" />
                </div>
              </div>
            </SidebarInset>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
}
