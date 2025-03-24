import { useEffect, useState } from 'react'
function NewebPayment() {
 

	useEffect(() => {

		const urlParams = new URLSearchParams(window.location.search)

    const MerchantID = urlParams.get('MerchantID')
    const TradeInfo = urlParams.get('TradeInfo')
    const TradeSha = urlParams.get('TradeSha')
    const Version = urlParams.get('Version')
    window.location.href = `https://ccore.newebpay.com/MPG/mpg_gateway?MerchantID=${encodeURIComponent(MerchantID)}&TradeInfo=${encodeURIComponent(TradeInfo)}&TradeSha=${encodeURIComponent(TradeSha)}&Version=${encodeURIComponent(Version)}`
		
	}, [])

	return (
		<></>
	)
}

export default NewebPayment
