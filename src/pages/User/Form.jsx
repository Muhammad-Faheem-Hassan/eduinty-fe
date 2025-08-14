import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
  Grid,
} from "@mui/material";
import { useState } from "react";
import UsersApi from "../../services/usersApi";

const roles = ["student", "donor", "admin", "franchise"];
const humanReadAbleRole = {
  student: "Student",
  donor: "Donor",
  admin: "Admin",
  franchise: "Franchise",
};

const UserForm = ({ userId, onSuccess }) => {
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    control,
    reset,
    setValue, // added so you can set values programmatically
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "Faheem",
      phone: "+923086011481",
      password: "12345679",
      role: "student",
      campusId: "",
      referralCode: "",
      credits: 0,
      fatherName: "",
      education: "",
      cnic: "",
      address: "",
      profession: "",
    },
  });

  const onSubmit = async (data) => {
    console.log("Form Submitted Data:", data);
    setLoading(true);
      await UsersApi.create(data);
    try {
      // if (userId) {
      //   await UsersApi.update(userId, data);
      //   alert("User updated successfully");
      // } else {
      
      //   alert("User created successfully");
      // }
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error(error);
      alert("Error saving user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        p: 3,
        borderRadius: 2,
        boxShadow: 3,
        bgcolor: "background.paper",
      }}
    >
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
                <TextField
                  {...field}
                  label="Name"
                  fullWidth
                  size="small"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
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
                <TextField
                  {...field}
                  label="Phone"
                  fullWidth
                  size="small"
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                />
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
                <TextField
                  {...field}
                  label="Password"
                  type="password"
                  fullWidth
                  size="small"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
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
                <TextField
                  {...field}
                  label="Select Role"
                  select
                  fullWidth
                  size="small"
                  error={!!errors.role}
                  helperText={errors.role?.message}
                >
                  {roles.map((role) => (
                    <MenuItem key={role} value={role}>
                      {humanReadAbleRole[role]}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>

          {/* CampusId */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="campusId"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Campus ID" size="small" fullWidth />
              )}
            />
          </Grid>

          {/* Referral Code */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="referralCode"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Referral Code" size="small" fullWidth />
              )}
            />
          </Grid>

          {/* Credits */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="credits"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Credits"
                  size="small"
                  type="number"
                  fullWidth
                />
              )}
            />
          </Grid>

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

          {/* Buttons */}
          <Grid item xs={12} display="flex" justifyContent="flex-end" gap={2}>
            <Button variant="outlined" onClick={() => reset()} disabled={loading}>
              Reset
            </Button>
            <Button type="submit" variant="contained" color="primary" disabled={loading}>
              {loading ? "Saving..." : "Submit"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default UserForm;
