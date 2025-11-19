import React, { useEffect, useState } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setActivities(results);
        console.log('Fetched activities:', results);
        console.log('Endpoint:', endpoint);
      })
      .catch(err => console.error('Error fetching activities:', err));
  }, [endpoint]);

  const openModal = (item) => {
    setModalData(item);
    setShowModal(true);
  };

  const columns = activities.length > 0 && typeof activities[0] === 'object' ? Object.keys(activities[0]) : [];

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h4 className="mb-0">Activities</h4>
        <div>
          <button className="btn btn-outline-secondary me-2" onClick={() => window.location.reload()}>Refresh</button>
        </div>
      </div>
      <div className="card-body">
        <div className="mb-3">
          <form className="row g-2">
            <div className="col-auto">
              <input className="form-control" placeholder="Search activities..." />
            </div>
            <div className="col-auto">
              <button className="btn btn-success">Search</button>
            </div>
          </form>
        </div>

        {activities.length === 0 ? (
          <p>No activities available</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  {columns.map((col) => <th key={col}>{col}</th>)}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((a, i) => (
                  <tr key={a.id || i}>
                    {columns.map((col) => (
                      <td key={col}>{typeof a[col] === 'object' ? JSON.stringify(a[col]) : String(a[col] ?? '')}</td>
                    ))}
                    <td>
                      <button className="btn btn-sm btn-primary me-2" onClick={() => openModal(a)}>View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showModal && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Activity Details</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)} />
              </div>
              <div className="modal-body">
                <pre>{JSON.stringify(modalData, null, 2)}</pre>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" />
        </div>
      )}
    </div>
  );
};

export default Activities;
