import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { LucideIcon } from "lucide-react";

export interface Navtab {
  navList: { url: string; icon?: LucideIcon; title: string }[];
  className?: string;
}

const Navtab = ({ navList, className }: Navtab) => {
  // const [cur, setCur] = useState<number>(0);
  console.log("navtab rerendered >>>>>>>>>>>>");

  return (
    <div
      className={cn(
        "bg-secondary h-[40px] flex  items-center  capitalize",
        className
      )}
    >
      {navList.map((nav, index) => {
        return (
          <Link
            key={index}
            className={`h-full gap-2  px-6 font-medium  flex items-center `}
            to={nav.url}
            activeProps={{ className: "bg-secondary-100" }}
          >
            {nav.icon ? <nav.icon className="text-base" /> : ""}
            {nav.title}
          </Link>
        );
      })}
    </div>
  );
};

export default Navtab;
