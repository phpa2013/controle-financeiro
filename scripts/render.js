import { formatCurrency } from "./formatCurrency.js";

export function render(container , list){
  container.textContent = "";

  const fragment = document.createDocumentFragment();

  list.forEach(element => {
    const li = document.createElement("li");
    li.dataset.id = element.id;

    if(element.type === "income"){
      li.classList.add("income")
    }else if(element.type === "expense"){
      li.classList.add("expense")
    }    
    const title = document.createElement("span");
    title.textContent = element.title;

    const amount = document.createElement("span");
    amount.textContent = formatCurrency(element.amount);

    const btn = document.createElement("button");
    btn.dataset.action = "delete";
    btn.className = "delete"
    btn.textContent = "🗑️"

    li.append(title, amount, btn);

    fragment.appendChild(li);

  });

  container.appendChild(fragment);

}