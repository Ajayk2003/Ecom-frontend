import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { buttonVariants } from "./ui/button";
import { IconType } from "react-icons/lib";
import { FaUser } from 'react-icons/fa'

interface SideProps {
  links: {
    title: string
    label?: string
    route : string
    icon: IconType
    variant: "default" | "ghost"
  }[]
}


const sideProps = {
  links: [
    {
      title: "profile",
      route: "/profile",
      icon: FaUser,
      variant: "ghost",
      label : "567"
    }
  ]
} as SideProps

function Sidebar() {

  const { links } = sideProps;
  return (
    <div className="group min-h-screen flex flex-col gap-4 py-2">
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links.map((link, index) => 
          <Link
            
          key={index}
          to={link.route}
          className={cn(
            buttonVariants({ variant: link.variant, size: "sm" }),
            link.variant === "default" &&
              "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
            "justify-start"
          )}
         >
          <link.icon className="mr-2 h-4 w-4" />
          {link.title}
          {link.label && (
            <span
              className={cn(
                "ml-auto",
                link.variant === "default" &&
                  "text-background dark:text-white"
              )}
            >
              {link.label}
            </span>
          )}
        </Link>
        )}
      </nav>
    </div>
  )
}


export default Sidebar;