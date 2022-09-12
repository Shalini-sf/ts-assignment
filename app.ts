
const data = [
    {
        id: "A1",
        firstName: "John",
        lastName: "Dean",
        role: "Superadmin",
        contact: "1111111112",
        email: "jdean@gmail.com",
        dob:"25/02/1990"

    },
    {
        id:"A2",
        firstName: "Jack",
        lastName: "Samuel",
        role: "Admin",
        contact: "2222222221",
        email: "jsam@gmail.com",
        dob:"26/03/1991"
    },
    {
        id:"A3",
        firstName: "Ishita",
        lastName: "verma",
        role: "Subscriber",
        contact: "1111111113",
        email: "iverma@gmail.com",
        dob:"28/10/1989"
    }
]


const HEADERS = ['id', 'firstName', 'lastName', 'role', 'contact', 'email', 'dob'];



const createCell = (element:string, text:string, rowIndex?:string, id?: string) => {
    let cell = document.createElement(element);
    let textNode = document.createTextNode(text);
    if (rowIndex && id) {
        cell.id = `${id}_${rowIndex}`
    }
    cell.appendChild(textNode);
    return cell;
}

const createBtn = (prefix:string, rowIndex:string, text:string, onClickMethod:  any) => {
    const btn = document.createElement('button') as HTMLButtonElement;
    btn.id = `${prefix}_${rowIndex}`;
    btn.innerHTML = text;
    btn.onclick = onClickMethod
    return btn;
}

function deleteBtnOnClick(rowIndex:string) {
    const row = document.getElementById(rowIndex) as HTMLTableRowElement;
    row!.remove();
    const indexi=parseInt(rowIndex.split('_')[1]);
    const id= data[indexi].id;
    m.deleteData(id);

    
}

function saveOrCancelBtnOnClick(rowIndex:string, isCancel:boolean) {
    const row = document.getElementById(rowIndex) as HTMLTableRowElement;
    row.contentEditable = 'false';
    

    if (isCancel) {

        const index  = parseInt(rowIndex.split('_')[1]) ;
        let finalIndex=data[index].id;
        let i= m.getById(finalIndex);
        const initialData = data[i];
        type ObjectKey = keyof typeof initialData;
        HEADERS.forEach(header => {
            const cell = document.getElementById(`${header}_${rowIndex}`) as HTMLTableCellElement;
            console.log(`${initialData[header as ObjectKey]} --> ${cell.innerHTML}`);
            cell.innerHTML = initialData[header as ObjectKey] as string;
        });
    }
    const editBtn = document.getElementById(`edit_${rowIndex}`)as HTMLButtonElement;
    const deleteBtn = document.getElementById(`delete_${rowIndex}`)as HTMLButtonElement;
    editBtn.innerHTML = 'Edit';
    editBtn.onclick = () => {
        editBtnOnClick(rowIndex)
    }
    deleteBtn.innerHTML = 'Delete';
    deleteBtn.onclick = () => {
        deleteBtnOnClick(rowIndex)
    }
}

function editBtnOnClick(rowIndex:string) {
    const row = document.getElementById(rowIndex)as HTMLTableRowElement;
    row.contentEditable = 'true';
    const editBtn = document.getElementById(`edit_${rowIndex}`)as HTMLButtonElement ;
    const deleteBtn = document.getElementById(`delete_${rowIndex}`) as HTMLButtonElement;
    editBtn.innerHTML = 'Save';
    editBtn.onclick = () => {
        saveOrCancelBtnOnClick(rowIndex, false)
    }
    deleteBtn.innerHTML = 'Cancel';
    deleteBtn.onclick = () => {
        saveOrCancelBtnOnClick(rowIndex, true)
    }
}
function newDeleteBtnOnClick(newRowIndex:string) {
    const row = document.getElementById(newRowIndex) as HTMLTableRowElement;
    row.remove();
    
}

