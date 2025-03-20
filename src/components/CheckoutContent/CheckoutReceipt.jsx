import Check from '@/components/icon/Check.jsx'
import { Link } from 'react-router'

function CheckoutReceipt() {
	return (
		<div className="w-[460px] bg-[#252323] flex justify-start items-center flex-col overflow-hidden rounded-xl">
			<div className="bg-[#252323] w-full px-10 py-[30px]">
				<div className="relative w-full flex items-center mb-[30px]">
					<h2 className="text-white text-4xl font-extrabold">發票</h2>
					<div className="absolute w-[170px] h-full top-1/2 right-0 flex justify-between items-center border-t-1 border-white">
						<div className="relative top-[-50%] w-5 h-5 border-1 border-[#8DA291] bg-[#252323] rounded-2xl">
							<div className="absolute w-full h-full top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white rounded-2xl">
								<div className="w-full h-full flex justify-center items-center">
									<Check className="fill-[#252323] w-4/5 h-4/5" />
								</div>
							</div>
						</div>
						<div className="relative top-[-50%] w-5 h-5 border-1 border-[#8DA291] bg-[#252323] rounded-2xl">
							<div className="absolute w-full h-full top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white rounded-2xl">
								<div className="w-full h-full flex justify-center items-center">
									<Check className="fill-[#252323] w-4/5 h-4/5" />
								</div>
							</div>
						</div>
						<div className="relative top-[-50%] w-5 h-5 border-1 border-[#8DA291] bg-[#252323] rounded-2xl">
							<div className="absolute w-4/5 h-4/5 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white rounded-2xl"></div>
						</div>
					</div>
				</div>
				<div className="w-full grid grid-cols-2 border-1 border-[#EAF0ED] box-border mb-7.5">
					<button className="text-xl font-extrabold w-full h-14 text-[#252323] bg-[#EAF0ED] hover:cursor-pointer ">
						電子發票
					</button>
					<button className="text-xl font-extrabold w-full h-14 text-white hover:cursor-pointer">
						郵寄發票
					</button>
				</div>
				<div className="flex flex-col items-center gap-4">
					<div className="w-full grid grid-cols-1 gap-2">
						<div className="flex justify-center items-start flex-col gap-2">
							<h3 className="text-xl font-extrabold text-white">
								電子郵件信箱
							</h3>
							<div className="w-full flex items-center gap-2">
								<input
									type="text"
									placeholder="example@email.com"
									className="w-full h-14 bg-[#EAF0ED] placeholder-[#8DA291] outline-0 text-[#252323] px-5"
								/>
							</div>
						</div>
					</div>
					<div className="w-full grid grid-cols-1 gap-2">
						<div className="flex justify-center items-start flex-col gap-2">
							<h3 className="text-xl font-extrabold text-white">
								統一編號 (選填)
							</h3>
							<div className="w-full flex items-center gap-2">
								<input
									type="text"
									placeholder="12345678"
									className="w-full h-14 bg-[#EAF0ED] placeholder-[#8DA291] outline-0 text-[#252323] px-5"
								/>
							</div>
						</div>
					</div>
				</div>

				<div className="flex flex-col items-center gap-4">
					<div className="w-full grid grid-cols-1 gap-2">
						<div className="flex justify-center items-start flex-col gap-2">
							<div className="w-full flex justify-between items-center">
								<h3 className="text-xl font-extrabold text-white">地址</h3>
								<label htmlFor="address" className="flex items-center gap-2">
									<input
										type="checkbox"
										name=""
										id="address"
										className="w-4 h-4"
									/>
									<span className="text-[#EAF0ED] font-extrabold">
										同運送地址
									</span>
								</label>
							</div>
							<div className="w-full flex items-center gap-2">
								<select
									name=""
									id=""
									className="w-full h-14 bg-[#EAF0ED] placeholder-[#8DA291] outline-0 text-[#252323] px-5"
									placeholder="123"
								>
									<option value="">台北市</option>
									<option value="">新北市</option>
								</select>
								<select
									name=""
									id=""
									className="w-full h-14 bg-[#EAF0ED] placeholder-[#8DA291] outline-0 text-[#252323] px-5"
								>
									<option value="">內湖區</option>
									<option value="">大安區</option>
								</select>
							</div>
							<input
								type="text"
								placeholder="內湖路一段XX號"
								className="w-full h-14 bg-[#EAF0ED] placeholder-[#8DA291] outline-0 text-[#252323] px-5"
							/>
						</div>
					</div>
					<div className="w-full grid grid-cols-1 gap-2">
						<div className="flex justify-center items-start flex-col gap-2">
							<h3 className="text-xl font-extrabold text-white">
								統一編號 (選填)
							</h3>
							<div className="w-full flex items-center gap-2">
								<input
									type="text"
									placeholder="12345678"
									className="w-full h-14 bg-[#EAF0ED] placeholder-[#8DA291] outline-0 text-[#252323] px-5"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Link
				to="/checkout-success"
				className="w-full h-[65px] bg-[#DAD2BC] text-2xl text-[#252323] font-extrabold flex justify-center items-center mt-auto hover:cursor-pointer"
			>
				確認結帳
			</Link>
		</div>
	)
}

export default CheckoutReceipt
