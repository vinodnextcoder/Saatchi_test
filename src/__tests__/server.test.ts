// we import a function that we wrote to create a new instance of Apollo Server
import { createApolloServer } from '../server';

// we will use supertest to test our server
import request from 'supertest';

// this is the query we use for our test
const queryData = {
  query: `query sayHello($name: String) {
    hello(name: $name)
  }`,
  variables: { name: 'world' },
};

describe('e2e demo', () => {
  let server, url;
  let token=null;

  // before the tests we will spin up a new Apollo Server
  beforeAll(async () => {
    // Note we must wrap our object destructuring in parentheses because we already declared these variables
    // We pass in the port as 0 to let the server pick its own ephemeral port for testing
    ({ server, url } = await createApolloServer({ port: 0 }));
  });

  // after the tests we will stop our server
  afterAll(async () => {
    await server?.close();
  });

  it('says hello', async () => {
    // send our request to the url of the test server
    const response = await request(url).post('/').send(queryData);
    expect(response.errors).toBeUndefined();
    expect(response.body.data?.hello).toBe('Hello world!');
  });

  it('user creation', async () => {
    // send our request to the url of the test server
    const queryData1 = {
      query: `
      mutation {
        addUser(email: "suervey@testss.com", name:"vinod", phone: "999999999",password:"123456"
              roles: ["admin"],
            permissions: ["read:own_account"]){
          status {
            code
            header
            description
          }
        }
      }
      
      `
    };
    let response = await request(url).post('/').send(queryData1);
    expect(response.body.data.addUser.status.code).toBe(1000);
  });

  it('user login', async () => {
    // send our request to the url of the test server
    const queryData2 = {
      query: `
    mutation {
      login(email: "vinod@email.com", password:"123456"){
      status{
        code
        header
        description
      }
        data{
          token
        }
      }
    } `
    };
    let response = await request(url).post('/').send(queryData2);
    token = response.body.data.login.data.token
    expect(response.body.data.login.status.code).toBe(1000);
  });

  it('should create class ', async () => {
    const queryData2 = {
      query: `
      mutation {
        addClass(
          class: "test333"
          batchStartTime: "11:00"
          batchEndTime: "11:00"
          trainer: ["11111"]
          memeber: ["111113"]
        ) {
          status{
            code
            header
            description
          }
          
        }
      }
      `
    };
    let response = await request(url).post('/').send(queryData2).set({ Authorization: "Bearer "+token });

    expect(response.body.data.addClass.status.code).toBe(1000);
  });

  it('should update class', async () => {
    
    const queryData2 = {
      query: `
      mutation {
        updateClass(
          id:"1"
          class: "test333"
          batchStartTime: "11:00"
          batchEndTime: "11:00"
          trainer: ["11111"]
          memeber: ["11114"]
        ) {
          status{
            code
            header
            description
          }
          
        }
      }
      
      `
    };
    let response = await request(url).post('/').send(queryData2).set({ authorization: "Bearer "+token  });;
    expect(response.body.data.updateClass.status.code).toBe(1000);
  });
  it('should get class list', async () => {
    
    const queryData2 = {
      query: `
      query {
        getList {
          status {
            code
            header
            description
          }
          classData{
            class
            batchStatus
            batchStartTime
            batchEndTime
            trainerList{
              trainer_name
            }
            memeberList{
              memeber_name
            }
            size
          }
        
        }
      }
      
      
      `
    };
    let response = await request(url).post('/').send(queryData2).set({ authorization: "Bearer "+token  });;
    expect(response.body.data.getList.status.code).toBe(1000);
  });

  it('should get user list', async () => {
    
    const queryData2 = {
      query: `
      query{
        getUserList(type:"subscriber"){
          status{
            code
            description
            header
          }
          data{
            id
            name
            email
            roles
          }
        }
      }
      
      
      `
    };
    let response = await request(url).post('/').send(queryData2).set({ authorization: "Bearer "+token  });;
    expect(response.body.data.getUserList.status.code).toBe(1000);
  });
});
