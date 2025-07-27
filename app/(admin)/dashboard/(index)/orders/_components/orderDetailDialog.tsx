// components/order-detail-dialog.tsx
"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TColumn } from "../columns";
import React from "react";

interface Props {
    order: TColumn;
}

export function OrderDetailDialog({ order }: Props) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">View Details</Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Order Detail</DialogTitle>
                </DialogHeader>
                <Card>
                    <CardContent className="flex justify-between items-center p-2">
                        <div>
                            <div>
                                <span className="font-semibold">Customer:</span> {order.customer_name}
                            </div>
                            <div>
                                <span className="font-semibold">Phone:</span> {order.orderDetail.phone}
                            </div>
                            <div>
                                <span className="font-semibold">Address:</span> {order.orderDetail.address}
                            </div>
                        </div>
                        <div>
                            <div>
                                <span className="font-semibold">City:</span> {order.orderDetail.city}
                            </div>
                            <div>
                                <span className="font-semibold">Postal Code:</span> {order.orderDetail.postal_code}
                            </div>
                            {order.orderDetail.note && (
                                <div>
                                    <span className="font-semibold">Note:</span> {order.orderDetail.note}
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </DialogContent>
        </Dialog>
    );
}
