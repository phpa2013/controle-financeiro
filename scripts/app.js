import { addTransaction } from "./addTransaction.js";
import { updateMoney } from "./updateMoney.js";
import { render } from "./render.js";
import { saveData, recoveryData } from "./saveRecovery.js";
import { formatCurrency } from "./formatCurrency.js";

//const e lets
const inputTitle = document.querySelector(".inputTitle"); //descrição
const inputAmount = document.querySelector(".inputAmount"); //valor
const inputType = document.querySelector(".inputType") // entrada ou saída
let action = inputType.value;
const btnAdd = document.querySelector(".btnAdd"); // botão de Adiconar
// resumo
const totalIncome = document.querySelector(".totalIncome") //SPAN entradas
const totalExpense = document.querySelector(".totalExpense"); // SPAN saídas
const balance = document.querySelector(".balance"); // SPAN com saldo
//filtros
const filters = document.querySelector(".filters") // DIV pai com os radios
//lista 
const list = document.querySelector(".list")

//states
let transactions = [];


//eventos
btnAdd.addEventListener("click", ()=> {
  const inputTitleValue = inputTitle.value.trim(); 
  if(!inputTitleValue) return;

  const inputAmountValue = Number(inputAmount.value.trim());
  if(Number.isNaN(inputAmountValue) ||inputAmountValue <= 0 ) return

  action = inputType.value
  if(!action) return;

  transactions = addTransaction(inputTitleValue, inputAmountValue, action, transactions )
  saveData(transactions);

  const result = updateMoney(transactions,action)

  totalIncome.textContent =  formatCurrency(result.cashInflow);
  totalExpense.textContent =  formatCurrency(result.moneyOut);
  balance.textContent =  formatCurrency(result.allMoney);  

  render(list, transactions); 

  inputTitle.value = "";
  inputAmount.value = "";
  inputTitle.focus();
})

//DOM
window.addEventListener("DOMContentLoaded", ()=> {
  transactions = recoveryData();
  render(list, transactions);

  const result = updateMoney(transactions)

  totalIncome.textContent = formatCurrency(result.cashInflow);
  totalExpense.textContent = formatCurrency(result.moneyOut);
  balance.textContent = formatCurrency(result.allMoney);
})

//evento na lista
list.addEventListener("click", (e)=> {
  const btn = e.target.closest("button");
  if(!btn) return;

  const li = btn.closest("li");
  if(!li) return;

  const id = li.dataset.id;

  const index = transactions.findIndex( el => el.id === id);

  if(index > -1){
    transactions.splice( index , 1 );
    saveData(transactions);    
    const result = updateMoney(transactions);
    totalIncome.textContent = formatCurrency(result.cashInflow);
    totalExpense.textContent = formatCurrency(result.moneyOut);
    balance.textContent = formatCurrency(result.allMoney);
    render(list, transactions);
  }
})

//input radios
filters.addEventListener("change" , (event)=> {
  const input = event.target.closest("input[type='radio']:checked")
  if(!input) return

  let result = null

  const action = input.value;

  console.log(action)
  if(action === "income"){
    result = transactions.filter( el => el.type === "income");
    render(list, result);
  }
  else if(action === "expense"){
    result = transactions.filter(el => el.type === "expense");
    render(list, result);
  }else if ( action === "all"){
    render(list, transactions);
  } 
})