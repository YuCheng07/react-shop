import { useSelector } from 'react-redux'
import { useMemo, useEffect } from 'react'

function CheckoutSummary() {
	const { cartList } = useSelector((state) => state.cart)

	const cartListTotal = useMemo(() => {
		const carItemPriceArray = cartList.map((item) => item.price * item.quantity)
		return carItemPriceArray.reduce((acc, cur) => acc + cur, 0)
	}, [cartList])

	const checkoutTotal = useMemo(() => {
		if (cartListTotal > 0) {
			return cartListTotal + 300
		} else {
			return 0
		}
	}, [cartListTotal])


	return (
		<div className="border-[#DAD2BC] border-1 box-border w-full h-[193px] overflow-hidden rounded-xl">
			<h3 className="w-full flex justify-center items-center py-4 text-2xl text-[#252323] font-extrabold bg-[#DAD2BC]">
				訂單摘要
			</h3>
			<div className="w-full py-4 px-5">
				<div className="flex justify-between items-center text-[#252323] mb-2 h-[22px]">
					<h4>小計</h4>
					{cartListTotal > 0 ? <p>NT$ {cartListTotal}</p> : <p>NT$ 0</p>}
				</div>
				<div className="flex justify-between items-center text-[#252323] mb-4 h-[22px]">
					<h4>運算</h4>
					{cartListTotal > 0 ? <p>NT$ 300</p> : <p>NT$ 0</p>}
				</div>
				<div className="flex justify-between items-center text-[#252323] text-xl font-extrabold">
					<h4>總計</h4>
					{checkoutTotal > 0 ? <p>NT$ {checkoutTotal}</p> : <p>NT$ 0</p>}
				</div>
			</div>
		</div>
	)
}

export default CheckoutSummary
