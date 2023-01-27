import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import useGetMeals from "../hooks/useGetMeals";
import { useEffect, useState } from "react";
import useGetMealCountForFoodForUserOnDay from "../hooks/useGetMealCountForFoodForUserOnDay";
import ErrorMessage from "./ErrorMessage";
import useGetTotalCaloriesForSelectedDateAndUser from "../hooks/useGetTotalCaloriesForSelectedDateAndUser";
import formatDay from "../services/formatDay";
import { UserContext } from "../contexts/userContext";
import AsyncButton from "./AsyncButton";

const style = {
  root: {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    width: "40%",
  },
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
  },
  input: {
    marginTop: 5,
  },
};

interface AddEditFoodModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  saveNewFood?: (food: CreateNewFood) => void;
  editFood?: (food: Food) => void;
  edit?: boolean;
  food?: Food | null;
  userId?: number;
}

export default function AddEditFoodModal({
  open,
  setOpen,
  saveNewFood,
  editFood,
  edit,
  food,
  userId,
}: AddEditFoodModalProps) {
  const handleClose = () => setOpen(false);
  const [loading, setLoading] = useState(false);
  const { user } = React.useContext(UserContext);
  const { meals, mealsHashMap } = useGetMeals();
  const [meal, setMeal] = React.useState<undefined | string>("");

  const { fetchTotalCalories, totalCalorie } =
    useGetTotalCaloriesForSelectedDateAndUser();

  const [dateAdded, setDateAdded] = React.useState<Dayjs | null>(dayjs());
  const [name, setName] = useState<string | undefined>();
  const [calorie, setCalorie] = useState<number | undefined>();
  const [errors, setErrors] = useState<{
    [name: string]: undefined | string;
  }>({
    name: undefined,
    meal: undefined,
    dateAdded: undefined,
    calorie: undefined,
  });

  const handleChange = (event: SelectChangeEvent) => {
    setMeal(event.target.value);
  };

  useEffect(() => {
    setName(food?.name ?? "");
    setCalorie(food?.calorie ?? 0);
    setMeal(food?.meal_id?.toString() ?? "");
    setDateAdded(dayjs(food?.date_added));
  }, [food?.id]);

  const { mealCount, fetchMealCounts } = useGetMealCountForFoodForUserOnDay();

  useEffect(() => {
    if (!userId) return;
    fetchMealCounts(userId, dayjs(dateAdded)?.toString());
    fetchTotalCalories(userId, formatDay(dateAdded));
  }, [userId, dateAdded]);

  const isErrors = () => {
    let mealError: any;
    let calorieError: any;
    let nameError: any;

    if (totalCalorie?.total_calories) {
      calorieError =
        user?.calorie_limit && totalCalorie?.total_calories && calorie
          ? calorie + totalCalorie?.total_calories > user?.calorie_limit
            ? `Calorie limit exceeded by ${Math.abs(
                user?.calorie_limit - (calorie + totalCalorie?.total_calories)
              )}`
            : undefined
          : undefined;
    } else {
      calorieError =
        user?.calorie_limit && calorie
          ? calorie > user?.calorie_limit
            ? `Calorie limit exceeded by ${Math.abs(
                user?.calorie_limit - calorie
              )}`
            : undefined
          : undefined;
    }

    if (meal) {
      const _meal = mealCount?.[parseInt(meal)] as {
        meals?: number;
        max_meals?: number;
      };
      if (_meal && _meal?.meals && _meal?.max_meals) {
        const _mealError = _meal?.meals >= _meal?.max_meals;
        mealError = _mealError
          ? `You have already added ${_meal?.meals} ${mealsHashMap?.[meal]}. Can add only ${_meal?.max_meals}.`
          : undefined;
      }
    }

    if (!name || name?.length < 1) {
      nameError = "Food is required";
    }

    if (!calorie) {
      calorieError = "Calorie is required";
    }

    if (calorie === 0) {
      calorieError = "Calorie must be greater than 0";
    }

    if (!meal) {
      mealError = "Meal is required";
    }

    setErrors((prev) => ({
      ...prev,
      meal: mealError,
      calorie: calorieError,
      name: nameError,
    }));
    return mealError || calorieError || nameError;
  };

  useEffect(() => {
    if (!userId) return;
    if (open) {
      fetchTotalCalories(userId, formatDay(dateAdded));
      fetchMealCounts(userId, dayjs(dateAdded)?.toString());
    }
  }, [open]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="Add new food"
        aria-describedby="Add new food"
      >
        <Box sx={style.root}>
          <Box sx={style.container}>
            <Typography variant="h6" textAlign="center">
              {edit ? "Edit food" : "Add new food"}
            </Typography>
            <Box sx={{ flexDirection: "column", flex: 1 }}>
              <TextField
                id="name"
                label="Name"
                variant="outlined"
                sx={style.input}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              {errors?.["name"] && <ErrorMessage error={errors?.["name"]} />}
            </Box>
            <Box sx={{ flexDirection: "column", flex: 1 }}>
              <TextField
                id="calorie"
                label="Calorie"
                variant="outlined"
                sx={style.input}
                type="number"
                value={calorie}
                onChange={(e) => {
                  setCalorie(parseInt(e.target.value));
                }}
                fullWidth
              />
              {errors?.["calorie"] && (
                <ErrorMessage error={errors?.["calorie"]} />
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                mt: 5,
              }}
            >
              <Box sx={{ flexDirection: "column", flex: 1 }}>
                <Select
                  labelId="set meal"
                  id="select-meals"
                  value={meal}
                  label="Meal"
                  onChange={handleChange}
                  sx={{ flex: 1 }}
                  error={!!errors?.["meal"]}
                  fullWidth
                >
                  {meals?.map(({ name, id }) => (
                    <MenuItem value={id} key={id}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
                {errors?.["meal"] && <ErrorMessage error={errors?.["meal"]} />}
              </Box>

              <Box sx={{ ml: 5 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="Date Added"
                    value={dateAdded}
                    onChange={(newValue) => {
                      setDateAdded(newValue);
                    }}
                  />
                </LocalizationProvider>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                flex: 1,
                pt: 5,
              }}
            >
              <AsyncButton
                title="Save"
                variant="contained"
                size="large"
                loading={loading}
                onClick={async () => {
                  if (!isErrors()) {
                    if (meal && dateAdded) {
                      const payload: CreateNewFood = {
                        meal_id: parseInt(meal),
                        calorie: calorie ?? 0,
                        name: name ?? "",
                        date_added: dateAdded.toDate(),
                        user_id: userId ?? 1,
                      };
                      setLoading(true);
                      if (!edit) {
                        await saveNewFood?.(payload);
                      } else {
                        await editFood?.({
                          meal_id: parseInt(meal),
                          calorie: calorie,
                          name: name,
                          date_added: dateAdded.toDate(),
                          user_id: food?.user_id,
                          id: food?.id,
                        });
                      }
                      setLoading(false);
                    }
                  }
                }}
              />
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
