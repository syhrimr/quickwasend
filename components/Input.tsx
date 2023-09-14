import { ChangeEvent, FormEvent, MouseEvent, useState, useEffect } from "react";
import { getCountryInfo } from "../network/countryApi";

import countryCodeList from "../data/countryPhoneCodes.json";
import autocomplete from "../utils/autocomplete";

type SelectedCountry = {
  code: string;
  country: string;
  iso: string;
}

const Input = () => {
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>(undefined);
  const [countryCode, setCountryCode] = useState<string | undefined>("id");
  const [countryName, setCountryName] = useState<string | undefined>("Indonesia");
  const [countryNumber, setCountryNumber] = useState<string | undefined>("62");

  useEffect(() => {
    const selectedCountry: SelectedCountry | undefined = countryCodeList.find(item => item.code === countryNumber);
    setCountryCode(selectedCountry?.iso.toLowerCase());
    setCountryName(selectedCountry?.country);
    setCountryNumber(selectedCountry?.code);
  }, [countryNumber])

  async function handleInput(event: ChangeEvent<HTMLInputElement>) {
    const number = await mutatePhoneNumber(event.target.value);
    console.log({ number })
    setPhoneNumber(number);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    sendWhatsapp(phoneNumber);
  }

  async function mutatePhoneNumber(number: string) {
    const codeInput = document.getElementById("autoCompleteInput") as HTMLInputElement;
    const phoneInput = document.getElementById("phoneInput") as HTMLInputElement;

    if (number.charAt(0) === "+") {
      setCountryNumber(number.slice(1, 3))
      number = number.slice(3);

      codeInput.value = countryNumber as string;
      phoneInput.value = number as string;
    } else if (number.charAt(0) === "0") {
      const response = await getCountryInfo();
      if (!response) return;

      const countryCode = response.data.location.country.code;
      const codeNumbers = countryCodeList.map(item => item.code);
      const codeNumber = countryCodeList.find(code => code.iso === countryCode)?.code;

      setCountryNumber(codeNumber);
      number = number.slice(1);

      codeInput.value = countryNumber as string;
      phoneInput.value = number.slice(1) as string;
    }
    // else if (codeNumbers.includes(number.substring(0, 2))) {
    //   setTimeout(() => {
    //     setCountryNumber(number.slice(0, 2))
    //     number = number.slice(2);
    //     codeInput.value = countryNumber;
    //     phoneInput.value = number;
    //   }, 500);
    //   return number;
    // }

    return countryNumber + number;
  }

  function sendWhatsapp(number: string | undefined) {
    // navigate to web WA to directly open chat window
    if (!number) {
      alert("Please insert the right number!");
      return;
    }
    const baseURL = "https://web.whatsapp.com/send";
    const query = new URLSearchParams({
      "phone": number
    });
    const url = `${baseURL}/?${query}`;
    window.open(url, "_blank");
  }

  function handlePaste(event: MouseEvent<HTMLButtonElement>) {
    console.log({ event })
    // let clipboardData, pastedData;

    // // Stop data actually being pasted into div
    // event.stopPropagation();
    // event.preventDefault();

    // // Get pasted data via clipboard API
    // clipboardData = event.clipboardData || window.clipboardData;
    // console.log({ clipboardData })
    // pastedData = clipboardData.getData('Text');

    // // Do whatever with pasteddata
    // alert(pastedData);
  }

  function handleFocus() {
    const codeNumbers = countryCodeList.map(item => item.code);
    const autocompleteInput = document.getElementById("autoCompleteInput") as HTMLInputElement;
    autocomplete(autocompleteInput, codeNumbers, (value: string): void => {
      setCountryNumber(value);
    });
  }

  return (
    <form className="px-8 mt-14 mx-auto w-96" onSubmit={handleSubmit}>
      <div className="flex flex-row gap-x-2 w-auto mb-8">
        <label className="block w-[30%]">
          <div className="flex flex-row relative border border-slate-300 rounded-md px-2">
            <img
              src={`https://flagcdn.com/16x12/${countryCode}.png`}
              width="16"
              height="12"
              alt={countryName}
              className="h-[12px] my-auto"
            />

            <input
              id="autoCompleteInput"
              className="block w-full h-10 bg-white pl-2 focus:outline-none"
              placeholder="62"
              type="text"
              pattern="[0-9]*"
              onFocus={handleFocus}
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

        <label className="block w-[75%]">
          <input
            id="phoneInput"
            className="block w-full h-10 bg-white border border-slate-300 rounded-md px-4 focus:outline-none"
            type="text"
            pattern="[0-9]*"
            placeholder="812345678"
            onInput={handleInput}
          />
        </label>

        <label className="hidden w-[10%]">
          <button className="h-full m-auto" type="button" onClick={handlePaste}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="rgb(203, 213, 225, 1)"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
            </svg>
          </button>
        </label>
      </div>

      <button
        className="px-8 py-2 text-base text-slate-50 font-semibold rounded-full border-none bg-[#4AC959] hover:border-[#273443]"
        type="submit"
      >
        Send
      </button>
    </form>
  )
};

export default Input;