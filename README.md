# To build a simple fitness app.


This example demonstrates fitness app
- create user account with admin roles  Mutaion name **addUser**
- login as admin with mutation  **login(email:"",password)** get jwt token
- 
- create class using mutation **addClass**  with filed 
- 
```
 addClass(
    class: "Mega class"        name of the class
    batchStartTime: "11:00"    batch start time
    batchEndTime: "11:00"     batch end time
    trainer: ["11111"]           trainer Ids , we can get trainer name from user 
    memeber: ["111113"]           member Ids , we can get member name we can say client
  )
```
- update class using mutation **updateClass**  with filed 
- Query  **getList** query get classes list names
- Query  **getUserList**  query get user list
- delete user **deleteClass**

## postman collection added in repo
import postman json in postman

## Run locally

create copy of .env file
cp env_example .env

To run the tests locally:

```shell
npm
npm install
```

To run the tests locally:

```shell
npm
npm test
```

To run the server locally:

```shell
npm start
```
