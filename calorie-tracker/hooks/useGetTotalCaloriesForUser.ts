import { useContext, useEffect, useState } from "react";
import { getTotalCaloriesForUser } from '../services/apis/user';
import { UserContext } from '../contexts/userContext';

export default function useGetTotalCaloriesForUser() {
  const [loading, setLoading] = useState(false)
  const [allCalories, setAllCalories] = useState<TotalCalorieAndDate[]>()
  const { user } = useContext(UserContext)
  const fetchAllCalories = async (userId?: number) => {
    if (!userId) return
    try {
      setLoading(true)
      const _allCalories = await getTotalCaloriesForUser(userId)
      setAllCalories(_allCalories)
    }
    catch (err) {
      console.log("err", err)
    }
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user?.id) {
      fetchAllCalories(user?.id)
    }
  }, [user])

  return { loading, allCalories, fetchAllCalories }

}