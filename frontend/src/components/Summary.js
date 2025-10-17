// components/Summary.js
import api from '../services/api.js';

function formatNumber(num, decimals = 2) {
  if (num === null || num === undefined || isNaN(num)) {
    return '0.00';
  }
  const number = Number(num);
  const fixed = number.toFixed(decimals);
  const parts = fixed.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
}

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
        incomeDiv.textContent = `รวมรายรับ: ${formatNumber(s.totalIncome)}`;
        expenseDiv.textContent = `รวมรายจ่าย: ${formatNumber(s.totalExpense)}`;
        balanceDiv.textContent = `คงเหลือ: ${formatNumber(s.balance)}`;
      } else {
        incomeDiv.textContent = 'รวมรายรับ: 0.00';
        expenseDiv.textContent = 'รวมรายจ่าย: 0.00';
        balanceDiv.textContent = 'คงเหลือ: 0.00';
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
