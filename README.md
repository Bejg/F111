# Blog
Prosty blog napisany w Node.js z Expressem dla backendu i React dla frontendu.

## Wymagania
- Node.js >= 18
- Docker

## Uruchomienie lokalne

### 1. Baza danych
Aplikacja wymaga bazy danych MongoDB (port 27017). Możesz ją uruchomić za pomocą Dockera.

### 2. Instalacja i uruchomienie aplikacji
1.  Sklonuj repozytorium (jeśli jeszcze tego nie zrobiłeś):
    ```bash
    git clone https://github.com/bejq/ProjektBlog.git
    cd ProjektBlog
    ```
2.  (Opcjonalnie) Uruchom bazę danych w dockerze:
    ```bash
    docker-compose up -d
    ```
3.  Zainstaluj zależności backendu i frontendu oraz zbuduj statyczną strone React:
    ```bash
    npm install
    ```
3.  Uruchom serwer backendu:
    ```bash
    npm start
    ```
Aplikacja będzie dostępna pod adresem `http://localhost:3000`.

## Licencja
MIT — patrz plik LICENSE.