import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import router from './router/routes'
import { Suspense } from 'react'
import store from '@/store/store.js'
import { Provider } from 'react-redux'
import RocketBtn from '@/components/RocketBtn'

createRoot(document.getElementById('root')).render(
	<Provider store={store}>
		<Suspense fallback={<div>Loading...</div>}>
			<RouterProvider router={router} />
			<RocketBtn />
		</Suspense>
	</Provider>
)