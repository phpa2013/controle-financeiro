export function updateMoney( transactions ){
 
  
   const cashInflow = transactions.filter( el => el.type === "income")
  .reduce( (acc,atual) => acc+atual.amount,0 );
  
  const moneyOut = transactions.filter( el => el.type === "expense")
  .reduce( (acc,atual) => acc + atual.amount,0 );

  const allMoney = cashInflow - moneyOut;

  return(
    {
      cashInflow,
      moneyOut,
      allMoney
    }
  )

}