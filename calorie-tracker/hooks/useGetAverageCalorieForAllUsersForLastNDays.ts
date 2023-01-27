import { useState } from "react";
import { getAverageCalorieForAllUsersForLastNDays } from '../services/apis/food';

export default function useGetAverageCalorieForAllUserForLastNDays() {
  const [loading, setLoading] = useState(false)
  const [calories, setCalories] = useState<AverageCalorie[]>([])

  const fetchAverageCalories = async (days: number) => {
    try {
      setLoading(true)
      const _calories = await getAverageCalorieForAllUsersForLastNDays(days)
      setCalories(_calories)
    }
    catch (err) {
      console.log("err", err)
    }
    finally {
      setLoading(false)
    }

  }

  return { loading, calories, fetchAverageCalories }

}