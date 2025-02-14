import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
// const hankoApi = import.meta.env.VITE_REACT_APP_HANKO_API_URL
const hankoApi = 'https://ea06f524-93a0-4733-976b-709615840a5f.hanko.io'

const LogOut = () => {
  const navigate = useNavigate()
  const [hanko, setHanko] = useState()

  useEffect(() => {
    import("@teamhanko/hanko-elements").then(({ Hanko }) =>
      setHanko(new Hanko(hankoApi ?? ""))
    )
  }, [])

  const logout = async () => {
    try{
      await hanko?.user.logout()
      navigate("/auth")
    } catch (error){
      console.error("Error during logout:", error)
    }
  }
  return logout
}

export const useLogout = () => {
  const logoutFunction = LogOut()
  return logoutFunction
}