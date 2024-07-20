import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form } from 'react-bootstrap';

function AddressDropdown({ selectedAddress, onChange }) {
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get('http://localhost:3000/addresses');
        setAddresses(response.data);
      } catch (error) {
        console.error('Error fetching addresses:', error);
      }
    };
    fetchAddresses();
  }, []);

  return (
    <Form.Control as="select" name="address_id" value={selectedAddress} onChange={onChange}>
      <option value="">Select an address</option>
      {addresses.map((address) => (
        <option key={address.id} value={address.id}>
          {address.street}, {address.district}
        </option>
      ))}
    </Form.Control>
  );
}

export default AddressDropdown;
