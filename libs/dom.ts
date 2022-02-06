export function $class<T extends HTMLElement>(name: string, parent: Element | Document = document) {
  return parent.getElementsByClassName(name) as HTMLCollectionOf<T>
}

export function $id<T extends HTMLElement>(id: string) {
  return document.getElementById(id) as T | null
}
