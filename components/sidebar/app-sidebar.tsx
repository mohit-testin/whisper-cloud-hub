import * as React from "react"
import { NavUser } from "./nav-user"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "../ui/sidebar"
import { NavContent } from "./nav-content"
import { Brain } from "lucide-react"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },

  content: [
    {
      name: "Dashboard",
      url: "/user/dashboard",
    },
    {
      name: "Sessions",
      url: "/user/sessions",
    },
    {
      name: "Settings",
      url: "/user/settings",
    },
    {
      name: "Transcritps",
      url: "/user/transcripts",
    },
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader className=" flex justify-center border-sidebar-border h-16 border-b text-xl bg-[url('/smr.png')] bg-cover bg-center ">
        <div className="flex items-center pl-3 gap-1  text-primary-foreground font-black uppercase">
          <Brain size={"20"} />
          <span>Humi</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <NavContent content={data.content} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
