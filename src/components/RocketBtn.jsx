import Backward from '@/components/icon/Backward'
function RocketBtn(){
  const goBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <div onClick={goBackToTop} className="w-18 h-18 bg-[#F5F1ED] fixed bottom-20 right-12 rounded-full border-[#A99985] border-2 cursor-pointer transition-all ease-in-out duration-350 flex justify-center items-center hover:shadow-[0px_0px_5px_0px_white] hover:border-2 hover:border-[#A99985] hover:scale-115">
      <Backward className="rotate-90 w-1/2 fill-[#A99985] " />
    </div>
  )
}

export default RocketBtn