import { useEffect } from 'react'
import { useNavigate } from 'react-router'
function Error() {
	const navigate = useNavigate()
	useEffect(() => {
		navigate('/')
	}, [])
	return <div>Wrong Route</div>
}

export default Error
