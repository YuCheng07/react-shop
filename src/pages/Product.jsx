import Nav from '@/components/Nav.jsx'
import MainFooter from '@/components/MainFooter.jsx'
import ProductItem from '@/components/ProductItem.jsx'
import CaretLeft from '@/components/icon/CaretLeft.jsx'
import CaretRight from '@/components/icon/CaretRight.jsx'
import RocketBtn from '@/components/RocketBtn'
import axios from 'axios'
import { useState, useEffect, useMemo } from 'react'

function Product() {
	const [itemTag, setItemTag] = useState('所有商品') // 所有商品 本日推薦 限時特價 熱門商品 近期新品
	const [products, setProducts] = useState([])
	const [selectedPage, setSelectedPage] = useState(1)
	const API_URL = import.meta.env.VITE_API_URL

	const getItems = async () => {
		try {
			const res = await axios.get(`${API_URL}/api/products`)
			return res.data.data
		} catch (error) {
			console.log(error)
		}
	}

	// 根據商品標籤分類
	const selectedProducts = useMemo(() => {
		if (itemTag === '限時特價') {
			return products.filter((item) => item.tags[0] === '限時特價')
		} else if (itemTag === '熱門商品') {
			return products.filter((item) => item.tags[0] === '熱門商品')
		} else if (itemTag === '近期新品') {
			return products.filter((item) => item.tags[0] === '近期新品')
		} else if (itemTag === '本日推薦') {
			return products.filter((item) => item.tags[0] === '本日推薦')
		} else if (itemTag === '所有商品') {
			return products
		}
	}, [itemTag, products])

	// 目前標籤的商品頁數
	const pages = useMemo(() => {
		return Math.ceil(selectedProducts.length / 4)
	}, [selectedProducts])

	// 目前頁數的範圍
	const pagesRange = useMemo(() => {
		if (selectedPage === 1 || selectedPage === 2) {
			if (pages >= 3) {
				return [1, 2, 3]
			} else if (pages === 1) {
				return [1]
			} else if (pages === 0) {
				return [0]
			} else {
				return [1, 2]
			}
		} else if (selectedPage === pages || selectedPage === pages - 1) {
			return [pages - 2, pages - 1, pages]
		} else if (selectedPage > 2 && pages >= 4) {
			return [selectedPage - 1, selectedPage, selectedPage + 1]
		}
	}, [selectedPage, pages])

	// 目前標籤的商品最後一頁的商品顯示數量
	const lastPageItems = useMemo(() => {
		return selectedProducts.length % 4
	}, [selectedProducts])

	// 目前頁數該顯示的商品
	const showedItems = useMemo(() => {
		if (selectedPage === pages) {
			return selectedProducts.slice(
				(selectedPage - 1) * 4,
				selectedPage * 4 + lastPageItems
			)
		} else {
			return selectedProducts.slice((selectedPage - 1) * 4, selectedPage * 4)
		}
	}, [selectedPage, pages, itemTag])

	const handlePageBtn = (num) => {
		if(num > 0){
			setSelectedPage(num)
		}
	}

	const limitedOfferProducts = useMemo(() => {
		return products.filter((item) => item.tags[0] === '限時特價').length
	}, [products])

	const popularProducts = useMemo(() => {
		return products.filter((item) => item.tags[0] === '熱門商品').length
	}, [products])

	const newProducts = useMemo(() => {
		return products.filter((item) => item.tags[0] === '近期新品').length
	}, [products])

	const recommendProducts = useMemo(() => {
		return products.filter((item) => item.tags[0] === '本日推薦').length
	}, [products])

	const allProducts = useMemo(() => {
		return products.length
	}, [products])

	useEffect(() => {
		const fetchProducts = async () => {
			const items = await getItems()
			setProducts(items)
		}
		fetchProducts()
	}, [])

	const handleTagChange = (tag) => {
		setItemTag(tag)
		setSelectedPage(1)
	}

	return (
		<div className="page-container bg-[#A99985]">
			<header className="w-full">
				<Nav className="mx-auto" />
			</header>
			<main className="mx-auto bg-[#F5F1ED] w-[1024px] min-h-100 px-[42px] pb-15">
				<section>
					<div className="mx-auto w-235 h-124 mb-15">
						<img
							src="/assets/image/wallpaper04.jpg"
							alt=""
							className="w-full h-full object-center"
						/>
					</div>
				</section>
				<section>
					<div className="grid grid-cols-3 gap-5 mb-7.5">
						<div className="col-span-1 max-w-[300px]">
							<ul className="grid grid-rows-5">
								<li className="border-1 border-[#DAD2BC] box-border font-extrabold text-2xl py-4 text-center text-white bg-[#252323] rounded-t-xl">
									商品類別
								</li>
								<li
									className={`border-x-1 border-b-1 box-border border-[#DAD2BC] font-extrabold text-2xl py-4 text-center transition-all duration-200 hover:cursor-pointer ${
										itemTag === '所有商品'
											? 'bg-[#252323] text-white'
											: 'bg-white hover:bg-[#DAD2BC] hover:text-black'
									}`}
									onClick={() => handleTagChange('所有商品')}
								>
									所有商品 ({allProducts})
								</li>

								<li
									className={`border-x-1 border-b-1 box-border border-[#DAD2BC] font-extrabold text-2xl py-4 text-center transition-all duration-200 hover:cursor-pointer ${
										itemTag === '本日推薦'
											? 'bg-[#252323] text-white'
											: 'bg-white hover:bg-[#DAD2BC] hover:text-black'
									}`}
									onClick={() => handleTagChange('本日推薦')}
								>
									本日推薦 ({recommendProducts})
								</li>

								<li
									className={`border-x-1 border-b-1 box-border border-[#DAD2BC] font-extrabold text-2xl py-4 text-center transition-all duration-200 hover:cursor-pointer ${
										itemTag === '熱門商品'
											? 'bg-[#252323] text-white'
											: 'bg-white hover:bg-[#DAD2BC] hover:text-black'
									}`}
									onClick={() => handleTagChange('熱門商品')}
								>
									熱門商品 ({popularProducts})
								</li>

								<li
									className={`border-x-1 border-b-1 box-border border-[#DAD2BC] font-extrabold text-2xl py-4 text-center transition-all duration-200 hover:cursor-pointer ${
										itemTag === '近期新品'
											? 'bg-[#252323] text-white'
											: 'bg-white hover:bg-[#DAD2BC] hover:text-black'
									}`}
									onClick={() => handleTagChange('近期新品')}
								>
									近期新品 ({newProducts})
								</li>

								<li
									className={`border-x-1 border-b-1 box-border border-[#DAD2BC] font-extrabold text-2xl py-4 text-center transition-all duration-200 rounded-b-xl hover:cursor-pointer ${
										itemTag === '限時特價'
											? 'bg-[#252323] text-white'
											: 'bg-white hover:bg-[#DAD2BC] hover:text-black'
									} `}
									onClick={() => handleTagChange('限時特價')}
								>
									限時特價 ({limitedOfferProducts})
								</li>
							</ul>
						</div>
						<div className="col-span-2 grid grid-cols-2 gap-5">
							{showedItems.length !== 0
								? showedItems.map((item, index) => (
										<ProductItem key={item.id} itemData={item} refreshFn={getItems} />
								  ))
								: '資料未順利取得，請重新整理頁面!'}
						</div>
					</div>
					<div className="flex justify-end items-center">
						<div className="flex border-[#DAD2BC] border-1 box-border max-w-[300px] divide-x rounded-xl">
							<div
								className="border-[#DAD2BC] w-15 h-15 flex justify-center items-center hover:cursor-pointer"
								onClick={() => {
									setSelectedPage((prev) => (prev > 1 ? prev - 1 : prev))
								}}
							>
								<div className="w-6 h-6 flex justify-center items-center">
									<CaretLeft className="w-2/3 h-2/3" />
								</div>
							</div>

							{pagesRange.map((item, index) => (
								<div
									className={`border-[#DAD2BC] w-15 h-15 flex justify-center items-center text-xl hover:cursor-pointer hover:bg-[#252323] hover:text-white ${
										item === selectedPage ? 'bg-[#252323] text-white' : ''
									} `}
									key={item}
									onClick={() => handlePageBtn(item)}
								>
									{item}
								</div>
							))}

							<div
								className="border-[#DAD2BC] w-15 h-15 flex justify-center items-center rounded-r-xl hover:cursor-pointer"
								onClick={() => {
									setSelectedPage((prev) => (prev < pages ? prev + 1 : prev))
								}}
							>
								<div className="w-6 h-6 flex justify-center items-center">
									<CaretRight className="w-2/3 h-2/3" />
								</div>
							</div>
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

export default Product
