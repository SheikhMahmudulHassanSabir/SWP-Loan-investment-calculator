/* ─── calculator.js ──────────────────────────────── */

let chart = null;

/* ── Format as Indian Rupee ── */
function formatCurrency(amount) {
  return '₹' + Math.abs(amount).toLocaleString('en-IN', { maximumFractionDigits: 0 });
}

/* ── Sync sliders ↔ number inputs ── */
function initSliders() {
  const ids = ['loanAmount', 'loanRate', 'investmentRate', 'period'];
  ids.forEach(id => {
    const input  = document.getElementById(id);
    const slider = document.getElementById(id + 'Slider');
    const badge  = document.getElementById(id + 'Val');
    if (!input || !slider) return;

    function sync(src, dst) {
      dst.value = src.value;
      if (badge) badge.textContent = formatBadge(id, src.value);
    }

    input.addEventListener('input',  () => sync(input, slider));
    slider.addEventListener('input', () => sync(slider, input));

    /* init badge */
    if (badge) badge.textContent = formatBadge(id, input.value);
  });
}

function formatBadge(id, val) {
  if (id === 'loanAmount') return '₹' + Number(val).toLocaleString('en-IN');
  if (id === 'period')      return val + ' yr';
  return val + '%';
}

/* ── EMI formula ── */
function calcEMI(P, annualRate, months) {
  const r = annualRate / (12 * 100);
  if (r === 0) return P / months;
  return P * r * Math.pow(1 + r, months) / (Math.pow(1 + r, months) - 1);
}

/* ── Main calculate ── */
function calculate() {
  const loanAmount     = parseFloat(document.getElementById('loanAmount').value);
  const loanRate       = parseFloat(document.getElementById('loanRate').value);
  const investmentRate = parseFloat(document.getElementById('investmentRate').value);
  const period         = parseFloat(document.getElementById('period').value);

  if (!loanAmount || !loanRate || !investmentRate || !period) {
    alert('Please fill in all fields.');
    return;
  }

  const months             = period * 12;
  const monthlyInvestRate  = investmentRate / (12 * 100);
  const emi                = calcEMI(loanAmount, loanRate, months);
  const totalPaid          = emi * months;

  let corpus = loanAmount;
  const labels     = [];
  const chartData  = [];
  const tableRows  = [];

  for (let m = 1; m <= months; m++) {
    const startVal      = corpus;
    const interestEarned = corpus * monthlyInvestRate;
    corpus += interestEarned - emi;
    if (corpus < 0) corpus = 0;

    labels.push('Mo ' + m);
    chartData.push(corpus);

    if (m <= 12 || m % 12 === 0 || m === months) {
      tableRows.push({ month: m, startVal, interestEarned, emi, endVal: corpus });
    }
  }

  const profitLoss = corpus - (totalPaid - loanAmount);

  /* Update tiles */
  document.getElementById('emiResult').textContent       = formatCurrency(emi);
  document.getElementById('totalPaidResult').textContent = formatCurrency(totalPaid);
  document.getElementById('corpusResult').textContent    = formatCurrency(corpus);
  document.getElementById('profitLossResult').textContent = (profitLoss >= 0 ? '+' : '−') + formatCurrency(profitLoss);

  const plCard = document.getElementById('profitLossCard');
  plCard.className = 'result-tile ' + (profitLoss >= 0 ? 'profit' : 'loss');

  /* Warning */
  const warn = document.getElementById('warningBox');
  if (investmentRate < loanRate) {
    warn.classList.add('show', 'danger');
    warn.classList.remove('warning');
  } else {
    warn.classList.remove('show', 'danger');
  }

  /* Break-even */
  const bebox = document.getElementById('breakEvenBox');
  document.getElementById('breakEvenText').innerHTML =
    `To break even, your investment return must be at least <strong>${loanRate.toFixed(2)}%</strong>`;
  bebox.classList.add('show');

  /* Show results */
  document.getElementById('emptyState').classList.add('hidden');
  document.getElementById('resultsContainer').classList.remove('hidden');

  updateChart(labels, chartData, loanAmount);
  updateTable(tableRows);
}

/* ── Chart ── */
function updateChart(labels, data, principal) {
  const ctx = document.getElementById('investmentChart').getContext('2d');
  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Portfolio Value',
          data,
          borderColor: '#000000',
          backgroundColor: 'rgba(0, 0, 0, 0.08)',
          borderWidth: 2.5,
          fill: true,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 6,
          pointHoverBackgroundColor: '#000000'
        },
        {
          label: 'Principal',
          data: Array(data.length).fill(principal),
          borderColor: 'rgba(0, 0, 0, 0.2)',
          borderWidth: 1.5,
          borderDash: [6, 4],
          fill: false,
          tension: 0,
          pointRadius: 0
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { intersect: false, mode: 'index' },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#000000',
          titleColor: '#ffffff',
          bodyColor: 'rgba(255, 255, 255, 0.7)',
          padding: 12,
          callbacks: {
            label: ctx => ctx.dataset.label + ': ' + formatCurrency(ctx.parsed.y)
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { maxTicksLimit: 8, color: '#7a7469', font: { size: 11 } },
          border: { display: false }
        },
        y: {
          beginAtZero: false,
          grid: { color: 'rgba(13,13,13,0.06)' },
          ticks: {
            color: '#7a7469',
            font: { size: 11 },
            callback: v => '₹' + (v / 100000).toFixed(1) + 'L'
          },
          border: { display: false }
        }
      }
    }
  });
}

/* ── Table ── */
function updateTable(rows) {
  const tbody = document.getElementById('detailsTableBody');
  tbody.innerHTML = '';
  rows.forEach(r => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${r.month}</td>
      <td>${formatCurrency(r.startVal)}</td>
      <td class="pos">+${formatCurrency(r.interestEarned)}</td>
      <td class="neg">−${formatCurrency(r.emi)}</td>
      <td><strong>${formatCurrency(r.endVal)}</strong></td>
    `;
    tbody.appendChild(tr);
  });
}

/* ── Tab switching ── */
function showTab(tab, btn) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById(tab + 'Tab').classList.add('active');
}

/* ── Init ── */
document.addEventListener('DOMContentLoaded', () => {
  initSliders();
  calculate();
});
