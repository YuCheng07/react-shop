import { Link } from 'react-router'
import { useSelector } from 'react-redux'
import { useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router'
import Swal from 'sweetalert2'

function CartCheckout() {
	const { cartList } = useSelector((state) => state.cart)
	const { userIsLogin } = useSelector((state) => state.user)
	const navigate = useNavigate()

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

	const handleCheckout = () => {
		if (cartList.length > 0 && userIsLogin) {
			navigate('/checkout')
		} else if (cartList.length === 0) {
			Swal.fire({
				title: '提醒您!',
				text: '購物車內無任何商品',
				icon: 'error',
				confirmButtonText: '確認',
			})
		} else if (!userIsLogin) {
			Swal.fire({
				title: '提醒您!',
				text: '請先登入再結帳!',
				icon: 'error',
				confirmButtonText: '確認',
			})
		}
	}

	return (
		<div className="w-[300px] bg-[#252323] flex justify-start items-center flex-col rounded-xl overflow-hidden select-none">
			<div className="w-full px-4.5">
				<h2 className="w-full text-2xl text-white font-extrabold py-4 border-b-1 border-white flex justify-center mb-4">
					訂單摘要
				</h2>
				<div className="flex justify-between items-center text-[#EAF0ED] mb-2">
					<h3>小計</h3>
					{cartListTotal > 0 ? <p>NT$ {cartListTotal}</p> : <p>NT$ 0</p>}
				</div>
				<div className="flex justify-between items-center text-[#EAF0ED] mb-4">
					<h3>運費</h3>
					{cartListTotal > 0 ? <p>NT$ 300</p> : <p>NT$ 0</p>}
				</div>
				<div className="flex justify-between items-center text-white text-xl font-extrabold mb-4">
					<h3>總計</h3>
					{checkoutTotal > 0 ? <p>NT$ {checkoutTotal}</p> : <p>NT$ 0</p>}
				</div>
			</div>
			<div
				onClick={handleCheckout}
				className="w-full py-4 bg-[#DAD2BC] text-2xl text-[#252323] font-extrabold flex justify-center items-center mt-auto hover:cursor-pointer"
			>
				結帳
			</div>
		</div>
	)
}

export default CartCheckout
