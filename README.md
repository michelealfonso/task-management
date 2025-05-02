App di task managmment dove si sono utilizzate le seguenti tecnologie per il funzionamento:
NextJS per lo sviluppo fullstack con integrazione di chiamate API (per quanto riguarda la UI della creazione dei task)
Prisma per lo la creazione automatiche delle query SQL per la parte riguardante alla creazione e al login dell'utente
Supabase come DB bastato su postgreSQL.

Come comunicano NextJS e supabase? Tramite la stringa DATABASE_URL che passiamo direttamente in schema prisma alla voce url di datasurce db.
