export default function formatDateTime(dateTime: string): string {
  const date = new Date(dateTime);
  const day = date.getDay() + 1;
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}
