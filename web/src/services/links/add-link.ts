import { requestApi } from "@/http/request-api";
import type { ApiRequestOptions } from "@/types/ApiRequestOptions";
import type { LinkData } from "@/types/Link";

export async function addLink(data: LinkData) {
  console.log(data);
  const requestOptions: ApiRequestOptions = {
    url: `${import.meta.env.VITE_BASE_URL}/links`,
    method: "POST",
    body: data,
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };

  const response = await requestApi(requestOptions);

  return response;
}
