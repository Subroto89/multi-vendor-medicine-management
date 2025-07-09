import axios from "axios";

export const imageUpload = async(imageFile) => {
    const imageFormData = new FormData();
    imageFormData.append("image", imageFile);

    try{
        const {data} = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`, imageFormData);
        return data?.data?.display_url;
    }catch(error){
        console.error("Image upload failed:", error);
        // throw new Error("Image upload failed");
    }

}
