import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './components/Navbar';
import AppointmentsPage from './pages/AppointmentsPage';
import DoctorsPage from './pages/DoctorsPage';
import PatientsPage from './pages/PatientsPage';

let nextId = 3;

function App() {
  const [activeTab, setActiveTab] = useState('patients');
  const [patients, setPatients] = useState([
    { id: 1, name: 'Ahmad', age: 45, gender: 'Male' },
    { id: 2, name: 'sara', age: 32, gender: 'Female' },
    { id: 3, name: 'Mohammed', age: 58, gender: 'Male' },
  ]);
  let nextId = 6;
  const [editPatient, setEditPatient] = useState(null);

  const handleAdd = (patient) => {
    setPatients([...patients, { ...patient, id: nextId++ }]);
  };

  const handleDelete = (id) => {
    setPatients(patients.filter((p) => p.id !== id));
    if (editPatient?.id === id) setEditPatient(null);
  };

  const handleEdit = (patient) => {
    setEditPatient(patient);
  };

  const handleUpdate = (updated) => {
    setPatients(patients.map((p) => (p.id === updated.id ? updated : p)));
    setEditPatient(null);
  };

  const handleCancelEdit = () => {
    setEditPatient(null);
  };

  const renderPage = () => {
    switch (activeTab) {
      case 'appointments':
        return <AppointmentsPage />;
      case 'doctors':
        return <DoctorsPage />;
      case 'patients':
        return (
          <PatientsPage
            patients={patients}
            onAdd={handleAdd}
            onEdit={handleEdit}
            onDelete={handleDelete}
            editPatient={editPatient}
            onUpdate={handleUpdate}
            onCancelEdit={handleCancelEdit}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mt-4" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <h1 className="mb-3">Hospital Management App</h1>
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />
      {renderPage()}
    </div>
  );
}

export default App;
