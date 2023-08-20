import api from "./instance";
import { AxiosError } from "axios";

export async function getCountryInfo() {
  try {
    const response = await api.get(`?key=${process.env['NEXT_PUBLIC_API_KEY']}`);
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      return null; // stop retrying request when got axios instance error
    } else {
      throw error;
    }
  }
}