import { fireEvent, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import ProductsPage from '../../pages/productsPage/ProductsPage'
import renderWithRouter from '../utils/renderWithRouter'

const { fetchProducts, fetchCatalogCategories, deleteProduct } = vi.hoisted(() => ({
  fetchProducts: vi.fn(),
  fetchCatalogCategories: vi.fn(),
  deleteProduct: vi.fn(),
}))

vi.mock('../../services/productsApi', () => ({
  ALL_CATEGORIES: 'all',
  fetchProducts,
  fetchCatalogCategories,
  deleteProduct,
}))

const products = [
  {
    id: 1,
    title: 'Camisa de fibra',
    description: 'Una camisa técnica para misiones urbanas.',
    price: 80,
    imageUrl: 'https://images.example/shirt.jpg',
    categoryId: 1,
    categoryName: 'Ropa',
  },
  {
    id: 2,
    title: 'Auriculares orbitales',
    description: 'Audio inmersivo para largas travesías.',
    price: 140,
    imageUrl: 'https://images.example/headphones.jpg',
    categoryId: 2,
    categoryName: 'Electrónica',
  },
]

const categories = [
  { id: 1, name: 'Ropa', image: 'https://images.example/clothes.jpg' },
  { id: 2, name: 'Electrónica', image: 'https://images.example/electronics.jpg' },
]

describe('ProductsPage', () => {
  beforeEach(() => {
    fetchProducts.mockResolvedValue(products)
    fetchCatalogCategories.mockResolvedValue(categories)
    deleteProduct.mockResolvedValue(undefined)
  })

  it('loads and displays products from the product service', async () => {
    renderWithRouter(<ProductsPage />)

    expect(await screen.findByText('Camisa de fibra')).toBeInTheDocument()
    expect(screen.getByText('Auriculares orbitales')).toBeInTheDocument()
    expect(fetchProducts).toHaveBeenCalled()
    expect(fetchCatalogCategories).toHaveBeenCalled()
  })

  it('filters products by the selected category', async () => {
    renderWithRouter(<ProductsPage />)

    await screen.findByText('Camisa de fibra')
    fireEvent.change(screen.getByRole('combobox', { name: 'Categoría' }), {
      target: { value: '2' },
    })

    expect(await screen.findByText('Auriculares orbitales')).toBeInTheDocument()
    await waitFor(() => {
      expect(screen.queryByText('Camisa de fibra')).not.toBeInTheDocument()
    })
  })
})
