import { badgeUrlFromPattern } from 'shields.io/core/badge-urls/make-badge-url'
import { baseUrl } from './constants'
import defaultValues from './default_value'

export function buildUrl(pattern, namedParams, queryParams = {}) {
  try {
    return badgeUrlFromPattern({
      baseUrl,
      pattern,
      namedParams,
      queryParams,
    });
  } catch (e) {
    return badgeUrlFromPattern({
      baseUrl,
      pattern,
      namedParams: defaultValues,
      queryParams,
    });
  }
}
