export declare const GM: {
  xmlHttpRequest(params: unknown): void
}

export function build(base: string, query?: Record<string, unknown>) {
  if (!query) return base
  const components = Object.entries(query)
    .map(([k, v]) => `${k}=${encodeURIComponent(v as any)}`)
  if (!components.length) return base
  return `${base}?${components.join("&")}`
}

export async function xfetch(url: string, params: {
  method: "HEAD" | "GET" | "POST" | "PUT" | "DEL" | "OPTIONS",
  headers?: Record<string, string>,
  body?: unknown
}) {
  const res = await new Promise<XMLHttpRequest>((ok, err) => {
    GM.xmlHttpRequest({
      fetch: true,
      url: url,
      method: params.method,
      headers: params.headers,
      data: params.body,
      onload: ok,
      onerror: err,
    })
  })

  if (res.status != 200)
    throw new Error(`${res.status} (${url}): ${res.statusText} ${res.responseText}`)
  return res.responseText
}
