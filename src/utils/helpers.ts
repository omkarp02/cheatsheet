import { mainNavList } from "@/data/sidebar-data";

export function getNavListByLink(link: string) {
  return mainNavList.find((e) => link.startsWith(e.url));
}
