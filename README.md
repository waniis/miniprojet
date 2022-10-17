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
MONGO_ROOT_USERNAME= your local mongoDb root username (superadmin)
MONGO_ROOT_PASSWORD= your local mongoDb root password (superadmin)
DB_NAME= data base name (mini-project)
MONGO_EXPRESS_USERNAME= Only for development mode your mongo express username (superadmin)
MONGO_EXPRESS_PASSWORD= Only for development mode your mongo express password (superadmin)

```
hint 

```
To fix absolute path problem 
![image](https://user-images.githubusercontent.com/38427429/196209342-c4c29cf2-4c92-446e-94d3-75d25ce7d844.png)
 
if you have probleme with the docker's volume run 

docker-compose down -v --rmi all (only for development)
Mongo express :
localhost:8081
![image](https://user-images.githubusercontent.com/38427429/196170070-60d7790c-fdba-439e-8c3b-d1781b77caff.png)

