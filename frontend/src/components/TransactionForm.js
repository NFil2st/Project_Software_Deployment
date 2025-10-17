// components/TransactionForm.js
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

/**
 * createTransactionForm(onSaved, editingState)
 * - onSaved(): called when saved (so caller reloads)
 * - editingState: object { get: ()=>currentEditingObj, set: (obj)=>... } to share editing between modules
 */
export function createTransactionForm(onSaved, editingState) {
  const card = document.createElement('div');
  card.className = 'card';

  const title = document.createElement('h3');
  title.textContent = 'เพิ่ม / แก้ไขรายการ';
  card.appendChild(title);

  const form = document.createElement('form');

  function row(labelText, inputEl) {
    const r = document.createElement('div'); r.className = 'form-row';
    const l = document.createElement('label'); l.textContent = labelText;
    r.appendChild(l); r.appendChild(inputEl);
    return r;
  }

  const inputTitle = document.createElement('input'); inputTitle.type = 'text'; inputTitle.name = 'title'; inputTitle.required = true;
  const inputDesc = document.createElement('input'); inputDesc.type = 'text'; inputDesc.name = 'description';
  const inputAmount = document.createElement('input'); inputAmount.type = 'number'; inputAmount.name = 'amount'; inputAmount.required = true; inputAmount.step='0.01';
  const selectCurrency = document.createElement('select'); selectCurrency.name = 'currency';
  ['THB','USD','EUR'].forEach(c => { const o = document.createElement('option'); o.value=c; o.text=c; selectCurrency.appendChild(o); });
  const selectType = document.createElement('select'); selectType.name='type';
  [['expense','Expense'], ['income','Income']].forEach(([v,t])=>{ const o=document.createElement('option'); o.value=v; o.text=t; selectType.appendChild(o); });
  const inputCategory = document.createElement('input'); inputCategory.type='text'; inputCategory.name='category';

  form.appendChild(row('ชื่อ', inputTitle));
  form.appendChild(row('คำอธิบาย', inputDesc));
  form.appendChild(row('จำนวน', inputAmount));
  form.appendChild(row('สกุล', selectCurrency));
  form.appendChild(row('ประเภท', selectType));
  form.appendChild(row('หมวด', inputCategory));

  const btnRow = document.createElement('div'); btnRow.style.marginTop = '10px';
  const saveBtn = document.createElement('button'); saveBtn.type='submit'; saveBtn.textContent = 'บันทึก';
  const convertBtn = document.createElement('button'); convertBtn.type='button'; convertBtn.className='secondary'; convertBtn.textContent='Convert Currency';
  btnRow.appendChild(saveBtn); btnRow.appendChild(convertBtn);
  form.appendChild(btnRow);

  // fill form from object
  function setForm(obj){
    if(!obj){ inputTitle.value=''; inputDesc.value=''; inputAmount.value=''; selectCurrency.value='THB'; selectType.value='expense'; inputCategory.value=''; return; }
    inputTitle.value = obj.title || '';
    inputDesc.value = obj.description || '';
    inputAmount.value = obj.amount != null ? obj.amount : '';
    selectCurrency.value = obj.currency || 'THB';
    selectType.value = obj.type || 'expense';
    inputCategory.value = obj.category || '';
  }

  // submit handler
  form.addEventListener('submit', async (ev)=>{
    ev.preventDefault();
    const body = {
      title: inputTitle.value.trim(),
      description: inputDesc.value.trim(),
      amount: Number(inputAmount.value) || 0,
      currency: selectCurrency.value,
      type: selectType.value,
      category: inputCategory.value.trim(),
      createdAt: new Date().toISOString()
    };
    try {
      const editing = editingState.get();
      if(editing && editing._id){
        await api.updateTask(editing._id, body);
        editingState.set(null);
      } else {
        await api.createTask(body);
      }
      setForm(null);
      onSaved();
    } catch (err){
      console.error(err);
      alert('บันทึกผิดพลาด');
    }
  });

  // convert handler
  convertBtn.addEventListener('click', async ()=>{
    // convert between THB <-> USD for demo (toggle)
    const from = selectCurrency.value || 'THB';
    const to = from === 'THB' ? 'USD' : 'THB';
    const amount = Number(inputAmount.value);
    if(!amount){ return alert('กรุณาระบุจำนวนเพื่อแปลง'); }
    try {
      const taskData = { amount, currency: from, title: inputTitle.value || 'temp' };
      const res = await api.convertCurrency(from, to, taskData);
      if(res && res.data){
        // update fields
        inputAmount.value = res.data.amount;
        selectCurrency.value = res.data.currency;
        alert(`แปลงสำเร็จ: ${formatNumber(res.data.originalAmount)} ${res.data.originalCurrency} → ${formatNumber(res.data.amount)} ${res.data.currency}`);
      } else {
        alert(res.message || 'แปลงไม่สำเร็จ');
      }
    } catch (err){
      console.error(err);
      alert('เกิดข้อผิดพลาดการแปลงสกุลเงิน');
    }
  });

  // ability to react to editing state change
  function onEditingChanged() {
    const e = editingState.get();
    setForm(e);
    if(e){
      title.textContent = 'กำลังแก้ไขรายการ';
      saveBtn.textContent = 'อัปเดต';
    } else {
      title.textContent = 'เพิ่ม / แก้ไขรายการ';
      saveBtn.textContent = 'บันทึก';
    }
  }

  // expose update hook
  editingState.subscribe(onEditingChanged);

  card.appendChild(form);
  return card;
}
