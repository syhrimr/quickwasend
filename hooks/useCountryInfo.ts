import useSWR from "swr";
import { getCountryInfo } from "../network/countryApi";

export default function useCountryInfo() {
  const { data, error, isLoading } = useSWR("country-info", async () => {
    return await getCountryInfo();
  });

  return {
    data,
    error,
    isLoading
  };
}