import { ChangeEvent, FormEvent, useState } from "react";
import { getCountryInfo } from "../network/countryApi";
import countryCodeList from "../data/countryPhoneCodes.json";
import snackbar from "../utils/snackbar";

const Input = () => {
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>(undefined);
  const { alert } = snackbar();

  async function handleInput(event: ChangeEvent<HTMLInputElement>) {
    const number = await mutatePhoneNumber(event.target.value);
    setPhoneNumber(number);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    sendWhatsapp(phoneNumber);
  }

  async function mutatePhoneNumber(number: string) {
    if (number.charAt(0) === "+") {
      number = number.slice(1);
    }

    const response = await getCountryInfo();
    if (!response) return;
    
    const codeNumbers = countryCodeList.map(item => item.code);
    if (number.charAt(0) === "0") {
      const countryCode = response.data.location.country.code;
      const codeNumber = countryCodeList.find(code => code.iso === countryCode)?.code;
      return codeNumber + number.slice(1);
    } else if (codeNumbers.includes(number.substring(0, 2))) {
      return number;
    }
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
  
  return (
    <form className="px-8 mt-14 mx-auto w-96" autocomplete="off" onSubmit={handleSubmit}>
      <div className="flex flex-row gap-x-2 w-auto mb-8">
        <label className="block w-[25%]">
          <input className="block w-full h-10 bg-white border border-slate-300 rounded-md px-4" placeholder="+62" type="text" pattern="+[0-9]*" />
        </label>
        
        <label className="block w-[50%]">
          <input
            className="block w-full h-10 bg-white border border-slate-300 rounded-md px-4"
            type="text" pattern="[0-9]*" placeholder="812345678"
            onInput={handleInput}
          />
        </label>
      </div>

      <button className="px-8 py-2 text-base text-slate-50 font-semibold rounded-full border-none bg-[#4AC959] hover:border-[#273443]" type="submit">Send</button>
    </form>
  )
};

export default Input;