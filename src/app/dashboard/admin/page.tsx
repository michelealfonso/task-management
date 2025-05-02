
import TaskUI from "@/components/ui/taskUI";
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"

export default function Page() {
        return (
            <>
                {/* <h2 className="absolute top-[20px] z-10 text-red-500"> {session?.user.username} </h2> */}
                <TaskUI />
                {/* <div className="min-h-screen w-full bg-gray-900 text-white flex flex-col justify-center items-center py-10 px-4">
      <h1 className="text-4xl font-bold mb-6">Metodi API REST</h1>
      <h2 className="text-2xl mb-4">Lista degli utenti</h2>

      <ul className="w-full max-w-xl space-y-4 mb-8">
          {users.map(({ id, name, surname }: IUsers) => (
              <li key={id} className="flex justify-between items-center bg-gray-800 px-4 py-3 rounded shadow">
                  {editId === id ? (
                      <>
                          <input
                              type="text"
                              className="flex-1 mr-2 px-2 py-1 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none"
                              value={editFullName}
                              onChange={(e) => setEditFullName(e.target.value)}
                          />
                          <button
                              onClick={() => updateUser(id)}
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
                          <span className="flex-1">{name} {surname}</span>
                          <button
                              onClick={() => handleDelete(id)}
                              className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white rounded mr-2"
                          >
                              Elimina
                          </button>
                          <button
                              onClick={() => {
                                  setEditId(id);
                                  setEditFullName(`${name} ${surname}`);
                              }}
                              className="px-3 py-1 bg-yellow-600 hover:bg-yellow-500 text-white rounded"
                          >
                              Modifica
                          </button>
                      </>
                  )}
              </li>
          ))}
      </ul>

      <h2 className="text-2xl mb-4">Aggiungi un utente</h2>

      <form
          onSubmit={handleSubmit}
          className="w-full max-w-xl flex items-center gap-4 mb-6"
      >
          <input
              type="text"
              placeholder="Nome e Cognome"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              className="flex-1 px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none"
          />
          <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded"
          >
              Aggiungi
          </button>
      </form>

      {message && (
          <p className="text-green-400 text-sm">{message}</p>
      )}
     </div> */}
            </>
        )

}