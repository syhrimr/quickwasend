import { ChangeEvent, FormEvent, useState } from "react";
import { getCountryInfo } from "../network/countryApi";
import countryCodeList from "../data/countryPhoneCodes.json";
import styles from "../styles/Input.module.css";

const Input = () => {
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>(undefined);

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
    if (!number) return;
    const baseURL = "https://web.whatsapp.com/send";
    const query = new URLSearchParams({
      "phone": number
    });
    const url = `${baseURL}/?${query}`;
    window.open(url, "_blank");
  }
  
  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <label className={styles.field}>
        Input Your Chat Phone Number
        <input
          className={styles.input}
          type="text" pattern="[0-9]*"
          onInput={handleInput}
        />
      </label>
      <input className={styles.button} type="submit" value="Submit" />
    </form>
  )
};

export default Input;