import useSWR from "swr";
import { AxiosError } from "axios";
import { getCountryInfo } from "../network/countryApi";

export default function useCountryInfo() {
  const { data, error, isLoading } = useSWR("country-info", async () => {
    try {
      return await getCountryInfo();
    } catch (error) {
      console.error(error);

      if (error instanceof AxiosError && error.response?.status === 404) {
        return null; // stop retrying requist when got 404 error
      } else {
        throw error;
      }
    }
  });

  return {
    data,
    error,
    isLoading
  };
}