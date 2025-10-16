// pages/dashboard.js
import api from '../services/api.js';
import { createTransactionForm } from '../components/TransactionForm.js';
import { createTransactionList } from '../components/TransactionList.js';
import { createSummary } from '../components/Summary.js';

/**
 * A tiny editing-state pub/sub so multiple modules share editing object
 */
function createEditingState(){
  let val = null;
  const subs = new Set();
  return {
    get: ()=> val,
    set: (v)=> { val = v; subs.forEach(cb=>cb()); },
    subscribe: (cb)=> { subs.add(cb); return ()=> subs.delete(cb); }
  };
}

const editingState = createEditingState();

async function loadTasks(){
  try {
    const res = await api.getTasks();
    if(res && res.data) return res.data;
    return [];
  } catch (err){
    console.error('Load tasks error', err);
    return [];
  }
}

async function deleteTaskHandler(id, reload) {
  if(!id) return alert('id ไม่ถูกต้อง');
  if(!confirm('ลบรายการใช่หรือไม่?')) return;
  try{
    await api.deleteTask(id);
    await reload();
  } catch (err){
    console.error(err);
    alert('ลบไม่สำเร็จ');
  }
}

export default (function init(){
  const app = document.getElementById('app');
  const container = document.createElement('div'); container.className='container';
  const header = document.createElement('div'); header.className='header';
  const h1 = document.createElement('h1'); h1.textContent = 'ระบบรายรับ-รายจ่าย (Vanilla)';
  header.appendChild(h1);
  container.appendChild(header);

  // area for main grid
  const grid = document.createElement('div'); grid.className = 'grid';

  // left column - form + list
  const left = document.createElement('div');
  // right column - summary
  const right = document.createElement('div');

  grid.appendChild(left); grid.appendChild(right);
  container.appendChild(grid);
  app.appendChild(container);

  // render loop
  async function render(){
    left.innerHTML = ''; right.innerHTML = '';

    // load tasks
    const tasks = await loadTasks();

    // create form
    const formCard = createTransactionForm(async ()=> {
      editingState.set(null);
      await render();
    }, editingState);
    left.appendChild(formCard);

    // create list
    const listCard = createTransactionList(tasks, (task)=>{
      editingState.set(task);
      // scroll to top so user sees form
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, async (id)=>{
      await deleteTaskHandler(id, render);
    });
    left.appendChild(listCard);

    // create summary
    const summaryCard = createSummary(tasks);
    right.appendChild(summaryCard);
  }

  // initial render
  render();

  // expose render to window for debugging (optional)
  window.__incomeExpenseReload = render;

  return { render };
})();
