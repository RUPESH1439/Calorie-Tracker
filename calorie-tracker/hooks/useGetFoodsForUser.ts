import { useEffect, useState } from "react";
import { getFoodsForUser } from '../services/apis/food';

export default function useGetFoodsForUser(userId?: number) {
  const [loading, setLoading] = useState(false)
  const [foods, setFoods] = useState<Food[]>([])

  const fetchFoods = async (_userId?: number) => {
    if (!userId && !_userId) return
    try {
      setLoading(true)
      const _foods = await getFoodsForUser(_userId ?? userId ?? 0)
      setFoods(_foods)
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

  return { loading, foods, fetchFoods, setFoods }

}