// src/pages/Auth/SignUpForm.jsx
import { useForm, Controller } from "react-hook-form";
import { Button, TextField, Typography, Grid, Paper, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthApi from "../../services/authApi";
import CampusApi from "../../services/campusApi";

const SignUpForm = () => {
  const [loading, setLoading] = useState(false);
  const [campuses, setCampuses] = useState([]);
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      password: "",
      referralCode: "",
      campusId: "",
    },
  });

  // Watch referralCode and campusId for changes
  const referralCode = watch("referralCode");
  const campusId = watch("campusId");

  // Fetch campuses
  useEffect(() => {
    const fetchCampuses = async () => {
      try {
        const res = await CampusApi.getAll();
        setCampuses(res || []);
      } catch (err) {
        console.error("Failed to load campuses", err);
      }
    };
    fetchCampuses();
  }, []);

  // Auto-set campus when referral code is entered
  useEffect(() => {
    if (referralCode && campuses.length) {
      const matchedCampus = campuses.find(
        (campus) => campus.referralCode?.toLowerCase() === referralCode.toLowerCase()
      );
      if (matchedCampus) {
        setValue("campusId", matchedCampus._id);
      }
    }
  }, [referralCode, campuses, setValue]);

  // Auto-set referral code when campus is selected
  useEffect(() => {
    if (campusId && campuses.length) {
      const selectedCampus = campuses.find((campus) => campus._id === campusId);
      if (selectedCampus && selectedCampus.referralCode) {
        setValue("referralCode", selectedCampus.referralCode);
      }
    }
  }, [campusId, campuses, setValue]);

  const onSubmit = async (data) => {
    try {
      data.role = "student";
      setLoading(true);
      await AuthApi.signup(data);
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Error creating account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ minHeight: "100vh", bgcolor: "#f5f5f5" }}
    >
      <Grid item xs={12} sm={6} md={4}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h5" mb={3} align="center">
            Sign Up
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Name */}
            <Controller
              name="name"
              control={control}
              rules={{ required: "Name is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Full Name"
                  fullWidth
                  size="small"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  margin="normal"
                />
              )}
            />

            {/* Phone */}
            <Controller
              name="phone"
              control={control}
              rules={{ required: "Phone number is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Phone Number"
                  fullWidth
                  size="small"
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                  margin="normal"
                />
              )}
            />

            {/* Password */}
            <Controller
              name="password"
              control={control}
              rules={{ required: "Password is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Password"
                  type="password"
                  fullWidth
                  size="small"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  margin="normal"
                />
              )}
            />

            {/* Referral Code */}
            <Controller
              name="referralCode"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Campus Referral Code"
                  fullWidth
                  size="small"
                  margin="normal"
                />
              )}
            />

            {/* Campus Select */}
            <Controller
              name="campusId"
              control={control}
              rules={{ required: "Campus is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Select Campus"
                  select
                  fullWidth
                  size="small"
                  margin="normal"
                  error={!!errors.campusId}
                  helperText={errors.campusId?.message}
                >
                  <MenuItem value="">Choose campus</MenuItem>
                  {campuses.map((campus) => (
                    <MenuItem key={campus._id} value={campus._id}>
                      {campus.name}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />

            {/* Submit */}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 2 }}
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default SignUpForm;
