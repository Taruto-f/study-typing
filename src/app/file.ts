'use client';

// https://zenn.dev/taksnr/articles/0f83ba3290706e
export default function saveTextToFile(text: string, filename: string) {
  const blob = new Blob([text], { type: 'text/plain' });
  const blobUrl = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = blobUrl;
  link.download = filename;
  link.click();
}
