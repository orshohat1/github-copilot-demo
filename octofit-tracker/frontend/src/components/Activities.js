import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [showView, setShowView] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [form, setForm] = useState({ activity_type: '', duration: '' });

  useEffect(() => {
    fetch('http://localhost:8000/api/activities/')
      .then(response => response.json())
      .then(data => setActivities(data))
      .catch(error => console.error('Error fetching activities:', error));
  }, []);

  const handleView = activity => {
    setSelectedActivity(activity);
    setShowView(true);
  };

  const handleEdit = activity => {
    setSelectedActivity(activity);
    setForm({ activity_type: activity.activity_type, duration: activity.duration });
    setShowEdit(true);
  };

  const handleAdd = () => {
    setForm({ activity_type: '', duration: '' });
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
      <h1 className="mb-4 text-primary">Activities</h1>
      <div className="card shadow-sm">
        <div className="card-body">
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th scope="col">Activity Type</th>
                <th scope="col">Duration</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {activities.map(activity => (
                <tr key={activity._id}>
                  <td>{activity.activity_type}</td>
                  <td>{activity.duration}</td>
                  <td>
                    <button className="btn btn-info btn-sm me-2" onClick={() => handleView(activity)}>View</button>
                    <button className="btn btn-warning btn-sm" onClick={() => handleEdit(activity)}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="btn btn-success mt-3" onClick={handleAdd}>Add Activity</button>
        </div>
      </div>

      {/* View Modal */}
      <Modal show={showView} onHide={() => setShowView(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Activity Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedActivity && (
            <div>
              <p><strong>Type:</strong> {selectedActivity.activity_type}</p>
              <p><strong>Duration:</strong> {selectedActivity.duration}</p>
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
          <Modal.Title>Edit Activity</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label className="form-label">Activity Type</label>
              <input type="text" className="form-control" name="activity_type" value={form.activity_type} onChange={handleFormChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">Duration</label>
              <input type="text" className="form-control" name="duration" value={form.duration} onChange={handleFormChange} />
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
          <Modal.Title>Add Activity</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label className="form-label">Activity Type</label>
              <input type="text" className="form-control" name="activity_type" value={form.activity_type} onChange={handleFormChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">Duration</label>
              <input type="text" className="form-control" name="duration" value={form.duration} onChange={handleFormChange} />
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

export default Activities;
