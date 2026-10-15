import { serverApi } from "./config";
export function mediaUrl(value?: string): string {
  if (!value) return "/icons/noimage-list.svg";
  if (/^https?:\/\//i.test(value)) return value;
  const relative = value.replace(/\\/g, "/").replace(/^\/+/, "");
  if (/^(img|icons|video)\//.test(relative)) return `/${relative}`;
  return `${serverApi}/${relative}`;
}
