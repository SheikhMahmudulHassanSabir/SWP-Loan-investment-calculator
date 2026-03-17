# LoanCalc — Loan-Funded Investment Calculator

![LoanCalc Overview](index.html) <!-- Replace with an actual screenshot or banner if available -->

**LoanCalc** is a financial projection tool designed to simulate the strategy of taking a loan to fund an investment, and subsequently using a Systematic Withdrawal Plan (SWP) to repay the monthly Equated Monthly Installment (EMI). 

This interactive web application provides clear, real-time projections to help users evaluate whether the potential investment returns outweigh the borrowing costs, including net profit/loss, break-even analysis, and detailed month-by-month breakdowns.

## 🚀 Features

- 📊 **EMI Calculator**: Computes exact monthly EMIs using the standard amortization formula based on your loan amount, interest rate, and tenure.
- 🔄 **SWP Simulation**: Models investment growth while automatically deducting EMI payments each month via SWP.
- ⚖️ **Break-Even Analysis**: Instantly calculates the minimum investment return rate needed to break even against the cost of the loan.
- ⚠️ **Risk Warnings**: Automatically alerts you if your projected investment return falls below the loan interest rate, protecting against potential losses.
- 📈 **Net Profit / Loss**: Provides a clear final verdict on the extra wealth created (or lost) by investing borrowed money.
- 🗓️ **Month-by-Month Table**: A detailed breakdown showing starting corpus, interest earned, EMI deducted, and ending value for every single month.
- 📉 **Interactive Charts**: Visaulize your investment trajectory over time using integrated Chart.js graphs.

## 🛠️ Technology Stack

This project is built using foundational web technologies with no heavy build steps required:
- **HTML5** for semantic structure
- **CSS3** (Vanilla CSS) for styling, layout grids, and animations
- **JavaScript (ES6+)** for all calculation logic, state management, and DOM manipulation
- **[Chart.js](https://www.chartjs.org/)** for rendering interactive financial trajectory charts

## 📂 Project Structure

```text
├── css/
│   ├── style.css         # Global styles and design system variables
│   ├── home.css          # Specific styles for the landing page
│   └── calculator.css    # Specific styles for the calculator interface
├── js/
│   ├── shared.js         # Common functions (e.g., navigation menu toggle)
│   └── calculator.js     # Core algorithmic logic for EMI/SWP and Chart.js rendering
├── index.html            # Landing page highlighting features and value proposition
├── calculator.html       # The main interactive calculator application
├── how-it-works.html     # Detailed explanation of the loan-funded SWP strategy
└── about.html            # Information about the tool context and disclaimers
```

## 💻 Running Locally

Running LoanCalc locally is incredibly straightforward as it consists entirely of static files.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/loancalc.git
   cd loancalc
   ```

2. **Open the application:**
   Simply double-click on `index.html` to open it in your default web browser, or serve it using a local development server for a better experience:

   *Using Python 3:*
   ```bash
   python -m http.server 8000
   ```
   Then navigate to `http://localhost:8000` in your browser.

   *Using Node.js / NPX:*
   ```bash
   npx serve .
   ```

## ⚠️ Disclaimer

**For Educational Purposes Only. Not Financial Advice.**
LoanCalc is a simulation tool designed to help illustrate the mathematical concepts of loans, investments, and systematic withdrawals. Unforeseen market conditions, actual tax implications, processing fees, and fluctuations in variable interest rates are not factored into these basic calculations. Always consult with a certified financial advisor before making actual financial decisions or using leverage (borrowed money) to invest.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details. (Include a LICENSE file in your repository).
