import { createBrowserRouter } from 'react-router'
import { lazy } from 'react'


const Home = lazy(()=> import('@/pages/HomeView.jsx'))
const Product = lazy(()=> import('@/pages/Product.jsx'))
const Login = lazy(()=> import('@/pages/Login.jsx'))
const CartPage = lazy(()=> import('@/pages/CartPage.jsx'))
const Checkout = lazy(()=> import('@/pages/Checkout.jsx'))
const SuccessPage = lazy(()=> import('@/pages/SuccessPage.jsx'))
const LineLogin = lazy(()=> import('@/components/LoginPage/LineLogin.jsx'))
const GoogleLoginPage = lazy(()=> import('@/components/LoginPage/GoogleLoginPage.jsx'))

const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />,
	},
	{
		path: '/product',
		element: <Product />,
	},
	{
		path: '/login',
		element: <Login />,
	},
	{
		path: '/cart',
		element: <CartPage />,
	},
	{
		path: '/checkout',
		element: <Checkout />,
	},
	{
		path: '/checkout-success',
		element: <SuccessPage />,
	},
	{
		path: '/line-auth',
		element: <LineLogin />,
	},
	{
		path: '/google-auth',
		element: <GoogleLoginPage />
	}
])

export default router
