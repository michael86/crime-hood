export default function formatDateTime(dateTime: string): string {
  console.log("datetime", dateTime);
  const date = new Date(dateTime);
  const day = date.getDay() + 1;
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hour = date.getHours();
  const mins = date.getMinutes();

  return `${day}/${month}/${year} - ${hour}:${mins < 10 && "0"}${mins}`;
}
