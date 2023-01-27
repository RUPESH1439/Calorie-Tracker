import { useState } from "react"
import { getMealCountForFood } from '../services/apis/food';


export default function useGetMealCountForFoodForUserOnDay() {
  const [loading, setLoading] = useState(false)
  const [mealCount, setMealCount] = useState<{
    [id: number]: {
      meals?: number
      max_meals?: number
    }
  }[]>([])

  const fetchMealCounts = async (userId: number, day: string) => {
    try {
      setLoading(true)
      const _counts = await getMealCountForFood(userId, day)
      setMealCount(_counts.reduce((acc, prev) => {
        if (prev.meal_id) {
          acc[prev.meal_id] = { meals: prev?.meals, max_meals: prev?.max_food_entries }
          return acc
        }
      }, {} as any))
    }
    catch (err) {
      console.log("err", err)
    }
    finally {
      setLoading(false)
    }

  }

  return { loading, mealCount, fetchMealCounts }
}