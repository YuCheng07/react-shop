import Nav from '@/components/Nav.jsx'
import MainFooter from '@/components/MainFooter.jsx'
import Check from '@/components/icon/Check.jsx'

import { Link } from "react-router"

function SuccessPage() {
	return (
		<div className="page-container">
			<header className="w-full">
				<Nav className="mx-auto" />
			</header>
			<main className="mx-auto bg-[#F5F1ED] w-[1024px] min-h-100 px-[42px] pb-15">
				<section>
					<div className="relative mx-auto w-235 h-115 mb-7.5">
						<img
							src="https://bit.ly/2P7GhNd"
							alt=""
							className="w-full h-full object-center"
						/>
						<div className="absolute top-0 left-0 w-full h-full flex justify-center items-center flex-col">
							<div className="w-[190px] flex justify-between items-center border-t-1 border-[#252323]">
								<div className="relative top-[-50%] w-5 h-5 border-1 border-[#8DA291] bg-[#252323] rounded-2xl">
									<div className="absolute w-full h-full top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-[#252323] rounded-2xl">
										<div className="w-full h-full flex justify-center items-center">
											<Check className="fill-white w-4/5 h-4/5" />
										</div>
									</div>
								</div>
								<div className="relative top-[-50%] w-5 h-5 border-1 border-[#8DA291] bg-[#252323] rounded-2xl">
									<div className="absolute w-full h-full top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-[#252323] rounded-2xl">
										<div className="w-full h-full flex justify-center items-center">
											<Check className="fill-white w-4/5 h-4/5" />
										</div>
									</div>
								</div>
								<div className="relative top-[-50%] w-5 h-5 border-1 border-[#8DA291] bg-[#252323] rounded-2xl">
									<div className="absolute w-4/5 h-4/5 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-[#252323] rounded-2xl">
										<div className="w-full h-full flex justify-center items-center">
											<Check className="fill-white w-4/5 h-4/5" />
										</div>
									</div>
								</div>
							</div>
							<h1 className="text-5xl font-extrabold text-[#252323] mb-[51px]">
								付款成功
							</h1>
							<Link
								to="/"
								className="w-[300px] py-4 bg-[#DAD2BC] text-2xl text-[#252323] font-extrabold flex justify-center items-center rounded-xl hover:cursor-pointer"
							>
								繼續逛逛
							</Link>
						</div>
					</div>
				</section>
			</main>
			<footer className="w-full">
				<MainFooter className="mx-auto" />
			</footer>
		</div>
	)
}

export default SuccessPage
