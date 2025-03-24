import Check from '@/components/icon/Check.jsx'
import CreditCard from '@/components/icon/CreditCard.jsx'
import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import axios from 'axios'
import { setPaymentUrlInfo } from '@/store/slices/checkoutSlice'

function CheckoutPayment({ setCheckoutStage }) {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const API_URL = import.meta.env.VITE_API_URL
	const { orderInfo, receiptInfo } = useSelector((state) => state.checkout)
	const { cartList } = useSelector((state) => state.cart)
	console.log(orderInfo, receiptInfo);
	

	const handleNextStepBtn = async () => {
		try {
			const res = await sendOrder()
		} catch (error) {
			console.log(error)
		}
	}	

	const sendOrder = async () => {
		const simpleCartList = cartList.map((item) => {
			return {
				id: item.id,
				name: item.name,
				quantity: item.quantity,
			}
		})
		
		const priceArray = cartList.map((item) => {
			item.price * item.quantity
		})
		const priceTotal = priceArray.reduce((acc, cur) => acc + cur, 0)
		try {
			const res = await axios.post(
				`${API_URL}/api/payment/create-order/newebpay`,
				{
					headers: {
						Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
						'Content-Type': 'application/json',
					}
				},
				{
					priceTotal: priceTotal,
					cartList: simpleCartList,
					orderInfo: orderInfo,
					receiptInfo: receiptInfo,
				}
			)
			console.log(res)
			if (res.data.status === 'success') {
				dispatch(setPaymentUrlInfo(res.data.data.paymentUrl))
				navigate('/newebpay-payment')
			}
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		handleNextStepBtn()
	}, [])

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
			</div>
			<div className=" w-full px-10 mb-[30px]">
				<div className="w-full h-20 text-white text-5xl font-bold text-center">
					付款頁面跳轉中...
				</div>
			</div>
			<button className="w-full h-[65px] bg-[#DAD2BC] text-2xl text-[#252323] font-extrabold flex justify-center items-center mt-auto hover:cursor-pointer">
				請稍等片刻
			</button>
		</div>
	)
}

export default CheckoutPayment
