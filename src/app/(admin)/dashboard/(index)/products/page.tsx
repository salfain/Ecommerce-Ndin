import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { DataTable } from '@/components/ui/data-table'
import { PlusCircle } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { columns } from './columns'
import { getProducts } from './lib/data'

export default async function ProductPage() {
const products = await getProducts()

  return (
    <div className="space-y-4">
      <div className="text-right">
      <Button size="sm" className="h-8 gap-1">
      <PlusCircle className="h-3.5 w-3.5" />
        <Link href="/dashboard/products/create">
 
        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
          Add Product
        </span>
        </Link>
        </Button>
    
      </div>
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>Product</CardTitle>
          <CardDescription>
            Manage your Product and view their sales performance.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <DataTable columns={columns} data={products} />
        </CardContent>
        <CardFooter>
       
        </CardFooter>
      </Card>
    </div>
  )
}

  

