export const PostRequest = async (server_path, data, isFileUpload) => {
  const url = server_path;
  try {
    const options = {
      method: 'POST',
      headers: {}
    };

    if (isFileUpload) {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
      options.body = formData;
    } else {
      options.headers['Content-Type'] = 'application/json';
      options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const contentType = response.headers.get('Content-Type');
    const contentDisposition = response.headers.get('Content-Disposition');

    if (
      (contentType && contentType.startsWith('application/')) ||
      contentDisposition
    ) {
      const blob = await response.blob();
      return blob;
    }

    // Если не файл, возвращаем результат как JSON
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error in PostRequest:', error);
    throw error;
  }
};
