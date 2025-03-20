import { useSelector, useDispatch } from 'react-redux'

function CheckoutCartList() {
	const { cartList } = useSelector((state) => state.cart)

	return (
		<div className="border-[#DAD2BC] border-1 box-border w-full overflow-hidden rounded-xl">
			<h3 className="w-full flex justify-center items-center py-4 text-2xl text-[#252323] font-extrabold bg-[#DAD2BC]">
				購物清單
			</h3>
			<div className="w-full py-4 px-5">
				<div className="w-full flex flex-col items-center gap-4">
					{cartList.map((item, index) => (
						<div
							className="w-full h-20 flex justify-between items-center text-[#252323]"
							key={index}
						>
							<div className="min-w-30 h-20">
								<img
									src="https://bit.ly/2QiWeQW"
									alt=""
									className="w-full h-full object-cover object-center"
								/>
							</div>
							<div className="w-full flex flex-col py-4 pl-5 text-[#252323]">
								<h4>{item.name}</h4>
								<p className="text-xl font-extrabold">
									NT$ {item.price * item.quantity}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
export default CheckoutCartList
