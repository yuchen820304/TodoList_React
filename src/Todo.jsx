import React, { useState, useEffect } from 'react';
import './Todo.css';

function Todo() {
  let [input, setInput] = useState('');
  let [insideInput, setInsideInput] = useState('');
  let [data, setData] = useState([]);

  // 用useEffect去操作DOM，讓todoBlock_input達成focus與blur效果
  useEffect(() => {
    let task_name = document.getElementsByClassName('task_name');
    for(let i =0; i < task_name.length; i++){
      task_name[i].addEventListener('focus',function(){
        console.log('aa')
        this.closest('div.todoBlock_input').classList.add('-on');
      })
      task_name[i].addEventListener('blur',function(){
        console.log('aa')
        this.closest('div.todoBlock_input').classList.remove('-on');
      })
    }
  });

  //新增待辦事項
  const join = () => {
    if(input){
      setData([...data,{id: input,key: Date.now(), show: false}]);
      setInput('');
    }
  }

  //清除所有待辦事項
  const clearAll = () => {
    setData('');
  }

  //刪除待辦事項
  const remove = (key) => {
    setData(data.filter((item) => {
      return item.key !== key;
    }))
  }

  //更新待辦事項，顯示輸入視窗
  const showInput = (key) => {
    const newData = [...data];//創造一個新陣列去接data展開的資料
    data.map((item,i) => {
      if(item.key === key){
        // 比對show的狀態，是false就改為true讓輸入框顯示
          switch (newData[i].show) {
            case false:
              newData[i].show = true;
              setData(newData);
              break;
            
            case true:
              if(insideInput === ''){//insideInput為空時不更新且關閉輸入框，避免待辦事項更新後是空值
                newData[i].show = false;
                setData(newData);
              }else{
                newData[i].id = insideInput;//輸入時insideInput會改變，按下update會將值給新陣列id達成更新
                setInsideInput('');
                newData[i].show = false;
                setData(newData);
              }
              break;
            
            default:
              break;
          }
      }
      return data;
    })
  }

  //待辦事項內容，data有資料時才渲染
  function show(){
    if(data.length !==0){
      return data.map((item,i) => {
        return(
          <li className='todoItem_list' key={data[i].key}>
            <span className="currentValue">{data[i].id}</span>
            <input className={item.show ? 'open insideValue' : 'insideValue'} type="text" onChange={(e) => setInsideInput(e.target.value)}/>
            <div className='btn'>
              <button className='update_btn task_btn' onClick={() => showInput(item.key)}>更新</button>
              <button className='delete_btn task_btn' onClick={() => remove(item.key)}>刪除</button>
            </div>
          </li>
        )
      })
    }
  }

  return (
    <div className='todoBlock'>
      <button className='task_clean' onClick={clearAll}>清除</button>
      <h1>待辦清單</h1>
      <div className='todoBlock_input'>
        <input className='task_name' type="text" placeholder='輸入待辦事項' onChange={(e) => setInput(e.target.value)} value={input}/>
        <button className='add_btn' onClick={join}>新增</button>
      </div>
      <ul className='todoItem'>
        {show()}
      </ul>
    </div>
  );
}

export default Todo;
