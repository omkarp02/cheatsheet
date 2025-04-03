import {
  CircleAlert,
  CirclePlus,
  ClipboardList,
  Download,
  File,
  FolderKanban,
  LucideIcon,
  Network,
  Pencil,
  Presentation,
  ScanSearch,
  SearchSlash,
  ShieldUser,
  SquareKanban,
  Tag,
} from "lucide-react";

type Nav = {
  title: string;
  url: string;
  icon?: LucideIcon;
  items?: Nav[];
};

export const mainNavList: Nav[] = [
  {
    title: "File",
    url: "#",
    icon: File,
    items: [],
  },
  {
    title: "Tag",
    url: "/dashboard/tags",
    icon: Tag,
    items: [
      {
        title: "Tag Hierarchy",
        url: "/dashboard/tags/hierarcy",
        icon: Network,
      },
      {
        title: "Find Tags",
        url: "/dashboard/tags/find",
        icon: ScanSearch,
      },
      {
        title: "Edit Tags",
        url: "/dashboard/tags/edit",
        icon: Pencil,
      },
      {
        title: "Create Tags",
        url: "/dashboard/tags/create",
        icon: CirclePlus,
      },
      {
        title: "Find Lines",
        url: "/dashboard/tags/line",
        icon: SearchSlash,
      },
    ],
  },
  {
    title: "Criticality",
    url: "#asdf",
    icon: CircleAlert,
    items: [
      { title: "Functional Hierarchy", url: "#" },
      { title: "Find Main Function", url: "#" },
      { title: "Create Main Function", url: "#" },
      { title: "Find Sub Function", url: "#" },
    ],
  },
  {
    title: "RBI",
    url: "#",
    icon: Presentation,
    items: [],
  },
  {
    title: "Program",
    url: "#",
    icon: FolderKanban,
    items: [
      { title: "Program Overview", url: "#" },
      { title: "Find Program", url: "#" },
      { title: "Create Program", url: "#" },
      { title: "Find Task", url: "#" },
      { title: "Find Generic Task", url: "#" },
      { title: "Add Procedure", url: "#" },
      { title: "Find Procedures", url: "#" },
    ],
  },
  {
    title: "Project",
    url: "#",
    icon: SquareKanban,
    items: [
      {
        title: "KURS - Pyramid(ULA)",
        url: "#",
      },
      {
        title: "ULA",
        url: "#",
      },
      {
        title: "View Project Details",
        url: "#",
      },
      {
        title: "Create New Project ",
        url: "#",
      },
      {
        title: "Include Inactive",
        url: "#",
      },
      {
        title: "All Projects",
        url: "#",
      },
    ],
  },
  {
    title: "Reports",
    url: "#",
    icon: ClipboardList,
    items: [
      {
        title: "History",
        url: "#",
      },
      {
        title: "Starred",
        url: "#",
      },
      {
        title: "Settings",
        url: "#",
      },
    ],
  },
  {
    title: "Admin",
    url: "#",
    icon: ShieldUser,
    items: [],
  },
  {
    title: "Import",
    url: "#",
    icon: Download,
    items: [],
  },
];

export const sidebarNavData = {
  navMain: mainNavList,
};
