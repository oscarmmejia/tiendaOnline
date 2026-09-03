import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

const renderWithRouter = (ui, { initialEntries = ['/'], ...renderOptions } = {}) =>
  render(ui, {
    wrapper: ({ children }) => (
      <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
    ),
    ...renderOptions,
  })

export default renderWithRouter
