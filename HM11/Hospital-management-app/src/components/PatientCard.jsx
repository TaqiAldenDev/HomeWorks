function PatientCard({ patient, onEdit, onDelete }) {
  return (
    <div className="card shadow-sm mb-3" style={{ border: '1px solid #dee2e6', borderRadius: '0.5rem' }}>
      <div className="card-body">
        <h5 className="fw-bold mb-2">{patient.name}</h5>
        <p className="mb-1">Age: {patient.age}</p>
        <p className="mb-2">Gender: {patient.gender}</p>
        <div className="d-flex justify-content-between">
          <button className="btn btn-sm btn-primary" style={{ backgroundColor: '#3b82f6', border: 'none' }} onClick={() => onEdit(patient)}>
            Edit
          </button>
          <button className="btn btn-sm btn-primary" style={{ backgroundColor: '#3b82f6', border: 'none' }} onClick={() => onDelete(patient.id)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default PatientCard;
