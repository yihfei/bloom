"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis , YAxis} from "recharts";

import { useIsMobile } from "@/hooks/use-mobile";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "An interactive area chart for brew dates";

export function ChartAreaInteractive({
  brewDates,
}: {
  brewDates: { date: string; brewCount: number }[];
}) {
  const isMobile = useIsMobile();

  // Filter data for the last 3 months
  const filteredData = brewDates.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date();
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - 90); // Subtract 90 days for the last 3 months
    return date >= startDate;
  });

  function aggregateByWeek(data: { date: string; brewCount: number }[]) {
    if (data.length === 0) return [];

    // Parse dates
    const parsedData = data.map((item) => ({
      date: new Date(item.date),
      brewCount: item.brewCount,
    }));

    // Find earliest date from data
    const firstBrewDate = parsedData.reduce(
      (earliest, item) => (item.date < earliest ? item.date : earliest),
      parsedData[0].date
    );

    // Calculate 3 months ago
    const referenceDate = new Date();
    const threeMonthsAgo = new Date(referenceDate);
    threeMonthsAgo.setDate(threeMonthsAgo.getDate() - 90);

    // Start date is the earlier of first brew date or 3 months ago
    const startDate =
      firstBrewDate < threeMonthsAgo ? firstBrewDate : threeMonthsAgo;

    // Align start date to the start of the week (Monday)
    const startOfWeek = new Date(startDate);
    const day = startOfWeek.getDay();
    const diff = day === 0 ? -6 : 1 - day; // if Sunday, move back 6 days; otherwise adjust to Monday
    startOfWeek.setDate(startOfWeek.getDate() + diff);
    startOfWeek.setHours(0, 0, 0, 0);

    // Create a map to accumulate weekly sums
    const weeklyMap = new Map<string, number>();

    for (const item of parsedData) {
      // Calculate the start of the week for each item
      const itemDate = new Date(item.date);
      const itemDay = itemDate.getDay();
      const itemDiff = itemDay === 0 ? -6 : 1 - itemDay;
      const weekStartDate = new Date(itemDate);
      weekStartDate.setDate(weekStartDate.getDate() + itemDiff);
      weekStartDate.setHours(0, 0, 0, 0);
      const weekKey = weekStartDate.toISOString().split("T")[0]; // ISO date string as key

      weeklyMap.set(weekKey, (weeklyMap.get(weekKey) || 0) + item.brewCount);
    }

    // Generate continuous weeks from startOfWeek to today
    const result: { date: string; brewCount: number }[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (
      let d = new Date(startOfWeek);
      d <= today;
      d.setDate(d.getDate() + 7)
    ) {
      const key = d.toISOString().split("T")[0];
      result.push({
        date: key,
        brewCount: weeklyMap.get(key) || 0,
      });
    }

    return result;
  }

  const weeklyData = aggregateByWeek(filteredData);

  const chartConfig = {
    brews: {
      label: "Brews",
      color: "var(--primary)",
    },
  } satisfies ChartConfig;

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Weekly Brews</CardTitle>
        <CardDescription>
          <span>Aggregated weekly brews for the last 3 months</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={weeklyData}>
            <defs>
              <linearGradient id="fillBrews" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-primary)"
                  stopOpacity={1.0}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-primary)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              interval={0}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <YAxis
              domain={[0, Math.max(...weeklyData.map((d) => d.brewCount)) + 1]} // Set max domain dynamically
              tickLine={false}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              defaultIndex={isMobile ? -1 : 10}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="brewCount"
              type="natural"
              fill="url(#fillBrews)"
              stroke="var(--color-primary)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
