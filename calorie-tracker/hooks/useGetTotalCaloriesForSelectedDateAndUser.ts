import { useState } from "react";
import { getTotalCaloriesForADateUser } from '../services/apis/user';

export default function useGetTotalCaloriesForSelectedDateAndUser() {
  const [loading, setLoading] = useState(false)
  const [totalCalorie, setTotalCalorie] = useState<TotalCalorieForUser>()
  const fetchTotalCalories = async (userId?: number, date?: string) => {
    if (!userId || !date) return
    try {
      setLoading(true)
      const calorie = await getTotalCaloriesForADateUser(userId, date)
      setTotalCalorie(calorie)
    }
    catch (err) {
      console.log("err", err)
    }
    finally {
      setLoading(false)
    }
  }

  return { loading, totalCalorie, fetchTotalCalories }

}