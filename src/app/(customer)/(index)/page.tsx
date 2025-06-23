import React, { Suspense } from "react";
import Navbar from "./_components/navbar";
import ListCategory from "./_components/list-category";
import ListProducts from "./_components/list-products";
import ListBrands from "./_components/list-brands";

export default function LandingPage() {
	return (
		<>
			<header className="bg-[#EFF3FA] pt-[30px] pb-[50px]">
				<Navbar />
				<div className="container max-w-[1130px] mx-auto flex items-center justify-between gap-1 mt-[50px]">
					<div className="flex flex-col gap-[30px]">
						<div className="flex items-center gap-[10px] p-[8px_16px] rounded-full bg-white w-fit">
							<div className="w-[22px] h-[22px] flex shrink-0">
								<img src="assets/icons/crown.svg" alt="icon" />
							</div>
							<p className="font-semibold text-sm">
								Produk Terlaris Di Toko Dumain 2
							</p>
						</div>
						<div className="flex flex-col gap-[14px]">
							<h1 className="font-bold text-[55px] leading-[55px]">
								Crunchy Hotzz
							</h1>
							<p className="text-lg leading-[34px] text-[#6A7789]">
								Naget Ayam Kombinasi Renyah yang enak di makan lezat dan bergizi tanpa formalin dan bahan pengawet
							</p>
						</div>
						<div className="flex items-center gap-3">
							<a
								href=""
								className="p-[18px_24px] rounded-full font-semibold bg-[#0D5CD7] text-white"
							>
								Add to Cart
							</a>
							<a
								href=""
								className="p-[18px_24px] rounded-full font-semibold bg-white"
							>
								View Details
							</a>
						</div>
					</div>
					<div className="w-[400px] h-[360px] flex shrink-0 overflow-hidden relative">
						<img
							src="assets/banners/banner.jpg"
							className="object-contain"
							alt="icon"
						/>
					
						<div className="absolute right-0 top-[30%] bg-white p-[14px_16px] rounded-3xl flex flex-col items-center gap-[10px]">
							<div className="w-12 h-12 flex shrink-0 rounded-full items-center justify-center bg-[#FFC736] overflow-hidden">
								<img
									src="assets/icons/star-outline.svg"
									className="w-6 h-6"
									alt="icon"
								/>
							</div>
							<p className="font-semibold text-sm text-center">
								Garansi <br /> Pengiriman 
							</p>
						</div>
					</div>
				</div>
				{/* <div className="container max-w-[1130px] mx-auto flex items-center justify-center gap-10 mt-[50px]">
					<div className="flex items-center gap-[10px]">
						<div className="w-[50px] h-[50px] flex shrink-0 rounded-full border-[5px] border-white overflow-hidden">
							<img
								src="assets/photos/p1.png"
								className="w-full h-full object-cover"
								alt="photo"
							/>
						</div>
						<div className="flex flex-col gap-[2px]">
							<p className="font-semibold text-sm leading-[22px]">
								Awesome product!
							</p>
							<p className="text-xs leading-[18px]">
								Jemmie Pemilia
							</p>
						</div>
					</div>
					<div className="flex items-center gap-[10px]">
						<div className="w-[50px] h-[50px] flex shrink-0 rounded-full border-[5px] border-white overflow-hidden">
							<img
								src="assets/photos/p2.png"
								className="w-full h-full object-cover"
								alt="photo"
							/>
						</div>
						<div className="flex flex-col gap-[2px]">
							<p className="font-semibold text-sm leading-[22px]">
								Money saver 25%
							</p>
							<p className="text-xs leading-[18px]">
								Angga Risky
							</p>
						</div>
					</div>
					<div className="flex items-center gap-[10px]">
						<div className="w-[50px] h-[50px] flex shrink-0 rounded-full border-[5px] border-white overflow-hidden">
							<img
								src="assets/photos/p3.png"
								className="w-full h-full object-cover"
								alt="photo"
							/>
						</div>
						<div className="flex flex-col gap-[2px]">
							<p className="font-semibold text-sm leading-[22px]">
								I love the warranty
							</p>
							<p className="text-xs leading-[18px]">
								Petina Malaka
							</p>
						</div>
					</div>
					<div className="flex items-center gap-[10px]">
						<div className="w-[50px] h-[50px] flex shrink-0 rounded-full border-[5px] border-white overflow-hidden">
							<img
								src="assets/photos/p4.png"
								className="w-full h-full object-cover"
								alt="photo"
							/>
						</div>
						<div className="flex flex-col gap-[2px]">
							<p className="font-semibold text-sm leading-[22px]">
								Big deals ever!
							</p>
							<p className="text-xs leading-[18px]">
								Udin Sarifun
							</p>
						</div>
					</div>
				</div> */}
			</header>
			<section
				id="content"
				className="container max-w-[1130px] mx-auto flex flex-col gap-[50px] pt-[50px] pb-[100px]"
			>
				<Suspense fallback={<span>Loading...</span>}>
					<ListCategory />
				</Suspense>
				<Suspense fallback={<span>Loading...</span>}>

                <ListProducts
					title={
						<>
							Paling Banyak Dipilih <br /> Produk Berkualitas
						</>
					}
				/>
                </Suspense>
				
                    <Suspense fallback={<span>Loading...</span>}>
                    <ListBrands />
                    </Suspense>

				<Suspense fallback={<span>Loading...</span>}>
                {/* <ListProducts
					title={
						<>
							New Releases <br /> From Official Stores
						</>
					}
				/> */}
                </Suspense>
			</section>
		</>
	);
}
