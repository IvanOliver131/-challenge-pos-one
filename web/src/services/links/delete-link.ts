import { requestApi } from "@/http/request-api";
import type { ApiRequestOptions } from "@/types/ApiRequestOptions";

export async function deleteLink(linksId: string) {
  const requestOptions: ApiRequestOptions = {
    url: `${import.meta.env.VITE_BASE_URL}/links/${linksId}`,
    method: "DELETE",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };

  const response = await requestApi<Response>(requestOptions);

  return response;
}
