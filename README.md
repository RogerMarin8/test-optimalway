# Test OptimalWay - Aplicació Gestor Usuaris

Aquesta aplicació inclou un **backend** desenvolupat amb Spring Boot i un **frontend** amb React. A continuació es detallen les instruccions per configurar i executar ambdós entorns.

## Requisits previs

### Programari necessari

- **Java 17 o superior** (per al backend)
- **Node.js** i **npm** (per al frontend)
- **Maven** (per gestionar les dependències del backend)
- **MySQL** (per la base de dades del backend)

## Estructura del projecte

El projecte està organitzat en dos directoris principals:


## Configuració del backend

### Instruccions per executar el backend

1. **Navega al directori del backend**:

    ```bash
    cd backend
    ```

2. **Construeix i instal·la el projecte amb Maven**:

    ```bash
    mvn clean install
    ```

3. **Executa l'aplicació Spring Boot**:

    ```bash
    mvn spring-boot:run
    ```

   Això aixecarà el servidor backend a l'adreça `http://localhost:8080`.

   Alternativament, pots executar manualment l'aplicació executant l'arxiu `TestOptimalwayApplication.java` des de l'IDE.

### Configuració de la base de dades

Per defecte, aquesta aplicació està configurada per treballar amb **MySQL**. Assegura't de tenir MySQL instal·lat i crea una base de dades amb el nom següent:

- Nom de la base de dades: `crud_user`
- Nom de la taula: `users`
- Columnes:
    - `id` (primary key, auto increment)
    - `name`
    - `surname`
    - `email`

També has d'actualitzar els paràmetres de connexió a la base de dades en el fitxer `application.properties` situat dins del directori `src/main/resources` del backend:


## Configuració del frontend

### Instruccions per executar el frontend

1. Navega fins al directori `frontend`:

    ```bash
    cd frontend
    ```

2. Instal·la les dependències necessàries:

    ```bash
    npm install
    ```

## Executar el frontend

Després d'instal·lar les dependències, pots iniciar el servidor de desenvolupament per veure l'aplicació en acció.

1. Executa l'aplicació:

    ```bash
    npm start
    ```
