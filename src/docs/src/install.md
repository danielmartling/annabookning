# Installation

## Databas

Postgres-17 eller nyare

### PostGIS

För geografiska funktioner.

[Postgis](https://postgis.net/documentation/getting_started/install_ubuntu/)

1. I `psql`, anslut till databasen `\connect db_name`.
2. Anslut postgis: `CREATE EXTENSION postgis;`.
3. Kontrollera att postgis är aktiverat: `SELECT postgis_full_version();`.


## Node

Kör `npm install`.