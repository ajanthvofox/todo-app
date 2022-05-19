import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import sortObjectsArray from 'sort-objects-array';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaPen, FaTimes, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import statuses from '../utils/statuses';
import ViewModal from '../components/view-modal';
import EditModal from '../components/edit-modal';
import AddModal from '../components/add-modal';
const initialState = {
  todoItems: [],
  filteredItems: [],
  filterText: '',
  filterState: 'default',
  displayItem: null,
  editItem: null,
  addItem: false,
  loading: true,
  error: null,
  sortItem: 'id',
  sortAsc: true,
};
const Home = (props) => {
  const [state, setState] = React.useState({ ...initialState });
  React.useEffect(() => {
    getToDoList();
  }, []);
  const getToDoList = () => {
    const todoData = require('../data/todo.json');
    setState((prevState) => ({
      ...prevState,
      todoItems: [...todoData],
      loading: false,
    }));
  };
  const updateStatus = (e, id) => {
    const updatedTodo = state.todoItems.map(item => (item.id === id ? { ...item, state: parseInt(e.target.value) } : item));
    let filteredTodo = [];
    if ((state.filterText || state.filterState !== 'default') && state.filteredItems?.length > 0)
      filteredTodo = state.filteredItems.map(item => (item.id === id ? { ...item, state: parseInt(e.target.value) } : item));
    setState((prevState) => ({
      ...prevState,
      todoItems: [...updatedTodo],
      filteredItems: [...filteredTodo],
    }));
    statusNotify(id, statuses[e.target.value]);
  };
  const updateFilter = (e) => {
    let filteredData;
    if (state.filterState === 'default')
      filteredData = state.todoItems.filter(item => item.title.toLowerCase().includes(e.target.value.toLowerCase()));
    else
      filteredData = state.todoItems.filter(item => item.state === parseInt(state.filterState) && item.title.toLowerCase().includes(e.target.value.toLowerCase()));
    setState((prevState) => ({
      ...prevState,
      filteredItems: [...filteredData],
      filterText: e.target.value,
    }));
  };
  const updatefilterState = (e) => {
    let filteredData = [];
    if (e.target.value === 'default') {
      if (state.filterText) 
        filteredData = state.todoItems.filter(item => item.title.toLowerCase().includes(state.filterText.toLowerCase()));
    } else {
      filteredData = state.todoItems.filter(item => item.state === parseInt(e.target.value) && item.title.toLowerCase().includes(state.filterText.toLowerCase()));
    }
    setState((prevState) => ({
      ...prevState,
      filteredItems: [...filteredData],
      filterState: e.target.value,
    }));
  }
  const openViewModal = (id) => {
    const selectedItem = state.todoItems.find(item => item.id === id);
    setState((prevState) => ({
      ...prevState,
      displayItem: { ...selectedItem },
    }));
  };
  const closeDisplayItem = () => {
    setState((prevState) => ({
      ...prevState,
      displayItem: null,
    }));
  };
  const openEditModal = (id) => {
    const selectedItem = state.todoItems.find(item => item.id === id);
    setState((prevState) => ({
      ...prevState,
      editItem: { ...selectedItem },
    }));
  };
  const closeEditItem = () => {
    setState((prevState) => ({
      ...prevState,
      editItem: null,
    }));
  };
  const saveEditItem = (data) => {
    const updatedItems = state.todoItems?.map(item => (item.id === data.id ? { ...data } : item));
    let updatedFilteredItems = [];
    if ((state.filterText || state.filterState !== 'default') && state.filteredItems?.length > 0)
      updatedFilteredItems = state.filteredItems?.map(item => (item.id === data.id ? { ...data } : item));
    setState((prevState) => ({
      ...prevState,
      todoItems: updatedItems,
      filteredItems: updatedFilteredItems,
      editItem: null,
    }));
    editNotify(data.id);
  };
  const openAddModal = () => {
    setState((prevState) => ({
      ...prevState,
      addItem: true,
    }));
  };
  const closeAddItem = () => {
    setState((prevState) => ({
      ...prevState,
      addItem: false,
    }));
  };
  const saveAddItem = (data) => {
    const newId = Math.max(...state.todoItems.map(item => item.id)) + 1;
    const newItem = {
      id: newId,
      title: data.title,
      description: data.description,
      userId: data.userId,
      state: parseInt(data.state),
    };
    const newTodoItems = [...state.todoItems];
    newTodoItems.push(newItem);
    let newFilteredItems = [];
    if (state.filterText) {
      if (state.filterState !== 'default')
        newFilteredItems = newTodoItems.filter(item => item.state === state.filterState && item.title.toLowerCase().includes(state.filterText.toLowerCase()));
      else
        newFilteredItems = newTodoItems.filter(item => item.title.toLowerCase().includes(state.filterText.toLowerCase()));
    }
      
    setState((prevState) => ({
      ...prevState,
      todoItems: newTodoItems,
      filteredItems: newFilteredItems,
      addItem: false,
    }));
    addNotify(newId);
  };
  const openDeleteModal = (id) => {
    const newTodoItems = state.todoItems.filter(item => item.id != id);
    let newFilteredItems = [];
    if (state.filterText)
      newFilteredItems = newTodoItems.filter(item => item.title.toLowerCase().includes(state.filterText.toLowerCase()));
    setState((prevState) => ({
      ...prevState,
      todoItems: newTodoItems,
      filteredItems: newFilteredItems,
    }));
    deleteNotify(id);
  }
  const sortWith = (column) => {
    let sortAsc = state.sortAsc;
    if (column === state.sortItem)
      sortAsc = !sortAsc;
    else
      sortAsc = true;
    const sortedList = sortObjectsArray(state.todoItems, column, sortAsc ? 'asc' : 'desc');
    const sortedFilteredList = sortObjectsArray(state.filteredItems, column, sortAsc ? 'asc' : 'desc');
    setState((prevState) => ({
      ...prevState,
      todoItems: sortedList,
      filteredItems: sortedFilteredList,
      sortItem: column,
      sortAsc,
    }));
  }
  const statusNotify = (id, status) => toast.success(`Task #${id} status updated as ${status} successfully`);
  const editNotify = (id) => toast.success(`Task #${id} has been updated successfully`);
  const addNotify = (id) => toast.success(`Added new task with Task #${id} successfully`);
  const deleteNotify = (id) => toast.success(`Deleted Task #${id} successfully`);
  return (
    <div className="content-wrapper">
      <div className="content-inner">
        <div className="text-right">
          <button onClick={() => openAddModal()} className='btn btn-primary mb-2'>Add</button>
        </div>
        <div className="row">
          <div className="col-md-7">
            <div className="form-group">
              <input type="text"
                className="form-control"
                id="filterTxt"
                placeholder="keyword"
                onChange={(e) => updateFilter(e)}
                value={state.filterText}
              />
            </div>
          </div>
          <div className="col-md-5">
            <select onChange={(e) => updatefilterState(e)} value={state.filterState} className="form-control">
              <option value="default">Select Status</option>
              {
                Object.values(statuses).map((statusItem, index) => (
                  <option key={index} value={index}>{statusItem}</option>
                ))
              }
            </select>
          </div>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th scope="col" onClick={() => sortWith('id')}># {state.sortItem === 'id' ? state.sortAsc ? <FaArrowUp className="sort-arrow" /> : <FaArrowDown className="sort-arrow" /> : ''}</th>
              <th scope="col" onClick={() => sortWith('title')}>Title {state.sortItem === 'title' ? state.sortAsc ? <FaArrowUp className="sort-arrow" /> : <FaArrowDown className="sort-arrow" /> : ''}</th>
              <th scope="col" onClick={() => sortWith('state')}>State {state.sortItem === 'state' ? state.sortAsc ? <FaArrowUp className="sort-arrow" /> : <FaArrowDown className="sort-arrow" /> : ''}</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              (state.filterText || state.filterState !== 'default' ? state.filteredItems : state.todoItems)?.map((item, key) => (
                <tr key={key}>
                  <th scope="row">{item.id}</th>
                  <td>{item.title}</td>
                  <td>
                    <select onChange={(e) => updateStatus(e, item.id)} value={item.state} className="form-control">
                      {
                        Object.values(statuses).map((statusItem, index) => (
                          <option key={index} value={index}>{statusItem}</option>
                        ))
                      }
                    </select>
                  </td>
                  <td>
                    <a onClick={() => openViewModal(item.id)}><FaEye /></a> &nbsp;
                    <a onClick={() => openEditModal(item.id)}><FaPen /></a> &nbsp;
                    <a onClick={() => openDeleteModal(item.id)}><FaTimes /></a> &nbsp;
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      {
        state.displayItem &&
        <ViewModal displayItem={state.displayItem} closeDisplayItem={() => closeDisplayItem()} />
      }
      {
        state.editItem &&
        <EditModal editItem={state.editItem} closeEditItem={() => closeEditItem()} saveEditItem={(data) => saveEditItem(data)} />
      }
      {
        state.addItem &&
        <AddModal addItem={state.addItem} closeAddItem={() => closeAddItem()} saveAddItem={(data) => saveAddItem(data)} />
      }
      <ToastContainer />
    </div>
  )
}

export default Home;