import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { setIsUserLogin } from '@/store/slices/userSlice'
import Swal from 'sweetalert2'

function GoogleLoginPage() {
	const API_URL = import.meta.env.VITE_API_URL
	const BASE_URL = import.meta.env.VITE_BASE_URL
	const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID
	const navigate = useNavigate()
	const dispatch = useDispatch()

	useEffect(() => {
		const queryParams = new URLSearchParams(window.location.search)
		const data = {
			token: queryParams.get('token'),
			status: queryParams.get('status'),
			message: queryParams.get('message'),
		}
		console.log(data);
		

		if (data.token) {
			localStorage.setItem('token', data.token)
			Swal.fire({
				position: "top-end",
				title: data.message,
				showConfirmButton: false,
				timer: 1500,
				backdrop: false,
				width: '20em',
			});
			dispatch(setIsUserLogin(true))
			navigate('/')
		} else {
			alert(data.message)
			Swal.fire({
				position: "top-end",
				title: data.message,
				showConfirmButton: false,
				timer: 1500,
				backdrop: false,
				width: '20em',
			});
			navigate('/login')
		}

	}, [])

	return <></>
}

export default GoogleLoginPage
