import React, { useState, useEffect } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, TablePagination, Paper } from '@mui/material';
import useWebSocket from '../../hooks/useWebSocket';

const DynamicTable = () => {
  const { data } = useWebSocket(); // WebSocket for OHLC data
  const [rows, setRows] = useState([]); // Table rows
  const [page, setPage] = useState(0); // Current page
  const [rowsPerPage] = useState(10); // Rows per page (fixed to 20)

  // Add new OHLC data to the table
  useEffect(() => {
    if (data) {
      setRows((prevRows) => [data, ...prevRows]); // Add new data at the top
    }
  }, [data]);

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Open</TableCell>
            <TableCell>High</TableCell>
            <TableCell>Low</TableCell>
            <TableCell>Close</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // Paginate rows
            .map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.open.toFixed(2)}</TableCell>
                <TableCell>{row.high.toFixed(2)}</TableCell>
                <TableCell>{row.low.toFixed(2)}</TableCell>
                <TableCell>{row.close.toFixed(2)}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[10]} // Fixed rows per page
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
      />
    </Paper>
  );
};

export default DynamicTable;
