/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ApiRequestOptions } from "@/types/ApiRequestOptions";
import axios, { type AxiosRequestConfig } from "axios";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function requestApi<T = any>({
  url,
  method,
  params,
  body,
  headers,
}: ApiRequestOptions): Promise<T> {
  const config: AxiosRequestConfig = {
    url,
    method,
    params,
    data: body,
    headers,
  };

  const { data } = await axios.request<T>(config);

  return data;
}
