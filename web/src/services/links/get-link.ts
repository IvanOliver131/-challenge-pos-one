import { requestApi } from "@/http/request-api";
import type { ApiRequestOptions } from "@/types/ApiRequestOptions";

export async function getLink(shortUrl: string) {
  const requestOptions: ApiRequestOptions = {
    url: `${import.meta.env.VITE_BASE_URL}/links/${shortUrl}`,
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };

  const response = await requestApi(requestOptions);

  return response;
}
