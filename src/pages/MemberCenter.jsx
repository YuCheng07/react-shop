import Nav from '@/components/Nav.jsx'
import MainFooter from '@/components/MainFooter.jsx'
import RocketBtn from '@/components/RocketBtn'
function MemberCenter() {
	return (
		<>
			<div className="page-container bg-[#A99985]">
				<header className="w-full">
					<Nav className="mx-auto" />
				</header>
				<main className="mx-auto bg-[#F5F1ED] w-[1024px] min-h-100 pt-7.5 pb-15">
					<section>
						this is content
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

export default MemberCenter
