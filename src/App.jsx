import './styles/App.css'
import Header from './components/Header/Header.jsx'
import Weather from './components/wather/weather.jsx'
import ProductsPage from './components/pages/ProductsPage/ProductsPage.jsx'
import Footer from './components/footer/Footer.jsx'

const App = () => {
  return (
    <main className="app">
      <Header />
      <Weather />
      <ProductsPage />
      <Footer />
    </main>
  )
}

export default App
