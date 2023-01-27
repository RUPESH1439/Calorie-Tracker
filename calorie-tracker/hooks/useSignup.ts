import { useState } from "react"
import { signup } from "../services/apis/user"

export default function useSignup() {
  const [loading, setLoading] = useState(false)
  const _signup = async (user: any) => {
    try {
      setLoading(true)
      const response = await signup(user)
      return {
        success: true
      }
    }
    catch (err) {
      console.log(err)
      return { success: false }
    }
    finally {
      setLoading(false)
    }
  }
  return { loading, signup: _signup }
}