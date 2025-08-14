import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import UsersApi from "../../services/usersApi";
import UserForm from "../User/Form";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await UsersApi.getAll();
      console.log(data);

      setUsers(data.items || data); // adjust if your API returns { items: [] }
    } catch (err) {
      console.error("Failed to load users", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await UsersApi.delete(id);
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const humanReadAbleRole = {
  student: "Student",
  donor: "Donor",
  admin: "Admin",
  franchise: "Franchise",
};

  const columns = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "phone", headerName: "Phone", flex: 1 },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
      renderCell: (params) => humanReadAbleRole[params.value] || params.value
    },
    { field: "campusId", headerName: "Campus ID", flex: 1 },
    { field: "referralCode", headerName: "Referral Code", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="outlined"
          size="small"
          onClick={() => {
            setSelectedId(params.row._id);
            setOpenForm(true);
          }}
        >
          Edit
        </Button>
      ),
    },
    // {
    //   field: "actions",
    //   headerName: "Actions",
    //   sortable: false,
    //   renderCell: (params) => (
    //     <Box display="flex" gap={1}>
    //       <Button
    //         variant="outlined"
    //         size="small"
    //         onClick={() => {
    //           setSelectedId(params.row._id);
    //           setOpenForm(true);
    //         }}
    //       >
    //         Edit
    //       </Button>
    //       {/* <Button
    //         variant="outlined"
    //         color="error"
    //         size="small"
    //         onClick={() => handleDelete(params.row._id)}
    //       >
    //         Delete
    //       </Button> */}
    //     </Box>
    //   ),
    // },
  ];

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">User List</Typography>
        <Button
          variant="contained"
          onClick={() => navigate("/users/form")} // ✅ redirect instead of opening modal
        >
          Add User
        </Button>
      </Box>

      <Box sx={{ width: "100%", overflowX: "auto" }}>
        <div > {/* sum of column widths */}
          <DataGrid
            rows={users}
            columns={columns}
            getRowId={(row) => row._id}
            autoHeight
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
        </div>
      </Box>

      {openForm && (
        <UserForm
          userId={selectedId}
          onSuccess={() => {
            setOpenForm(false);
            fetchUsers();
          }}
        />
      )}
    </Box>
  );
};

export default UserList;
