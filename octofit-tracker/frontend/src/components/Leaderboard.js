import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [showView, setShowView] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/api/leaderboard/')
      .then(response => response.json())
      .then(data => setLeaderboard(data))
      .catch(error => console.error('Error fetching leaderboard:', error));
  }, []);

  const handleView = entry => {
    setSelectedEntry(entry);
    setShowView(true);
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-primary">Leaderboard</h1>
      <div className="card shadow-sm">
        <div className="card-body">
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th scope="col">User</th>
                <th scope="col">Score</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map(entry => (
                <tr key={entry._id}>
                  <td>{entry.user?.username || 'Unknown'}</td>
                  <td>{entry.score}</td>
                  <td>
                    <button className="btn btn-info btn-sm me-2" onClick={() => handleView(entry)}>View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Modal */}
      <Modal show={showView} onHide={() => setShowView(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Leaderboard Entry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedEntry && (
            <div>
              <p><strong>User:</strong> {selectedEntry.user?.username || 'Unknown'}</p>
              <p><strong>Score:</strong> {selectedEntry.score}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowView(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Leaderboard;
