export function addTransaction(inputTitleValue, inputAmountValue, action, transactions){
  return [
    ...transactions,{
     id:crypto.randomUUID(),
     title: inputTitleValue,
     amount: inputAmountValue,
     type: action
      }
  ] 
}

