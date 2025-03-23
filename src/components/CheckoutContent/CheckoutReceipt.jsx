import Check from '@/components/icon/Check.jsx'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setReceiptType, setReceiptInfo } from '@/store/slices/checkoutSlice.js'
import Swal from 'sweetalert2'

function CheckoutReceipt({ setCheckoutStage }) {
	const dispatch = useDispatch()
	const { receiptType } = useSelector((state) => state.checkout)
	const [email, setEmail] = useState('')
	const [cityName, setCityName] = useState('')
	const [streetName, setStreetName] = useState('')
	const [addressLine, setAddressLine] = useState('')
	const [sameAddress, setSameAddress] = useState(false)
	const [businessNum, setBusinessNum] = useState('')

	const { receiptInfo } = useSelector((state) => state.checkout)

	const citys = [
		{ id: 1, name: '臺北市' },
		{ id: 2, name: '新北市' },
		{ id: 3, name: '桃園市' },
		{ id: 4, name: '臺中市' },
		{ id: 5, name: '臺南市' },
		{ id: 6, name: '高雄市' },
		{ id: 7, name: '基隆市' },
		{ id: 8, name: '新竹市' },
		{ id: 9, name: '嘉義市' },
		{ id: 10, name: '新竹縣' },
		{ id: 11, name: '苗栗縣' },
		{ id: 12, name: '彰化縣' },
		{ id: 13, name: '南投縣' },
		{ id: 14, name: '雲林縣' },
		{ id: 15, name: '嘉義縣' },
		{ id: 16, name: '屏東縣' },
		{ id: 17, name: '宜蘭縣' },
		{ id: 18, name: '花蓮縣' },
		{ id: 19, name: '臺東縣' },
		{ id: 20, name: '澎湖縣' },
	]

	const handleNextStepBtn = () => {
		const receipt = {
			email: `${email}`,
			address: `${cityName},${streetName},${addressLine}`,
			businessNum: `${businessNum}`,
		}

		if (receiptType === 'email') {
			if (receipt.email !== '') {
				const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
				if (emailRegex.test(receipt.email)) {
					dispatch(setReceiptInfo(receipt))
					dispatch(setCheckoutStage('payment'))
				} else {
					Swal.fire({
						icon: 'error',
						title: '提醒您!',
						text: '信箱格式有誤',
					})
				}
			} else {
				Swal.fire({
					title: '提醒您!',
					text: '請檢查信箱不能為空',
					icon: 'error',
					confirmButtonText: '確認',
				})
			}
		} else if (receiptType === 'paper') {
			if (receiptInfo.email !== '') {
				dispatch(setReceiptInfo(receipt))
				dispatch(setCheckoutStage('payment'))
			} else {
				Swal.fire({
					title: '提醒您!',
					text: '請檢查地址不能為空',
					icon: 'error',
					confirmButtonText: '確認',
				})
			}
		}
	}

	useEffect(() => {
		if (
			receiptInfo.email !== '' ||
			receiptInfo.address !== '' ||
			receiptInfo.businessNum !== ''
		) {
			const rememberEmail = receiptInfo.email
			setEmail(rememberEmail || '')
			const rememberAddress = receiptInfo.address.split(',')
			setCityName(rememberAddress[0] || '')
			setStreetName(rememberAddress[1] || '')
			setAddressLine(rememberAddress[2] || '')
			const rememberBusinessNum = receiptInfo.businessNum
			setBusinessNum(rememberBusinessNum || '')
		}
	}, [])

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
							<div className="absolute w-4/5 h-4/5 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white rounded-2xl"></div>
						</div>
						<div className="relative top-[-50%] w-5 h-5 border-1 border-[#8DA291] bg-[#252323] rounded-2xl">
							<div className="absolute w-4/5 h-4/5 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-[#252323] rounded-2xl"></div>
						</div>
					</div>
				</div>
				<div className="w-full grid grid-cols-2 border-1 border-[#EAF0ED] box-border mb-7.5">
					<button
						onClick={() => dispatch(setReceiptType('email'))}
						className={`text-xl font-extrabold w-full h-14 transition-all duration-200 ${
							receiptType === 'email'
								? 'text-[#252323] bg-[#EAF0ED]'
								: 'text-white'
						} hover:cursor-pointer`}
					>
						電子發票
					</button>
					<button
						onClick={() => dispatch(setReceiptType('paper'))}
						className={`text-xl font-extrabold w-full h-14 transition-all duration-200 ${
							receiptType === 'paper'
								? 'text-[#252323] bg-[#EAF0ED]'
								: 'text-white'
						} hover:cursor-pointer`}
					>
						郵寄發票
					</button>
				</div>
				<div className="flex flex-col items-center gap-4">
					{receiptType === 'email' && (
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
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									/>
								</div>
							</div>
						</div>
					)}
					{receiptType === 'paper' && (
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
										value={cityName}
										onChange={(e) => setCityName(e.target.value)}
									>
										{citys ? (
											<>
												<option value="" disabled>
													請選擇縣市
												</option>
												{citys.map((item) => {
													return (
														<option value={item.name} key={item.id}>
															{item.name}
														</option>
													)
												})}
											</>
										) : (
											<option value="" disabled>
												請選擇縣市
											</option>
										)}
									</select>
									<input
										name=""
										id=""
										className="w-full h-14 bg-[#EAF0ED] placeholder-[#8DA291] outline-0 text-[#252323] px-5"
										value={streetName}
										onChange={(e) => setStreetName(e.target.value)}
										placeholder="XX區"
									/>
								</div>
								<input
									type="text"
									placeholder="內湖路一段XX號"
									className="w-full h-14 bg-[#EAF0ED] placeholder-[#8DA291] outline-0 text-[#252323] px-5"
									value={addressLine}
									onChange={(e) => setAddressLine(e.target.value)}
								/>
							</div>
						</div>
					)}
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
									value={businessNum}
									onChange={(e) => setBusinessNum(e.target.value)}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
			<button
				onClick={handleNextStepBtn}
				className="w-full h-[65px] bg-[#DAD2BC] text-2xl text-[#252323] font-extrabold flex justify-center items-center mt-auto hover:cursor-pointer"
			>
				確認結帳
			</button>
		</div>
	)
}

export default CheckoutReceipt
