"use client"

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import type { Route } from "next"
import Link from "next/link"
import { usePathname } from "next/navigation"
import clsx from "clsx"

export function NavContent({
  content,
}: {
  content: {
    name: string
    url: string
  }[]
}) {
  const { isMobile } = useSidebar()
  const pathname = usePathname()

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarMenu>
        {content.map((item) => {
          const isActive = pathname === item.url
          return (
            <SidebarMenuItem key={item.name} className="">
              <SidebarMenuButton asChild className="py-5">
                <Link
                  href={item.url as Route}
                  className={clsx(
                    "font-medium w-full  text-left transition-colors rounded-none",
                    isActive
                      ? "text-green-300 underline"
                      : "hover:bg-muted"
                  )}
                >
                  {item.name}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
