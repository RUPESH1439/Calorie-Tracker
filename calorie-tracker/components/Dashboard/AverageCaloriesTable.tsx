import * as React from "react";
import { Button } from "@mui/material";
import { SetStateAction } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface FoodItemsTableProps {
  data: AverageCalorie[];
  fetchFoods: (_userId?: number | undefined) => Promise<void>;
  setUser: React.Dispatch<SetStateAction<{ id?: number; name: string }>>;
}

export default function AverageCaloriesTable({
  data,
  fetchFoods,
  setUser,
}: FoodItemsTableProps) {
  const columns: GridColDef[] = [
    { field: "name", headerName: "User", width: 140 },
    { field: "avg", headerName: "Avg Calories", width: 130 },
    {
      field: "exceeded",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        const { user_id, name } = params?.row;
        return (
          <Button
            variant="text"
            size="small"
            disableRipple
            onClick={() => {
              fetchFoods(user_id);
              setUser({ id: user_id, name: name ?? "" });
            }}
          >
            View Detail
          </Button>
        );
      },
    },
  ];

  return (
    <div style={{ height: 650, width: "100%" }}>
      <DataGrid
        rows={
          data?.map(({ avg, user_id, name }) => ({
            avg: avg?.toFixed(2),
            id: user_id,
            user_id,
            name,
          })) ?? []
        }
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
      />
    </div>
  );
}
