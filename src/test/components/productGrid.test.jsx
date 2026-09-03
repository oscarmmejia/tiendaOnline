import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import ProductGrid from '../../components/organisms/productGrid/ProductGrid'

vi.mock('../../components/molecules/productCard/ProductCard', () => ({
  default: ({ product }) => <span data-testid="product-card">{product.title}</span>,
}))

describe('ProductGrid', () => {
  it('renders a card for each product', () => {
    render(
      <ProductGrid
        products={[{ id: 1, title: 'Producto uno' }, { id: 2, title: 'Producto dos' }]}
        onDelete={vi.fn()}
      />,
    )

    expect(screen.getAllByTestId('product-card')).toHaveLength(2)
    expect(screen.getByText('Producto uno')).toBeInTheDocument()
    expect(screen.getByText('Producto dos')).toBeInTheDocument()
  })

  it('renders the empty state for an empty product list', () => {
    render(<ProductGrid products={[]} onDelete={vi.fn()} />)

    expect(screen.getByText('No hay productos en esta categoría.')).toBeInTheDocument()
  })
})
