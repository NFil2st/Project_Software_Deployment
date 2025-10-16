// components/TransactionList.js
export function createTransactionList(tasks = [], onEdit, onDelete) {
  const card = document.createElement('div');
  card.className = 'card';

  const h = document.createElement('h3'); h.textContent = 'รายการทั้งหมด';
  card.appendChild(h);

  if(!tasks || tasks.length === 0){
    const empty = document.createElement('div'); empty.className='empty'; empty.textContent = 'ยังไม่มีรายการ';
    card.appendChild(empty);
    return card;
  }

  const table = document.createElement('table'); table.className = 'table';
  const thead = document.createElement('thead');
  thead.innerHTML = `<tr><th>ชื่อ</th><th>จำนวน</th><th>สกุล</th><th>ประเภท</th><th>หมวด</th><th>วันที่</th><th>จัดการ</th></tr>`;
  table.appendChild(thead);

  const tbody = document.createElement('tbody');
  tasks.forEach(t => {
    const tr = document.createElement('tr');
    const id = t._id || t.id || '';
    const created = t.createdAt ? new Date(t.createdAt).toLocaleString() : '';
    tr.innerHTML = `
      <td>${escapeHtml(t.title || '')}</td>
      <td>${(t.amount != null) ? t.amount : ''}</td>
      <td>${t.currency || 'THB'}</td>
      <td>${t.type || ''}</td>
      <td>${escapeHtml(t.category || '')}</td>
      <td class="small">${created}</td>
      <td class="actions"></td>
    `;
    const actionsTd = tr.querySelector('.actions');
    const editBtn = document.createElement('button'); editBtn.textContent='แก้ไข'; editBtn.addEventListener('click', ()=> onEdit(t));
    const delBtn = document.createElement('button'); delBtn.textContent='ลบ'; delBtn.className='secondary'; delBtn.addEventListener('click', ()=> onDelete(id));
    actionsTd.appendChild(editBtn); actionsTd.appendChild(delBtn);

    tbody.appendChild(tr);
  });

  table.appendChild(tbody);
  card.appendChild(table);
  return card;
}

function escapeHtml(s){
  return String(s).replace(/[&<>"']/g, (m) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[m]);
}
