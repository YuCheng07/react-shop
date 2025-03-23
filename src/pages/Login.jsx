import Nav from '@/components/Nav.jsx'
import MainFooter from '@/components/MainFooter.jsx'
import UserNativeLogin from '@/components/LoginPage/UserNativeLogin.jsx'
import ThirdPartyLogin from '@/components/LoginPage/ThirdPartyLogin.jsx'
import RocketBtn from '@/components/RocketBtn'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

function Login() {
	const navigate = useNavigate()
	useEffect(()=>{
		if(localStorage.getItem('token')){
			navigate('/')
		}
	},[])

	return (
		<div className="page-container bg-[#A99985]">
			<header className="w-full">
				<Nav className="mx-auto" />
			</header>
			<main className="mx-auto bg-[#F5F1ED] w-[1024px] min-h-100 pt-7.5 pb-15">
				<section>
					<div className="w-full flex justify-center items-center">
						<UserNativeLogin />
						<ThirdPartyLogin />
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

export default Login
