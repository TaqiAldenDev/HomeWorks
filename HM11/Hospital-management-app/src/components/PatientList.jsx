import PatientCard from './PatientCard';

function PatientList({ patients, onEdit, onDelete }) {
  return (
    <div>
      <h4 className="fw-bold text-center mb-3">Patients ({patients.length})</h4>
      {patients.map((patient) => (
        <PatientCard key={patient.id} patient={patient} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}

export default PatientList;
