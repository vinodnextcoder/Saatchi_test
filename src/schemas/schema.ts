import {  gql } from 'apollo-server';

export  const typeDefs = gql`

  type Query {
    hello(name: String): String
  }
  type Query {
    getList:classList
  }
  type Query {
    getUserList(type:String):List
  }
  type List {
    status: Status
    data:[userDetail]
  }
  type userDetail{
    id: String
   name:String
   email:String,
   roles:[String]
  }
  type userData {
    status: Status
  }
 type trainee {
  trainer_name:String
 }
 type memb {
  memeber_name:String
 }
  type classList {
    status: Status
    classData:[Class]
  }
  type Class {
    id: String
    class: String
    batchStatus: String
    size:String
    batchStartTime: String
    batchEndTime: String
    trainerList: [trainee]
    memeberList: [memb]
  }

type Status {
  code :Int 
  header: String
  description : String
  moreInfo :String
}

  type Mutation {
    addUser( email: String name: String phone:String,password:String roles:[String] permissions:[String]): userData
  }

  type Mutation {
    login( email: String name: String password:String): loginResponse
  }
  type loginResponse {
    status:Status
    data:data
  }

  type data {
    token: String
  }

  type addClassResponse {
    status: Status
  }

  type Mutation {
    addClass(class: String batchStartTime: String batchEndTime:String
      trainer:[String] memeber:[String]
      ): addClassResponse
  }

  type Mutation {
    updateClass(id: String class: String batchStartTime: String batchEndTime:String
      trainer:[String] memeber:[String]
      ): addClassResponse
  }

  type Mutation {
    deleteClass(id: String 
      ): addClassResponse
  }
    
`;
