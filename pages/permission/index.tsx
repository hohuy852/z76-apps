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
import Button from "@mui/material/Button";
import Head from "next/head";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
function createData(
  id: number,
  username: string,
  fullname: string,
  storeManagement: string[]
) {
  return { id, username, fullname, storeManagement };
}

const initialRows = [
  createData(1, "User A", "Nguyễn Văn A", ["1", "3", "8","9"]),
  createData(2, "User B", "Nguyễn Văn B", ["4", "5"]),
];
const storeOptions = ["1", "3", "4", "5", "8", "9"];
export default function BasicTable() {
  const [rows, setRows] = React.useState(initialRows);
  const [open, setOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState<any>(null);

  const handleOpen = (row: any) => {
    setSelectedRow({ ...row });
    setOpen(true);
    const availableStores = row.storeManagement.filter((store: string) =>
      storeOptions.includes(store)
    );
  
    setSelectedRow({ ...row, storeManagement: availableStores });
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
              <TableCell align="left">Tài khoản</TableCell>
              <TableCell align="center">Tên người duyệt</TableCell>
              <TableCell align="center">Kho quản lý</TableCell>
              <TableCell align="center">Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell align="left">{row.username}</TableCell>
                <TableCell align="center">{row.fullname}</TableCell>
                <TableCell align="center">
                  {row.storeManagement.map((store, index) => (
                    <Chip key={index} label={store} sx={{ m: 0.5 }} />
                  ))}
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
                  label="Tài khoản"
                  margin="dense"
                  value={selectedRow.username}
                  disabled
                />
                <TextField
                  fullWidth
                  label="Tên người duyệt"
                  margin="dense"
                  value={selectedRow.fullname}
                  disabled
                />

                {/* Store Management Checkbox Group */}
                <h4>Kho quản lý</h4>
                <FormGroup>
                  {storeOptions.map((store) => (
                    <FormControlLabel
                      key={store}
                      control={
                        <Checkbox
                          checked={selectedRow.storeManagement.includes(store)}
                          onChange={(e) => {
                            const updatedStores = e.target.checked
                              ? [...selectedRow.storeManagement, store]
                              : selectedRow.storeManagement.filter(
                                  (s:any) => s !== store
                                );
                            setSelectedRow({
                              ...selectedRow,
                              storeManagement: updatedStores,
                            });
                          }}
                        />
                      }
                      label={`Kho ${store}`}
                    />
                  ))}
                </FormGroup>

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
