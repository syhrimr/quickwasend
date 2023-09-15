import Image from "next/image";

import { ChangeEvent, FormEvent, useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";
import { getCountryInfo } from "../network/countryApi";

import countryCodeList from "../data/countryPhoneCodes.json";
import autocomplete from "../utils/autocomplete";
import devicecheck from "../utils/devicecheck";

type SelectedCountry = {
  code: string;
  country: string;
  iso: string;
}

const Input = () => {
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>(undefined);
  const [countryCode, setCountryCode] = useState<string | undefined>("id");
  const [countryName, setCountryName] = useState<string | undefined>("Indonesia");
  const [countryNumber, setCountryNumber] = useState<string | undefined>("");
  
  const imageLoader = () => `https://flagcdn.com/16x12/${countryCode}.png`;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceMutatePhoneNumber = useCallback(debounce(mutatePhoneNumber, 2000), []);

  useEffect(() => {
    const selectedCountry: SelectedCountry | undefined = countryCodeList.find(item => item.iso === countryCode?.toUpperCase());
    setCountryCode(selectedCountry?.iso.toLowerCase());
    setCountryName(selectedCountry?.country);
    setCountryNumber(selectedCountry?.code);
  }, [countryCode])

  function handleInput(event: ChangeEvent<HTMLInputElement>) {
    debounceMutatePhoneNumber(event.target.value);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    sendWhatsapp(phoneNumber);
  }

  async function mutatePhoneNumber(number: string) {
    number = number.replace(/\s/g, ""); // remove whitespace

    if (number.length < 10) return;

    const codeInput = document.getElementById("autoCompleteInput") as HTMLInputElement;
    const phoneInput = document.getElementById("phoneInput") as HTMLInputElement;

    const codeNumbers = countryCodeList.map(item => item.code);

    if (number.charAt(0) === "+") {
      setCountryNumber(number.slice(1, 3))
      number = number.slice(3);
    } else if (number.charAt(0) === "0") {
      const response = await getCountryInfo();
      if (!response) return;

      const countryCode = response.data.location.country.code;
      const codeNumber = countryCodeList.find(code => code.iso === countryCode)?.code;

      setCountryNumber(codeNumber);
      number = number.slice(1);
    } else if (codeNumbers.includes(number.substring(0, 2)) && !countryNumber) {
      setCountryNumber(number.slice(0, 2))
      number = number.slice(2);
    }
    
    codeInput.value = countryNumber as string;
    phoneInput.value = number as string;

    setPhoneNumber(countryNumber + number);
  }

  function sendWhatsapp(number: string | undefined) {
    // navigate to web WA to directly open chat window
    if (!number) {
      alert("Please insert the right number!");
      return;
    }
    const { isMobile } = devicecheck();
    const baseURL = `https://${isMobile ? "api" : "web"}.whatsapp.com/send`;
    const query = new URLSearchParams({
      "phone": number
    });
    const url = `${baseURL}/?${query}`;
    window.open(url, "_blank");
  }

  async function handlePaste() {
    const phoneNumberRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    let pasteResult = await navigator.clipboard.readText();
    pasteResult = pasteResult.replace(/\s/g, ""); // remove whitespace

    if (!phoneNumberRegex.test(pasteResult)) {
      alert("The paste phone number is invalid!");
      return;
    }

    const number = debounceMutatePhoneNumber(pasteResult);
    setPhoneNumber(number);
  }

  function triggerAutocomplete() {
    const codeNumbers = countryCodeList.map(item => item.code);
    const autocompleteInput = document.getElementById("autoCompleteInput") as HTMLInputElement;
    autocomplete(autocompleteInput, codeNumbers, (value: string): void => {
      setCountryNumber(value);
    });
  }

  function clearPhoneNumber() {
    setCountryNumber("");
    setCountryCode("id");
    setCountryName("Indonesia");
    setPhoneNumber("");

    const phoneInput = document.getElementById("phoneInput") as HTMLInputElement;
    const codeInput = document.getElementById("autoCompleteInput") as HTMLInputElement;
    phoneInput.value = "";
    codeInput.value = "";
  }

  return (
    <form className="px-8 mt-10 mx-auto w-96" onSubmit={handleSubmit}>
      <div className="flex flex-row w-auto mb-8">
        <div className="flex flex-row w-[90%] bg-white border border-slate-300 rounded-md">
          <label className="block w-[30%] border-r-1">
            <div
              className="flex flex-row relative px-2"
            >
              <Image
                loader={imageLoader}
                src={`https://flagcdn.com/16x12/${countryCode}.png`}
                width={16}
                height={12}
                alt={countryName}
                className="h-[12px] my-auto"
              />

              <input
                id="autoCompleteInput"
                className="block w-full h-10 pl-3 bg-transparent focus:outline-none"
                placeholder="62"
                type="text"
                pattern="[0-9]*"
                onFocus={triggerAutocomplete}
              />
              
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 my-auto"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </div>
          </label>

          <label className="block w-[70%]">
            <div className="flex flex-row relative px-2">
              <input
                id="phoneInput"
                className="block w-full h-10 bg-transparent focus:outline-none"
                type="text"
                pattern="[0-9]*"
                placeholder="812345678"
                onInput={handleInput}
              />

              <button
                className="h-full m-auto"
                title="Clear input button"
                type="button"
                onClick={clearPhoneNumber}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="rgb(30, 41, 59)"
                  className="w-6 h-6 hover:translate-y-[-2px] hover:drop-shadow-md"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12" 
                  />
                </svg>
              </button>
            </div>
          </label>
        </div>

        <label className="block w-[10%] ml-2">
          <button
            className="h-full m-auto"
            title="Phone number paste button"
            type="button"
            onClick={handlePaste}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="rgb(30, 41, 59, 1)"
              className="w-6 h-6 hover:translate-y-[-2px] hover:drop-shadow-md"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
            </svg>
          </button>
        </label>
      </div>

      <button
        className="px-8 py-2 text-base text-slate-50 font-semibold rounded-full border-none bg-[#4AC959] hover:translate-y-[-2px] hover:shadow-md"
        type="submit"
      >
        Send
      </button>
    </form>
  )
};

export default Input;