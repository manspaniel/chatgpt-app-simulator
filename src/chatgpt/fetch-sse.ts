import { fetchEventSource } from "@microsoft/fetch-event-source";

export async function fetchSSE(
  url: string,
  options: Parameters<typeof fetchEventSource>[1]
) {
  return fetchEventSource(url, options);
}
