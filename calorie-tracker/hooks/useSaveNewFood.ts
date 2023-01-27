import { useState } from "react";
import { postNewFood } from '../services/apis/food';

export default function useSaveNewFood(handleSuccess?: () => void, handleFailure?: () => void) {
  const [loading, setLoading] = useState(false)
  const [newFood, setNewFood] = useState<Food>()

  const saveNewFood = async (food: CreateNewFood) => {
    try {
      setLoading(true)
      const _food = await postNewFood(food)
      setNewFood(_food)
      handleSuccess?.()
    }
    catch (err) {
      console.log("err", err)
    }
    finally {
      setLoading(false)
      handleFailure?.()
    }

  }

  return { loading, newFood, saveNewFood }

}