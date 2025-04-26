/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Method } from "axios";

export type ApiRequestOptions = {
  url: string;
  method: Method;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  params?: Record<string, any>;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  body?: any;
  headers?: Record<string, string>;
};
