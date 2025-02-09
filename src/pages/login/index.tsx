import Hero from "@assets/svg/login/hero.svg?react"
import Logo from "@assets/svg/logo.svg?react"
import Google from "@assets/svg/login/google.svg?react"
import herobg from "@assets/images/login/circles_bg.png"
import { Image } from "antd"
import { Button } from "@components"
import { useRequest } from "@hooks/useRequest"
import { signInWithGoogle } from "@utils/index"

const Login = () => {
  const [apiWrapper, loading] = useRequest()
  const onLogin = async () => {
    await apiWrapper(signInWithGoogle)
  }
  return (
    <div className="bg-[#FFF9F9] min-h-screen">
      <div className="grid grid-cols-2">
        <div className="grid self-center place-content-center gap-6">
          <h1 className="text-[#7B1984] text-3xl font-semibold flex gap-1.5">
            <Logo className="size-9" />
            TaskBuddy
          </h1>
          <p className="text-sm font-light">
            Streamline your workflow and track progress effortlessly
            <br />
            with our all-in-one task management app.
          </p>
          <Button
            className="!rounded-2xl min-h-[3rem] !bg-black !text-white"
            onClick={onLogin}
            loading={loading}
          >
            <Google className="size-6" />
            <span className="text-xl">Continue with google</span>
          </Button>
        </div>
        <div className="flex items-center justify-end min-h-screen">
          <Image
            preview={false}
            src={herobg}
            alt="bg"
            className="min-h-[100vh]"
            rootClassName="!absolute !h-[100vh] !right-0 z-0 "
          />
          <Hero
            className="z-10 !max-w-[946px] !min-h-[662px]"
            width={946}
            height={662}
          />
        </div>
      </div>
    </div>
  )
}

export default Login
