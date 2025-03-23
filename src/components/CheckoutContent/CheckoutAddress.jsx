import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { setOrderInfo } from '@/store/slices/checkoutSlice'

function CheckoutAddress({ setCheckoutStage }) {
	const [lastName, setLastName] = useState('')
	const [firstName, setFirstName] = useState('')
	const [phone, setPhone] = useState('')
	const [cityName, setCityName] = useState('')
	const [streetName, setStreetName] = useState('')
	const [addressLine, setAddressLine] = useState('')

	const { orderInfo } = useSelector((state) => state.checkout)

	const navigate = useNavigate()
	const dispatch = useDispatch()

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
		const order = {
			name: `${lastName},${firstName}`,
			phone: `${phone}`,
			address: `${cityName},${streetName},${addressLine}`,
		}

		if (
			order.name !== '' &&
			order.phone !== '' &&
			order.address !== ''
		) {
			const phoneRegex = /^09\d{8}$/
			if (phoneRegex.test(order.phone)) {
				dispatch(setOrderInfo(order))
				dispatch(setCheckoutStage('receipt'))
			} else {
				Swal.fire({
					icon: 'error',
					title: '提醒您!',
					text: '手機格式有誤',
				})
			}
		} else {
			Swal.fire({
				title: '提醒您!',
				text: '請檢查每項資料不能為空',
				icon: 'error',
				confirmButtonText: '確認',
			})
		}
	}

	const getPhoneNum = (phoneNum) => {
		const phoneNumArray = phoneNum.split('').map((item) => Number(item))
		const checkAllNum = phoneNumArray.find((item) => Number.isNaN(item))

		if (!Number.isNaN(checkAllNum)) {
			setPhone(phoneNum)
		} else {
			Swal.fire({
				icon: 'error',
				title: '提醒您!',
				text: '請輸入數字',
			})
		}
	}

	useEffect(() => {
		if (
			orderInfo.name !== '' ||
			orderInfo.Phone !== '' ||
			orderInfo.address !== ''
		) {
			const rememberName = orderInfo.name.split(',')
			setLastName(rememberName[0] || '')
			setFirstName(rememberName[1] || '')
			const rememberPhone = orderInfo.phone
			setPhone(rememberPhone || '')
			const rememberAddress = orderInfo.address.split(',')
			setCityName(rememberAddress[0] || '')
			setStreetName(rememberAddress[1] || '')
			setAddressLine(rememberAddress[2] || '')
		}
	}, [])

	return (
		<>
			<div className="w-[460px] bg-[#252323] flex justify-start items-center flex-col overflow-hidden rounded-xl">
				<div className="bg-[#252323] w-full px-10 py-[30px]">
					<div className="relative w-full flex items-center mb-[30px]">
						<h2 className="text-white text-4xl font-extrabold">運送</h2>
						<div className="absolute w-[170px] h-full top-1/2 right-0 flex justify-between items-center border-t-1 border-white">
							<div className="relative top-[-50%] w-5 h-5 border-1 border-[#8DA291] bg-[#252323] rounded-2xl">
								<div className="absolute w-4/5 h-4/5 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white rounded-2xl"></div>
							</div>
							<div className="relative top-[-50%] w-5 h-5 border-1 border-[#8DA291] bg-[#252323] rounded-2xl">
								<div className="absolute w-4/5 h-4/5 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-[#252323] rounded-2xl"></div>
							</div>
							<div className="relative top-[-50%] w-5 h-5 border-1 border-[#8DA291] bg-[#252323] rounded-2xl">
								<div className="absolute w-4/5 h-4/5 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-[#252323] rounded-2xl"></div>
							</div>
						</div>
					</div>
					<div className="flex flex-col items-center gap-4">
						<div className="w-full grid grid-cols-2 gap-2">
							<div className="flex justify-center items-start flex-col gap-2">
								<h3 className="text-xl font-extrabold text-white">姓氏</h3>
								<input
									type="text"
									placeholder="王"
									className="w-full h-14 bg-[#EAF0ED] placeholder-[#8DA291] outline-0 text-[#252323] px-5"
									value={lastName}
									onChange={(e) => setLastName(e.target.value)}
								/>
							</div>
							<div className="flex justify-center items-start flex-col gap-2">
								<h3 className="text-xl font-extrabold text-white">名字</h3>
								<input
									type="text"
									placeholder="小明"
									className="w-full h-14 bg-[#EAF0ED] placeholder-[#8DA291] outline-0 text-[#252323] px-5"
									value={firstName}
									onChange={(e) => setFirstName(e.target.value)}
								/>
							</div>
						</div>
						<div className="w-full grid grid-cols-1 gap-2">
							<div className="w-full flex justify-center items-start flex-col gap-2">
								<h3 className="text-xl font-extrabold text-white">電話</h3>
								<input
									type="text"
									placeholder="0912-345-678"
									className="w-full h-14 bg-[#EAF0ED] placeholder-[#8DA291] outline-0 text-[#252323] px-5"
									value={phone}
									onChange={(e) => getPhoneNum(e.target.value)}
									maxLength="10"
								/>
							</div>
						</div>
						<div className="w-full grid grid-cols-1 gap-2">
							<div className="flex justify-center items-start flex-col gap-2">
								<h3 className="text-xl font-extrabold text-white">地址</h3>
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
					</div>
				</div>
				<button
					onClick={handleNextStepBtn}
					className="w-full h-[65px] bg-[#DAD2BC] text-2xl text-[#252323] font-extrabold flex justify-center items-center mt-auto hover:cursor-pointer"
				>
					下一步
				</button>
			</div>
			{/* <div className='fixed top-0 left-0 w-full h-dvh z-10'>
				<div className='w-50 h-40 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] border-2 grid grid-cols-2' >
						<div className='bg-amber-200'>1</div>
						<div className='bg-amber-600'>2</div>
						<div className='bg-blue-400'>3</div>
						<div className='bg-cyan-800'>4</div>
				</div>
			</div> */}
		</>
	)
}

export default CheckoutAddress
