import Nav from '@/components/Nav.jsx'
import MainFooter from '@/components/MainFooter.jsx'
import RocketBtn from '@/components/RocketBtn'
import ProductItem from '@/components/ProductItem'
import CaretLeft from '@/components/icon/CaretLeft.jsx'
import CaretRight from '@/components/icon/CaretRight.jsx'
import { useEffect, useState, useMemo } from 'react'
import axios from 'axios'

function Favorite() {
	const [itemTag, setItemTag] = useState('所有商品') // 所有商品 本日推薦 限時特價 熱門商品 近期新品
	const [products, setProducts] = useState([])
	const [selectedPage, setSelectedPage] = useState(1)

	const API_URL = import.meta.env.VITE_API_URL

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

	const fetchFavorite = async () => {
		setProducts([])
		const items = await getFavoriteList()
		setProducts(items || [])
	}

	useEffect(() => {
		fetchFavorite()
	}, [])

	const handleTagChange = (tag) => {
		setItemTag(tag)
		setSelectedPage(1)
	}

	return (
		<>
			<div className="page-container bg-[#A99985]">
				<header className="w-full">
					<Nav className="mx-auto" />
				</header>
				<main className="mx-auto bg-[#F5F1ED] w-[1024px] min-h-100 pt-7.5 px-[42px] pb-15">
					<section>
						<div className="grid grid-cols-3 gap-5 mb-7.5">
							<div className="col-span-1 max-w-[300px]">
								<ul className="grid grid-rows-5">
									<li className="border-1 border-[#DAD2BC] box-border font-extrabold text-2xl py-4 text-center text-white bg-[#252323] rounded-t-xl">
										收藏商品
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
								{showedItems.length !== 0 &&
									showedItems.map((item, index) => (
										<ProductItem
											key={item.id}
											itemData={item}
											refreshFn={fetchFavorite}
										/>
									))}
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
		</>
	)
}

export default Favorite
