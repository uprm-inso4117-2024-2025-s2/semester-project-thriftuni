// Utility functions that are used throughout the application


function formatCurrency(price: number) {
  return `$${price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`
} 





export { formatCurrency }