import { useEffect, useState } from "react";
import { deleteFood as _deleteFood } from '../services/apis/food';

export default function useDeleteFood() {
  const [loading, setLoading] = useState(false)

  const deleteFood = async (id: number) => {
    try {
      setLoading(true)
      await _deleteFood(id)
      setLoading(false)
      return true
    }
    catch (err) {
      console.log("err", err)
      setLoading(false)
      return false
    }
  }

  return { loading, deleteFood }

}