const createNewCell = (element:string,text:string,newRowIndex:string,id:string) => {

    let newCell = document.createElement(element);
    let textNode = document.createTextNode(text);
    if (newRowIndex && id) {
        newCell.id = `${id}_${newRowIndex}`
    }
    newCell.appendChild(textNode);
    return newCell;
}
const createNewBtn = (prefix:string, newRowIndex:string, text:string, onClickMethod: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null) => {
    const newBtn = document.createElement('button');
    if(newRowIndex && prefix){
        newBtn.id = `${prefix}_${newRowIndex}`;
    }
    newBtn.innerHTML = text;
    newBtn.onclick = onClickMethod
    return newBtn;
}

function newEditBtnOnClick(newRowIndex:string) {
    const newRow = document.getElementById(newRowIndex) as HTMLTableRowElement;
    newRow.contentEditable = 'true';

    
    const newEditBtn = document.getElementById(`edit_${newRowIndex}`)as HTMLButtonElement;
    const newDeleteBtn = document.getElementById(`delete_${newRowIndex}`)as HTMLButtonElement;
    newEditBtn.innerHTML = 'Save';
    newEditBtn.onclick = () => {
        newSaveOrCancelBtnOnClick(newRowIndex, false)
    }
    newDeleteBtn.innerHTML = 'Cancel';
    newDeleteBtn.onclick = () => {
        newSaveOrCancelBtnOnClick(newRowIndex, true)
    }
}


var index=0;
const newData =
   [{"id": " undefined", firstName: "undefined ", lastName: "undefined ", role: "undefined ", contact: " undefined" , email: " undefined" , "dob" :" undefined"}]

function addBtnOnClick(){


    
    newData.forEach(newData => {

        const newRow= document.createElement('tr');
        const newRowIndex= `newRow_${index}`;
        newRow.id= newRowIndex;
        index++;
    

    const tableById=document.getElementById('tableId')as HTMLTableElement;
    tableById.appendChild(newRow);
    document.body.appendChild(tableById);

    Object.entries(newData).forEach(value => {

     newRow.appendChild(createNewCell('td',value[1] as string,newRowIndex, value[0]));

    })
    const editCell= document.createElement('td');
        editCell.appendChild(createNewBtn('edit', newRowIndex, 'Edit', () => {
            newEditBtnOnClick(newRowIndex)
        }))
        newRow.appendChild(editCell);

    const deleteCell = document.createElement('td');
        deleteCell.appendChild(createNewBtn('delete', newRowIndex, 'Delete', () => {
            newDeleteBtnOnClick(newRowIndex)
        }))
        newRow.appendChild(deleteCell);

    })

}

function newSaveOrCancelBtnOnClick(newRowIndex:string, isCancel:boolean) {
    const row = document.getElementById(newRowIndex) as HTMLTableRowElement;
    row.contentEditable = 'false';

    if (isCancel) {
    
        const initialData = newData;
        type ObjectKey = keyof typeof initialData;
        HEADERS.forEach((header )=> {
            const cell = document.getElementById(`${header}_${newRowIndex}`) as HTMLTableCellElement;
    
            cell.innerHTML = initialData[header as ObjectKey] as unknown as string ;
        });
       
    }
    const newEditBtn = document.getElementById(`edit_${newRowIndex}`) as HTMLButtonElement;
    const newDeleteBtn = document.getElementById(`delete_${newRowIndex}`) as HTMLButtonElement;
    newEditBtn.innerHTML = 'Edit';
    newEditBtn.onclick = () => {
        newEditBtnOnClick(newRowIndex);
    };
    newDeleteBtn.innerHTML = 'Delete';
    newDeleteBtn.onclick = () => {
        newDeleteBtnOnClick(newRowIndex);
    };
}
function refreshBtnOnClick(){

    const removeTable=document.getElementById('tableId') as HTMLTableElement;
    removeTable.remove();
    m.loadData(data);
    loadBtnOnClick();

    
}

