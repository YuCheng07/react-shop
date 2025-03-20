import Minus from '@/components/icon/Minus.jsx'
import Plus from '@/components/icon/Plus.jsx'
import Trash from '@/components/icon/Trash.jsx'
import { useMemo } from 'react'
import {
	removeItemFromCart,
	incrementItemQuantity,
	decrementItemQuantity,
} from '@/store/slices/cartSlice.js'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'

function CartItem({ itemData }) {
	const itemTotalPrice = useMemo(() => {
		return itemData.price * itemData.quantity
	}, [itemData.price, itemData.quantity])

	const dispatch = useDispatch()
	const handleDeleteItem = () => {
		dispatch(removeItemFromCart(itemData.id))
		Swal.fire({
			title: '成功!',
			text: '已將商品從購物車移除',
			icon: 'success',
			confirmButtonText: '確認',
		})
	}

	const handleIcrementItem = () => {
		dispatch(incrementItemQuantity(itemData.id))
	}

	const handleDecrementItem = () => {
		if(itemData.quantity === 1){
			dispatch(removeItemFromCart(itemData.id))
			Swal.fire({
				title: '成功!',
				text: '已將商品從購物車移除',
				icon: 'success',
				confirmButtonText: '確認',
			})
		}else{
			dispatch(decrementItemQuantity(itemData.id))
		}
	}

	return (
		<div className="w-full flex items-center justify-between py-5  gap-5">
			<div className="min-w-[110px] h-[110px]">
				{
					<img
						src="https://bit.ly/2zBjQuq"
						alt=""
						className="w-full h-full object-cover object-center"
					/>
				}
			</div>
			<div className="flex flex-col w-[120px]">
				<h3 className="text-xl">{itemData.name}</h3>
				<p>{'NT$ ' + itemData.price}</p>
			</div>
			<div className="flex border-[#252323] border-1 box-border max-w-[300px] divide-x">
				<div
					onClick={handleDecrementItem}
					className="border-[#252323] w-15 h-15 flex justify-center items-center hover:cursor-pointer"
				>
					<div className="w-6 h-6 flex justify-center items-center">
						<Minus className="w-2/3 h-2/3" />
					</div>
				</div>
				<div className="border-[#252323] w-15 h-15 flex justify-center items-center text-xl select-none">
					{itemData.quantity}
				</div>
				<div
					onClick={handleIcrementItem}
					className="border-[#252323] w-15 h-15 flex justify-center items-center hover:cursor-pointer"
				>
					<div className="w-6 h-6 flex justify-center items-center">
						<Plus className="w-2/3 h-2/3" />
					</div>
				</div>
			</div>
			<h3 className="text-xl font-extrabold min-w-[80px]">
				<p className='select-none'>NT$ </p>
				<p className='select-none'>{itemTotalPrice}</p>
			</h3>
			<div
				onClick={handleDeleteItem}
				className="min-w-[60px] h-6 flex justify-center items-center hover:cursor-pointer"
			>
				<Trash className="w-full h-full" />
			</div>
		</div>
	)
}

export default CartItem
