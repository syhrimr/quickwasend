import Image from "next/image";

const Footer = () => {
  return (
    <footer className="flex flex-1 w-full max-h-20 py-2 border-t-1 border-solid border-[#eaeaea] justify-center items-center bg-white">
      <a
        className="flex grow justify-center items-center"
        href="https://syhrimr.vercel.app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Developed by
        <span className="mx-1">
          <Image
            src="/vercel.svg"
            alt="Vercel Logo"
            width={12}
            height={12}
          />
        </span>
        {" "}
        Syhrimr
      </a>
    </footer>
  );
};

export default Footer;
