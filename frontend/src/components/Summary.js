// components/Summary.js
import api from '../services/api.js';

export function createSummary(tasks = []) {
  const card = document.createElement('div');
  card.className = 'card';
  const h = document.createElement('h3'); h.textContent='สรุป';
  card.appendChild(h);

  const incomeDiv = document.createElement('div'); incomeDiv.className='small';
  const expenseDiv = document.createElement('div'); expenseDiv.className='small';
  const balanceDiv = document.createElement('div'); balanceDiv.className='small';

  card.appendChild(incomeDiv); card.appendChild(expenseDiv); card.appendChild(balanceDiv);

  async function refresh() {
    try {
      // backend expects array of transactions (we pass tasks)
      const res = await api.sumTransactions(tasks || []);
      if(res && res.data){
        const s = res.data;
        incomeDiv.textContent = `รวมรายรับ: ${s.totalIncome}`;
        expenseDiv.textContent = `รวมรายจ่าย: ${s.totalExpense}`;
        balanceDiv.textContent = `คงเหลือ: ${s.balance}`;
      } else {
        incomeDiv.textContent = 'รวมรายรับ: 0';
        expenseDiv.textContent = 'รวมรายจ่าย: 0';
        balanceDiv.textContent = 'คงเหลือ: 0';
      }
    } catch (err){
      console.error(err);
      incomeDiv.textContent = 'รวมรายรับ: -';
      expenseDiv.textContent = 'รวมรายจ่าย: -';
      balanceDiv.textContent = 'คงเหลือ: -';
    }
  }

  // expose update method
  card.update = (newTasks)=>{ tasks = newTasks; refresh(); };

  // initial refresh
  refresh();
  return card;
}
