import { useState } from "react";
import { getFoodCountForLastNDays } from '../services/apis/food';

export default function useGetFoodCountsForLastNDays() {
  const [loading, setLoading] = useState(false)
  const [foodCount, setFoodCount] = useState<{ foods?: number }>()

  const fetchFoodCounts = async (days: number) => {
    try {
      setLoading(true)
      const _foodCount = await getFoodCountForLastNDays(days)
      setFoodCount(_foodCount)
    }
    catch (err) {
      console.log("err", err)
    }
    finally {
      setLoading(false)
    }

  }

  return { loading, foodCount, fetchFoodCounts }

}