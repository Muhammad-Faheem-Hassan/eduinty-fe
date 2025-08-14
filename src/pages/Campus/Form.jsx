import { useForm, Controller } from "react-hook-form";
import {
    Box,
    Button,
    TextField,
    Typography,
    Grid,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CampusApi from "../../services/campusApi"; // similar to UsersApi

const CampusForm = ({ campusId, onSuccess }) => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: "",
            address: "",
            phone: "",
            referralCode: "",
        },
    });

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            if (campusId) {
                await CampusApi.update(campusId, data);
            } else {
                await CampusApi.create(data);
            }
            if (onSuccess) onSuccess();
        } catch (error) {
            console.error(error);
            alert("Error saving campus");
        } finally {
            setLoading(false);
            navigate("/campus/list"); // Redirect to list after saving
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
                {campusId ? "Edit Campus" : "Create Campus"}
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={3}>
                    {/* Campus Name */}
                    <Grid item xs={12} sm={6}>
                        <Controller
                            name="name"
                            control={control}
                            rules={{ required: "Campus name is required" }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Campus Name"
                                    fullWidth
                                    size="small"
                                    error={!!errors.name}
                                    helperText={errors.name?.message}
                                />
                            )}
                        />
                    </Grid>

                    {/* Address */}
                    <Grid item xs={12} sm={6}>
                        <Controller
                            name="address"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Address"
                                    size="small"
                                    fullWidth
                                />
                            )}
                        />
                    </Grid>

                    {/* Phone */}
                    <Grid item xs={12} sm={6}>
                        <Controller
                            name="phone"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Phone"
                                    size="small"
                                    fullWidth
                                />
                            )}
                        />
                    </Grid>

                    {/* Referral Code */}
                    <Grid item xs={12} sm={6}>
                        <Controller
                            name="referralCode"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Referral Code"
                                    size="small"
                                    fullWidth
                                />
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

export default CampusForm;
