import HollowHeart from '@/components/icon/HollowHeart.jsx'
import SolidHeart from '@/components/icon/SolidHeart.jsx'
import { useState, useEffect, useMemo } from 'react'
import { addToCart, setCartList } from '@/store/slices/cartSlice.js'
import { useSelector, useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import axios from 'axios'
const API_URL = import.meta.env.VITE_API_URL

function ProductItem({ className, itemData}) {
	const dispatch = useDispatch()
	const { isUserLogin } = useSelector((state) => state.user)
	const [favoriteArr, setFavoriteArr] = useState([])

	const handleFavorite = async () => {
		try {
			const res = await axios.post(
				`${API_URL}/api/favorite/${itemData.id}`,
				{},
				{
					headers: {
						Authorization: `Bearer ${JSON.parse(
							localStorage.getItem('token')
						)}`,
						'Content-Type': 'application/json',
					},
				}
			)
			
			if(res.data.status === 'success'){
				Swal.fire({
					icon: 'success',
					title: '成功',
					text: res.data.message,
				})
				fetchFavorite()
			}else{
				Swal.fire({
					icon: 'error',
					title: '警告',
					text: '發生錯誤請重新嘗試',
				})
			}

		} catch (error) {
			console.log(error)
		}
	}

	const isFavorite = useMemo(() => {
		const item = favoriteArr.find((item) => {
			return item.id === itemData.id
		})

		if (item) {
			return true
		} else {
			return false
		}
	}, [favoriteArr])

	const handleAddToCartBtn = () => {
		const saveCartList = JSON.parse(localStorage.getItem('cartList'))

		if (saveCartList > 0) {
			dispatch(setCartList(saveCartList))
		} else {
			const saveItemData = {
				id: itemData.id,
				name: itemData.name,
				price: itemData.price,
			}
			dispatch(addToCart(saveItemData))
		}

		Swal.fire({
			title: '成功!',
			text: '已將商品加入到購物車',
			icon: 'success',
			confirmButtonText: '確認',
		})
	}

	const getFavoriteList = async () => {
		try {
			const res = await axios.post(
				`${API_URL}/api/favorite`,
				{},
				{
					headers: {
						Authorization: `Bearer ${JSON.parse(
							localStorage.getItem('token')
						)}`,
						'Content-Type': 'application/json',
					},
				}
			)

			return res.data.data
		} catch (error) {
			console.log(error)
		}
	}

	const fetchFavorite = async () => {
		const items = await getFavoriteList()		
		setFavoriteArr(items || [])
	}

	useEffect(() => {
		if(localStorage.getItem('token')){
			fetchFavorite()
		}
	}, [])

	return (
		<div className="relative anime-item w-[300px] border-1 border-[#DAD2BC] box-border overflow-hidden rounded-xl">
			<div className="max-w-[300px] h-[315px] bg-white">
				<img
					src={itemData.image ? itemData.image : '/assets/image/item01.jpg'}
					alt=""
					className="w-full h-full object-cover"
				/>
			</div>
			<div className="w-full h-14 flex justify-around items-center bg-[#FFFFFF] text-[#252323] border-b-1 border-[#DAD2BC]">
				<div className="w-full h-full text-xl flex justify-start items-center border-r-1 border-[#DAD2BC] text-nowrap overflow-hidden box-border p-4">
					{itemData.name ? itemData.name : '商品名稱'}
				</div>
				<div className="min-w-[127px] h-full text-xl font-bold flex justify-center items-center">
					{itemData.price ? 'NT$ ' + itemData.price : 'NT$ 0'}
				</div>
			</div>
			{itemData.stock > 0 ? (
				<div
					onClick={handleAddToCartBtn}
					className="w-full h-[65px] bg-[#FFFFFF] text-[#252323] text-2xl font-extrabold flex justify-center items-center transition-all duration-400 hover:cursor-pointer hover:text-[#FFFFFF] hover:bg-[#252323]"
				>
					加入購物車
				</div>
			) : (
				<div className="w-full h-[65px] bg-[#252323] text-[#FFFFFF] text-2xl font-extrabold flex justify-center items-center transition-all duration-400">
					已無庫存
				</div>
			)}

			<div className="absolute top-[-5px] left-5 bg-[#252323] flex flex-col justify-center items-center [writing-mode:vertical-rl] box-border shadow-[5px_5px_0px_0px_#A99985]">
				<p className="text-[#FFFFFF] font-extrabold tracking-[0.2em] py-1.5 px-3.5">
					{itemData.tags ? itemData.tags[0] : '預設標籤'}
				</p>
			</div>
			{isUserLogin && (
				<div onClick={handleFavorite} className="absolute top-[22px] right-[22px] w-5 h-5 flex justify-center items-center">
					<SolidHeart
						className={`${
							isFavorite ? 'fill-[#252323]' : 'fill-[#FFFFFF]'
						} stroke-[1px] transiton-all duration-200 hover:cursor-pointer ${
							isFavorite ? 'hover:fill-[#FFFFFF]' : 'hover:fill-[#252323]'
						} ${isFavorite ? 'hover:scale-130' : 'hover:scale-130'} `}
					/>
				</div>
			)}
		</div>
	)
}

export default ProductItem
