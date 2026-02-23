const DB_NAME="beautylab";
const STORE="results";

function openDB(){

return new Promise((resolve,reject)=>{

const req=indexedDB.open(DB_NAME,1);

req.onupgradeneeded=()=>{

req.result.createObjectStore(STORE,{keyPath:"id"});

};

req.onsuccess=()=>resolve(req.result);

req.onerror=()=>reject();

});

}

async function saveResult(data){

const db=await openDB();

const tx=db.transaction(STORE,"readwrite");

tx.objectStore(STORE).put({

id:Date.now(),

data:data

});

}

async function getResults(){

const db=await openDB();

return new Promise((resolve)=>{

const tx=db.transaction(STORE,"readonly");

const req=tx.objectStore(STORE).getAll();

req.onsuccess=()=>resolve(req.result);

});

}
