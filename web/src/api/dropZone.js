import axios from "axios";

function handleDrop(files) {
  // Push all the axios request promise into a single array
  const uploaders = files.map(file => {
    // Initial FormData
    const formData = new FormData();
    formData.append("file", file);
    formData.append("tags", `codeinfuse, medium, gist`);
    formData.append("upload_preset", "drfrsbsl"); // Replace the preset name with your own
    formData.append("api_key", "921677816388229"); // Replace API key with your own Cloudinary key
    formData.append("timestamp", (Date.now() / 1000) | 0);

    // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
    return axios
      .post(
        "https://api.cloudinary.com/v1_1/dbbim9cy0/image/upload",
        formData,
        {
          headers: { "X-Requested-With": "XMLHttpRequest" }
        }
      )
      .then(response => {
        const data = response.data;
        const fileURL = data.secure_url; // You should store this URL for future references in your app
        this.setState(prevState => {
          const images = prevState.images;
          images.push(fileURL);
          return images;
        });
      });
  });

  // Once all the files are uploaded
  axios.all(uploaders).then(() => {
    // ... perform after upload is successful operation
  });
}

export default handleDrop;
