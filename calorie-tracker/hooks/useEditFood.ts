import { useState } from "react";
import { updateFood } from '../services/apis/food';

export default function useEditFood(handleSuccess?: () => void, handleFailure?: () => void) {
  const [loading, setLoading] = useState(false)
  const [updatedFood, setUpdatedFood] = useState<Food>()

  const editFood = async (food: Food) => {
    try {
      setLoading(true)
      const _food = await updateFood(food)
      setUpdatedFood(_food)
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

  return { loading, updatedFood, editFood }

}