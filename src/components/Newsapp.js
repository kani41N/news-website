import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Axios from 'axios'

function App() {
  const [users, setUsers] = useState([]);
  const [openModel, setOpenModel] = useState(false);
  const [name, newName] = useState("");
  const [email, newEmail] = useState("");
  const [website, newWebsite] = useState("");
  const [editingUser, setEditingUser] = useState(null);


  useEffect(() => {
    Axios.get("https://jsonplaceholder.typicode.com/users")
      .then((response) =>  setUsers(response.data)) 
  }, []);

  const showModel = () => {
    if(!editingUser){
      newName("");
      newEmail("");
      newWebsite("");
    }
    setOpenModel(true);
  };

  const closeModel = () => {
    setOpenModel(false);
    setEditingUser(null);
  }
  
  const handleAdduser = () => {
    Axios.post("https://jsonplaceholder.typicode.com/users", {name: name, email:email, website:website})
    .then((response) => setUsers([...users, response.data]))
    newName('');
    newEmail('');
    newWebsite('');
    setOpenModel(false);
    // setEditingUser(null);
  }

  const handleUpdate = () => {
     Axios.put(`https://jsonplaceholder.typicode.com/users/${editingUser.id}`, {name: name, email:email, website:website })
     .then((response) => {
      setUsers(users.map((user) => 
        user.id === editingUser.id ? {...user, ...response.data} : user
      ));
      setOpenModel(false);
      setEditingUser(null);
    })
  } 

  const startEditing = (user) => {
    setEditingUser(user);
    newName(user.name);
    newEmail(user.email);
    newWebsite(user.website);
    setOpenModel(true);
  }

  
  const handleDelete = (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete your details?");
    
    if(isConfirmed){
      Axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(() => {
        setUsers(users.filter((user) => user.id !== id));
      })
    }
    };
   
  

  return (
    <div className="App">
      <div className="px-36 py-24">
        <div>
          <button
            onClick={showModel}
            className="px-2 py-2 bg-green-500 hover:bg-green-700 text-white rounded mb-2 font-bold"
          >
            Add user
          </button>
        </div>
        <table className="border-collapse border border-green-400 w-full text-center">
          <thead className="bg-gray-800 text-white h-10">
            <tr className="border border-green-400">
              <th className="border border-green-400">ID</th>
              <th className="border border-green-400">Name</th>
              <th className="border border-green-400">Email</th>
              <th className="border border-green-400">Website</th>
              <th className="border border-green-400">Action</th>
            </tr>
          </thead>
          <tbody>
              {users.map((user, index) => (
                  <tr key={index + 1} className="border border-green-400">
                  <td className="border border-green-400">{user.id}</td>
                  <td className="border border-green-400">{user.name}</td>
                  <td className="border border-green-400">{user.email}</td>
                  <td className="border border-green-400">{user.website}</td>
                  <td className="border border-green-400">
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => startEditing(user)}
                        className="px-2 py-1 bg-gray-500 hover:bg-gray-700 rounded text-white"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(user.id)}
                        className="px-2 py-1 bg-red-500 hover:bg-red-700 rounded text-white">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
        </table>
      </div>

      {openModel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <div className="flex justify-between mb-4">
              <h2 className="text-xl">
                { editingUser ? 'Update user' : 'Add Newuser'}
              </h2>
              <button
                onClick={closeModel}
                className="text-white rounded font-bold bg-red-500 hover:bg-red-700 p-1"
              >
                <IoMdClose />
              </button>
            </div>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  className="mb-2 block w-full rounded-md border py-1 px-1 text-gray-900 placeholder:text-gray-400 focus:border-green-500 focus:ring-0"
                  placeholder="Enter your name.. "
                  required
                  onChange={(e) => newName(e.target.value)}
                />
              </div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  className="mb-2 block w-full rounded-md border py-1 px-1 text-gray-900 placeholder:text-gray-400 focus:border-green-500 focus:ring-0"
                  placeholder="Enter your email.."
                  required
                  onChange={(e) => newEmail(e.target.value)}
                />
              </div>
              <label
                htmlFor="city"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Website
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="website"
                  value={website}
                  id="website"
                  className="mb-2 block w-full rounded-md border py-1 px-1 text-gray-900 placeholder:text-gray-400 focus:border-green-500 focus:ring-0"
                  placeholder="Enter your website.."
                  required
                  onChange={(e) => newWebsite(e.target.value)}
                />
              </div>

              <div className="flex justify-end">
                <button
                  className="bg-green-500 hover:bg-green-700 font-bold text-white px-2 py-1 rounded"
                  onClick={editingUser ? handleUpdate : handleAdduser}
                >
                  { editingUser ? 'Update user' : 'Add User'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
