export function formatPrice(price: number) {
  return new Intl.NumberFormat('rw-RW', {
    style: 'currency',
    currency: 'RWF',
  }).format(price)
}
