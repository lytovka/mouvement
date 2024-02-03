/** @type {import('@sveltejs/kit').ParamMatcher} */
export function match(param: string) {
  return /^[a-zA-Z]$/.test(param)
}
