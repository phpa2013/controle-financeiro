export function saveData( list ){
  localStorage.setItem("arr", JSON.stringify(list));
} 

export function recoveryData() {
  return JSON.parse(localStorage.getItem("arr")) || [];
}