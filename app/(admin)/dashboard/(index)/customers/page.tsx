import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { getCustomers } from "./lib/data";

export default async function CustomersPage() {
  const customers = await getCustomers()
  return (
    <div className="space-y-4">
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>Customers</CardTitle>
          <CardDescription>
            Manage your customer and view their sales performance.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <DataTable columns={columns} data={customers} />
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}
