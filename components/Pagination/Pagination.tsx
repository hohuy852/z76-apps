import type React from "react"
import {
  Pagination as MuiPagination,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  type SelectChangeEvent,
} from "@mui/material"
import { styled } from "@mui/system"

const PaginationContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "1rem",
})

const StyledFormControl = styled(FormControl)({
  minWidth: 120,
})

interface PaginationProps {
  totalItems: number
  itemsPerPage: number
  currentPage: number
  onPageChange: (event: React.ChangeEvent<unknown>, page: number) => void
  onItemsPerPageChange: (event: SelectChangeEvent<number>) => void
  itemsPerPageOptions: number[]
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  onItemsPerPageChange,
  itemsPerPageOptions,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  return (
    <PaginationContainer>
      <StyledFormControl size="small">
        <InputLabel id="items-per-page-label">Số lượng tờ khai mỗi trang</InputLabel>
        <Select
          labelId="items-per-page-label"
          value={itemsPerPage}
          label="Số lượng tờ khai mỗi trang"
          onChange={onItemsPerPageChange}
        >
          {itemsPerPageOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option} bản ghi mỗi trang
            </MenuItem>
          ))}
        </Select>
      </StyledFormControl>
      <MuiPagination
        count={totalPages}
        page={currentPage}
        onChange={onPageChange}
        color="primary"
        showFirstButton
        showLastButton
      />
    </PaginationContainer>
  )
}

export default Pagination

