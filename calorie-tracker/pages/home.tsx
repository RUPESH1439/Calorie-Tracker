import type { NextPage } from "next";
import useGetFoodsForUser from "../hooks/useGetFoodsForUser";
import { Box, Button, Typography } from "@mui/material";
import AddEditFoodModal from "../components/AddEditFoodModal";
import { useState, useEffect, useContext } from "react";
import useSaveNewFood from "../hooks/useSaveNewFood";
import useEditFood from "../hooks/useEditFood";
import useDeleteFood from "../hooks/useDeleteFood";
import InviteFriend from "../components/InviteFriend";
import useGetCurrentUser from "../hooks/useGetCurrentUser";
import UserCaloriesTable from "../components/UserCaloriesTable";
import Grid from "@mui/material/Unstable_Grid2";
import LoadingProgress from "../components/Loading";
import UserFoodEntriesTable from "../components/Dashboard/UserFoodEntriesTable";
import MetricCard from "../components/Dashboard/MetricCard";
import { UserContext } from "../contexts/userContext";
import User from "../components/User";

const Home: NextPage = () => {
  const [openAddNewItemModal, setOpenAddNewItemModal] = useState(false);
  const [edit, setEdit] = useState(true);
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);

  const { user } = useContext(UserContext);
  const {
    foods,
    loading: foodsLoading,
    setFoods,
    fetchFoods,
  } = useGetFoodsForUser();

  useEffect(() => {
    if (user?.id) {
      fetchFoods(user?.id);
    }
  }, [user]);

  const [refetchUserCalories, setRefetchUserCalories] = useState(false);

  const onSaveSuccess = () => {
    setOpenAddNewItemModal(false);
    setRefetchUserCalories(true);
  };

  const onSaveFailure = () => {
    // setOpenAddNewItemModal(false)
  };

  const {
    editFood,
    loading: editFoodLoading,
    updatedFood,
  } = useEditFood(onSaveSuccess, onSaveFailure);

  const { deleteFood } = useDeleteFood();

  const {
    saveNewFood,
    loading: saveNewFoodLoading,
    newFood,
  } = useSaveNewFood(onSaveSuccess, onSaveFailure);

  useEffect(() => {
    if (newFood) {
      setFoods([...foods, newFood]);
    }
  }, [newFood]);

  useEffect(() => {
    if (updatedFood) {
      let _copyFoods = foods;
      let _foodIndex = foods?.findIndex((item) => item?.id === updatedFood?.id);
      if (_foodIndex || _foodIndex === 0) {
        _copyFoods[_foodIndex] = updatedFood;
        setFoods([..._copyFoods]);
      }
    }
  }, [updatedFood]);

  return (
    <Box sx={{}}>
      <Box
        sx={{
          display: "flex",
          my: 5,
          justifyContent: "right",
        }}
      >
        <Box sx={{ mr: 5 }}>
          <MetricCard
            title="Your Daily Calorie Limit"
            value={user?.calorie_limit?.toString() ?? ""}
          />
        </Box>

        <InviteFriend />
      </Box>

      <Grid container spacing={5}>
        <Grid xs={4}>
          <UserCaloriesTable
            refetch={refetchUserCalories}
            setRefetch={setRefetchUserCalories}
          />
        </Grid>
        <Grid xs={8}>
          <Box width="100%">
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flex: 1,
                pb: 5,
              }}
            >
              <Button
                variant="contained"
                onClick={() => {
                  setOpenAddNewItemModal(true);
                  setEdit(false);
                }}
              >
                Add new item
              </Button>
            </Box>
            {foodsLoading ? (
              <LoadingProgress />
            ) : (
              <UserFoodEntriesTable
                data={foods}
                handleEdit={(food: Food) => {
                  setSelectedFood(food);
                  setEdit(true);
                  setOpenAddNewItemModal(true);
                }}
                handleDelete={async (id) => {
                  const deleted = await deleteFood(id);
                  if (deleted) {
                    setFoods((prev) => prev.filter((food) => food?.id !== id));
                    setRefetchUserCalories(true);
                  }
                }}
              />
            )}
          </Box>
        </Grid>
      </Grid>

      <AddEditFoodModal
        open={openAddNewItemModal}
        setOpen={setOpenAddNewItemModal}
        editFood={editFood}
        edit={edit}
        food={selectedFood}
        userId={user?.id}
        saveNewFood={saveNewFood}
      />
    </Box>
  );
};

export default Home;
