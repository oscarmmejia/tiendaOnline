import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import ProductCard from '../../components/molecules/productCard/ProductCard'

vi.mock('../../components/molecules/productEditModal/ProductEditModal', () => ({
  default: () => null,
}))

describe('ProductCard', () => {
  it('renders the product props', () => {
    const product = {
      id: 7,
      title: 'Consola orbital',
      description: 'Una consola para explorar nuevas partidas.',
      price: 799,
      imageUrl: 'https://images.example/console.jpg',
      categoryName: 'Electrónica',
    }

    render(<ProductCard product={product} onDelete={vi.fn()} />)

    expect(screen.getByRole('heading', { name: 'Consola orbital' })).toBeInTheDocument()
    expect(screen.getByText(product.description)).toBeInTheDocument()
    expect(screen.getByText('$799.00')).toBeInTheDocument()
    expect(screen.getByText('Electrónica')).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'Consola orbital' })).toHaveAttribute(
      'src',
      product.imageUrl,
    )
  })
})
