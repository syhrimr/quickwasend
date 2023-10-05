import api from "./instance";

export async function getCountryInfo() {
  const response = await api.get(`?key=${process.env['NEXT_PUBLIC_API_KEY']}`);
  return response.data;
}