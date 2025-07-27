"use client";

import { Badge } from "@/components/ui/badge";
import { getImageUrl } from "@/lib/supabase";
import { rupiahFormat } from "@/lib/utils";
import { StatusDelivery, StatusOrder } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { StatusDeliveryCell } from "../_components/statusDeliveryCell";
import { OrderDetailDialog } from "./_components/orderDetailDialog";

// Optional: fetch enum directly from Prisma schema or define here
export type TColumn = {
  id: number;
  products: {
    name: string;
    image: string;
  }[];
  orderDetail: {
    name: string;
    address: string;
    phone: string;
    city: string;
    postal_code: string;
    note?: string | null;
  };
  customer_name: string;
  price: number;
  status: StatusOrder;
  StatusDelivery: StatusDelivery;
};

export const columns: ColumnDef<TColumn>[] = [
  // {
  //   accessorKey: "products",
  //   header: "Products",
  //   cell: ({ row }) => {
  //     const order = row.original;
  //     return (
  //       <div className="flex flex-col gap-4 justify-start">
  //         {order.products.map((item, i) => (
  //           <div
  //             key={`${item.name}-${i}`}
  //             className="inline-flex items-center gap-5"
  //           >
  //             <Image
  //               src={getImageUrl(item.image)}
  //               alt="Product"
  //               width={80}
  //               height={80}
  //               className="rounded"
  //             />
  //             <span>{item.name}</span>
  //           </div>
  //         ))}
  //       </div>
  //     );
  //   },
  // },
  {
    accessorKey: "customer_name",
    header: "Customer Name",
  },
  {
    accessorKey: "price",
    header: "Total Price",
    cell: ({ row }) => rupiahFormat(row.original.price),
  },
  {
    accessorKey: "status",
    header: "Status Order",
    cell: ({ row }) => {
      return (
        <Badge
          variant={row.original.status === "failed" ? "destructive" : "default"}
        >
          {row.original.status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "statusDelivery",
    header: "Status Delivery",
    cell: ({ row }) => {
      const { id, StatusDelivery } = row.original;
      return (
        <StatusDeliveryCell
          orderId={id}
          statusDelivery={StatusDelivery}
        />
      );
    },
  },
  {
    id: "actions",
    header: "Details",
    cell: ({ row }) => {
      const order = row.original;
      return <OrderDetailDialog order={order} />;
    }
  }
];
