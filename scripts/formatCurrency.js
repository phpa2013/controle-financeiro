export function formatCurrency( num ){
  return num.toLocaleString("pt-BR",{
    style:"currency",
    currency:"BRL"
  })
}