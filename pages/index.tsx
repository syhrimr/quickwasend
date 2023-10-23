/* eslint-disable react-hooks/exhaustive-deps */
import type { NextPage } from "next";

import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

import FormInput from "../components/FormInput";
import Image from "next/image";

import useCountryInfo from "../hooks/useCountryInfo";
import countryCodeList from "../data/countryPhoneCodes.json";
import autocomplete from "../utils/autocomplete";
import devicecheck from "../utils/devicecheck";

const Home: NextPage = () => {
  const router = useRouter();
  const { data, error } = useCountryInfo();

  const phoneNumber = useRef<string>("");
  const countryCode = useRef<string>("id");
  const countryName = useRef<string>("Indonesia");
  const countryNumber = useRef<string | undefined>("");
  const isDataExist = useRef(false);

  useEffect(() => {
    if (data !== undefined && error === undefined && !isDataExist.current) {
      countryCode.current = data.location.country?.code.toLowerCase();
      countryName.current = data.location.country?.name;
      countryNumber.current = data.location.country?.calling_code;
      isDataExist.current = true;
    }
  }, [data, error]);

  useEffect(() => {
    if (!router.isReady) return;

    const { phone } = router.query;

    if (phone !== "" || phone !== undefined) {
      mutatePhoneNumber(phone as string);
    }
  }, [router.isReady]);

  const parsedData = {
    phoneNumber: phoneNumber.current,
    countryCode: countryCode.current,
    countryName: countryName.current,
    countryNumber: countryNumber.current,
  };

  function changeInputValue(
    codeValue: string | undefined = "",
    phoneValue: string | undefined = ""
  ): void {
    const codeInput = document.getElementById(
      "autoCompleteInput"
    ) as HTMLInputElement;
    const phoneInput = document.getElementById(
      "phoneInput"
    ) as HTMLInputElement;

    codeInput.value = codeValue;
    phoneInput.value = phoneValue;
  }

  function mutatePhoneNumber(number: string | undefined): void {
    number = (number ?? "").replace(/\s/g, "");

    const codeNumbers = countryCodeList.map((item) => item.code);

    if (number.charAt(0) === "+") {
      countryNumber.current = number.slice(1, 3);
      number = number.slice(3);
    } else if (number.charAt(0) === "0") {
      const selectedItem = countryCodeList.find((code) => {
        return code.iso === countryCode.current.toUpperCase();
      });

      countryNumber.current = selectedItem?.code;
      number = number.slice(1);
    } else if (
      codeNumbers.includes(number.substring(0, 2)) &&
      countryNumber.current === ""
    ) {
      parsedData.countryNumber = number.slice(0, 2);
      countryNumber.current = number.slice(0, 2);
      number = number.slice(2);
    }

    changeInputValue(countryNumber.current, number);
    phoneNumber.current = countryNumber.current + number;

    void router.replace({
      query: {
        ...router.query,
        phone: phoneNumber.current,
      },
    });
  }

  function sendWhatsapp(): void {
    // navigate to web WA to directly open chat window
    if (phoneNumber.current === "") {
      alert("Please insert the right number!");
      return;
    }
    const { isMobile } = devicecheck();
    const baseURL = `https://${isMobile ? "api" : "web"}.whatsapp.com/send`;
    const query = new URLSearchParams({
      phone: phoneNumber.current,
    });
    const url = `${baseURL}/?${query.toString()}`;
    window.open(url, "_blank");
  }

  async function handlePaste(): Promise<void> {
    const phoneNumberRegex =
      // eslint-disable-next-line no-useless-escape
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    let pasteResult = await navigator.clipboard.readText();
    pasteResult = pasteResult.replace(/\s/g, ""); // remove whitespace

    if (!phoneNumberRegex.test(pasteResult)) {
      alert(
        "The paste phone number is invalid! The correct sample format: e.g. 08123456789"
      );
      return;
    }

    changeInputValue(); // reset field
    mutatePhoneNumber(pasteResult);
  }

  function clearPhoneNumber(): void {
    countryCode.current = data.location.country?.code.toLowerCase();
    countryName.current = data.location.country?.name;
    countryNumber.current = data.location.country?.calling_code;
    phoneNumber.current = "";

    changeInputValue(countryNumber.current);

    void router.replace({
      query: {
        ...router.query,
        phone: "",
      },
    });
  }

  function triggerAutocomplete(): void {
    const codeNumbers = countryCodeList.map((item) => item.code);
    const autocompleteInput = document.getElementById(
      "autoCompleteInput"
    ) as HTMLInputElement;
    autocomplete(autocompleteInput, codeNumbers, (value: string): void => {
      countryNumber.current = value;
    });
  }

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-4">Quick Whatsapp Send!</h1>

      <a
        className="inline-flex flew-row mb-10 hover:translate-y-[-2px] hover:drop-shadow-md"
        href="https://github.com/syhrimr/quickwasend"
        target="_blank"
        rel="noopener noreferrer"
      >
        View on{" "}
        <Image
          src="/github.svg"
          alt="GitHub Logo"
          width={18}
          height={18}
          className="ml-1"
        />
        <strong>GitHub</strong>
      </a>

      <p className="px-12 mb-10">
        A shortcut to start chat with WhatsApp. Just copy-paste or input a
        Whatsapp number and press{" "}
        <span className="font-bold text-[#4AC959]">SEND </span>
        to start chat with it quickly!
      </p>

      <FormInput
        data={parsedData}
        onCallbackChange={mutatePhoneNumber}
        onCallbackSubmit={sendWhatsapp}
        onCallbackClear={clearPhoneNumber}
        onCallbackPaste={handlePaste}
        triggerAutocomplete={triggerAutocomplete}
      />
    </div>
  );
};

export default Home;
