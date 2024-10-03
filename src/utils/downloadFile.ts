export const downloadFile = (src: string) => {
  const link = document.createElement('a');
  const fileName = src.split('/').pop() || 'audio-file.mp3';
  link.href = src;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
