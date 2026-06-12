import { useState } from 'react';

function PatientForm({ onAdd, editPatient, onUpdate, onCancelEdit }) {
  const [name, setName] = useState(editPatient ? editPatient.name : '');
  const [age, setAge] = useState(editPatient ? editPatient.age : '');
  const [gender, setGender] = useState(editPatient ? editPatient.gender : '');

  const isEditing = Boolean(editPatient);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !age || !gender.trim()) return;
    if (isEditing) {
      onUpdate({ ...editPatient, name: name.trim(), age: Number(age), gender: gender.trim() });
    } else {
      onAdd({ name: name.trim(), age: Number(age), gender: gender.trim() });
    }
    setName('');
    setAge('');
    setGender('');
  };

  const handleCancel = () => {
    setName('');
    setAge('');
    setGender('');
    onCancelEdit();
  };

  return (
    <div className="card" style={{ border: '1px solid #dee2e6', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
      <div className="card-body">
        <h4 className="fw-bold text-center mb-3">{isEditing ? 'Edit Patient' : 'Add New Patient'}</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-bold">Name:</label>
            <input className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter name" />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Age:</label>
            <input className="form-control" type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Enter age" />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Gender:</label>
            <select className="form-select" value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Choose Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-primary flex-grow-1" style={{ backgroundColor: '#3b82f6', border: 'none' }}>
              {isEditing ? 'Update Patient' : 'Add Patient'}
            </button>
            {isEditing && (
              <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default PatientForm;
