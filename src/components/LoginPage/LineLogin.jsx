import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { setIsUserLogin } from '@/store/slices/userSlice'
import Swal from 'sweetalert2'

function LineLogin(){
  const API_URL = import.meta.env.VITE_API_URL
	const BASE_URL = import.meta.env.VITE_BASE_URL
	const LINE_CLIENT_ID = import.meta.env.VITE_LINE_CLIENT_ID
	const navigate = useNavigate()
	const dispatch = useDispatch()

  const lineLogin = async (data) => {
		const { code, state } = data
		try {
			const response = await axios.post(`${API_URL}/api/login/line`, {
				code: code,
				state: state,
			})
			return response
		} catch (error) {
			console.log(error)
		}
	}

  useEffect(() => {
		const queryParams = new URLSearchParams(window.location.search)
		const data = {
			code: queryParams.get('code'),
			state: queryParams.get('state'),
		}
		if (data.code) {
			const getLineUserInfo = async () => {
				const res = await lineLogin(data)
				
				if (res) {
					const { token } = res.data.data
					localStorage.setItem('token', JSON.stringify(token))
					Swal.fire({
									position: "top-end",
									title: '登入成功',
									showConfirmButton: false,
									timer: 1500,
									backdrop: false,
									width: '20em',
								});
					dispatch(setIsUserLogin(true))
					navigate('/')
				} else {
					Swal.fire({
						position: "top-end",
						title: '登入失敗，請重新登入',
						showConfirmButton: false,
						timer: 1500,
						backdrop: false,
						width: '26em',
					});
					navigate('/login')
				}
			}
			getLineUserInfo()
		}
	}, [])

  return (
    <></>
  )
}

export default LineLogin