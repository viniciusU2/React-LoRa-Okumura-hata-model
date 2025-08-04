import * as React from "react"
import { MonitorCheck,SquareTerminal} from "lucide-react"

import { NavMain } from "@/components/nav-main"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {

  navMain: [
    {
      title: "Módulo",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Estado da Carga",
          url: "#",
        },
        {
          title: "Dados",
          url: "#",
        },
        {
          title: "Conficgurar modelo",
          url: "#",
        },
      ],
    },
 
  ],

}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <MonitorCheck className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">DALoRa</span>
                  <span className="truncate text-xs">Dispositivo de Acionamento LoRa</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />

      </SidebarContent>
      <SidebarFooter>
    
      </SidebarFooter>
    </Sidebar>
  )
}
