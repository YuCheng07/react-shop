import Ghost from '@/components/icon/Ghost.jsx'
import Mail from '@/components/icon/Mail.jsx'
import LeftArrow from '@/components/icon/LeftArrow.jsx'
import Github from '@/components/icon/Github.jsx'
import Facebook from '@/components/icon/Facebook.jsx'

function MainFooter({className}) {
	return (
		<div className={`w-[1024px] ${className}`}>
			<div className="w-full h-29 bg-[#252323] px-28 flex justify-between items-center">
				<div className="flex justify-center items-center text-white">
					<div className="w-10 h-10 flex justify-center items-center p-1 rounded-full shadow-[0px_0px_5px_0px_#252323] bg-white">
						<Ghost className="w-6 h-6 fill-[#252323]" />
					</div>
					<h1 className="text-2xl ml-5 select-none">訂閱電子報獲得最新資訊</h1>
				</div>
				<div className="h-14 mt-7.5 mb-7.5">
					<div className="w-95 h-full bg-white flex justify-between items-center overflow-hidden rounded-xl">
						<Mail className="min-w-5 h-5 fill-[#252323] mx-5 my-4" />
						<input type="text" className="bg-white outline-0 w-full" />
						<div className="min-w-16 h-full bg-[#F5F1ED] flex justify-center items-center hover:cursor-pointer">
							<LeftArrow className="w-5 h-5 fill-[#252323]" />
						</div>
					</div>
				</div>
			</div>
			<div className="w-full bg-[#DAD2BC] px-28 flex justify-between">
				<div className="flex-col">
					<div className="mt-10 text-3xl font-extrabold text-[#252323]">
						アニメストア
					</div>
					<div className="mt-29">
						<p>0X-XXXX-XXXX</p>
						<p>xxxxxxxx@email.com</p>
						<p>XX 市 YY 區 ZZ 路 OOO 號</p>
					</div>
					<div className="my-7.5 flex gap-1">
						<Github className="w-8 h-8 fill-[#252323] hover:cursor-pointer" />
						<Facebook className="w-8 h-8 fill-[#252323] hover:cursor-pointer" />
					</div>
				</div>
				<div className="grid">
					<div className="mt-7.5 flex flex-col [writing-mode:vertical-rl]">
						<p className="text-2xl font-extrabold text-[#252323]">
							今天是個 ——
						</p>
						<p className="mt-4 text-2xl font-extrabold text-[#252323]">
							買周邊的好日子。
						</p>
					</div>
					<div className="text-[#252323] mt-11 mb-7.5 flex flex-col">
						© 2025 AnimeStore* All Rights Reserved
					</div>
				</div>
			</div>
		</div>
	)
}

export default MainFooter
