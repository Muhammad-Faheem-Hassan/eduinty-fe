import { useEffect, useState } from "react";
import { Grid, Paper, Typography } from "@mui/material";
import DashboardApi from "../services/dashboardApi";

const Dashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [campusCount, setCampusCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const data = await DashboardApi.getCounts();
        setUserCount(data.users);
        setCampusCount(data.campuses);
      } catch (err) {
        console.error("Failed to fetch counts", err);
      }
    };
    fetchCounts();
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <Paper sx={{ p: 3, textAlign: "center" }}>
          <Typography variant="h6">Total Users</Typography>
          <Typography variant="h4">{userCount}</Typography>
        </Paper>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Paper sx={{ p: 3, textAlign: "center" }}>
          <Typography variant="h6">Total Campuses</Typography>
          <Typography variant="h4">{campusCount}</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
