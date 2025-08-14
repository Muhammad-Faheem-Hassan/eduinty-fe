// src/pages/Campus/List.jsx
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CampusApi from "../../services/campusApi"; // You need to create this service

const CampusList = ({ onEdit }) => {
    const [campuses, setCampuses] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchCampuses = async () => {
        try {
            const res = await CampusApi.getAll();
            setCampuses(res || []); // ensure array
        } catch (error) {
            console.error("Error fetching campuses", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCampuses();
    }, []);

    const columns = [
        { field: "name", headerName: "Campus Name", width: 200 },
        { field: "address", headerName: "Location", width: 200 },
        { field: "phone", headerName: "Contact", width: 200 },
        { field: "referralCode", headerName: "Referral Code", width: 200 },
        {
            field: "actions",
            headerName: "Actions",
            width: 150,
            renderCell: (params) => (
                <Button
                    variant="outlined"
                    size="small"
                    onClick={() => onEdit(params.row)}
                >
                    Edit
                </Button>
            ),
        },
    ];

    return (
        <Box sx={{ width: "100%", overflowX: "auto", p: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h5"> Campus List</Typography>
                <Button
                    variant="contained"
                    onClick={() => navigate("/campus/form")} // ✅ redirect instead of opening modal
                >
                    Add Campus
                </Button>
            </Box>

            <div style={{ minWidth: 1000 }}>
                <DataGrid
                    rows={campuses}
                    columns={columns}
                    getRowId={(row) => row._id}
                    autoHeight
                    loading={loading}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                />
            </div>
        </Box>
    );
};

export default CampusList;
