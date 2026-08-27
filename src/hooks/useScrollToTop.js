import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * El navegador conserva el scroll al cambiar de ruta, asi que al entrar en una
 * pagina nueva se vuelve arriba manualmente.
 */
const useScrollToTop = () => {
	const { pathname } = useLocation()

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [pathname])
}

export default useScrollToTop
