import { useEffect, useState } from 'react'
function NewebPayment() {
  const [MerchantID, setMerchantID] = useState('')
  const [TradeInfo, setTradeInfo] = useState('')
  const [TradeSha, setTradeSha] = useState('')
  const [Version, setVersion] = useState('')

	useEffect(() => {

		const urlParams = new URLSearchParams(window.location.search)

    setMerchantID(urlParams.get('MerchantID'))
    setTradeInfo(urlParams.get('TradeInfo'))
    setTradeSha(urlParams.get('TradeSha'))
    setVersion(urlParams.get('Version'))
		const form = document.getElementById('payment-form')
		if (form) {
			form.submit()
		}
	}, [])

	return (
		<form
			id="payment-form"
			action="https://ccore.newebpay.com/MPG/mpg_gateway"
			method="POST"
			style={{ display: 'none' }}
		>
			<input type="hidden" name="MerchantID" value={MerchantID} />
			<input type="hidden" name="TradeInfo" value={TradeInfo} />
			<input type="hidden" name="TradeSha" value={TradeSha} />
			<input type="hidden" name="Version" value={Version} />
		</form>
	)
}

export default NewebPayment
