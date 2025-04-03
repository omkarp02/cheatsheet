"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { NavMain } from "@/components/ui/sidebar/nav-main";
import NavSupport from "@/components/ui/sidebar/nav-support";
import { sidebarNavData } from "@/data/sidebar-data";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  console.log("App sidebar rendered >>>>>>>>>>>");

  return (
    <Sidebar
      className="top-[calc(var(--header-height)+5px)] !h-[calc(100svh-var(--header-height))] font-helvetica"
      {...props}
    >
      <SidebarHeader></SidebarHeader>
      <SidebarContent className="px-2">
        <NavMain items={sidebarNavData.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavSupport />
      </SidebarFooter>
    </Sidebar>
  );
}
