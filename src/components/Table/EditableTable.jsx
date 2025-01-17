import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecords, updateRecord, deleteRecord, addRecord } from '../../redux/tableSlice';
import Modal from '../Shared/Modal';
import Button from '../Shared/Button';
import InputField from '../Shared/InputField';
import {
    Box,
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Pagination,
    Snackbar,
    Alert,
} from '@mui/material';
import { AiOutlineEdit, AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai';

const ITEMS_PER_PAGE = 10;

const validateForm = (formData) => {
    const errors = {};
    if (!formData.broker) errors.broker = 'Broker name is required';
    if (!formData['API key']) errors['API key'] = 'API key is required';
    if (!formData['API secret']) errors['API secret'] = 'API secret is required';
    if (formData.pnl === '' || isNaN(formData.pnl)) errors.pnl = 'PnL must be a number';
    if (formData.margin === '' || isNaN(formData.margin)) errors.margin = 'Margin must be a number';
    if (formData.max_risk === '' || isNaN(formData.max_risk)) errors.max_risk = 'Max Risk must be a number';
    return errors;
};

const EditableTable = () => {
    const dispatch = useDispatch();
    const { records, status, error } = useSelector((state) => state.table);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editRow, setEditRow] = useState(null);
    const [formData, setFormData] = useState({});
    const [formErrors, setFormErrors] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchRecords());
        }
    }, [dispatch, status]);

    const recordsWithIds = records.map((record, index) => ({
        ...record,
        id: record.id ?? index,
    }));

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleEdit = (row) => {
        setEditRow(row);
        setFormData({
            broker: row.broker,
            'API key': row['API key'],
            'API secret': row['API secret'],
            pnl: row.pnl,
            margin: row.margin,
            max_risk: row.max_risk,
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (id === undefined || id === null) {
            setSnackbar({ open: true, message: 'Record ID is missing!', severity: 'error' });
            return;
        }

        try {
            await dispatch(deleteRecord(id)).unwrap();
            dispatch(fetchRecords());
            setSnackbar({ open: true, message: 'Record deleted successfully!', severity: 'success' });
        } catch {
            setSnackbar({ open: true, message: 'Failed to delete record!', severity: 'error' });
        }
    };

    const handleAdd = () => {
        setEditRow(null);
        setFormData({});
        setIsModalOpen(true);
    };

    const handleSubmit = async () => {
        const errors = validateForm(formData);
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }
        try {
            if (editRow) {
                await dispatch(updateRecord({ id: editRow.id, updatedData: formData })).unwrap();
                setSnackbar({ open: true, message: 'Record updated successfully!', severity: 'success' });
            } else {
                await dispatch(addRecord(formData)).unwrap();
                setSnackbar({ open: true, message: 'Record added successfully!', severity: 'success' });
            }
            dispatch(fetchRecords());
            setIsModalOpen(false);
            setFormData({});
        } catch {
            setSnackbar({ open: true, message: 'Failed to save record!', severity: 'error' });
        }
    };

    const handlePageChange = (_, page) => {
        setCurrentPage(page);
    };

    const paginatedRecords = recordsWithIds.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    return (
        <div className="p-4">
            {/* Table Header */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-white text-lg">Editable Table</h2>
                <Button onClick={handleAdd}>
                    <AiOutlinePlus className="mr-2" />
                    Add New Record
                </Button>
            </div>

            {/* Table */}
            {status === 'loading' ? (
                <CircularProgress />
            ) : error ? (
                <div className="text-red-500 text-center">{error}</div>
            ) : (
                <div className="overflow-x-auto bg-gray-900 rounded-md">
                    <table className="w-full text-left text-sm text-white">
                        <thead className="bg-gray-800 text-gray-400">
                            <tr>
                                {recordsWithIds.length > 0 &&
                                    Object.keys(recordsWithIds[0])
                                        .filter((key) => key !== 'id' && key !== 'user')
                                        .map((key) => (
                                            <th key={key} className="px-4 py-2 uppercase">
                                                {key}
                                            </th>
                                        ))}
                                <th className="px-4 py-2 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedRecords.map((row) => (
                                <tr key={row.id} className="bg-gray-800 hover:bg-gray-700">
                                    {Object.entries(row)
                                        .filter(([key]) => key !== 'id' && key !== 'user')
                                        .map(([key, value]) => (
                                            <td key={key} className="px-4 py-2 text-white">
                                                {value}
                                            </td>
                                        ))}
                                    <td className="px-4 py-2 flex gap-4">
                                        <IconButton onClick={() => handleEdit(row)} color="primary">
                                            <AiOutlineEdit />
                                        </IconButton>
                                        <IconButton onClick={() => handleDelete(row.id)} color="error">
                                            <AiOutlineDelete />
                                        </IconButton>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Pagination */}
            {recordsWithIds.length > ITEMS_PER_PAGE && (
                <div className="flex justify-center mt-4">
                    <Pagination
                        count={Math.ceil(recordsWithIds.length / ITEMS_PER_PAGE)}
                        page={currentPage}
                        onChange={handlePageChange}
                        color="primary"
                    />
                </div>
            )}

            {/* Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editRow ? 'Edit Record' : 'Add New Record'}
            >
                {Object.keys(formErrors).length > 0 && (
                    <div className="text-red-500 mb-4 p-2 bg-gray-800 rounded-md">
                        {Object.values(formErrors).map((error, index) => (
                            <div key={index}>{error}</div>
                        ))}
                    </div>
                )}
                <form>
                    {['broker', 'API key', 'API secret', 'pnl', 'margin', 'max_risk'].map((field) => (
                        <div key={field} className="mb-4">
                            <InputField
                                name={field}
                                label={field.replace('_', ' ').toUpperCase()}
                                placeholder={`Enter ${field.replace('_', ' ')}`}
                                value={formData[field] || ''}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    ))}
                    <div className="flex justify-end mt-4">
                        <Button onClick={handleSubmit}>{editRow ? 'Update' : 'Add'}</Button>
                    </div>
                </form>
            </Modal>

            {/* Toast */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={10000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
            >
                <Alert
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    severity={snackbar.severity}
                    className="w-full"
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default EditableTable;