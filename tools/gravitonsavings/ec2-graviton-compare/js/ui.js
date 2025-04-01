export function renderComparison(data) {
  const container = document.getElementById('comparison-table');
  container.innerHTML = '';

  data.forEach(({ group, x86, graviton, savings }) => {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
      <h2>${group.toUpperCase()}</h2>
      <p><strong>x86:</strong> ${x86.type} - $${x86.price}/hr</p>
      <p><strong>Graviton:</strong> ${graviton.type} - $${graviton.price}/hr</p>
      <p class="savings">Savings: ${savings}%</p>
    `;
    container.appendChild(div);
  });
}

export function populateRegionFilter(regions) {
  const select = document.getElementById('region-filter');
  select.innerHTML = '<option value="all">All</option>' +
    regions.map(r => `<option value="${r}">${r}</option>`).join('');
}
