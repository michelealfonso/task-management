import { NextRequest, NextResponse } from "next/server";
// creiamo un array fatto di due utenti

// export interface IUsers {
//   id: number;
//   name: string;
//   surname: string;
//   // task: Task[];
// }

export interface Tasks {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  priority: "low" | "medium" | "high";
  status: "pending" | "in-progress" | "completed";
}

const tasks: Tasks[] = []; // inizialmente l'array è vuoto e viene popolato (da sostituire con JSON o DB)

// metodo per il recupero di tutti gli utenti

export async function GET() {
  return NextResponse.json(tasks);
}

// metodo per aggiungere un nuovo utente

export async function POST(request: NextRequest) {
  try {
    // Leggere il corpo della richiesta
    const newTask: Omit<Tasks, "id"> = await request.json();
    const { title, description, dueDate, priority, status } = newTask;

    // Assicurarsi che i dati siano validi
    if (!title || !description || !dueDate || !priority || !status) {
      return NextResponse.json(
        { message: "Tutti i campi sono obbligatori" },
        { status: 400 }
      );
    }

    // Aggiungere il nuovo utente all'array
    const task: Tasks = { id: tasks.length + 1, ...newTask };
    tasks.push(task);

    // Restituire una risposta di successo
    return NextResponse.json(
      { message: "Task aggiunto con successo", task },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Errore durante l'aggiunta del task" },
      { status: 500 }
    );
  }
}

// creazione di un metodo per la modifica dell'utente

export async function PUT(request: NextRequest) {
  const updateTask: Tasks = await request.json();

  // trova l'indice dell'utente da modificare

  const index = tasks.findIndex((task) => task.id === updateTask.id);

  if (index === -1) {
    return NextResponse.json({ message: `Task non trovato` }, { status: 404 });
  }

  tasks[index] = updateTask;

  return NextResponse.json(
    { message: `Utente aggiornato con successo`, task: tasks[index] },
    { status: 200 }
  );
}

// creazione di un metodo per l'elimiazione dell'utente

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();

    const index = tasks.findIndex((task) => task.id === id);

    if (index === -1) {
      return NextResponse.json(
        { message: `Task non trovato` },
        { status: 404 }
      );
    }

    tasks.splice(index, 1);
    return NextResponse.json({ message: `Task con id ${id} eliminato` });
  } catch (error) {
    return NextResponse.json(
      { message: `Errore durante l'eliminazione del task` },
      { status: 500 }
    );
  }
}
