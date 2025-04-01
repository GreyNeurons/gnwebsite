import { initDB, seedData, getAllInstances } from './db.js';
import { compareInstances } from './compare.js';
import { renderComparison, populateRegionFilter } from './ui.js';
import { filterInstances, getAvailableRegions } from './filters.js';

const DATA_URL = '../data/instance-data.json';

let allInstances = [];

async function loadData() {
  const db = await initDB();
  const existing = await getAllInstances(db);
  if (existing.length === 0) {
    const res = await fetch(DATA_URL);
    const json = await res.json();
    await seedData(db, json);
    allInstances = json;
  } else {
    allInstances = existing;
  }
}

function updateUI() {
  const region = document.getElementById('region-filter').value;
  const size = document.getElementById('size-filter').value;
  const filtered = filterInstances(allInstances, region, size);
  const comparisons = compareInstances(filtered);
  renderComparison(comparisons);
}

async function init() {
  await loadData();
  populateRegionFilter(getAvailableRegions(allInstances));
  updateUI();

  document.getElementById('region-filter').addEventListener('change', updateUI);
  document.getElementById('size-filter').addEventListener('change', updateUI);
}

init();
