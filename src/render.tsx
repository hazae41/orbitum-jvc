import React from "https://esm.sh/react";
import ReactDOM from "https://esm.sh/react-dom";
import { Script } from "../comps/script.tsx";
import { $class } from "../libs/dom.ts";

function render() {
  const forms = $class("form-post-topic")
  const length = forms.length
  for (let i = 0; i < length; i++)
    if (!forms[i].classList.contains("form-post-message"))
      render2(forms[i])
}

function render2(form: Element) {
  const buttons = $class("btn-poster-msg", form)
  const length = buttons.length
  for (let i = 0; i < length; i++)
    render3(buttons[i])
}

function render3(button: Element) {
  const root = document.createElement("span")
  ReactDOM.render(<Script />, root)
  button.after(root)
}

render()