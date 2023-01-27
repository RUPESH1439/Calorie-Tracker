import { useEffect, useState } from "react";
import { getFoods } from '../services/apis/food';

export default function useGetAllFoods() {
  const [loading, setLoading] = useState(false)
  const [foods, setFoods] = useState<Food[]>([])

  const fetchFoods = async () => {
    try {
      setLoading(true)
      const _foods = await getFoods()
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

  return { loading, foods, fetchFoods }

}