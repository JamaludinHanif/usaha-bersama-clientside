import React, { useEffect, useState } from 'react';
import { API } from '../config/api';

function Tes() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API.Tes}/users`);
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (error) {
        console.error('Terjadi kesalahan:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Data dari API</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item.name}</li> // Sesuaikan dengan struktur data Anda
        ))}
      </ul>
    </div>
  );
}

export default Tes;
