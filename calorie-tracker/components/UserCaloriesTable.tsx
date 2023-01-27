import * as React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import useGetTotalCaloriesForUser from "../hooks/useGetTotalCaloriesForUser";
import { Typography } from "@mui/material";
import LoadingProgress from "./Loading";
import { UserContext } from "../contexts/userContext";

const columns: GridColDef[] = [
  { field: "date_added", headerName: "Date added", width: 112 },
  { field: "total_calories", headerName: "Total Calories", width: 130 },
  {
    field: "exceeded",
    headerName: "Calories Limit Reached",
    width: 170,
  },
];

interface UserCaloriesTableProps {
  refetch: boolean;
  setRefetch: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UserCaloriesTable({
  refetch,
  setRefetch,
}: UserCaloriesTableProps) {
  const { allCalories, fetchAllCalories, loading } =
    useGetTotalCaloriesForUser();

  const { user } = React.useContext(UserContext);
  const calorie_limit = user?.calorie_limit ?? 0;

  React.useEffect(() => {
    if (refetch) {
      fetchAllCalories(user?.id);
    }
  }, [refetch]);

  React.useEffect(() => {
    if (loading && refetch) {
      setRefetch(false);
    }
  }, [loading]);

  return (
    <div style={{ height: 650, width: "100%" }}>
      <Typography variant="h6" mb={6}>
        Total Calories
      </Typography>
      {loading ? (
        <LoadingProgress />
      ) : (
        <>
          <DataGrid
            rows={
              allCalories?.map((calorie) => ({
                ...calorie,
                id: calorie?.date_added,
                total_calories: calorie?.total_calories?.toFixed(2),
                exceeded:
                  calorie?.total_calories &&
                  calorie?.total_calories >= calorie_limit
                    ? "Yes"
                    : "No",
              })) ?? []
            }
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
        </>
      )}
    </div>
  );
}
