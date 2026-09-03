import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import ProductPrice from '../../components/atoms/productPrice/ProductPrice'

describe('ProductPrice', () => {
  it('renders the amount formatted as US currency', () => {
    render(<ProductPrice amount={1234.5} />)

    expect(screen.getByText('$1,234.50')).toBeInTheDocument()
  })
})
