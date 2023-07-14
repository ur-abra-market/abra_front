export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  const formattedDate = date.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  });

  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });

  return `${formattedDate} ${formattedTime}`;
};
