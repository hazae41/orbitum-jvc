import React, { MouseEvent, useCallback, useMemo, useState } from "https://esm.sh/react";
import { $id } from "../libs/dom.ts";
import { Hello } from "../libs/hello.ts";

export function Script() {
  const [loading, setLoading] =
    useState(false)

  const hello = useMemo(() => new Hello(), [])

  const submit = useCallback(async () => {
    const $title = $id<HTMLInputElement>("titre_topic")!
    const $text = $id<HTMLTextAreaElement>("message_topic")!
    const topic = await hello.topic("blabla", $title.value, $text.value)
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