import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import React from "react";
import { columns } from "./colums";
import Link from "next/link";

import { getLocations } from "./lib/data";

export default async function DashboardPage() {
  const data = await getLocations();
  return (
    <div className="space-y-4">
      <div className="text-right">
      <Button size="sm" className="h-8 gap-1">
      <PlusCircle className="h-3.5 w-3.5" />
        <Link href="/dashboard/locations/create">
 
        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
          Add Location
        </span>
        </Link>
        </Button>
    
      </div>
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>Locations</CardTitle>
          <CardDescription>
            Manage your Location and view their sales performance.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <DataTable columns={columns} data={data} />
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Showing <strong>1-10</strong> of <strong>32</strong> products
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
