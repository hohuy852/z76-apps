import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Chip from "@mui/material/Chip";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

function createData(
  id: number,
  fullname: string,
  email: string,
  phone: string,
  username: string,
  role: string,
  status: string
) {
  return { id, fullname, email, phone, username, role, status };
}

const initialRows = [
  createData(1, "Nguyễn Văn A", "a@a.a", "0987654321", "anguyenvan", "Admin", "Active"),
  createData(2, "Nguyễn Văn B", "b@b.b", "0123456789", "bnguyenvan", "User", "Inactive"),
  createData(3, "Nguyễn Văn C", "c@c.c", "0976543210", "cnguyenvan", "User", "Pending"),
  createData(4, "Nguyễn Văn D", "d@d.d", "0965432109", "dnguyenvan", "Admin", "Banned"),
];

export default function BasicTable() {
  const [rows, setRows] = React.useState(initialRows);
  const [open, setOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState<any>(null);

  const handleOpen = (row: any) => {
    setSelectedRow({ ...row });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRow(null);
  };

  const handleSave = () => {
    setRows((prevRows) =>
      prevRows.map((row) => (row.id === selectedRow.id ? selectedRow : row))
    );
    handleClose();
  };

  const handleDelete = (id: number) => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Họ và Tên</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Số điện thoại</TableCell>
            <TableCell align="center">Username</TableCell>
            <TableCell align="center">Vai trò</TableCell>
            <TableCell align="center">Trạng thái</TableCell>
            <TableCell align="center">Hành động</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">{row.fullname}</TableCell>
              <TableCell align="center">{row.email}</TableCell>
              <TableCell align="center">{row.phone}</TableCell>
              <TableCell align="center">{row.username}</TableCell>
              <TableCell align="center">{row.role}</TableCell>
              <TableCell align="center">
                <Chip
                  label={row.status}
                  color={
                    row.status === "Active"
                      ? "success"
                      : row.status === "Pending"
                      ? "warning"
                      : row.status === "Inactive"
                      ? "default"
                      : "error"
                  }
                />
              </TableCell>
              <TableCell align="center">
                <Stack direction="row" spacing={1} justifyContent="center">
                  <IconButton aria-label="edit" onClick={() => handleOpen(row)}>
                    <ModeEditIcon />
                  </IconButton>
                  <IconButton aria-label="delete" onClick={() => handleDelete(row.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* MODAL */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <h2>Chỉnh sửa thông tin</h2>
          {selectedRow && (
            <>
              <TextField
                fullWidth
                label="Họ và Tên"
                margin="dense"
                value={selectedRow.fullname}
                onChange={(e) => setSelectedRow({ ...selectedRow, fullname: e.target.value })}
              />
              <TextField
                fullWidth
                label="Email"
                margin="dense"
                value={selectedRow.email}
                onChange={(e) => setSelectedRow({ ...selectedRow, email: e.target.value })}
              />
              <TextField
                fullWidth
                label="Số điện thoại"
                margin="dense"
                value={selectedRow.phone}
                onChange={(e) => setSelectedRow({ ...selectedRow, phone: e.target.value })}
              />
              <TextField
                fullWidth
                label="Vai trò"
                margin="dense"
                value={selectedRow.role}
                onChange={(e) => setSelectedRow({ ...selectedRow, role: e.target.value })}
              />
              <TextField
                fullWidth
                label="Trạng thái"
                margin="dense"
                select
                value={selectedRow.status}
                onChange={(e) => setSelectedRow({ ...selectedRow, status: e.target.value })}
              >
                {["Active", "Pending", "Inactive", "Banned"].map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
              <Stack direction="row" spacing={2} sx={{ mt: 2 }} justifyContent="flex-end">
                <Button onClick={handleClose} color="secondary">Hủy</Button>
                <Button onClick={handleSave} variant="contained" color="primary">Lưu</Button>
              </Stack>
            </>
          )}
        </Box>
      </Modal>
    </TableContainer>
  );
}
