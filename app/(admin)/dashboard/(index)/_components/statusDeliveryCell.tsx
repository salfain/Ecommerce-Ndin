'use client';

import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { updateOrderStatus } from "../orders/lib/action";
import { useTransition } from "react";
import { StatusDelivery } from "@prisma/client";
import { getStatusDeliveryText } from "@/lib/utils";

export function StatusDeliveryCell({
    orderId,
    statusDelivery,
}: {
    orderId: number;
    statusDelivery: StatusDelivery
}) {
    const [isPending, startTransition] = useTransition();

    if (statusDelivery === 'delivered') {
        return <Badge variant="default">{getStatusDeliveryText(statusDelivery)}</Badge>;
    }

    const options =
        statusDelivery === 'processing'
            ? ['processing', 'shipped']
            : statusDelivery === 'shipped'
                ? ['shipped', 'delivered']
                : [];

    return (
        <Select
            defaultValue={statusDelivery}
            disabled={isPending}
            onValueChange={(val) =>
                startTransition(() => {
                    updateOrderStatus(orderId, val as any);
                })
            }
        >
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
                {options.map((status, index) => (
                    <SelectItem key={index} value={status}>
                        {getStatusDeliveryText(status)}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
