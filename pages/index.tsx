/* eslint-disable react-hooks/exhaustive-deps */
import type { NextPage } from "next";

import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import Input from "../components/Input";

import useCountryInfo from "../hooks/useCountryInfo";
import countryCodeList from "../data/countryPhoneCodes.json";
import autocomplete from "../utils/autocomplete";
import devicecheck from "../utils/devicecheck";

const Home: NextPage = () => {
  const router = useRouter();
  const { data, error, isLoading } = useCountryInfo();

  const [phoneNumber, setPhoneNumber] = useState<string | undefined>(undefined);
  const [countryCode, setCountryCode] = useState<string | undefined>("id");
  const [countryName, setCountryName] = useState<string | undefined>("Indonesia");
  const [countryNumber, setCountryNumber] = useState<string | undefined>("");

  useEffect(() => {
    if (data && !error) {
      setCountryCode(data.location.country?.code.toLowerCase());
      setCountryName(data.location.country?.name);
      setCountryNumber(data.location.country?.calling_code);
    }
  }, [data, error]);

  useEffect(() => {
    if (!router.isReady) return;

    if (router.query) {
      const { phone } = router.query;
      mutatePhoneNumber(phone as string);
    }
  }, [router.isReady]);
  
  const parsedData = {
    phoneNumber,
    countryCode,
    countryName,
    countryNumber
  };

  function changeInputValue(codeValue: string | undefined = "", phoneValue: string | undefined = "") {
    const codeInput = document.getElementById("autoCompleteInput") as HTMLInputElement;
    const phoneInput = document.getElementById("phoneInput") as HTMLInputElement;

    codeInput.value = codeValue;
    phoneInput.value = phoneValue;
  }

  function mutatePhoneNumber(number: string) {
    number = number.replace(/\s/g, ""); // remove whitespace

    if (number.length < 10) return;

    const codeNumbers = countryCodeList.map(item => item.code);

    if (number.charAt(0) === "+") {
      setCountryNumber(number.slice(1, 3))
      number = number.slice(3);
    } else if (number.charAt(0) === "0") {
      const selectedItem = countryCodeList.find(code => {
        return code.iso == countryCode.toUpperCase();
      });
      
      setCountryNumber(selectedItem?.code);
      number = number.slice(1);
    } else if (codeNumbers.includes(number.substring(0, 2)) && !countryNumber) {
      parsedData.countryNumber = number.slice(0, 2);
      setCountryNumber(number.slice(0, 2));
      number = number.slice(2);
    }

    changeInputValue(countryNumber, number);
    setPhoneNumber(countryNumber + number);
    
    router.replace({
      query: {
        ...router.query,
        phone: phoneNumber
      }
    })
  }

  function sendWhatsapp() {
    // navigate to web WA to directly open chat window
    if (!phoneNumber) {
      alert("Please insert the right number!");
      return;
    }
    const { isMobile } = devicecheck();
    const baseURL = `https://${isMobile ? "api" : "web"}.whatsapp.com/send`;
    const query = new URLSearchParams({
      "phone": phoneNumber
    });
    const url = `${baseURL}/?${query}`;
    window.open(url, "_blank");
  }

  async function handlePaste() {    
    const phoneNumberRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    let pasteResult = await navigator.clipboard.readText();
    pasteResult = pasteResult.replace(/\s/g, ""); // remove whitespace
    
    if (!phoneNumberRegex.test(pasteResult)) {
      alert("The paste phone number is invalid! The correct sample format: e.g. 08123456789");
      return;
    }
    
    changeInputValue(); // reset field
    mutatePhoneNumber(pasteResult);
  }

  function clearPhoneNumber() {
    setCountryCode(data.location.country?.code.toLowerCase());
    setCountryName(data.location.country?.name);
    setCountryNumber(data.location.country?.calling_code);
    setPhoneNumber("");

    changeInputValue(countryNumber);
  }

  function triggerAutocomplete() {
    const codeNumbers = countryCodeList.map(item => item.code);
    const autocompleteInput = document.getElementById("autoCompleteInput") as HTMLInputElement;
    autocomplete(autocompleteInput, codeNumbers, (value: string): void => {
      setCountryNumber(value);
    });
  }

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-4">
        Quick Whatsapp Send!
      </h1>

      <p className="px-14">Copy-paste or input a Whatsapp number and press <span className="font-bold text-[#4AC959]">SEND</span> to start chat with it quickly!</p>

      <Input
        data={parsedData}
        onCallbackInput={mutatePhoneNumber}
        onCallbackSubmit={sendWhatsapp}
        onCallbackClear={clearPhoneNumber}
        onCallbackPaste={handlePaste}
        triggerAutocomplete={triggerAutocomplete}
      />
    </div>
  )
}

export default Home
