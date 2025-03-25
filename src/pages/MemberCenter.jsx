import Nav from '@/components/Nav.jsx'
import MainFooter from '@/components/MainFooter.jsx'
import RocketBtn from '@/components/RocketBtn'
import axios from 'axios'
import { useEffect, useMemo, useState } from 'react'
function MemberCenter() {
	const API_URL = import.meta.env.VITE_API_URL
	const [orders, setOrders] = useState([])
	const [itemsShow, setItemsShow] = useState(false)

	const sortOrders = useMemo(() => {
		const newOrders = orders.slice().sort((a, b) => b.orderId - a.orderId)
		return newOrders.map((item) => {
			const date = new Date(item.orderId * 1000)
			const year = date.getFullYear()
			const month = String(date.getMonth() + 1).padStart(2, '0')
			const day = String(date.getDate()).padStart(2, '0')
			const hours = String(date.getHours()).padStart(2, '0')
			const minutes = String(date.getMinutes()).padStart(2, '0')
			const seconds = String(date.getSeconds()).padStart(2, '0')

			return {
				...item,
				orderId: `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`,
			}
		})
	}, [orders])

	const getOrders = async () => {
		try {
			const res = await axios.post(
				`${API_URL}/api/orders`,
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
			if (error.response.status === 403) {
				await dispatch(setIsUserLogin(false))
				localStorage.removeItem('token')
				Swal.fire({
					icon: 'error',
					title: '登入過期',
					text: '請重新登入，將導回登入頁面...',
					timer: 2500,
					showConfirmButton: false,
				})
				setTimeout(() => {
					navigate('/login')
				}, 2500)
			}
		}
	}

	useEffect(() => {
		const fetchOrders = async () => {
			const data = await getOrders()
			setOrders(data)
		}
		fetchOrders()
	}, [])

	return (
		<>
			<div className="page-container bg-[#A99985]">
				<header className="w-full">
					<Nav className="mx-auto" />
				</header>
				<main className="mx-auto bg-[#F5F1ED] w-[1024px] min-h-100 pt-7.5 pb-12">
					<section>
						<div className="mx-auto w-235 border-[#252323] border-2 bg-white rounded-xl p-7.5 flex justify-center items-center">
							<h2 className="text-4xl font-bold">訂單紀錄</h2>
						</div>
						{sortOrders.length > 0 &&
							sortOrders.map((item, index) => {
								return (
									<div
										key={index + 1}
										className="mx-auto w-235 border-[#252323] border-2 bg-white rounded-xl m-7.5 p-7.5 flex justify-between items-center"
									>
										<span className="text-2xl font-bold">
											日期: {item.orderId}
										</span>
										<span className="text-2xl font-bold">
											金額: NT$ {item.priceTotal}{' '}
										</span>
										<span className="text-2xl font-bold">商品詳細</span>
									</div>
								)
							})}
					</section>
				</main>
				<footer className="w-full">
					<MainFooter className="mx-auto" />
				</footer>
				<RocketBtn />
			</div>
		</>
	)
}

export default MemberCenter
