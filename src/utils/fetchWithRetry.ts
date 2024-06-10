import fetchRetry from 'fetch-retry'
import { config } from '@config/config'

export const fetchWithRetryBuilder = () => {
  const fetchOptions = {
    retries: config.fetch.RETRIES,
    retryDelay: (attempt: number): number => {
      // Exponential backoff with jitter
      // https://developer.vonage.com/en/blog/respect-api-rate-limits-with-a-backoff-dr
      return (Math.pow(2, attempt) + Math.random()) * 1000
    },
    retryOn: (
      attempt: number,
      error: Error | null,
      response: Response | null
    ): boolean => {
      return (
        attempt < config.fetch.RETRIES &&
        (!!error ||
          !response ||
          response.status >= 500 ||
          response.status in [408, 429])
      )
    },
  }

  return fetchRetry(fetch, fetchOptions)
}
