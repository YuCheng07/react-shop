import Nav from '@/components/Nav.jsx'
import MainFooter from '@/components/MainFooter.jsx'
import CheckoutAddress from '@/components/CheckoutContent/CheckoutAddress.jsx'
import CheckoutSummary from '@/components/CheckoutContent/CheckoutSummary.jsx'
import CheckoutCartList from '@/components/CheckoutContent/CheckoutCartList.jsx'
import CheckoutPayment from '@/components/CheckoutContent/CheckoutPayment.jsx'
import CheckoutReceipt from '@/components/CheckoutContent/CheckoutReceipt.jsx'
import RocketBtn from '@/components/RocketBtn'
import { useSelector, useDispatch } from 'react-redux'
import { setCartList } from '@/store/slices/cartSlice.js'
import { useEffect } from 'react' 
import { setCheckoutStage } from '@/store/slices/checkoutSlice.js'

function Checkout() {
	const { checkoutStage } = useSelector((state) => state.checkout)
	const { cartList } = useSelector((state) => state.cart)
	const dispatch = useDispatch()

	useEffect(() => {
		const saveCartList = JSON.parse(localStorage.getItem('cartList'))
		if (saveCartList) {
			dispatch(setCartList(saveCartList))
		}
		dispatch(setCheckoutStage('address'))
	}, [])

	return (
		<div className="page-container bg-[#A99985]">
			<header className="w-full">
				<Nav className="mx-auto" />
			</header>
			<main className="mx-auto bg-[#F5F1ED] w-[1024px] min-h-100 pb-[39px]">
				<section>
					<div className="w-full flex justify-center items-start gap-5">
						{checkoutStage === 'address' && <CheckoutAddress setCheckoutStage={setCheckoutStage} />}
						{checkoutStage === 'payment' && <CheckoutPayment setCheckoutStage={setCheckoutStage} />}
						{checkoutStage === 'receipt' && <CheckoutReceipt setCheckoutStage={setCheckoutStage} />}
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
			<RocketBtn />
		</div>
	)
}

export default Checkout
