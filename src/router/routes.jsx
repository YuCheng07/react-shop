import { createBrowserRouter, Navigate } from 'react-router'
import { lazy } from 'react'
import { useSelector } from 'react-redux'

const Home = lazy(() => import('@/pages/HomeView.jsx'))
const Error = lazy(() => import('@/pages/Error.jsx'))
const Product = lazy(() => import('@/pages/Product.jsx'))
const Login = lazy(() => import('@/pages/Login.jsx'))
const CartPage = lazy(() => import('@/pages/CartPage.jsx'))
const Checkout = lazy(() => import('@/pages/Checkout.jsx'))
const SuccessPage = lazy(() => import('@/pages/SuccessPage.jsx'))
const MemberCenter = lazy(() => import('@/pages/MemberCenter.jsx'))
const Favorite = lazy(() => import('@/pages/Favorite.jsx'))
const NewebPayment = lazy(() => import('@/pages/NewebPayment.jsx'))

const NewebPayment = lazy(() => import('@/components/checkoutContent/NewebPayment.jsx'))
const LineLogin = lazy(() => import('@/components/LoginPage/LineLogin.jsx'))
const GoogleLoginPage = lazy(() =>
	import('@/components/LoginPage/GoogleLoginPage.jsx')
)



const isAuthenticated = true

const ProtectedRoute = ({ element }) => {
	const { isUserLogin } = useSelector((state => state.user))
	return isAuthenticated ? element : <Navigate to="/" />
}

const router = createBrowserRouter(
	[
		{
			path: '/',
			element: <Home />,
			errorElement: <Error />,
			children: [],
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
			path: '/member',
			element: <ProtectedRoute element={<MemberCenter />} />,
		},
		{
			path: '/favorite',
			element: <ProtectedRoute element={<Favorite />} />,
		},
		{
			path: '/line-auth',
			element: <LineLogin />,
		},
		{
			path: '/google-auth',
			element: <GoogleLoginPage />,
		},
		{
			path: '/newebpay-payment',
			element: <NewebPayment />
		},
	],
	{
		errorElement: <Error />,
	}
)

export default router
