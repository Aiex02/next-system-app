'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface User {
    id: number;
    username: string;
    name: string;
    password: string;
}

export default function UserManagement() {
    const [users, setUsers] = useState<User[]>([]);
    const [editingUser, setEditingUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3333/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users', error);
            }
        };

        fetchUsers();
    }, []);

    const formik = useFormik({
        initialValues: {
            name: '',
            username: '',
            password: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Nome é necessário'),
            username: Yup.string().required('Usuário é necessário'),
            password: Yup.string().required('Senha é necessária'),
        }),
        onSubmit: (values, { resetForm }) => {
            const submitUser = async () => {
                try {
                    let response;
                    if (editingUser) {
                        response = await axios.put(`http://localhost:3333/users/${editingUser.id}`, values);
                        setEditingUser(null);
                    } else {
                        response = await axios.post('http://localhost:3333/users', values);
                    }
                    setUsers(response.data);
                    resetForm();
                } catch (error) {
                    console.error('Error submitting user', error);
                }
            };

            submitUser();
        },
    });

    const handleEdit = (user: User) => {
        setEditingUser(user);
        formik.setValues(user);
    };

    return (
        <div className="p-4 mt-14">
            <h1 className="text-center font-bold text-xl">Gerenciamento de Usuário</h1>

            <form onSubmit={formik.handleSubmit} className="mb-4 mx-auto max-w-xl mt-6">
                <div className="mb-4">
                    <label className="block mb-1">Nome:</label>
                    <input
                        type="text"
                        name="name"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        className="border p-1 w-full"
                    />
                    {formik.errors.name && <div className="text-red-500">{formik.errors.name}</div>}
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Usuário:</label>
                    <input
                        type="text"
                        name="username"
                        onChange={formik.handleChange}
                        value={formik.values.username}
                        className="border p-1 w-full"
                    />
                    {formik.errors.username && <div className="text-red-500">{formik.errors.username}</div>}
                </div>

                <div className="mb-4">
                    <label className="block mb-1">Senha:</label>
                    <input
                        type="password"
                        name="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        className="border p-1 w-full"
                    />
                    {formik.errors.password && <div className="text-red-500">{formik.errors.password}</div>}
                </div>

                <button type="submit" className="bg-blue-500 text-white px-4 py-2">
                    {editingUser ? 'Editar Usuário' : 'Adicionar Usuário'}
                </button>
            </form>

            <Table className="w-5/6 mx-auto border-collapse border">
                <TableHeader>
                    <TableRow>
                        <TableHead className="border p-2 text-center font-bold">Nome</TableHead>
                        <TableHead className="border p-2 text-center font-bold">Usuário</TableHead>
                        <TableHead className="border p-2 text-center font-bold">Ações</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell className="border p-2 text-center">{user.name}</TableCell>
                            <TableCell className="border p-2 text-center">{user.username}</TableCell>
                            <TableCell className="border p-2 text-center">
                                <button
                                    onClick={() => handleEdit(user)}
                                    className="bg-yellow-500 text-white px-2 py-1"
                                >
                                    Edit
                                </button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
