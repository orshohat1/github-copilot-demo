import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [showView, setShowView] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [form, setForm] = useState({ name: '' });

  useEffect(() => {
    fetch('http://localhost:8000/api/teams/')
      .then(response => response.json())
      .then(data => setTeams(data))
      .catch(error => console.error('Error fetching teams:', error));
  }, []);

  const handleView = team => {
    setSelectedTeam(team);
    setShowView(true);
  };

  const handleEdit = team => {
    setSelectedTeam(team);
    setForm({ name: team.name });
    setShowEdit(true);
  };

  const handleAdd = () => {
    setForm({ name: '' });
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
      <h1 className="mb-4 text-primary">Teams</h1>
      <div className="card shadow-sm">
        <div className="card-body">
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th scope="col">Team Name</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {teams.map(team => (
                <tr key={team._id}>
                  <td>{team.name}</td>
                  <td>
                    <button className="btn btn-info btn-sm me-2" onClick={() => handleView(team)}>View</button>
                    <button className="btn btn-warning btn-sm" onClick={() => handleEdit(team)}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="btn btn-success mt-3" onClick={handleAdd}>Add Team</button>
        </div>
      </div>

      {/* View Modal */}
      <Modal show={showView} onHide={() => setShowView(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Team Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedTeam && (
            <div>
              <p><strong>Name:</strong> {selectedTeam.name}</p>
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
          <Modal.Title>Edit Team</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label className="form-label">Team Name</label>
              <input type="text" className="form-control" name="name" value={form.name} onChange={handleFormChange} />
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
          <Modal.Title>Add Team</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label className="form-label">Team Name</label>
              <input type="text" className="form-control" name="name" value={form.name} onChange={handleFormChange} />
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

export default Teams;
