import { requestApi } from "@/http/request-api";
import type { ApiRequestOptions } from "@/types/ApiRequestOptions";

interface Response {
  linksCsvUrl: "string";
}

export async function downloadCSVLinks(): Promise<Response> {
  const requestOptions: ApiRequestOptions = {
    url: `${import.meta.env.VITE_BASE_URL}/links/exports`,
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };

  const response = await requestApi<Response>(requestOptions);

  return response;
}
