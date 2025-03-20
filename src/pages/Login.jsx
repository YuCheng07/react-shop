import Nav from '@/components/Nav.jsx'
import MainFooter from '@/components/MainFooter.jsx'
import UserNativeLogin from '@/components/LoginPage/UserNativeLogin.jsx'
import ThirdPartyLogin from '@/components/LoginPage/ThirdPartyLogin.jsx'

function Login() {
	return (
		<div className="page-container">
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
		</div>
	)
}

export default Login
