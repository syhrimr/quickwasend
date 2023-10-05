import type { NextPage } from "next"

import Input from "../components/Input"
import useCountryInfo from "../hooks/useCountryInfo"

const Home: NextPage = () => {

  const { data, error, isLoading } = useCountryInfo();

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-4">
        Quick Whatsapp Send!
      </h1>

      <p className="px-14">Copy-paste or input a Whatsapp number and press <span className="font-bold text-[#4AC959]">SEND</span> to start chat with it quickly!</p>

      <Input initData={data} error={error}></Input>
    </div>
  )
}

export default Home
