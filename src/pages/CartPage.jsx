import Nav from '@/components/Nav.jsx'
import MainFooter from '@/components/MainFooter.jsx'
import CartItem from '@/components/CartPage/CartItem.jsx'
import CartCheckout from '@/components/CartPage/CartCheckout.jsx'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { setCartList } from '@/store/slices/cartSlice'

function CartPage() {
	const { cartList } = useSelector((state) => state.cart)
	const dispatch = useDispatch()

	useEffect(() => {
		console.log(cartList)
	}, [cartList])

	
	useEffect(()=> {
		const saveCartList = JSON.parse(localStorage.getItem('cartList'))
		if(saveCartList){
			dispatch(setCartList(saveCartList))
		}
	},[])

	return (
		<div className="page-container">
			<header className="w-full">
				<Nav className="mx-auto" />
			</header>
			<main className="mx-auto bg-[#F5F1ED] w-[1024px] min-h-100 pb-[39px]">
				<section>
					<div className="w-full flex justify-center items-start gap-5">
						<div className="w-[620px] text-[#252323] flex justify-start items-center flex-col">
							<h2 className="w-full py-4 mb-[33px] text-[#252323] text-2xl font-extrabold bg-[#DAD2BC] flex justify-center items-center rounded-xl">
								您的購物車
							</h2>
							{cartList.length > 0 ? (
								<div className="divide-y w-full">
									{cartList.map((item, index) => {
										return <CartItem key={item.id} itemData={item} />
									})}
								</div>
							) : (
								<div className=" text-4xl">購物車內目前沒有商品!</div>
							)}
						</div>
						<CartCheckout />
					</div>
				</section>
			</main>
			<footer className="w-full">
				<MainFooter className="mx-auto" />
			</footer>
		</div>
	)
}
export default CartPage
