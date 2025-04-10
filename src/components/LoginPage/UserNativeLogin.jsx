import User from '@/components/icon/User.jsx'
import Key from '@/components/icon/Key.jsx'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setIsUserLogin } from '@/store/slices/userSlice.js'
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
		} else {
			localStorage.removeItem('loginACC')
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
		const accountRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
		const passwordRegex = /^.{6,}$/
		if (account.trim() === '' || password.trim() === '') {
			Swal.fire({
				title: '提醒您!',
				text: '帳號密碼不能為空',
				icon: 'error',
				confirmButtonText: '確認',
			})
		} else if (!accountRegex.test(account.trim())) {
			Swal.fire({
				title: '提醒您!',
				text: '帳號格式必須是信箱',
				icon: 'error',
				confirmButtonText: '確認',
			})
		} else if (!passwordRegex.test(password.trim())) {
			Swal.fire({
				title: '提醒您!',
				text: '密碼最少需要6位數',
				icon: 'error',
				confirmButtonText: '確認',
			})
		} else {
			try {
				const isCheck = await checkUserInfo(account.trim(), password.trim())
				if (isCheck.status === 'success') {
					rememberLoginInfo()
					localStorage.setItem('token', JSON.stringify(isCheck.data.token))
					setIsUserLogin(true)
					Swal.fire({
						title: '成功!',
						text: '帳號密碼正確，自動跳轉中...',
						icon: 'success',
						showConfirmButton: false,
						timer: 1800,
					})
					setTimeout(() => {
						navigate('/')
					}, 1800)
				} else if (isCheck.status === 'error') {
					if (isCheck.message === '無此帳號') {
						try {
							const res = await axios.post(`${API_URL}/api/signup`, {
								email: account.trim(),
								password: password.trim(),
							})
							if (res.status === 'success') {
								rememberLoginInfo()
								localStorage.setItem('token', JSON.stringify(res.data.token))
								setIsUserLogin(true)
								Swal.fire({
									title: '成功!',
									text: '自動註冊登入成功，自動跳轉中...',
									icon: 'success',
									showConfirmButton: false,
									timer: 1800,
								})
								setTimeout(() => {
									navigate('/')
								}, 1800)
							}
						} catch (error) {
							console.log(error)
							Swal.fire({
								title: '提醒您!',
								text: '自動註冊失敗，請重新嘗試',
								icon: 'error',
								confirmButtonText: '確認',
							})
						}
					} else {
						Swal.fire({
							title: '提醒您!',
							text: isCheck.message,
							icon: 'error',
							confirmButtonText: '確認',
						})
					}
				}
			} catch (error) {
				Swal.fire({
					title: '警告!',
					text: '無法登入，請稍後再試!',
					icon: 'error',
					showConfirmButton: false,
					timer: 1800,
				})
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
