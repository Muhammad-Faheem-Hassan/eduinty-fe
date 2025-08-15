import { useForm, Controller } from "react-hook-form";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
import { useState } from "react";
import AuthApi from "../../services/authApi"; // you’ll create this

export default function LoginForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { handleSubmit, control } = useForm({
    defaultValues: { email: "", password: "" },
  });
  
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await AuthApi.login(data);
      // Save token / user in localStorage
      localStorage.setItem("auth", JSON.stringify(res));
      navigate("/"); // redirect to dashboard
    } catch (err) {
      alert("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  useState(() => {
    localStorage.removeItem("auth");
  }, []);

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper sx={{ p: 4, width: 400 }}>
        <Typography variant="h5" mb={3} textAlign="center">
          Login
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <Controller
            name="email"
            control={control}
            rules={{ required: "Email is required" }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Email"
                type="email"
                fullWidth
                margin="normal"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />

          {/* Password */}
          <Controller
            name="password"
            control={control}
            rules={{ required: "Password is required" }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
          <Box textAlign="center" mt={2}>
            <Link component={RouterLink} to="/signup">
              Sign Up
            </Link>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}
