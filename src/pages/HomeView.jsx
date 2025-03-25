import Nav from '@/components/Nav.jsx'
import MainFooter from '@/components/MainFooter.jsx'
import ProductItem from '@/components/ProductItem.jsx'
import RocketBtn from '@/components/RocketBtn'
import axios from 'axios'
import { useState, useMemo, useEffect } from 'react'


function HomeView() {
	const [itemTag, SetItemTag] = useState('限時特價') // 本日推薦 限時特價 熱門商品 近期新品
	const [products, setProducts] = useState([])
	const API_URL = import.meta.env.VITE_API_URL
	
	const getItems = async () => {
		try {
			const res = await axios.get(`${API_URL}/api/products`)
			return res.data.data
		} catch (error) {
			console.log(error)
		}
	}

	const selectedProducts = useMemo(() => {
		if (itemTag === '限時特價') {
			return products.filter((item) => item.tags[0] === '限時特價')
		} else if (itemTag === '熱門商品') {
			return products.filter((item) => item.tags[0] === '熱門商品')
		} else if (itemTag === '近期新品') {
			return products.filter((item) => item.tags[0] === '近期新品')
		}
	}, [itemTag, products])

	useEffect(() => {
		const fetchProducts = async () => {
			const items = await getItems()
			setProducts(items)
		}
		fetchProducts()
	}, [])

	return (
		<div className="page-container bg-[#A99985]">
			<header className="w-full">
				<Nav className="mx-auto" />
			</header>
			<main className="mx-auto bg-[#F5F1ED] w-[1024px]">
				<section className="w-full mb-42">
					<div className="mx-auto w-[940px] h-[496px] bg-green-400 text-center leading-[496px] relative">
						<img
							src="/assets/image/wallpaper01.jpg"
							alt=""
							className="w-full h-full object-cover"
						/>
						<div className="absolute w-full bottom-[-90px] flex justify-center overflow-hidden">
							{itemTag !== '限時特價' ? (
								<div
									className="box-border relative w-[260px] h-[256px] flex justify-center items-center bg-[url('https://bit.ly/2zBjQuq')] bg-cover bg-center text-[#FFFFFF] before:absolute before:bg-[#A99985]/70 before:w-full before:h-full before:flex before:justify-center before:items-center before:backdrop-blur-[5px] transition-all duration-200 hover:cursor-pointer hover:text-[#252323] hover:before:bg-[#DAD2BC]/70"
									onClick={() => SetItemTag('限時特價')}
								>
									<p className="realative z-1 w-6 flex justify-center items-center font-bold text-2xl">
										限時特價
									</p>
								</div>
							) : (
								<div className="box-border relative w-[260px] h-[256px] flex justify-center items-center bg-[url('https://bit.ly/2zBjQuq')] bg-cover bg-center text-[#252323] before:absolute before:bg-[#DAD2BC]/70 before:w-full before:h-full before:flex before:justify-center before:items-center before:backdrop-blur-[5px] transition-all duration-200 hover:cursor">
									<p className="realative z-1 w-6 flex justify-center items-center font-bold text-2xl">
										限時特價
									</p>
								</div>
							)}
							{itemTag !== '熱門商品' ? (
								<div
									className="border-x-[1px] box-border border-[#F5F1ED] relative w-[260px] h-[256px] flex justify-center items-center bg-[url('https://bit.ly/2zBjQuq')] bg-cover bg-center text-[#FFFFFF] before:absolute before:bg-[#A99985]/70 before:w-full before:h-full before:flex before:justify-center before:items-center before:backdrop-blur-[5px] transition-all duration-200 hover:cursor-pointer hover:text-[#252323] hover:before:bg-[#DAD2BC]/70"
									onClick={() => SetItemTag('熱門商品')}
								>
									<p className="realative z-1 w-6 flex justify-center items-center font-bold text-2xl">
										熱門商品
									</p>
								</div>
							) : (
								<div className="border-x-[1px] box-border border-[#F5F1ED] relative w-[260px] h-[256px] flex justify-center items-center bg-[url('https://bit.ly/2zBjQuq')] bg-cover bg-center text-[#252323] before:absolute before:bg-[#DAD2BC]/70 before:w-full before:h-full before:flex before:justify-center before:items-center before:backdrop-blur-[5px] transition-all duration-200 hover:cursor-pointer">
									<p className="realative z-1 w-6 flex justify-center items-center font-bold text-2xl">
										熱門商品
									</p>
								</div>
							)}
							{itemTag !== '近期新品' ? (
								<div
									className="box-border relative w-[260px] h-[256px] flex justify-center items-center bg-[url('https://bit.ly/2zBjQuq')] bg-cover bg-center text-[#FFFFFF] before:absolute before:bg-[#A99985]/70 before:w-full before:h-full before:flex before:justify-center before:items-center before:backdrop-blur-[5px] transition-all duration-200 hover:cursor-pointer hover:text-[#252323] hover:before:bg-[#DAD2BC]/70"
									onClick={() => SetItemTag('近期新品')}
								>
									<p className="realative z-1 w-6 flex justify-center items-center font-bold text-2xl">
										近期新品
									</p>
								</div>
							) : (
								<div className="box-border relative w-[260px] h-[256px] flex justify-center items-center bg-[url('https://bit.ly/2zBjQuq')] bg-cover bg-center text-[#252323] before:absolute before:bg-[#DAD2BC]/70 before:w-full before:h-full before:flex before:justify-center before:items-center before:backdrop-blur-[5px] transition-all duration-200 hover:cursor-pointer">
									<p className="realative z-1 w-6 flex justify-center items-center font-bold text-2xl">
										近期新品
									</p>
								</div>
							)}
						</div>
					</div>
				</section>
				<section className="w-full pb-15">
					<div className="mx-auto w-[940px] min-h-[496px] bg-[#F5F1ED]">
						{products.length > 0 ? (
							<div className="w-full grid grid-cols-3 gap-5">
								{selectedProducts.map((item, index) => (
									<ProductItem key={item.id} itemData={item} />
								))}
							</div>
						) : (
							<div className="w-full grid grid-cols-1 place-items-center gap-5 text-5xl font-extrabold">
								商品載入中...
								(後端使用的Render部屬免費方案需要時間啟動，如商品未載入請重新整理)
							</div>
						)}
					</div>
				</section>
			</main>
			<footer className="w-full">
				<MainFooter className={'mx-auto'} />
			</footer>
			<RocketBtn />
		</div>
	)
}

export default HomeView
