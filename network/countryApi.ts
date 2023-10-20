import api from "./instance";

interface CountryInfoResponse {
  data: any;
}

export async function getCountryInfo(): Promise<CountryInfoResponse> {
  const response = await api.get(`?key=${process.env.NEXT_PUBLIC_API_KEY}`);
  return response.data;
}
