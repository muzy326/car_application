export function getStatusBadge(status?: string): string {
  switch (status) {
    case 'Confirmed':
      return 'bg-success';
    case 'Cancelled':
      return 'bg-danger';
    default:
      return 'bg-warning text-dark';
  }
}