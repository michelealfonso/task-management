"use client";

import { Tasks } from "@/app/api/tasks/route";
import { useState, useEffect } from "react";

export default function TaskUI() {
    const [tasks, setTasks] = useState<Tasks[]>([])
    const [form, setForm] = useState({
        title: '',
        description: '',
        dueDate: new Date().toISOString().slice(0, 10),
        priority: 'low',
        status: 'pending',
    })

    // questo viene usato per l'inserimento di un messaggio dimanico in caso di esito pisitivo o negativo

    const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null)

    // per la modifica di un utente

    const [editId, setEditId] = useState<number | null>(null);
    const [editForm, setEditForm] = useState<Tasks | null>(null);

    // questo effetto ci permette di richiamare il metodo GET

    useEffect(() => {

        async function fetchData() {
            const response = await fetch('/api/tasks', {
                method: 'GET'
            })

            if (!response.ok) {
                console.log(`response error ${response.status}`)
            }

            const data = await response.json();
            setTasks(data);
        }
        fetchData()
    }, [])

    // utilizziamo un useEffect per richiamare il metoodo POST

    const handleSubmit = async (event: React.FormEvent) => {

        event.preventDefault();

        console.log('Form data being sent:', form);

        const response = await fetch('/api/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        })

        if (!response.ok) {
            const data = await response.json();
            setMessage({ text: `Errore: ${data.message}`, type: 'error' });  // Mostra il messaggio di errore
            return;
        }

        const data = await response.json();
        setMessage({ text: 'Task aggiunto con successo', type: 'success' });

        if (data.task) {
            setTasks([...tasks, data.task]);
        }

        setForm({ 
            title: '', 
            description: '', 
            dueDate: new Date().toISOString().slice(0, 10), 
            priority: 'low', 
            status: 'pending' 
        })
    }

    // funzione per la modifica del task

    const updateTask = async (id: number) => {

        //   const [name, surname] = editFullName.split(' ');

        if (!editForm) return;

        const response = await fetch('/api/tasks', {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(editForm)
        })

        if (!response.ok) {
            console.log(`response error ${response.status}`)
        }

        const data = await response.json();

        setTasks(tasks.map(task => task.id === id ? data.task : task));
        setMessage(data.message);
        setEditId(null);
        setEditForm(null);
    }

    // funzione per l'eliminazione del task

    const handleDelete = async (id: number) => {
        const response = await fetch('/api/tasks', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id }),
        });

        if (!response.ok) {
            console.log(`Error response ${response.status}`)
        }

        const data = await response.json();

        setTasks(tasks.filter(task => task.id !== id));
        setMessage(data.message);
    }

    return (
        <div className="w-full h-auto flex flex-col justify-center items-center p-6 bg-gray-900 text-white">

            <div className="w-full h-[1000px] flex flex-col justify-center items-center gap-10">

                <h1 className="text-4xl font-bold mb-6"> Metodi API REST per inserimento Task </h1>
                <h2 className="text-2xl mb-4"> Aggiungi un Task </h2>

                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-xl flex flex-col items-center space-y-4 p-6 gap-4 bg-gray-800 rounded shadow"
                >
                    <input
                        type="text"
                        placeholder="Titolo"
                        value={form.title}
                        onChange={(event) => setForm({ ...form, title: event.target.value })}
                        className="w-full flex-1 px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none"
                    />
                    <textarea
                        placeholder="Descrizione"
                        value={form.description}
                        onChange={(event) => setForm({ ...form, description: event.target.value })}
                        className="w-full p-2 rounded bg-gray-700"
                    />

                    <input
                        type="date"
                        value={form.dueDate}
                        onChange={(event) => setForm({ ...form, dueDate: event.target.value })}
                        className="w-full p-2 rounded bg-gray-700"
                    />

                    <select
                        value={form.priority}
                        onChange={(event) => setForm({ ...form, priority: event.target.value as Tasks["priority"] })}
                        className="w-full p-2 rounded bg-gray-700"
                    >
                        <option value="low">Bassa</option>
                        <option value="medium">Media</option>
                        <option value="high">Alta</option>
                    </select>

                    <select
                        value={form.status}
                        onChange={(event) => setForm({ ...form, status: event.target.value as Tasks["status"] })}
                        className="w-full p-2 rounded bg-gray-700"
                    >
                        <option value="pending">In sospeso</option>
                        <option value="in-progress">In corso</option>
                        <option value="completed">Completato</option>
                    </select>

                    <button type="submit" className="bg-blue-600 px-4 py-2 rounded">
                        Aggiungi Task
                    </button>
                </form>

                {message && (
                    <div className={`p-2 rounded mb-4 ${message.type === 'error' ? 'bg-red-600' : 'bg-green-600'} text-white`}>
                        {message.text}
                    </div>
                )}
            </div>

            <div className="w-auto h-auto flex flex-col justify-center items-center">
                <h1 className="text-2xl mb-4"> Lista dei Task </h1>
                <div className="w-auto h-auto flex flex-wrap">
                    <ul className="w-full max-w-xl space-y-4 mb-8">
                        {tasks.map((task) => {
                            if (!task || !task.id) return null;

                            return (
                                (
                                    <li key={task.id} className="flex flex-col justify-between items-center bg-gray-800 px-4 py-3 rounded shadow">
                                        {editId === task.id ? (
                                            <>
                                                <input
                                                    type="text"
                                                    className="w-full max-w-xl mr-2 px-2 py-1 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none"
                                                    value={editForm?.title || ''}
                                                    onChange={(event) => setEditForm({ ...editForm!, title: event.target.value })}
                                                    placeholder="Titolo"
                                                />
                                                <textarea
                                                    value={editForm?.description || ''}
                                                    onChange={(event) => setEditForm({ ...editForm!, description: event.target.value })}
                                                    className="w-full p-2 rounded bg-gray-700"
                                                    placeholder="Descrizione"
                                                />
                                                <input
                                                    type="date"
                                                    value={editForm?.dueDate || ''}
                                                    onChange={(event) => setEditForm({ ...editForm!, dueDate: event.target.value })}
                                                    className="w-full p-2 rounded bg-gray-700"
                                                />
                                                <select
                                                    value={editForm?.priority || 'low'}
                                                    onChange={(event) => setEditForm({ ...editForm!, priority: event.target.value as Tasks["priority"] })}
                                                    className="w-full p-2 rounded bg-gray-700"
                                                >
                                                    <option value="low">Bassa</option>
                                                    <option value="medium">Media</option>
                                                    <option value="high">Alta</option>
                                                </select>
                                                <select
                                                    value={editForm?.status || 'pending'}
                                                    onChange={(event) => setEditForm({ ...editForm!, status: event.target.value as Tasks["status"] })}
                                                    className="w-full p-2 rounded bg-gray-700"
                                                >
                                                    <option value="pending">In sospeso</option>
                                                    <option value="in-progress">In corso</option>
                                                    <option value="completed">Completato</option>
                                                </select>
                                                <button
                                                    onClick={() => updateTask(task.id)}
                                                    className="px-3 py-1 bg-green-600 hover:bg-green-500 text-white rounded mr-2"
                                                >
                                                    Salva
                                                </button>
                                                <button
                                                    onClick={() => setEditId(null)}
                                                    className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white rounded"
                                                >
                                                    Annulla
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <h3 className="text-xl font-semibold"> {task.title} </h3>
                                                <p> {task.description} </p>
                                                <p><strong>Scadenza:</strong> {task.dueDate} </p>
                                                <p><strong>Priorità:</strong> {task.priority} </p>
                                                <p><strong>Stato:</strong> {task.status} </p>
                                                <div className="mt-2 space-x-2">
                                                    <button onClick={() => handleDelete(task.id)} className="bg-red-600 px-4 py-1 rounded"> Elimina </button>
                                                    <button onClick={() => {
                                                        setEditId(task.id);
                                                        setEditForm(task);
                                                    }}
                                                        className="bg-yellow-600 px-4 py-1 rounded">
                                                        Modifica
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    </li>
                                )
                            )
                        })}
                    </ul>
                </div>
            </div>

        </div>
    )
}