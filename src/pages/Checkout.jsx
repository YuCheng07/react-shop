import Nav from '@/components/Nav.jsx'
import MainFooter from '@/components/MainFooter.jsx'
import CheckoutAddress from '@/components/CheckoutContent/CheckoutAddress.jsx'
import CheckoutSummary from '@/components/CheckoutContent/CheckoutSummary.jsx'
import CheckoutCartList from '@/components/CheckoutContent/CheckoutCartList.jsx'
import CheckoutPayment from '@/components/CheckoutContent/CheckoutPayment.jsx'
import CheckoutReceipt from '@/components/CheckoutContent/CheckoutReceipt.jsx'
import { useSelector, useDispatch } from 'react-redux'
import { setCartList } from '@/store/slices/cartSlice'
import { useEffect } from 'react' 

function Checkout() {
	const { checkoutStage } = useSelector((state) => state.checkout)
	const { cartList } = useSelector((state) => state.cart)
	const dispatch = useDispatch()

	useEffect(() => {
		const saveCartList = JSON.parse(localStorage.getItem('cartList'))
		if (saveCartList) {
			dispatch(setCartList(saveCartList))
		}
	}, [])

	return (
		<div className="page-container">
			<header className="w-full">
				<Nav className="mx-auto" />
			</header>
			<main className="mx-auto bg-[#F5F1ED] w-[1024px] min-h-100 pb-[39px]">
				<section>
					<div className="w-full flex justify-center items-start gap-5">
						{checkoutStage === 'address' && <CheckoutAddress />}
						{checkoutStage === 'Payment' && <CheckoutPayment />}
						{checkoutStage === 'Receipt' && <CheckoutReceipt />}
						<div className="w-[300px] flex justify-start items-center flex-col gap-5">
							<CheckoutSummary />
							<CheckoutCartList />
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

export default Checkout
