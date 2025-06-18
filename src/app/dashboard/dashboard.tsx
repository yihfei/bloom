import { ChartAreaInteractive } from "@/app/dashboard/chart-area-interactive"
import { SectionCards } from "@/app/dashboard/section-cards"
import { getNumberOfBrewsByDay } from "@/actions/brewsController"


export default async function Dashboard({ userId }: { userId: string}) {
  const brewDates = await getNumberOfBrewsByDay(userId);
  return (
    // <SidebarProvider
    //   style={
    //     {
    //       "--sidebar-width": "calc(var(--spacing) * 72)",
    //       "--header-height": "calc(var(--spacing) * 12)",
    //     } as React.CSSProperties
    //   }
    // >
      // <AppSidebar variant="inset" />
      // <SidebarInset>
        // <SiteHeader />
        <div className="flex flex-1 flex-col justify-center min-h-screen">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards userId={userId} />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive brewDates={brewDates} />
              </div>
              {/* <DataTable data={data} /> */}
            </div>
          </div>
        </div>
      // </SidebarInset>
    // </SidebarProvider>
  )
}
