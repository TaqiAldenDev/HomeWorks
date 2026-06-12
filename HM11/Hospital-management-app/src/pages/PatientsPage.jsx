import PatientForm from '../components/PatientForm';
import PatientList from '../components/PatientList';

function PatientsPage({ patients, onAdd, onEdit, onDelete, editPatient, onUpdate, onCancelEdit }) {
  return (
    <div className="row mt-4">
      <div className="col-md-5">
        <PatientForm onAdd={onAdd} editPatient={editPatient} onUpdate={onUpdate} onCancelEdit={onCancelEdit} />
      </div>
      <div className="col-md-7">
        <PatientList patients={patients} onEdit={onEdit} onDelete={onDelete} />
      </div>
    </div>
  );
}

export default PatientsPage;
