export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const year = date.getFullYear();
  return `${month}-${day}-${year}`;
};
