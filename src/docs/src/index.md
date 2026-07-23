# Anna Bookning docs

Här hamnar dokumentation.

## .env

Milöjövariabler lagras i filen `/.env`. Den ska inte pushas till repot. Det finns en exempelfil (`/.env.example`).

## Bulma

Färger med mera definieras i `/src/sass/main.scss`. Sedan måste bulma kompileras genom att köra `npm run build-bulma`. Då skapas `/webapp/public/css/main.css` (pushas inte).

## mkdocs

Mkdocs kräver en python-venv, till exempel installerad i `/.venv/`. Startas med `source .venv/bin/activate`.

Källfilerna finns i `/src/docs/src/`.

Efter redigering av `.md`-filer: I `/src/docs/`, kör `mkdocs serve` alternativt `mkdocs build`. 

## Starta servern

Med kommandot `npm start`.