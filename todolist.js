let input = document.getElementById("input");
let btn = document.querySelector("button");
let task = document.getElementById("task");
let All = document.getElementById("All");
let done = document.getElementById("DONE");
var list = []

if (window.localStorage.getItem("LIST")) {
    list = JSON.parse(window.localStorage.getItem("LIST"));
}

btn.addEventListener("click",(e)=>{
    e.preventDefault()
    if(input.value !== ""){
        prepareList(input.value)
    }else{
        e.preventDefault()
    }
    input.value = ""
})

const prepareList = (todo) => { 
    let Id = Date.now().toString();
    let arryData = { id:Id, value: todo , done:false };
    list.push(arryData);
    addToList(arryData);
    AddToLocalstorege(list)
};

const addToList = (arryData)=>{

    let id = arryData.id;
    let value = arryData.value;

    let div = document.createElement("div");    
    div.id = id;
    div.className = "taskContent"

    let p = document.createElement("p");  
    p.textContent = value  
    if(arryData.done === true){
        p.className = "done"
    }

    div.appendChild(p)

    let divParent = document.createElement("div");  
    divParent.appendChild(div)
    divParent.className = "divParent"

    let btn_group = document.createElement("div"); 
    btn_group.className= "btn-group"   

    let Delete = document.createElement("button");  
    btn_group.appendChild(Delete)
    Delete.textContent = "Delete"
    Delete.className = "Delete"

    let Done = document.createElement("button");  
    btn_group.appendChild(Done)
    Done.textContent = "Done"
    Done.className = "Done"

    div.appendChild(btn_group)

    task.appendChild(divParent)

    Delete.addEventListener("click",(e)=>{
        let id = e.target.parentElement.parentElement.id
        RemoveFromList(id)
        e.target.parentElement.parentElement.remove()
    })
    Done.addEventListener("click",(e)=>{
        e.target.parentElement.parentElement.firstChild.className="done";
        list.map(ele=>{
            if(ele.id === e.target.parentElement.parentElement.id){
                ele.done = true
            }
        })
        console.log(list)
        AddToLocalstorege(list)
    })
}

function AddToLocalstorege(list){
    window.localStorage.setItem("LIST", JSON.stringify(list));
}

// 
function ListAtferLoad(){
    var LIST = JSON.parse(window.localStorage.getItem("LIST"));
    LIST.map(ele=>{
        addToList(ele)
    })
}

function RemoveFromList(id){
    list = list.filter((ele)=> ele.id != id )
    AddToLocalstorege(list)
}

done.addEventListener("click",()=>{
    task.innerHTML = ""
    var List = JSON.parse(window.localStorage.getItem("LIST"));
    List = List.filter((ele)=> ele.done === true)

    List.map(ele=>{
        addToList(ele)
    })
})

All.addEventListener("click",()=>{
    task.innerHTML=""
    ListAtferLoad()
})