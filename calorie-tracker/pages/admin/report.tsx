import type { NextPage } from "next";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import MetricCard from "../../components/Dashboard/MetricCard";
import AverageCaloriesTable from "../../components/Dashboard/AverageCaloriesTable";
import useGetFoodsForUser from "../../hooks/useGetFoodsForUser";
import { Button, Typography } from "@mui/material";
import UserFoodEntriesTable from "../../components/Dashboard/UserFoodEntriesTable";
import useGetAverageCalorieForAllUserForLastNDays from "../../hooks/useGetAverageCalorieForAllUsersForLastNDays";
import { useEffect, useState } from "react";
import AddEditFoodModal from "../../components/AddEditFoodModal";
import useEditFood from "../../hooks/useEditFood";
import useSaveNewFood from "../../hooks/useSaveNewFood";
import useDeleteFood from "../../hooks/useDeleteFood";
import useGetFoodCountsForLastNDays from "../../hooks/useGetFoodCountsForLastNdays";
import User from "../../components/User";

const AdminReport: NextPage = () => {
  const { foods, fetchFoods, setFoods } = useGetFoodsForUser();
  const [user, setUser] = useState<{ id?: undefined | number; name: string }>({
    id: undefined,
    name: "",
  });
  const [edit, setEdit] = useState(true);
  const { calories, fetchAverageCalories } =
    useGetAverageCalorieForAllUserForLastNDays();

  const { foodCount: last7daysFoodCount, fetchFoodCounts } =
    useGetFoodCountsForLastNDays();

  const {
    foodCount: last14DaysFoodCount,
    fetchFoodCounts: fetchLast14DaysFoodCount,
  } = useGetFoodCountsForLastNDays();

  const fetchGrossMetrics = () => {
    fetchAverageCalories(7);
    fetchFoodCounts(7);
    fetchLast14DaysFoodCount(14);
  };

  useEffect(() => {
    fetchGrossMetrics();
  }, []);

  const [openAddNewItemModal, setOpenAddNewItemModal] = useState(false);

  const onSaveSuccess = () => {
    setOpenAddNewItemModal(false);
    fetchGrossMetrics();
  };

  const onSaveFailure = () => {
    // setOpenAddNewItemModal(false)
  };

  const {
    editFood,
    loading: editFoodLoading,
    updatedFood,
  } = useEditFood(onSaveSuccess, onSaveFailure);

  const {
    saveNewFood,
    loading: saveNewFoodLoading,
    newFood,
  } = useSaveNewFood(onSaveSuccess, onSaveFailure);

  const { deleteFood } = useDeleteFood();

  const [selectedFood, setSelectedFood] = useState<Food | null>(null);

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

  useEffect(() => {
    if (newFood) {
      setFoods([...foods, newFood]);
    }
  }, [newFood]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Grid container spacing={2}>
            <Grid xs={3}>
              <MetricCard
                title="Total Entries Last 7 Days"
                value={last7daysFoodCount?.foods?.toString() ?? ""}
              />
            </Grid>
            <Grid xs={3}>
              <MetricCard
                title="Total Entries Previous week"
                value={
                  (
                    (last14DaysFoodCount?.foods ?? 0) -
                    (last7daysFoodCount?.foods ?? 0)
                  )?.toString() ?? ""
                }
              />
            </Grid>
            <Grid xs={4}></Grid>
          </Grid>
        </Box>

        <User />
      </Box>

      <Grid container spacing={5}>
        <Grid xs={4}>
          <Box sx={{ my: 5 }}>
            <Typography variant="h6" py={5}>
              Average calories per user for last 7 days
            </Typography>
            <AverageCaloriesTable
              data={calories}
              fetchFoods={fetchFoods}
              setUser={setUser}
            />
          </Box>
        </Grid>
        <Grid xs={8}>
          <Box sx={{ my: 5 }}>
            <Typography variant="h6" py={5}>
              User Food Entries for {user?.name}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                flex: 1,
                pb: 5,
              }}
            >
              <Button
                variant="contained"
                onClick={() => {
                  setSelectedFood(null),
                    setEdit(false),
                    setOpenAddNewItemModal(true);
                }}
              >
                Add new item
              </Button>
            </Box>
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
                  fetchGrossMetrics();
                }
              }}
            />
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

export default AdminReport;
