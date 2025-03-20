import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'

function ThirdPartyLogin() {
	const API_URL = import.meta.env.VITE_API_URL
	const BASE_URL = import.meta.env.VITE_BASE_URL
	const LINE_AUTHORIZE_URL = 'https://access.line.me/oauth2/v2.1/authorize'
	const LINE_CLIENT_ID = import.meta.env.VITE_LINE_CLIENT_ID
	const GOOGLE_AUTHORIZE_URL = 'https://accounts.google.com/o/oauth2/v2/auth'
	const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const handleLineLogin = () => {
		const state = uuidv4()
		const scope = 'profile%20openid%20email'
		const url = `${LINE_AUTHORIZE_URL}?response_type=code&client_id=${LINE_CLIENT_ID}&redirect_uri=${BASE_URL}/line-auth&state=${state}&scope=${scope}`

		window.location.href = url
	}

	const handleGoogleLogin = async () => {
		const scope =
			'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email'
		const state = uuidv4()
		const url = `${GOOGLE_AUTHORIZE_URL}?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${API_URL}/api/google/verify-token&scope=${scope}&include_granted_scopes=true&response_type=code&state=${state}`

		window.location.href = url
	}

	return (
		<div className="w-[390px] h-[350px] bg-[#DAD2BC] text-[#252323] font-extrabold flex justify-start items-center flex-col rounded-r-xl">
			<h2 className="mx-auto text-2xl flex justify-center items-center mt-10 mb-9">
				—— 社群快速登入 ——
			</h2>
			<div
				onClick={handleLineLogin}
				className="w-[330px] h-14 bg-white flex justify-center items-center text-2xl font-extrabold mb-4 hover:cursor-pointer"
			>
				LINE
			</div>
			<div
				onClick={handleGoogleLogin}
				className="w-[330px] h-14 bg-white flex justify-center items-center text-2xl font-extrabold mb-4 hover:cursor-pointer"
			>
				Google
			</div>
			<div
				onClick={() => alert('功能尚未開放')}
				className="w-[330px] h-14 bg-[#252323] text-[white] flex justify-center items-center text-2xl font-extrabold mb-4 hover:cursor-pointer"
			>
				GitHub
			</div>
		</div>
	)
}

export default ThirdPartyLogin
