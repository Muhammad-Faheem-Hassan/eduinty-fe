import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import UsersApi from "../../services/usersApi";
import CampusApi from "../../services/campusApi"; // You'll need to create this service

const roles = ["student", "donor", "admin", "franchise"];
const humanReadAbleRole = {
  student: "Student",
  donor: "Donor",
  admin: "Admin",
  franchise: "Franchise",
};

const UserForm = ({ userId, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [campuses, setCampuses] = useState([]);
    const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      role: "student",
      campusId: "",
      referralCode: "",
      credits: 0, // Hidden but default
      fatherName: "",
      education: "",
      cnic: "",
      address: "",
      profession: "",
    },
  });

  const fetchCampuses = async () => {
    try {
      const res = await CampusApi.getAll();
      setCampuses(res || []);
    } catch (err) {
      console.error("Failed to load campuses", err);
    }
  };

  // Fetch campuses from backend
  useEffect(() => {
    fetchCampuses();
  }, []);

  const onSubmit = async (data) => {
    console.log("Form Submitted Data:", data);
    setLoading(true);
    try {
      await UsersApi.create({
        ...data,
        credits: 0, // Force default
      });
     navigate("/users/list"); 
    } catch (error) {
      console.error(error);
      alert("Error saving user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3, borderRadius: 2, boxShadow: 3, bgcolor: "background.paper" }}>
      <Typography variant="h5" mb={2}>
        {userId ? "Edit User" : "Create User"}
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          {/* Name */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="name"
              control={control}
              rules={{ required: "Name is required" }}
              render={({ field }) => (
                <TextField {...field} label="Name" fullWidth size="small"
                  error={!!errors.name} helperText={errors.name?.message} />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Email" size="small" fullWidth />
              )}
            />
          </Grid>

          {/* Phone */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="phone"
              control={control}
              rules={{ required: "Phone is required" }}
              render={({ field }) => (
                <TextField {...field} label="Phone" fullWidth size="small"
                  error={!!errors.phone} helperText={errors.phone?.message} />
              )}
            />
          </Grid>

          {/* Password */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="password"
              control={control}
              rules={{ required: "Password is required" }}
              render={({ field }) => (
                <TextField {...field} label="Password" type="password" fullWidth size="small"
                  error={!!errors.password} helperText={errors.password?.message} />
              )}
            />
          </Grid>

          {/* Role */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="role"
              control={control}
              rules={{ required: "Role is required" }}
              render={({ field }) => (
                <TextField {...field} label="Select Role" select fullWidth size="small"
                  error={!!errors.role} helperText={errors.role?.message}>
                  {roles.map((role) => (
                    <MenuItem key={role} value={role}>
                      {humanReadAbleRole[role]}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="referralCode"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Referral Code" size="small" fullWidth />
              )}
            />
          </Grid>

          {/* Campus */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="campusId"
              control={control}
              rules={{ required: "Campus is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  value={field.value || ""}
                  label="Select Campus"
                  select
                  fullWidth
                  size="small"
                  variant="outlined"
                  error={!!errors.campusId}
                  helperText={errors.campusId?.message}
                  SelectProps={{
                    displayEmpty: true,
                    sx: { height: 40 }, // match height with text fields
                  }}
                  InputLabelProps={{
                    shrink: true, // keeps label consistent
                  }}
                >
                  <MenuItem value="">
                    Choose campus
                  </MenuItem>
                  {campuses.map((campus) => (
                    <MenuItem key={campus._id} value={campus._id}>
                      {campus.name}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>

          {/* Referral Code */}


          {/* Father Name */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="fatherName"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Father Name" size="small" fullWidth />
              )}
            />
          </Grid>

          {/* Education */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="education"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Education" size="small" fullWidth />
              )}
            />
          </Grid>

          {/* CNIC */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="cnic"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="CNIC" size="small" fullWidth />
              )}
            />
          </Grid>

          {/* Address */}
          <Grid item xs={12}>
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Address" size="small" fullWidth />
              )}
            />
          </Grid>

          {/* Profession */}
          <Grid item xs={12}>
            <Controller
              name="profession"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Profession" size="small" fullWidth />
              )}
            />
          </Grid>

        </Grid>
        {/* Buttons */}
        <Grid item xs={12}>
          <Box
            display="flex"
            gap={2}
            width="100%"
            mt={2}
          >
            <Button
              variant="outlined"
              onClick={() => reset()}
              disabled={loading}
               mr={1}
            >
              Reset
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {loading ? "Saving..." : "Submit"}
            </Button>
          </Box>
        </Grid>
      </form>
    </Box>
  );
};

export default UserForm;
