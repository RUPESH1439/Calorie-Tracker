import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import constants from "../constants";
import { getCurrentUser } from '../services/apis/user';

export default function useGetCurrentUser() {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<User>()
  const isAdmin = user?.role === 'admin'
  const router = useRouter()

  const fetchCurrentUser = async () => {
    try {
      setLoading(true)
      const _user = await getCurrentUser()
      setUser(_user)
    }
    catch (err) {
      console.log("err", err)
    }
    finally {
      setLoading(false)
    }

  }

  const logout = () => {
    setUser({})
    localStorage.removeItem(constants
      .USER_TOKEN)
    router.replace('/')
  }

  useEffect(() => {
    fetchCurrentUser()
  }, [])

  return { loading, user, fetchCurrentUser, isAdmin, logout }

}