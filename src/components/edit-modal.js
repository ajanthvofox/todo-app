import React from 'react';
import statuses from '../utils/statuses';
const EditModal = (props) => {
  const [state, setState] = React.useState({ 
    id: props.editItem.id,
    title: props.editItem.title,
    description: props.editItem.description,
    userId: props.editItem.userId,
    state: props.editItem.state,
  });
  const updateInput = (e) => {
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };  
  return (
    <div style={{ display: props.editItem ? 'block' : 'none' }} className={props.editItem ? 'modal' : 'modal fade'} tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Task #{props.editItem.id}</h5>
            <button onClick={() => props.closeEditItem()} type="button" className="close btn" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="container">
              <table className="table">
                <tbody>
                  <tr>
                    <td><b>Title</b></td>
                    <td>
                      <input type="text"
                        name="title"
                        className="form-control"
                        id="filterTxt"
                        placeholder="Title"
                        onChange={(e) => updateInput(e)}
                        value={state.title}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td><b>Description</b></td>
                    <td>
                      <textarea 
                        name="description"
                        className="form-control" 
                        id="exampleFormControlTextarea1" 
                        rows="3" 
                        onChange={(e) => updateInput(e)}
                        value={state.description} />
                    </td>
                  </tr>
                  <tr>
                    <td><b>User ID</b></td>
                    <td>
                      <input type="text"
                        name="userId"
                        className="form-control"
                        id="filterTxt"
                        placeholder="User Id"
                        onChange={(e) => updateInput(e)}
                        value={state.userId}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td><b>Status</b></td>
                    <td>
                      <select name='state' onChange={(e) => updateInput(e)} value={state.state} className="form-control" id="exampleFormControlSelect1">
                        {
                          Object.values(statuses).map((statusItem, index) => (
                            <option key={index} value={index}>{statusItem}</option>
                          ))
                        }
                      </select>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="modal-footer">
              <button onClick={() => props.closeEditItem()} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button onClick={() => props.saveEditItem(state)} type="button" className="btn btn-primary" data-dismiss="modal">Update</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;