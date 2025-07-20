import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [showView, setShowView] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [form, setForm] = useState({ name: '', description: '' });

  useEffect(() => {
    fetch('http://localhost:8000/api/workouts/')
      .then(response => response.json())
      .then(data => setWorkouts(data))
      .catch(error => console.error('Error fetching workouts:', error));
  }, []);

  const handleView = workout => {
    setSelectedWorkout(workout);
    setShowView(true);
  };

  const handleEdit = workout => {
    setSelectedWorkout(workout);
    setForm({ name: workout.name, description: workout.description });
    setShowEdit(true);
  };

  const handleAdd = () => {
    setForm({ name: '', description: '' });
    setShowAdd(true);
  };

  const handleFormChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSaveEdit = () => {
    // TODO: Integrate with backend
    setShowEdit(false);
  };

  const handleSaveAdd = () => {
    // TODO: Integrate with backend
    setShowAdd(false);
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-primary">Workouts</h1>
      <div className="card shadow-sm">
        <div className="card-body">
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th scope="col">Workout Name</th>
                <th scope="col">Description</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map(workout => (
                <tr key={workout._id}>
                  <td>{workout.name}</td>
                  <td>{workout.description}</td>
                  <td>
                    <button className="btn btn-info btn-sm me-2" onClick={() => handleView(workout)}>View</button>
                    <button className="btn btn-warning btn-sm" onClick={() => handleEdit(workout)}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="btn btn-success mt-3" onClick={handleAdd}>Add Workout</button>
        </div>
      </div>

      {/* View Modal */}
      <Modal show={showView} onHide={() => setShowView(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Workout Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedWorkout && (
            <div>
              <p><strong>Name:</strong> {selectedWorkout.name}</p>
              <p><strong>Description:</strong> {selectedWorkout.description}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowView(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Modal */}
      <Modal show={showEdit} onHide={() => setShowEdit(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Workout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label className="form-label">Workout Name</label>
              <input type="text" className="form-control" name="name" value={form.name} onChange={handleFormChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <input type="text" className="form-control" name="description" value={form.description} onChange={handleFormChange} />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEdit(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleSaveEdit}>Save</Button>
        </Modal.Footer>
      </Modal>

      {/* Add Modal */}
      <Modal show={showAdd} onHide={() => setShowAdd(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Workout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label className="form-label">Workout Name</label>
              <input type="text" className="form-control" name="name" value={form.name} onChange={handleFormChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <input type="text" className="form-control" name="description" value={form.description} onChange={handleFormChange} />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAdd(false)}>Cancel</Button>
          <Button variant="success" onClick={handleSaveAdd}>Add</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Workouts;
