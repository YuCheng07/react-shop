import { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

function NewebPayment() {
  localStorage.removeItem('cartList')
	const { paymentUrlInfo } = useSelector((state) => state.checkout)
	const formRef = useRef(null)

	useEffect(() => {
		if (
			paymentUrlInfo?.MerchantID &&
			paymentUrlInfo?.TradeInfo &&
			paymentUrlInfo?.TradeSha &&
			paymentUrlInfo?.Version
		) {
			formRef.current.submit()
		}
	}, [paymentUrlInfo])

	return (
		<>
			<form
				ref={formRef}
				style={{ display: 'none' }}
				method="POST"
				action="https://ccore.newebpay.com/MPG/mpg_gateway"
			>
				<input
					type="hidden"
					name="MerchantID"
					value={paymentUrlInfo?.MerchantID || ''}
				/>
				<input
					type="hidden"
					name="TradeInfo"
					value={paymentUrlInfo?.TradeInfo || ''}
				/>
				<input
					type="hidden"
					name="TradeSha"
					value={paymentUrlInfo?.TradeSha || ''}
				/>
				<input
					type="hidden"
					name="Version"
					value={paymentUrlInfo?.Version || ''}
				/>
				<button type="submit">提交</button>
			</form>
		</>
	)
}

export default NewebPayment
