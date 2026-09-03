import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import CategoryTag from '../../components/atoms/categoryTag/CategoryTag'

describe('CategoryTag', () => {
  it('renders the provided category label', () => {
    render(<CategoryTag label="Electrónica" />)

    expect(screen.getByText('Electrónica')).toBeInTheDocument()
  })
})
