import * as React from "react";
import useGetMeals from "../../hooks/useGetMeals";
import { Box } from "@mui/system";
import { Link } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import dayjs from "dayjs";

interface FoodItemsTableProps {
  data: Food[];
  handleEdit: (food: Food) => void;
  handleDelete: (id: number) => void;
}

export default function FoodItemsTable({
  data,
  handleDelete,
  handleEdit,
}: FoodItemsTableProps) {
  const { mealsHashMap } = useGetMeals();

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", width: 112 },
    { field: "calorie", headerName: "Calorie", width: 130 },
    {
      field: "meal",
      headerName: "Meal",
      width: 170,
    },
    { field: "date_added", headerName: "Date Added", width: 220 },
    {
      field: "action",
      headerName: "Action",
      width: 250,
      renderCell: (params) => {
        const { id, calorie, name, date_added, meal_id } = params?.row ?? {};
        return (
          <>
            <Box>
              <Link
                sx={{ p: 0, m: 0 }}
                component="button"
                variant="body2"
                underline="none"
                onClick={() => {
                  handleEdit({ id, calorie, name, date_added, meal_id });
                }}
              >
                Edit
              </Link>
              <span style={{ marginLeft: 5, marginRight: 5 }}>|</span>
              <Link
                sx={{ p: 0, m: 0 }}
                component="button"
                variant="body2"
                underline="none"
                onClick={() => {
                  if (!id) return;
                  handleDelete(id);
                }}
              >
                Delete
              </Link>
            </Box>
          </>
        );
      },
    },
  ];

  return (
    <div style={{ height: 650, width: "100%" }}>
      <DataGrid
        rows={
          data?.map(({ calorie, id, name, date_added, meal_id }) => ({
            calorie,
            id,
            name,
            date_added: dayjs(date_added).format("LLL"),
            meal: meal_id && mealsHashMap?.[meal_id],
            meal_id: meal_id,
          })) ?? []
        }
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
      />
    </div>
  );
}
