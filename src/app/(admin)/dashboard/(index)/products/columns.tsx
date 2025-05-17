"use client"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getImageUrl } from "@/lib/supabase";
import { dateFormat, rupiahFormat } from "@/lib/utils";
import { ProductStock } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Edit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import FormDelete from "../brands/_components/form-delete";
import ProductPage from "./page";

export type TColumn = {
  id: number;
  name: string;
  image_url: string;
  category_name: string;
  price: number;
  stock: ProductStock;
  total_sales: number;
  brand_name: string;
  created_at: Date;
};

export const columns: ColumnDef<TColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div className="inline-flex items-center gap-5">
          <Image
            src={getImageUrl(product.image_url, 'products')}
            alt="Product"
            width={80}
            height={80}
          />
          <span>{product.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const product = row.original;
      return rupiahFormat(product.price);
    },
  },
  {
    accessorKey: "stock",
    header: "Status",
    cell: ({ row }) => {
        const product = row.original;

        return <Badge variant={"outline"}>{product.stock}</Badge>
    }
  },
  {
    accessorKey: 'total_sales',
    header: 'Total Sales'
  },
  {
    accessorKey: 'crated_at',
    header: 'Created At',
    cell: ({row}) => {
      const product = row.original

      return dateFormat(product.created_at)
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const Product = row.original;
      return (
        <div className="space-x-4 inline-flex">
          <Button size="sm" asChild>
            <Link href={`/dashboard/products/edit/${Product.id}`}>
              <Edit className="w-4 h-4 mr-2" /> Edit
            </Link>
          </Button>
          {/* <FormDelete id={brand.id}/> */}
        </div>
      );
    },
  },

];
