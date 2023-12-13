import { getUser, deleteUser, addUser, updateUser } from "../Services/axios";
import { useState, useEffect } from "react";
import "./crud.css";

const CRUD = () => {
  const [users, setUsers] = useState([]);
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [showEditUserForm, setShowEditUserForm] = useState(false);
  const [editUserById, setEditUserById] = useState(null);
  const [newUser, setNewUser] = useState({
    name: "",
    username: "",
    email: "",
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: "",
      geo: {
        lat: "",
        lng: "",
      },
    },
    phone: "",
    website: "",
    company: {
      name: "",
      catchPhrase: "",
      bs: "",
    },
  });

  const getAllUsers = async () => {
    const response = await getUser();
    setUsers(response.data);
  };

  const addNewUser = async () => {
    try {
      const response = await addUser(newUser);
      console.log("add user", response.data);
      setUsers((allUsers) => [...allUsers, response.data]);
      setShowAddUserForm(false);
      setNewUser({
        name: "",
        username: "",
        email: "",
        address: {
          street: "",
          suite: "",
          city: "",
          zipcode: "",
          geo: {
            lat: "",
            lng: "",
          },
        },
        phone: "",
        website: "",
        company: {
          name: "",
          catchPhrase: "",
          bs: "",
        },
      });
    } catch (error) {
      console.error("Error adding user:", error.response);
    }
  };

  const editUser = async () => {
    try {
      const response = await updateUser(editUser, newUser);
      console.log("eddit user", response.data);
      setUsers((allUsers) =>
        allUsers.map((users) => (users.id === editUser ? response.data : users))
      );
      setShowEditUserForm(false);
      setEditUserById(null);
      setNewUser({
        name: "",
        username: "",
        email: "",
        address: {
          street: "",
          suite: "",
          city: "",
          zipcode: "",
          geo: {
            lat: "",
            lng: "",
          },
        },
        phone: "",
        website: "",
        company: {
          name: "",
          catchPhrase: "",
          bs: "",
        },
      });
    } catch (error) {
      console.log("Error", error.response);
    }
  };

  const updateUserById = (userId) => {
    const userToEdit = users.find((user) => user.id === userId);
    setEditUserById(userId);
    setNewUser({
      name: userToEdit.name,
      username: userToEdit.username,
      email: userToEdit.email,
      address: {
        street: userToEdit.address.street,
        suite: userToEdit.address.suite,
        city: userToEdit.address.city,
        zipcode: userToEdit.address.zipcode,
        geo: {
          lat: userToEdit.address.geo.lat,
          lng: userToEdit.address.geo.lng,
        },
      },
      phone: userToEdit.phone,
      website: userToEdit.website,
      company: {
        name: userToEdit.company.name,
        catchPhrase: userToEdit.company.catchPhrase,
        bs: userToEdit.company.bs,
      },
    });
    setShowEditUserForm(true);
  };

  const deleteUserById = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user")) {
      const response = await deleteUser(userId);
      console.log("Deleted User By Axios: ", response.data);
      setUsers(users.filter((user) => user.id !== userId));
    }
  };

  const resetNewUser = () => {
    setNewUser({
      name: "",
      username: "",
      email: "",
      address: {
        street: "",
        suite: "",
        city: "",
        zipcode: "",
        geo: {
          lat: "",
          lng: "",
        },
      },
      phone: "",
      website: "",
      company: {
        name: "",
        catchPhrase: "",
        bs: "",
      },
    });
  };

  useEffect(() => {
    getAllUsers();
  }, [users]);

  return (
    <div>
      <div className="user-container">
        <h2>Users</h2>

        <button className="add" onClick={() => setShowAddUserForm(true)}>
          Add User
        </button>

        {showAddUserForm && (
          <div>
            <h3>Add New User</h3>
            <div className="add-users">
              <div className="add-container">
                <span>
                  <label className="label">Name :</label>
                  <input
                    className="input"
                    type="text"
                    value={newUser.name}
                    onChange={(e) =>
                      setNewUser({ ...newUser, name: e.target.value })
                    }
                  />
                </span>
                <span>
                  <label className="label">UserName :</label>
                  <input
                    className="input"
                    type="text"
                    value={newUser.username}
                    onChange={(e) =>
                      setNewUser({ ...newUser, username: e.target.value })
                    }
                  />
                </span>
                <span>
                  <label className="label">Email :</label>
                  <input
                    className="input"
                    type="text"
                    value={newUser.email}
                    onChange={(e) =>
                      setNewUser({ ...newUser, email: e.target.value })
                    }
                  />
                </span>
                <span>
                  <label className="label">Street :</label>
                  <input
                    className="input"
                    type="text"
                    value={newUser.address.street}
                    onChange={(e) =>
                      setNewUser({
                        ...newUser,
                        address: { ...newUser.address, street: e.target.value },
                      })
                    }
                  />
                </span>
                <span>
                  <label className="label">Suite :</label>
                  <input
                    className="input"
                    type="text"
                    value={newUser.address.suite}
                    onChange={(e) =>
                      setNewUser({
                        ...newUser,
                        address: { ...newUser.address, suite: e.target.value },
                      })
                    }
                  />
                </span>
                <span>
                  <label className="label">City :</label>
                  <input
                    className="input"
                    type="text"
                    value={newUser.address.city}
                    onChange={(e) =>
                      setNewUser({
                        ...newUser,
                        address: { ...newUser.address, city: e.target.value },
                      })
                    }
                  />
                </span>
                <span>
                  <label className="label">Zipcode :</label>
                  <input
                    className="input"
                    type="text"
                    value={newUser.address.zipcode}
                    onChange={(e) =>
                      setNewUser({
                        ...newUser,
                        address: {
                          ...newUser.address,
                          zipcode: e.target.value,
                        },
                      })
                    }
                  />
                </span>
                <span>
                  <label className="label">Latitude :</label>
                  <input
                    className="input"
                    type="text"
                    value={newUser.address.geo.lat}
                    onChange={(e) =>
                      setNewUser({
                        ...newUser,
                        address: {
                          ...newUser.address,
                          geo: { ...newUser.address.geo, lat: e.target.value },
                        },
                      })
                    }
                  />
                </span>
                <span>
                  <label className="label">Longitude :</label>
                  <input
                    className="input"
                    type="text"
                    value={newUser.address.geo.lng}
                    onChange={(e) =>
                      setNewUser({
                        ...newUser,
                        address: {
                          ...newUser.address,
                          geo: { ...newUser.address.geo, lng: e.target.value },
                        },
                      })
                    }
                  />
                </span>
                <span>
                  <label className="label">Phone :</label>
                  <input
                    className="input"
                    type="text"
                    value={newUser.phone}
                    onChange={(e) =>
                      setNewUser({ ...newUser, phone: e.target.value })
                    }
                  />
                </span>
                <span>
                  <label className="label">Website :</label>
                  <input
                    className="input"
                    type="text"
                    value={newUser.website}
                    onChange={(e) =>
                      setNewUser({ ...newUser, website: e.target.value })
                    }
                  />
                </span>
                <span>
                  <label className="label">Company-Name :</label>
                  <input
                    className="input"
                    type="text"
                    value={newUser.company.name}
                    onChange={(e) =>
                      setNewUser({
                        ...newUser,
                        company: { ...newUser.company, name: e.target.value },
                      })
                    }
                  />
                </span>
                <span>
                  <label className="label">CatchPhrase :</label>
                  <input
                    className="input"
                    type="text"
                    value={newUser.company.catchPhrase}
                    onChange={(e) =>
                      setNewUser({
                        ...newUser,
                        company: {
                          ...newUser.company,
                          catchPhrase: e.target.value,
                        },
                      })
                    }
                  />
                </span>
                <span>
                  <label className="label">BS :</label>
                  <input
                    className="input"
                    type="text"
                    value={newUser.company.bs}
                    onChange={(e) =>
                      setNewUser({
                        ...newUser,
                        company: { ...newUser.company, bs: e.target.value },
                      })
                    }
                  />
                </span>
              </div>
            </div>
            <div className="add-user-button">
              <button onClick={addNewUser}>Save</button>
              <button onClick={() => setShowAddUserForm(false)}>Cancel</button>
            </div>
          </div>
        )}

        {showEditUserForm && (
          <div>
            <h3>Edit User</h3>
            <div className="edit-users">
              <div className="edit-container">
                <span>
                  <label className="label">Name :</label>
                  <input
                    className="input"
                    type="text"
                    value={newUser.name}
                    onChange={(e) =>
                      setNewUser({ ...newUser, name: e.target.value })
                    }
                  />
                </span>
                <span>
                  <label className="label">UserName :</label>
                  <input
                    className="input"
                    type="text"
                    value={newUser.username}
                    onChange={(e) =>
                      setNewUser({ ...newUser, username: e.target.value })
                    }
                  />
                </span>
                <span>
                  <label className="label">Email :</label>
                  <input
                    className="input"
                    type="text"
                    value={newUser.email}
                    onChange={(e) =>
                      setNewUser({ ...newUser, email: e.target.value })
                    }
                  />
                </span>
                <span>
                  <label className="label">Street :</label>
                  <input
                    className="input"
                    type="text"
                    value={newUser.address.street}
                    onChange={(e) =>
                      setNewUser({
                        ...newUser,
                        address: { ...newUser.address, street: e.target.value },
                      })
                    }
                  />
                </span>
                <span>
                  <label className="label">Suite :</label>
                  <input
                    className="input"
                    type="text"
                    value={newUser.address.suite}
                    onChange={(e) =>
                      setNewUser({
                        ...newUser,
                        address: { ...newUser.address, suite: e.target.value },
                      })
                    }
                  />
                </span>
                <span>
                  <label className="label">City :</label>
                  <input
                    className="input"
                    type="text"
                    value={newUser.address.city}
                    onChange={(e) =>
                      setNewUser({
                        ...newUser,
                        address: { ...newUser.address, city: e.target.value },
                      })
                    }
                  />
                </span>
                <span>
                  <label className="label">Zipcode :</label>
                  <input
                    className="input"
                    type="text"
                    value={newUser.address.zipcode}
                    onChange={(e) =>
                      setNewUser({
                        ...newUser,
                        address: {
                          ...newUser.address,
                          zipcode: e.target.value,
                        },
                      })
                    }
                  />
                </span>
                <span>
                  <label className="label">Latitude :</label>
                  <input
                    className="input"
                    type="text"
                    value={newUser.address.geo.lat}
                    onChange={(e) =>
                      setNewUser({
                        ...newUser,
                        address: {
                          ...newUser.address,
                          geo: { ...newUser.address.geo, lat: e.target.value },
                        },
                      })
                    }
                  />
                </span>
                <span>
                  <label className="label">Longitude :</label>
                  <input
                    className="input"
                    type="text"
                    value={newUser.address.geo.lng}
                    onChange={(e) =>
                      setNewUser({
                        ...newUser,
                        address: {
                          ...newUser.address,
                          geo: { ...newUser.address.geo, lng: e.target.value },
                        },
                      })
                    }
                  />
                </span>
                <span>
                  <label className="label">Phone :</label>
                  <input
                    className="input"
                    type="text"
                    value={newUser.phone}
                    onChange={(e) =>
                      setNewUser({ ...newUser, phone: e.target.value })
                    }
                  />
                </span>
                <span>
                  <label className="label">Website :</label>
                  <input
                    className="input"
                    type="text"
                    value={newUser.website}
                    onChange={(e) =>
                      setNewUser({ ...newUser, website: e.target.value })
                    }
                  />
                </span>
                <span>
                  <label className="label">Company-Name :</label>
                  <input
                    className="input"
                    type="text"
                    value={newUser.company.name}
                    onChange={(e) =>
                      setNewUser({
                        ...newUser,
                        company: { ...newUser.company, name: e.target.value },
                      })
                    }
                  />
                </span>
                <span>
                  <label className="label">CatchPhrase :</label>
                  <input
                    className="input"
                    type="text"
                    value={newUser.company.catchPhrase}
                    onChange={(e) =>
                      setNewUser({
                        ...newUser,
                        company: {
                          ...newUser.company,
                          catchPhrase: e.target.value,
                        },
                      })
                    }
                  />
                </span>
                <span>
                  <label className="label">BS :</label>
                  <input
                    className="input"
                    type="text"
                    value={newUser.company.bs}
                    onChange={(e) =>
                      setNewUser({
                        ...newUser,
                        company: { ...newUser.company, bs: e.target.value },
                      })
                    }
                  />
                </span>
              </div>
            </div>
            <div className="edit-user-button">
              <button
                onClick={() => {
                  setShowEditUserForm(false);
                  editUser();
                }}
              >
                Save
              </button>
              <button
                onClick={() => {
                  setShowEditUserForm(false);
                  resetNewUser();
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="user-map">
          {users.map((user, index) => (
            <div key={index} className="users">
              <div className="name">Name: {user.name}</div>
              <div className="userName">UserName: {user.username}</div>
              <div className="email">Email: {user.email}</div>
              <div className="address">
                <b>Address</b> <br></br>Street: {user.address.street},<br></br>{" "}
                Suite: {user.address.suite},<br></br>City: {user.address.city},
                <br></br>
                Zipcode: {user.address.zipcode}
              </div>

              <div className="geo">
                <b>Geo</b> <br></br>Lng:{user.address.geo.lng}, <br></br>Log:
                {user.address.geo.log}
              </div>

              <div className="phone">Phone: {user.phone}</div>
              <div className="website">Website: {user.website}</div>
              <div className="company">
                <b>Company</b> <br></br> name:{user.company.name},<br></br>
                Catchphrase: {user.company.catchPhrase},<br></br>Bs:{" "}
                {user.company.bs}
              </div>
              <div className="button-container">
                <button onClick={() => updateUserById(user.id)}>Edit</button>
                <button onClick={() => deleteUserById(user.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CRUD;
