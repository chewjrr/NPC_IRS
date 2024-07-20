import React, { useState, useEffect, useCallback } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { AgGridReact } from 'ag-grid-react';
import axios from 'axios';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

function JoinedTable() {
  const [rowData, setRowData] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [residents, setResidents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    birth_date: '',
    debt: '',
    street: '',
    district: '',
    address_id: null,
  });
  const [selectedId, setSelectedId] = useState(null);

  const columnDefs = [
    { headerName: 'ID', field: 'id' },
    { headerName: 'Имя', field: 'first_name' },
    { headerName: 'Фамилия', field: 'last_name' },
    { headerName: 'Дата рождения', field: 'birth_date' },
    { headerName: 'Долг', field: 'debt' },
    { headerName: 'Улица', field: 'street' },
    { headerName: 'Район', field: 'district' },
  ];

  const defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true,
  };

  const fetchJoinedData = useCallback(async () => {
    try {
      const residentsResponse = await axios.get('http://localhost:3000/residents/all');
      const addressesResponse = await axios.get('http://localhost:3000/addresses');
      const residents = residentsResponse.data;
      const addresses = addressesResponse.data;
      setAddresses(addresses);
      setResidents(residents);

      const joinedData = residents.map((resident) => {
        const address = addresses.find((address) => address.id === resident.address_id);
        return {
          ...resident,
          street: address?.street,
          district: address?.district,
        };
      });

      setRowData(joinedData);
    } catch (error) {
      console.error('Error fetching joined data:', error);
    }
  }, []);

  useEffect(() => {
    fetchJoinedData();
  }, [fetchJoinedData]);

  const handleShowModal = (type, id = null) => {
    setModalType(type);
    setSelectedId(id);
    if (type === 'edit' && id) {
      const resident = rowData.find((res) => res.id === id);
      setFormData({
        ...resident,
        address_id: resident.address_id,
      });
    } else {
      setFormData({
        first_name: '',
        last_name: '',
        birth_date: '',
        debt: '',
        street: '',
        district: '',
        address_id: null,
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedId(null);
    setFormData({
      first_name: '',
      last_name: '',
      birth_date: '',
      debt: '',
      street: '',
      district: '',
      address_id: null,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modalType === 'add') {
        if (formData.address_id === null) {
          const addressResponse = await axios.post('http://localhost:3000/addresses', {
            street: formData.street,
            district: formData.district,
          });
          const addressId = addressResponse.data.id;
          await axios.post('http://localhost:3000/residents', {
            ...formData,
            address_id: addressId,
          });
        } else {
          await axios.post('http://localhost:3000/residents', formData);
        }
      } else if (modalType === 'edit') {
        await axios.put(`http://localhost:3000/residents/${selectedId}`, formData);
        if (formData.address_id) {
          await axios.put(`http://localhost:3000/addresses/${formData.address_id}`, {
            street: formData.street,
            district: formData.district,
          });
        }
      }
      fetchJoinedData();
      handleCloseModal();
    } catch (error) {
      console.error('Error adding/updating data:', error);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`http://localhost:3000/residents/${selectedId}`);
      fetchJoinedData();
      handleCloseModal();
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  return (
    <div className="ag-theme-alpine-dark" style={{ height: '85vh', width: '85%', marginLeft: 'auto', marginRight: 'auto', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <Button variant="primary" onClick={() => handleShowModal('add')} style={{ margin: '0 10px' }}>
          Добавить
        </Button>
        <Button variant="primary" onClick={() => handleShowModal('edit')} style={{ margin: '0 10px' }}>
          Изменить
        </Button>
        <Button variant="primary" onClick={() => handleShowModal('delete')} style={{ margin: '0 10px' }}>
          Удалить
        </Button>
      </div>
      <AgGridReact
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowData={rowData}
      />
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalType === 'add'
              ? 'Add Resident'
              : modalType === 'edit'
              ? 'Edit Resident'
              : 'Delete Resident'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={modalType === 'delete' ? handleDelete : handleSubmit}>
            {modalType !== 'delete' && (
              <>
                <Form.Group controlId="formFirstName" style={{ marginBottom: '10px' }}>
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="formLastName" style={{ marginBottom: '10px' }}>
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="formBirthDate" style={{ marginBottom: '10px' }}>
                  <Form.Label>Birth Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="birth_date"
                    value={formData.birth_date}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="formDebt" style={{ marginBottom: '10px' }}>
                  <Form.Label>Debt</Form.Label>
                  <Form.Control
                    type="number"
                    name="debt"
                    value={formData.debt}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="formStreet" style={{ marginBottom: '10px' }}>
                  <Form.Label>Street</Form.Label>
                  <Form.Control
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="formDistrict" style={{ marginBottom: '10px' }}>
                  <Form.Label>District</Form.Label>
                  <Form.Control
                    type="text"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                  />
                </Form.Group>
              </>
            )}
            {modalType === 'delete' && (
              <Form.Group controlId="formResident" style={{ marginBottom: '10px' }}>
                <Form.Label>Select Resident to Delete</Form.Label>
                <Form.Control
                  as="select"
                  onChange={(e) => setSelectedId(e.target.value)}
                >
                  <option value="">Select a resident</option>
                  {rowData.map((resident) => (
                    <option key={resident.id} value={resident.id}>
                      {resident.first_name} {resident.last_name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            )}
            <Button variant="primary" type="submit" style={{ marginRight: '10px' }}>
              {modalType === 'delete' ? 'Delete' : 'Save'}
            </Button>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default JoinedTable;
