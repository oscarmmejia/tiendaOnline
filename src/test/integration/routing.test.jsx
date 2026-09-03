import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import App from '../../App'

vi.mock('../../components/weather/Weather.jsx', () => ({
  default: () => <div data-testid="weather-mock" />,
}))

describe('application routing', () => {
  beforeEach(() => {
    window.history.pushState({}, '', '/ruta-inexistente')
  })

  it('renders the not found page for an unknown route', async () => {
    render(<App />)

    expect(await screen.findByRole('heading', { name: 'Error 404' })).toBeInTheDocument()
    expect(screen.getByText('La ruta que buscas no existe en el nexus de OKYDOKY.'))
      .toBeInTheDocument()
  })
})
