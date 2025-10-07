const promise1= new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve("promise resolved")
    },2000)
});
promise1.then((data)=>{
    console.log(data)
})
const promise2=new Promise((resolve,reject)=>{
    setTimeout(()=>{
        reject('promise rejected')
    },3000);
})
promise2
.then((data)=>{
    console.log(data);
})
.catch((err)=>{
    console.log(err);
});
const asyncfunction1= async()=>{
    const res= await promise1;
    console.log(res);
};
asyncfunction1();