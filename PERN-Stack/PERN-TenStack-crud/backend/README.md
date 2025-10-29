# 🚀 PERN Stack Backend with Docker (PostgreSQL + PgAdmin + Node.js)

This project demonstrates a **production-style PERN Stack backend** setup using **Docker Compose** — featuring:
- 🐘 PostgreSQL as database  
- 🧠 PgAdmin for database management  
- ⚙️ Express (Node.js) backend connected to Postgres inside Docker network

---

## 📂 Project Structure

```
backend/
└── src/
    └── config/
        └── connectDB.js
    ├── controller
    ├── routes
    └── model
├── .env
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── index.js
├── package.json
└── package-lock.json
```



---

## 🧩 1. Setup `.env` File

Create a `.env` file in the **backend folder** with the following content:

```env
PORT=3000

PG_USER=admin
PG_PASSWORD=admin123
PG_DATABASE=tenstackdb
PG_HOST=postgres
PG_PORT=5432
```

## 🧰 2. Build and Run with Docker
#### ✅ Step 1 — Stop and clean any old containers:
```
docker-compose down -v
```

#### ✅ Step 2 — Build and start all containers:
```
docker-compose up --build -d
```


### This will: 

- Download the required `Docker images` (PostgreSQL, PgAdmin) if not already present

- Build your `Node.js` application image using the Dockerfile

- Install all Node.js `dependencies` from package.json during the build process

- Create and start `all three containers` (PostgreSQL DB, PgAdmin, Node.js backend)

- Run everything in detached mode (-d) in the background

- `Yes, this single command handles everything from downloading dependencies to running the complete stack ! [backend] 🚀`


## 🔍 3. Verify Everything is Running

Check running containers:
```
docker ps
```


#### You should see something like 👇:
```
CONTAINER ID   IMAGE                   STATUS         PORTS
abcd1234       postgres:latest         Up 2 minutes   0.0.0.0:5432->5432/tcp
efgh5678       dpage/pgadmin4:latest   Up 2 minutes   0.0.0.0:5050->80/tcp
ijkl9101       pern_backend            Up 2 minutes   0.0.0.0:3000->3000/tcp
```


## 🌐 4. Access the Applications
| Service | URL | Description |
|---------|-----|-------------|
| PgAdmin | http://localhost:5050 | Web UI to manage your PostgreSQL DB |
| Backend Server | http://localhost:3000 | Express API server |
    
    
## 🧩 5. Connect PgAdmin to PostgreSQL

After opening PgAdmin at http://localhost:5050:

1. Login with:

- Email: admin@admin.com
- Password: admin

2. Right-click on Servers → Create → Server

3. Under Connection Tab, enter:

- Host name/address: postgres
- Port: 5432
- Username: admin
- Password: admin123

4. Click Save ✅

Now your PgAdmin is connected to your Postgres container.
## 🧠 6. Common Commands
| Command | Description |
|---------|-------------|
| `docker-compose up -d` | Start all containers in background |
| `docker-compose down -v` | Stop and remove all containers + volumes |
| `docker logs pern_backend` | View backend server logs |
| `docker exec -it postgres_db psql -U admin -d tenstackdb` | Access PostgreSQL shell inside container |
| `docker ps` | List running containers |


# ✅ Summary

### After setup:

- Express API runs on → http://localhost:3000

- PgAdmin Dashboard on → http://localhost:5050

- Database Host (inside Docker) → postgres

Everything runs isolated yet connected inside Docker! 🐳🔥


# 🧮 CRUD API Summary

| HTTP Method | Endpoint | Controller | Description |
|-------------|----------|------------|-------------|
| GET | `/api/employees` | `getAllEmployees` | Fetch all employees |
| GET | `/api/employees/:id` | `getEmployeeById` | Fetch single employee |
| POST | `/api/employees` | `createEmployee` | Create new employee |
| PUT | `/api/employees/:id` | `updateEmployeeById` | Update employee |
| DELETE | `/api/employees/:id` | `deleteEmployeeById` | Delete employee |