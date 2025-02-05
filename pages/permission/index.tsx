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
import Head from "next/head";
import Autocomplete from '@mui/material/Autocomplete';
function createData(
  id: number,
  position: string,
  department: string,
  status: string,

) {
  return { id, position, department, status };
}

const initialRows = [
  createData(
    1,
    "Kế toán viên",
    "Phòng kế toán",
    "Active",
  ),
  createData(
    2,
    "Kế toán viên",
    "Phòng kế toán",
    "Inactive",
  ),
  createData(
    3,
    "Kế toán viên",
    "Phòng kế toán",
    "Pending",
  ),
  createData(
    4,
    "Kế toán viên",
    "Phòng kế toán",
    "Pending",
  ),
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
    <>
      <Head>
        <title>Quản lý truy cập</title>
      </Head>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Chức vụ</TableCell>
              <TableCell align="center">Phòng ban</TableCell>
              <TableCell align="center">Trạng thái</TableCell>
              <TableCell align="center">Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell align="left">{row.position}</TableCell>
                <TableCell align="center">{row.department}</TableCell>
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
                    <IconButton
                      aria-label="edit"
                      onClick={() => handleOpen(row)}
                    >
                      <ModeEditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleDelete(row.id)}
                    >
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
                  label="Chức vụ"
                  margin="dense"
                  value={selectedRow.position}
                  onChange={(e) =>
                    setSelectedRow({ ...selectedRow, position: e.target.value })
                  }
                />
                <TextField
                  fullWidth
                  label="Phòng ban"
                  margin="dense"
                  value={selectedRow.department}
                  onChange={(e) =>
                    setSelectedRow({ ...selectedRow, department: e.target.value })
                  }
                />
                <TextField
                  fullWidth
                  label="Trạng thái"
                  margin="dense"
                  select
                  value={selectedRow.status}
                  onChange={(e) =>
                    setSelectedRow({ ...selectedRow, status: e.target.value })
                  }
                >
                  {["Active", "Pending", "Inactive", "Banned"].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
                <Autocomplete
                    disablePortal
                    options={[{label: "Đối chiếu thẻ kho"}, {label: "Bảng kê hoàn thuế"}]}
                    renderInput={(params) => <TextField {...params} label="Chức năng" />}
                    />
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{ mt: 2 }}
                  justifyContent="flex-end"
                >
                  <Button onClick={handleClose} color="secondary">
                    Hủy
                  </Button>
                  <Button
                    onClick={handleSave}
                    variant="contained"
                    color="primary"
                  >
                    Lưu
                  </Button>
                </Stack>
              </>
            )}
          </Box>
        </Modal>
      </TableContainer>
    </>
  );
}
