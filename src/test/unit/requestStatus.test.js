import { describe, expect, it } from 'vitest'
import { REQUEST_STATUS } from '../../constants/requestStatus'

describe('REQUEST_STATUS', () => {
  it('contains the available request states', () => {
    expect(REQUEST_STATUS).toEqual({
      loading: 'loading',
      ready: 'ready',
      error: 'error',
    })
  })
})
