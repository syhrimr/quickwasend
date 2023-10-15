import Image from "next/image";

import { ChangeEvent, FormEvent } from "react";

const Input = ({
  data,
  onCallbackInput,
  onCallbackSubmit,
  onCallbackClear,
  onCallbackPaste,
  triggerAutocomplete
}) => {
  const imageLoader = () => `https://flagcdn.com/16x12/${data.countryCode}.png`;

  function handleInput(event: ChangeEvent<HTMLInputElement>) {
    onCallbackInput(event.target.value);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onCallbackSubmit();
  }

  function handleClear() {
    onCallbackClear();
  }

  function handlePaste() {
    onCallbackPaste();
  }

  return (
    <form className="px-8 mx-auto w-96" onSubmit={handleSubmit}>
      <div className="flex flex-row w-auto mb-8">
        <div className="flex flex-row w-[90%] bg-white border border-slate-300 rounded-md">
          <label className="block w-[30%] border-r-1">
            <div
              className="flex flex-row relative px-2"
            >
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
                onInput={handleInput}
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