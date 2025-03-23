import Check from '@/components/icon/Check.jsx'
import CreditCard from '@/components/icon/CreditCard.jsx'
import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'

function CheckoutPayment({ setCheckoutStage }) {
	const [creditCardNum, setCreditCardNum] = useState('')
	const [lastName, setLastName] = useState('')
	const [firstName, setFirstName] = useState('')
	const [expMonth, setExpMonth] = useState('')
	const [expYear, setExpYear] = useState('')
	const [lastThreeNum, setlastThreeNum] = useState('')
	const thisYear = new Date().getFullYear()
	const dispatch = useDispatch()

	const expYearList = useMemo(() => {
		const range = 30
		const yearList = []
		for (let i = 1; i <= range; i++) {
			yearList.push(thisYear + i)
		}
		return yearList
	}, [thisYear])

	const getCreditCardNum = (cardNumber) => {
		const numberArray = cardNumber.split('').filter((item) => item !== '-')

		const cardNumberArray = numberArray.map((item) => Number(item))
		const checkAllNum = cardNumberArray.find((item) => Number.isNaN(item))

		if (!Number.isNaN(checkAllNum)) {
			if (numberArray.length <= 16) {
				const newNumArray = []
				for (let i = 0; i < numberArray.length; i++) {
					if (i < 4) {
						newNumArray.push(numberArray[i])
					} else {
						if ((i + 1) % 4 === 1) {
							newNumArray.push('-')
							newNumArray.push(numberArray[i])
						} else {
							newNumArray.push(numberArray[i])
						}
					}
				}
				setCreditCardNum(newNumArray.join(''))
			}
		} else {
			Swal.fire({
				icon: 'error',
				title: '提醒您!',
				text: '請輸入數字',
			})
		}
	}

	const getLastThreeNum = (threeNum) => {
		const threeNumArray = threeNum.split('').map((item) => Number(item))
		const checkAllNum = threeNumArray.find((item) => Number.isNaN(item))

		if (!Number.isNaN(checkAllNum)) {
			setlastThreeNum(threeNum)
		} else {
			Swal.fire({
				icon: 'error',
				title: '提醒您!',
				text: '請輸入數字',
			})
		}
	}

	const handleNextStepBtn = () => {
		dispatch(setCheckoutStage('payment'))
	}

	return (
		<div className="w-[460px] bg-[#252323] flex justify-start items-center flex-col overflow-hidden rounded-xl">
			<div className="bg-[#252323] w-full px-10 py-[30px]">
				<div className="relative w-full flex items-center mb-[30px]">
					<h2 className="text-white text-4xl font-extrabold">付款</h2>
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
				<div className="flex flex-col items-center gap-4">
					<div className="w-full grid grid-cols-1 gap-2">
						<div className="w-full flex justify-center items-start flex-col gap-2">
							<h3 className="text-xl font-extrabold text-white">信用卡卡號</h3>
							<div className="w-full flex justify-between items-center bg-[#EAF0ED] px-5">
								<input
									type="text"
									placeholder="9012-3456-7890-1234"
									className="w-full h-14 bg-[#EAF0ED] placeholder-[#8DA291] outline-0 text-[#252323]"
									value={creditCardNum}
									onChange={(e) => getCreditCardNum(e.target.value)}
								/>
								<div className="flex justify-center items-center pl-5">
									<CreditCard className="w-5 h-5" />
								</div>
							</div>
						</div>
					</div>

					<div className="w-full grid grid-cols-1 gap-2">
						<div className="flex justify-center items-start flex-col gap-2">
							<h3 className="text-xl font-extrabold text-white">持卡人姓名</h3>
							<div className="w-full flex items-center gap-2">
								<input
									type="text"
									placeholder="王"
									className="w-full h-14 bg-[#EAF0ED] placeholder-[#8DA291] outline-0 text-[#252323] px-5"
									value={lastName}
									onChange={(e) => setLastName(e.target.value)}
								/>
								<input
									type="text"
									placeholder="小明"
									className="w-full h-14 bg-[#EAF0ED] placeholder-[#8DA291] outline-0 text-[#252323] px-5"
									value={firstName}
									onChange={(e) => setFirstName(e.target.value)}
								/>
							</div>
						</div>
					</div>

					<div className="w-full grid grid-cols-1 gap-2">
						<div className="flex justify-center items-start flex-col gap-2">
							<h3 className="text-xl font-extrabold text-white">有效期限</h3>
							<div className="w-full flex items-center gap-2">
								<select
									name=""
									id=""
									className="w-full h-14 bg-[#EAF0ED] placeholder-[#8DA291] outline-0 text-[#252323] px-5"
									value={expMonth}
									onChange={(e) => setExpMonth(e.target.value)}
								>
									<option value="" disabled>
										月
									</option>
									{[...Array(12)].map((_, index) => (
										<option value={index + 1} key={index + 1}>
											{index + 1}
										</option>
									))}
								</select>
								<select
									name=""
									id=""
									className="w-full h-14 bg-[#EAF0ED] placeholder-[#8DA291] outline-0 text-[#252323] px-5"
									value={expYear}
									onChange={(e) => setExpYear(e.target.value)}
								>
									<option value="" disabled>
										年
									</option>
									{expYearList.map((item, index) => (
										<option value={item} key={index}>
											{item}
										</option>
									))}
								</select>
							</div>
						</div>
					</div>

					<div className="w-full grid grid-cols-1 gap-2">
						<div className="flex justify-center items-start flex-col gap-2">
							<h3 className="text-xl font-extrabold text-white">背面末三碼</h3>
							<div className="w-full flex items-center gap-2">
								<input
									type="text"
									placeholder="123"
									className="w-full h-14 bg-[#EAF0ED] placeholder-[#8DA291] outline-0 text-[#252323] px-5"
									maxLength="3"
									value={lastThreeNum}
									onChange={(e) => getLastThreeNum(e.target.value)}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
			<button onClick={handleNextStepBtn} className="w-full h-[65px] bg-[#DAD2BC] text-2xl text-[#252323] font-extrabold flex justify-center items-center mt-auto hover:cursor-pointer">
				下一步
			</button>
		</div>
	)
}

export default CheckoutPayment
