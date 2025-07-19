import React from "react"
import Navbar from "../_components/navbar"
import { OrderHistory } from "./_components/orderList"
import { getUser } from "@/lib/auth"

export default async function OrderPage() {
    const { user } = await getUser()

    return (
        <React.Fragment>
            <header className="bg-[#EFF3FA] pt-[30px] h-[351px] -mb-[181px]">
                <Navbar />
            </header>
            <div id="order" className="container max-w-[1130px] mx-auto flex gap-[30px] mt-[50px]">
                <div className="w-full flex flex-col bg-white gap-[30px] h-fit border border-[#E5E5E5] rounded-[30px]">
                    <OrderHistory userId={user?.id} />
                </div>
            </div>
        </React.Fragment>
    )
}
