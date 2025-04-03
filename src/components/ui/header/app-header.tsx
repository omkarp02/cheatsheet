import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSidebar } from "@/components/ui/sidebar";
import { useAuthActions } from "@/store/authStore";
import helixLogo from "@images/brand/helix.png";
import { CircleUser, EllipsisVertical, LogOut, Menu, X } from "lucide-react";

export function AppHeader() {
  const { toggleSidebar, open } = useSidebar();
  const { handleLogout } = useAuthActions();

  console.log("App header rendered >>>>>>>>>>>");

  return (
    <header className="flex justify-between sticky bg-primary text-primary-foreground px-3 h-[var(--header-height)] top-0 z-50 w-full items-center border-b ">
      <section className="flex gap-3 items-center">
        {open ? (
          <X onClick={toggleSidebar} className="cursor-pointer" />
        ) : (
          <Menu onClick={toggleSidebar} className="cursor-pointer" />
        )}
        <img src={helixLogo} />
      </section>
      <section>{/* <SearchForm /> */}</section>
      <section className="">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex gap-2 items-center">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={""} alt={"Omkar pawar"} />
                <AvatarFallback className="rounded-none">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{"Omkar Pawar"}</span>
                <span className="truncate text-xs">{"System Admin"}</span>
              </div>
              <EllipsisVertical className="ml-auto size-4" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-40 " align="end" sideOffset={4}>
            <DropdownMenuItem>
              <CircleUser /> My Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut /> Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </section>
    </header>
  );
}
