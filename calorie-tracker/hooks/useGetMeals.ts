import { useEffect, useState } from "react";
import { getMeals } from "../services/apis/meal";

export default function useGetMeals() {
  const [loading, setLoading] = useState(false)
  const [meals, setMeals] = useState<Meal[]>([])

  const fetchFoods = async () => {
    try {
      setLoading(true)
      const _meals = await getMeals()
      setMeals(_meals)
    }
    catch (err) {
      console.log("err", err)
    }
    finally {
      setLoading(false)
    }

  }

  useEffect(() => {
    fetchFoods()
  }, [])

  return {
    loading, meals, fetchFoods, mealsHashMap: meals?.reduce((acc, obj) => {
      if (obj.id && acc) {
        acc[obj?.id] = obj.name
        return acc
      }
    }, {} as any)
  }

}