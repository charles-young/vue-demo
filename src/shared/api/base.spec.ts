import { describe, it, expect, vi, beforeEach } from 'vitest'
import { fetchJson } from './base';

describe('fetchJson', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('fetches and returns JSON data when response is OK', async () => {
    const mockData = { foo: 'bar' }
    const mockJson = vi.fn().mockResolvedValue(mockData)

    global.fetch = vi.fn(() =>
      Promise.resolve({
          ok: true,
          json: mockJson,
      } as unknown as Response)
    )

    const result = await fetchJson<typeof mockData>('https://example.com/data')

    expect(global.fetch).toHaveBeenCalledWith('https://example.com/data')
    expect(mockJson).toHaveBeenCalled()
    expect(result).toEqual(mockData)
  })

  it('throws an error when response is not OK', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        status: 404,
      } as Response)
    )

    await expect(fetchJson('https://example.com/bad-url')).rejects.toThrow(
      'HTTP error! status: 404'
    )
  })
})
