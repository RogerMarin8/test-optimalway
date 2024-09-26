import React, { useState, useEffect } from 'react';
import UserService from './UserService';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = () => {
        setLoading(true);
        UserService.getUsers()
            .then(response => {
                setUsers(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    };

    const createUser = () => {
        if (!name || !surname || !email) {
            setMessage("Tots els camps són obligatoris!");
            return;
        }

        const userExists = users.some(user => user.email === email);
        if (userExists) {
            setMessage("Aquest email ja està registrat!");
            return;
        }

        setLoading(true);
        UserService.createUser({ name, surname, email })
            .then(() => {
                loadUsers();
                setName('');
                setSurname('');
                setEmail('');
                setMessage("Usuari creat satisfactòriament!");
            })
            .catch(error => {
                console.error(error);
                setMessage("Error creant l'usuari.");
            })
            .finally(() => setLoading(false));
    };

    const startEditing = (user) => {
        setIsEditing(true);
        setEditingId(user.id);
        setName(user.name);
        setSurname(user.surname);
        setEmail(user.email);
    };

    const updateUser = () => {
        if (!name || !surname || !email) {
            setMessage("Tots els camps són obligatoris!");
            return;
        }

        const userExists = users.some(user => user.email === email && user.id !== editingId);
        if (userExists) {
            setMessage("Aquest email ja està registrat!");
            return;
        }

        setLoading(true);
        UserService.updateUser(editingId, { name, surname, email })
            .then(() => {
                loadUsers();
                setName('');
                setSurname('');
                setEmail('');
                setIsEditing(false);
                setEditingId(null);
                setMessage("Usuari actualitzat satisfactòriament!");
            })
            .catch(error => {
                console.error(error);
                setMessage("Error actualitzant l'usuari.");
            })
            .finally(() => setLoading(false));
    };

    const deleteUser = (id) => {
        if (window.confirm("Estàs segur que vols eliminar aquest usuari?")) {
            setLoading(true);
            UserService.deleteUser(id)
                .then(() => {
                    loadUsers();
                    setMessage("Usuari eliminat satisfactòriament!");
                })
                .catch(error => {
                    console.error(error);
                    setMessage("Error eliminant l'usuari.");
                })
                .finally(() => setLoading(false));
        }
    };

    return (
        <div className="container my-5">
            <h2 className="text-center mb-4">Aplicació de Gestió d'Usuaris</h2>

            {loading && <p className="text-center">Carregant...</p>}
            {message && <div className="alert alert-info">{message}</div>}

            <div className="card p-4 mb-4">
                <div className="row">
                    <div className="col-md-4 mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nom"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="col-md-4 mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Cognoms"
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                        />
                    </div>
                    <div className="col-md-4 mb-3">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>
                <button
                    className="btn btn-primary"
                    onClick={isEditing ? updateUser : createUser}
                    disabled={loading}
                >
                    {isEditing ? 'Actualitza' : 'Crea'}
                </button>
            </div>

            <table className="table table-bordered table-striped">
                <thead className="thead-dark">
                <tr>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {users.length > 0 ? (
                    users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.surname}</td>
                            <td>{user.email}</td>
                            <td>
                                <button
                                    className="btn btn-warning btn-sm mr-2"
                                    onClick={() => startEditing(user)}
                                >
                                    Editar
                                </button>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => deleteUser(user.id)}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="4" className="text-center">
                            No users found.
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default Users;
