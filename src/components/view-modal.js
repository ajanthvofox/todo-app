import statuses from '../utils/statuses';
const ViewModal = (props) => {
  return (
    <div style={{ display: props.displayItem ? 'block' : 'none' }} className={props.displayItem ? 'modal' : 'modal fade'} tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Task #{props.displayItem.id}</h5>
            <button onClick={() => props.closeDisplayItem()} type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="container">
              <table className="table">
                <tbody>
                  <tr>
                    <td scope="col"><b>Title</b></td>
                    <td scope="col">{props.displayItem.title}</td>
                  </tr>
                  <tr>
                    <td scope="col"><b>Description</b></td>
                    <td scope="col">{props.displayItem.description}</td>
                  </tr>
                  <tr>
                    <td scope="col"><b>User ID</b></td>
                    <td scope="col">{props.displayItem.userId}</td>
                  </tr>
                  <tr>
                    <td scope="col"><b>Status</b></td>
                    <td scope="col">{statuses[props.displayItem.state]}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="modal-footer">
              <button onClick={() => props.closeDisplayItem()} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewModal;