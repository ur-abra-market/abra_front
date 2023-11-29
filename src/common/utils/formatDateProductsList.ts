export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  const formattedDate = date.toLocaleDateString();

  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    hour12: true,
    minute: 'numeric',
  });

  return `${formattedDate} ${formattedTime}`;
};
