import axios from 'axios'
import { describe, expect, it } from 'vitest'
import { isRequestCanceled } from '../../services/httpClient'

describe('isRequestCanceled', () => {
  it('identifies an axios cancellation error', () => {
    expect(isRequestCanceled(new axios.CanceledError())).toBe(true)
  })

  it('rejects other errors', () => {
    expect(isRequestCanceled(new Error('Request failed'))).toBe(false)
  })
})
