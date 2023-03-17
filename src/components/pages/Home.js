import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
function Home() {
  const { register, handleSubmit } = useForm();
  // Tasks (ToDo List) State
  const [toDo, setToDo] = useState([]);
// console.log('list is :',toDo)
  // Temp State
  // const [inpudata, setinpudata] = useState('');
  const [toggleSubmit, settoggleSubmit] = useState(true);
  const [updateData, setUpdateData] = useState(null);
  const Delete=(id)=>{
let data=toDo.filter((item)=>item.id !== id);
setToDo(data)
  }
const Edit=(id)=>{
// let newEdititem=toDo.find((ele)=>{
//   return ele.id ===id
// })
settoggleSubmit(false)
setUpdateData(id)

}
  return (
    <div className="container">
      <h1 className="text-center text-green-900">TODO LIST</h1>
      <form   onSubmit={handleSubmit((data) => {
            if(!data){
             alert('please fill data ')
            }else if( data && !toggleSubmit){
              setToDo(
                toDo.map((ele)=>{
if(ele.id === updateData){
return {...ele,title:data.text}
}
return ele;
                })
              )
              settoggleSubmit(true)
            }else{
              let num = toDo.length + 1; 
              let newEntry = { id: num, title: data.text, status: false }
              setToDo([...toDo, newEntry])
            }
          })}
          className=" flex py-5">
        <input
          type="text"
          {...register('text', { required: true })}
          id="text"
          className="py-2 w-full ps-3 outline-none "
          style={{ border: '2px solid gray' }}
          placeholder="Enter  task Here"
        />
        {
          toggleSubmit ?  <input
          type="submit"
          value="ADD"
          className="px-5 bg-green-900 text-white"
        />:
        <input
        type="submit"
        value="EDIT"
        className="px-5 bg-green-900 text-white"
      />
        }
       
      </form>
      <ol type="1">
        {
          toDo.map((item)=>{
return (
  <>
<li
                className="w-full px-2 py-2 flex justify-between mb-2"
                style={{ border: '2px solid gray' }}
              >   
              {item.title}
              <div className="icon">
              <i className="fa fa-refresh me-2 text-green-800 cursor-pointer" aria-hidden="true" onClick={()=>Edit(item.id)}></i>
                <i
                  className="fas fa-trash cursor-pointer text-green-800   "
                  onClick={()=>Delete(item.id)}
                ></i>
               </div>
              </li>
  </>
)
          })
        }
                    
      </ol>

    </div>
  );
}

export default Home;