function loadBtnOnClick() {
    
    const table = document.createElement("table");
    table.id= 'tableId';

    // Create Header Row
    const headerRow = document.createElement("tr");
    HEADERS.forEach(header => {
        headerRow.appendChild(createCell('th', header));
    })
    table.appendChild(headerRow);
    // Process Data
    data.forEach((data, index) => {
        const rowIndex: string = `row_${index}`;
        const row = document.createElement('tr');
        row.id = rowIndex;

        Object.entries(data).forEach(value => {
            row.appendChild(createCell('td', value[1] as string, rowIndex, value[0]));
        })



        const firstCell = document.createElement('td');
        firstCell.appendChild(createBtn('edit', rowIndex, 'Edit', () => {
            editBtnOnClick(rowIndex)
        }))
        row.appendChild(firstCell);

        const secondCell = document.createElement('td');
        secondCell.appendChild(createBtn('delete', rowIndex, 'Delete', () => {
            deleteBtnOnClick(rowIndex)
        }))
        row.appendChild(secondCell);

        table.appendChild(row);
    })

    document.body.appendChild(table);
}
function loadTable(){

    const loadButton= document.getElementById('loadBtn') as HTMLButtonElement;
    loadButton.remove();
    
    const RefreshBtn = document.createElement('button');
    RefreshBtn.innerHTML= 'Refresh';
    RefreshBtn.addEventListener('click', refreshBtnOnClick);
    document.body.appendChild(RefreshBtn);

    const addBtn=document.createElement('button');
    addBtn.innerHTML= 'AddRow';
    addBtn.addEventListener('click', addBtnOnClick);
    document.body.appendChild(addBtn);

    loadBtnOnClick();
}



const loadBtn = document.getElementById("loadBtn");
if (loadBtn) {
    loadBtn.addEventListener("click", loadTable);
}


class ModifyData <T extends Entity> {

    item: T[];

    constructor ( 
        private readonly _createClass: {new (item:{[key:string]: unString}):T},
        jdata:{ [key:string]:unString}[]
    )
    {
        this.item= [];
        this.loadData(jdata);
    }

    loadData(jdata:{[key:string]: unString}[]){
       this.item=[];
      jdata.forEach((elem) => {
        let user= new this. _createClass(elem);
        this.item.push(user);
     })
    }


    createData(newUser:T){

    this.item.push(newUser);
  }

  getById(newId:string){
    return this.item.findIndex((elem:T)=>{
      return elem.id===newId;
    })
  }

  updateData(updatedUser:T,id:string){
    let i= this.getById(id);
    delete this.item[i]
    this.item[i] = updatedUser;
  }

  deleteData(id:string){
    let i = this .getById(id);
    this.item.splice(i,1)
  }

  readData(){
    return this.item;
  }
}


 type unString = string|null|undefined;

 interface Entity{

    id:unString;
}


function DateFormat(){
    return function (target:any,propertyName:string)
    {
        let finalValue:string;
        const getter= function(){
            return finalValue;
        }

        const setter= function(value:string){
            finalValue= value.slice(0,2) +
            "-" + value.slice(3,5) +
            "-"  + value.slice(6,value.length)
        }
        Object.defineProperty(target, propertyName, {
            get: getter,
            set: setter,
    })
}
}

enum Roles{
    superadmin="Superadmin",
    admin="Admin", 
    subscriber="Subscriber",
};

    class User implements Entity {
     @DateFormat()

    dob:unString;
    id:unString;
    firstName: unString;
    lastName: unString;
    role: unString;
    contact: unString;
    email: unString;

    constructor(dataValue:{[key:string]:unString}) {


        this.dob= 
        dataValue["dob"] == undefined ? null : dataValue["dob"];

        this.id= 
        dataValue["id"] == undefined ? null : dataValue["id"];

        this.firstName= 
        dataValue["firstName"] == undefined ? null : dataValue["firstName"];

        this.lastName= 
        dataValue["lastName"]== undefined ? null : dataValue["lastName"];

        this.contact= 
        dataValue["contact"]== undefined ? null : dataValue["contact"];

        this.email= 
        dataValue["email"]== undefined ? null : dataValue["email"];

        if(dataValue["role"]==undefined){
            this.role=null;
        }
            else {
           
             if(dataValue["role"]== 'Superadmin')
            
                this.role= Roles.superadmin;

             else if(dataValue["role"]=="Admin")
                    this.role= Roles.admin;
            
            else if(dataValue["role"]== "Subscriber")
                        this.role= Roles.subscriber;

             
        }
    }
    }


let m = new ModifyData<User>(User,data);
let n = new ModifyData<User>(User ,newData);



