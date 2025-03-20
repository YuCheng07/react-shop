import { useNavigate, Link } from 'react-router'
import { useEffect } from 'react'
import Ghost from '@/components/icon/Ghost.jsx'
import Cart from '@/components/icon/Cart.jsx'
import { useSelector, useDispatch } from 'react-redux'
import { setUserIsLogin } from '@/store/slices/userSlice.js'
import Swal from 'sweetalert2'

function Nav({ className }) {
	const navigate = useNavigate()

	const { userIsLogin } = useSelector((state) => state.user)
	const dispatch = useDispatch()

	const switchUserState = () => {
		const token = localStorage.getItem('token')
		if (token) {
			Swal.fire({
				title: '確定要登出嗎?',
				showCancelButton: true,
				confirmButtonText: '確認',
				cancelButtonText: '取消',
				width: '36em',
			}).then((res) => {
				if (res.isConfirmed) {
					Swal.fire({
						position: 'top-end',
						title: '您已成功登出',
						showConfirmButton: false,
						timer: 1500,
						backdrop: false,
						width: '20em',
					})
					dispatch(setUserIsLogin(false))
					localStorage.removeItem('token')
				}
			})
		} else {
			navigate('/login')
			dispatch(setUserIsLogin(false))
		}
	}

	useEffect(() => {
		const token = localStorage.getItem('token')
		if (token) {
			dispatch(setUserIsLogin(true))
		}
	}, [])

	return (
		<div
			className={`bg-[#F5F1ED] w-[1024px] box-border h-[100px] flex justify-between ${className} `}
		>
			<div className="w-full flex items-center ml-[42px]" id="">
				<div
					onClick={() => navigate('/')}
					className="p-2 rounded-full shadow-[0px_0px_2px_0px_#252323] bg-[#252323] hover:cursor-pointer"
				>
					<Ghost className="w-6 h-6 fill-[#F5F1ED]" />
				</div>
				<h1
					onClick={() => navigate('/')}
					className="text-2xl font-bold ml-2 hover:cursor-pointer"
				>
					アニメストア
				</h1>
			</div>
			<div className="w-full flex justify-end items-center mr-[42px]" id="">
				<ul className="grid grid-cols-3 gap-[60px] mr-20 text-[#252323] font-bold">
					<li className="hover: cursor-pointer">
						<Link to="/">首頁</Link>
					</li>
					<li className="hover: cursor-pointer">
						<Link to="/product">商品</Link>
					</li>
					<li className="hover: cursor-pointer">
						<a onClick={switchUserState}>{userIsLogin ? '登出' : '登入'}</a>
					</li>
				</ul>
				<Link to="/cart">
					<Cart className="w-6 h-6 fill-[#252323] hover: cursor-pointer" />
				</Link>
			</div>
		</div>
	)
}

export default Nav
