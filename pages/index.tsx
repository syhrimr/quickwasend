import type { NextPage } from "next"

import Input from "../components/Input"

const Home: NextPage = () => {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-4">
        Quick Whatsapp Send!
      </h1>

      <p className="px-14">Copy paste the Whatsapp number that you want to chat and quickly chat with it!</p>

      <Input></Input>
    </div>
  )
}

export default Home
