import User from '@/components/icon/User.jsx'
import Key from '@/components/icon/Key.jsx'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setUserIsLogin } from '@/store/slices/userSlice.js'
import { useNavigate } from 'react-router'
import axios from 'axios'
import Swal from 'sweetalert2'

function UserNativeLogin() {
	const [account, setAccount] = useState('')
	const [password, setPassword] = useState('')
	const [isRemeberActive, setIsRemeberActive] = useState(false)
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const API_URL = import.meta.env.VITE_API_URL

	const rememberLoginInfo = () => {
		if (isRemeberActive) {
			localStorage.setItem('loginACC', JSON.stringify(account.trim()))
			console.log('更新/刪除記住資訊')
		} else {
			localStorage.removeItem('loginACC')
			console.log('取消記住資訊')
		}
	}

	const getRememberLoginInfo = () => {
		const loginACC = JSON.parse(localStorage.getItem('loginACC'))

		if (loginACC) {
			setAccount(loginACC)
			setIsRemeberActive(true)
		}
	}

	const checkUserInfo = async (acc, pwd) => {
		const res = await axios.post(`${API_URL}/api/login`, {
			email: acc,
			password: pwd,
		})
		return res.data
	}

	const handleLogin = async () => {
		if (account.trim() === '' || password.trim() === '') {
			Swal.fire({
				title: '提醒您!',
				text: '帳號密碼不能為空',
				icon: 'error',
				confirmButtonText: '確認',
			})
		} else {
			const isCheck = await checkUserInfo(account.trim(), password.trim())
			if (isCheck.status === 'success') {
				rememberLoginInfo()
				localStorage.setItem('token', JSON.stringify(isCheck.data.token))
				setUserIsLogin(true)
				Swal.fire({
					title: '成功!',
					text: '帳號密碼正確，自動跳轉中...',
					icon: 'success',
					showConfirmButton: false,
					timer: 1800,
				})
				setTimeout(()=> {
					navigate('/')
				}, 1800)
			} else if (isCheck.status === 'error') {
				alert(isCheck.message)
			}
		}
	}

	useEffect(() => {
		getRememberLoginInfo()
	}, [])

	return (
		<div className="w-[390px] h-[380px] bg-[#252323] text-[#DAD2BC] flex justify-start items-center flex-col overflow-hidden rounded-xl">
			<h2 className="text-4xl font-extrabold p-10">會員登入</h2>
			<div className="w-[330px] h-14 bg-[#EAF0ED] flex items-center mb-4">
				<div className="flex justify-center items-center w-6 h-6 mx-5">
					<User className="w-2/3 h-2/3" />
				</div>
				<input
					type="text"
					placeholder="電子信箱"
					className="placeholder-[#8DA291] outline-0 text-black"
					value={account}
					onChange={(e) => {
						setAccount(e.target.value)
					}}
				/>
			</div>
			<div className="w-[330px] h-14 bg-[#EAF0ED] flex items-center">
				<div className="flex justify-center items-center w-6 h-6 mx-5">
					<Key className="w-2/3 h-2/3" />
				</div>
				<input
					type="text"
					placeholder="請輸入使用者密碼"
					className="placeholder-[#8DA291] outline-0 text-black"
					value={password}
					onChange={(e) => {
						setPassword(e.target.value)
					}}
				/>
			</div>
			<div className="w-[330px] h-14 flex items-center">
				<label
					htmlFor="remember"
					className="text-[#FFFFFF] flex justify-center items-center hover:cursor-pointer"
				>
					<input
						type="checkbox"
						name="remember"
						id="remember"
						className="w-4 h-4 mr-2"
						checked={isRemeberActive}
						onChange={() => {
							setIsRemeberActive(!isRemeberActive)
						}}
					/>
					記住我
				</label>
			</div>
			<a
				className="w-full h-[65px] bg-[#FFFFFF] text-2xl text-[#252323] font-extrabold flex justify-center items-center mt-auto hover:cursor-pointer hover:bg-[#70798C] hover:text-[#FFFFFF]"
				onClick={handleLogin}
			>
				登入帳號
			</a>
		</div>
	)
}

export default UserNativeLogin
