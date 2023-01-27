import { useState } from "react"
import constants from "../constants"
import { signin } from "../services/apis/user"

const { USER_TOKEN } = constants

export default function useSignIn() {
  const [loading, setLoading] = useState(false)
  const _signin = async (user: any) => {
    try {
      setLoading(true)
      const response = await signin(user)
      const token = response.headers.authorization
      if (token) {
        localStorage.setItem(USER_TOKEN, token);
      } else {
        localStorage.removeItem(USER_TOKEN);
      }
      return token

    }
    catch (err) {
      console.log(err)
    }
    finally {
      setLoading(false)
    }
  }
  return { loading, signin: _signin }
}