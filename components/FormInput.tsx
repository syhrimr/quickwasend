import Image from "next/image";
import FormButtons from "./FormButtons";

import type { ChangeEvent, FormEvent } from "react";

interface PhoneDetailData {
  phoneNumber: string;
  countryCode: string;
  countryName: string;
  countryNumber: string | undefined;
}

interface InputElementProps {
  data: PhoneDetailData;
  onCallbackChange: (number: string) => void;
  onCallbackSubmit: () => void;
  onCallbackClear: () => void;
  onCallbackPaste: () => Promise<void>;
  triggerAutocomplete: () => void;
}

export default function FormInput({
  data,
  onCallbackChange,
  onCallbackSubmit,
  onCallbackClear,
  onCallbackPaste,
  triggerAutocomplete,
}: InputElementProps): JSX.Element {
  const imageLoader = (): string =>
    `https://flagcdn.com/16x12/${data.countryCode}.png`;
  console.log(data);

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    onCallbackChange(event.target.value);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    onCallbackSubmit();
  }

  function handleClear(): void {
    onCallbackClear();
  }

  function handlePaste(): void {
    void onCallbackPaste();
  }

  return (
    <form className="px-8 mx-auto w-96" onSubmit={handleSubmit}>
      <div className="flex flex-row w-auto mb-8">
        <div className="flex flex-row w-[90%] bg-white border border-slate-300 rounded-md">
          <label className="block w-[30%] border-r-1">
            <div className="flex flex-row relative px-2">
              <Image
                loader={imageLoader}
                src={`https://flagcdn.com/16x12/${data.countryCode}.png`}
                width={16}
                height={12}
                alt={data.countryName}
                className="h-[12px] my-auto"
              />

              <input
                id="autoCompleteInput"
                className="block w-full h-10 pl-3 bg-transparent focus:outline-none"
                placeholder="62"
                defaultValue={data.countryNumber}
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
                className="block w-full h-10 px-2 bg-transparent focus:outline-none"
                type="text"
                pattern="[0-9]*"
                placeholder="812345678"
                onChange={handleChange}
              />

              <button
                className="h-full m-auto"
                title="Clear input button"
                type="button"
                onClick={handleClear}
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
                d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
              />
            </svg>
          </button>
        </label>
      </div>

      <FormButtons />
    </form>
  );
}
