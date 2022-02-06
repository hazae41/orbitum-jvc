import { build, xfetch } from "./fetch.ts";

export class Hello {
  constructor(
    private endpoint = "https://orbitum.space/api"
  ) { }

  build(action: string, query?: Record<string, unknown>) {
    return build(`${this.endpoint}${action}`, query)
  }

  async random() {
    const url = this.build(`/ethereum/random`)
    return await xfetch(url, { method: "POST" })
  }

  async topic(forum: string, title: string, text: string) {
    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${await this.random()}`
    }

    const url = this.build(`/forums/${forum}/topics`)
    const body = JSON.stringify({ title, text })
    const res = await xfetch(url, { method: "POST", headers, body })
    return JSON.parse(res) as any
  }
}