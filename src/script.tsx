import React, { useCallback, useEffect, useMemo, useState, MouseEvent } from "https://esm.sh/react";
import ReactDOM from "https://esm.sh/react-dom";

declare const GM: {
  xmlHttpRequest(params: unknown): void
}

function $<T>(id: string) {
  return document.getElementById(id) as T | null
}

function render() {
  const forms = document
    .getElementsByClassName("form-post-topic")
  for (let i = 0; i < forms.length; i++)
    render2(forms[i])
}

function render2(form: Element) {
  const buttons = form
    .getElementsByClassName("btn-poster-msg")
  const length = buttons.length
  for (let i = 0; i < length; i++)
    render3(buttons[i])
}

function render3(button: Element) {
  const root = document.createElement("span")
  ReactDOM.render(<Script />, root)
  button.after(root)
}

function build(base: string, query?: Record<string, unknown>) {
  if (!query) return base
  const components = Object.entries(query)
    .map(([k, v]) => `${k}=${encodeURIComponent(v as any)}`)
  if (!components.length) return base
  return `${base}?${components.join("&")}`
}

async function fetcher(url: string, params: {
  method: string,
  headers?: unknown,
  body?: unknown
}) {
  const res = await new Promise<XMLHttpRequest>((ok, err) => GM.xmlHttpRequest({
    fetch: true,
    url: url,
    method: params.method,
    headers: params.headers,
    data: params.body,
    onload: ok,
    onerror: err,
  }))
  if (res.status != 200)
    throw new Error(`${res.status} (${url}): ${res.statusText} ${res.responseText}`)
  return res.responseText
}

const hello = {
  endpoint: "https://orbitum.space/api/hello",

  async token() {
    const url = build(this.endpoint, { action: "random" })
    return await fetcher(url, { method: "POST" })
  },

  async topic(forum: string, title: string, text: string) {
    const action = `forums/${forum}/topics`
    const token = await this.token()
    const url = build(this.endpoint, { action, token })
    const headers = { "Content-Type": "application/json" }
    const body = JSON.stringify({ title, text })
    const res = await fetcher(url, { method: "POST", headers, body })
    return JSON.parse(res) as any
  }
}

function Script() {
  const [loading, setLoading] =
    useState(false)

  const submit = useCallback(async () => {
    const $title = $<HTMLInputElement>("titre_topic")!
    const $text = $<HTMLTextAreaElement>("message_topic")!
    const topic = await hello.topic("blabla", $title.value, $text.value)
    console.log(topic)
    open(`https://orbitum.space/topic/${topic.id}`, '_blank')
  }, [])

  const trySubmit = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (loading) return
    setLoading(true)
    submit()
      .catch(e => console.error(e))
      .finally(() => setLoading(false))
  }, [submit, loading])

  return <button className="btn btn-poster-msg ob-bg-violet-400 hover_ob-bg-violet-500"
    onClick={trySubmit}
    disabled={loading}>
    Poster
  </button>
}

render()