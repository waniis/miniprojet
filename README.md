## Run the Application

```
cd miniprojet
cd backend
Copy .env.example to .env:
run the command: make build
navigate to localhost:8080
```

If you prefer not using Make files

```
cd miniprojet
cd backend
Copy .env.example to .env:
run the command: docker-compose up --build --remove-orphans
navigate to localhost:8080

```
.env.example Docs 

```
PORT= Port number (5000)
NODE_ENV= development / production (development)
MONGO_ROOT_USERNAME= your local mongoDb root username (user)
MONGO_ROOT_PASSWORD= your local mongoDb root password (123)
DB_NAME= data base name (mini-project)
MONGO_EXPRESS_USERNAME= Only for development mode your mongo express username (admin)
MONGO_EXPRESS_PASSWORD= Only for development mode your mongo express password (admin)