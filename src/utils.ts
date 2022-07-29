

export const successMessage = async (message,data) => {
  return {
    status: {
      code: 1000,
      header: "SUCCESS",
      description: message
    },
    data:data
  }
 
};
export const getListData = async (message,data) => {
  return {
    status: {
      code: 1000,
      header: "SUCCESS",
      description: message
    },
    classData:data
  }
 
};
export const errorMessage = async (message,data) => {
  return {
    status: {
      code: 9999,
      header: "Bad request",
      description: message
    },
    data:null,
  }
 
};
export const updateRecord = async (fitness,args,accounts) => {
  let record=false
  for (var i in fitness) {
    if (fitness[i].id == args.id) {
      let flag = false
      for (let j of args.trainer) {
        let obj = accounts.find(function (element) {
          return element.id == j;
        });
        if (!obj) {
          flag = true
        }
      }
      for (let k of args.memeber) {
        let obj = accounts.find(function (element) {
          return element.id == k;
        });
        if (!obj) {
          flag = true
        }
      }

      if (flag) {
        record = true
        break
      }
      fitness[i].class = args.class;
      fitness[i].batchStartTime = args.batchStartTime;
      fitness[i].batchEndTime = args.batchEndTime;
      fitness[i].trainer = args.trainer;
      fitness[i].memeber = args.memeber;
      break; //Stop this loop, we found it!
    }
  }
 return record
};

export const getRecord = async (fitness,args,accounts) => {
  for (var i in fitness) {
  
    let trainerList = [];
    let memeberList = [];
    /**
     * get trainer name
     */
    for (let j of fitness[i].trainer) {
      let obj = accounts.find(function (element) {
        return element.id == j;
      });
      if (obj) {
        trainerList.push({ trainer_name: obj.name })
      }
    }

    /**
     * get member name
     */
    for (let j of fitness[i].memeber) {
      let obj = accounts.find(function (element) {
        return element.id == j;
      });
      if (obj) {
        memeberList.push({ memeber_name: obj.name })
      }
    }
    fitness[i].trainerList = trainerList
    fitness[i].memeberList = memeberList
  }

  return fitness;
};
