import { RouterProvider } from 'react-router'
import router from './router/routes'
import { Suspense } from 'react'
import store from '@/store/store.js'
import { Provider } from 'react-redux'

function App() {
	return (
		<Provider store={store}>
			<Suspense fallback={<div>Loading...</div>}>
				<RouterProvider router={router} />
			</Suspense>
		</Provider>
	)
}

export default App
