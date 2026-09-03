import { beforeEach, describe, expect, it, vi } from 'vitest'
import { httpClient } from '../../services/httpClient'
import { fetchProducts, fetchTopProducts } from '../../services/productsApi'

vi.mock('../../services/httpClient', () => ({
  httpClient: {
    get: vi.fn(),
  },
}))

const validProduct = {
  id: 1,
  title: 'Terminal portátil',
  description: 'Una descripción suficientemente larga para que el producto sea válido en el catálogo.',
  price: 125,
  images: ['["https://images.example/product.jpg"]'],
  category: { id: 1, name: 'Ropa' },
}

describe('productsApi', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('filters invalid products and normalizes valid products', async () => {
    httpClient.get.mockResolvedValue({
      data: [
        validProduct,
        { ...validProduct, id: 2, category: { id: 99, name: 'Otra' } },
        { ...validProduct, id: 3, images: ['https://placehold.co/600x400'] },
        { ...validProduct, id: 4, description: 'Descripción corta' },
      ],
    })

    await expect(fetchProducts()).resolves.toEqual([{
      id: 1,
      title: 'Terminal portátil',
      description: validProduct.description,
      price: 125,
      imageUrl: 'https://images.example/product.jpg',
      categoryId: 1,
      categoryName: 'Ropa',
    }])
  })

  it('sorts top products by descending price and applies the limit', async () => {
    httpClient.get.mockResolvedValue({
      data: [
        { ...validProduct, id: 1, price: 50 },
        { ...validProduct, id: 2, price: 300 },
        { ...validProduct, id: 3, price: 150 },
      ],
    })

    await expect(fetchTopProducts(2)).resolves.toEqual([
      expect.objectContaining({ id: 2, price: 300 }),
      expect.objectContaining({ id: 3, price: 150 }),
    ])
  })
})
