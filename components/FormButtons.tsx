export default function FormButtons(): JSX.Element {
  function generateShortenedLink(): void {
    const baseUrl = "https://wa.me";
    const currentUrl = new URL(window.location.href);
    const params = new URLSearchParams(currentUrl.search);

    if (params.get("phone") === "") {
      alert("Please input a phone number!");
      return;
    }

    const shortenedUrl = new URL(params.get("phone") as string | URL, baseUrl);
    void navigator.clipboard.writeText(shortenedUrl.toString());
    alert("Shortened WhatsApp link already copied to the clipboard!");
  }

  return (
    <>
      <div className="flex flex-col md:flex-row gap-6 justify-center items-stretch">
        <button
          className="w-full px-8 py-2 text-base text-slate-50 font-semibold rounded-full border-none bg-[#4AC959] hover:translate-y-[-2px] hover:shadow-md"
          type="submit"
        >
          Send
        </button>

        <button
          className="w-full px-8 py-2 text-base text-gray-600 font-semibold rounded-full border border-[#4AC959] bg-transparent hover:translate-y-[-2px] hover:shadow-md"
          type="button"
          onClick={generateShortenedLink}
        >
          Generate
        </button>
      </div>
    </>
  );
}
