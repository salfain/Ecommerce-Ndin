import React, { Suspense } from "react"
import Navbar from "./_components/navbar"
import ListCategory from "./_components/list-category"
import ListProducts from "./_components/list-products"
import ListBrands from "./_components/list-brands"
import Image from "next/image"

export default function LandingPage() {

	return (
		<React.Fragment>
			{/* Header Section */}
			<header className="bg-[#EFF3FA] pt-8 pb-12">
				{/* Navbar */}
				<Navbar />

				{/* Hero Section */}
				<div className="container max-w-[1130px] mx-auto flex items-center justify-between gap-4 mt-12">
					{/* Text Block */}
					<div className="flex flex-col gap-6">
						<div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white w-fit">
							<Image
								src="/assets/icons/crown.svg"
								width={22}
								height={22}
								alt="Best Seller Icon"
								className="object-contain"
							/>
							<p className="font-semibold text-sm">Produk Terlaris Di Toko Dumain 2</p>
						</div>

						<div className="flex flex-col gap-3">
							<h1 className="font-bold text-5xl leading-tight">Crunchy Hotzz</h1>
							<p className="text-lg text-[#6A7789]">
								Naget Ayam Kombinasi Renyah yang enak di makan lezat dan bergizi tanpa formalin dan bahan pengawet
							</p>
						</div>

						{/* Action Buttons */}
						<div className="flex items-center gap-3">
							<a href="#" className="px-6 py-4 rounded-full bg-[#0D5CD7] text-white font-semibold">
								Add to Cart
							</a>
							<a href="#" className="px-6 py-4 rounded-full bg-white font-semibold">
								View Details
							</a>
						</div>
					</div>

					{/* Banner Image */}
					<div className="w-[400px] h-[360px] relative overflow-hidden">
						<Image
							src="/assets/banners/banner.jpg"
							className="object-contain w-full h-full"
							alt="Banner"
							fill
						/>
						{/* Guarantee Box */}
						<div className="absolute top-[30%] right-0 bg-white p-4 rounded-3xl flex flex-col items-center gap-2">
							<div className="w-12 h-12 bg-[#FFC736] rounded-full flex items-center justify-center overflow-hidden">
								<Image
									src="/assets/icons/star-outline.svg"
									alt="Guarantee Icon"
									className="w-6 h-6"
									width={22}
									height={22}
								/>
							</div>
							<p className="font-semibold text-sm text-center">Garansi <br /> Pengiriman</p>
						</div>
					</div>
				</div>
			</header>

			{/* Content Section */}
			<section className="container max-w-[1130px] mx-auto flex flex-col gap-12 pt-12 pb-24">
				{/* Category List */}
				<Suspense fallback={<div className="text-center">Loading Categories...</div>}>
					<ListCategory />
				</Suspense>

				{/* Product List */}
				<Suspense fallback={<div className="text-center">Loading Products...</div>}>
					<ListProducts
						title={
							<>
								Paling Banyak Dipilih <br /> Produk Berkualitas
							</>
						}
					/>
				</Suspense>

				{/* Brand List */}
				<Suspense fallback={<div className="text-center">Loading Brands...</div>}>
					<ListBrands />
				</Suspense>
			</section>
		</React.Fragment>
	)
}
