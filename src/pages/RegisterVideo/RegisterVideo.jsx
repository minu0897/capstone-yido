import React, { useState } from 'react';
import axios from 'axios';

const RegisterVideo = () => {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState("");

    const handleFileChange = event => {
        setFile(event.target.files[0]);
    };

    const handleTitleChange = event => {
        setTitle(event.target.value);
    };

    const handleInputChange = event => {
        setTagInput(event.target.value);
    };

    const handleAddTag = () => {
        if (tagInput && !tags.includes(tagInput)) {
            setTags([...tags, tagInput]);
            setTagInput("");
        }
    };

    const handleSubmit = async event => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("video", file);
        formData.append("title", title);
        formData.append("videoTags", ['가','나','다']);
        // const jsonBlob = new Blob([JSON.stringify({ tags: tags })], {
        //     type: 'application/json'
        // });
        // formData.append("json", jsonBlob);

        // Axios 인스턴스를 사용하여 POST 요청


        try {
            const response = await axios.post('/api/video', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Server Response:', response.data);
        } catch (error) {
            console.error('Upload Error:', error);
        }
    };
    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input name ="video" type="file" onChange={handleFileChange} />
                <input name="title" type="text" value={title} onChange={handleTitleChange} placeholder="Enter title" />
                
                <input type="text" value={tagInput} onChange={handleInputChange} placeholder="Enter a tag" />
                {/* <button type="button" onClick={handleAddTag}>Add Tag</button>
                <ul>
                    {tags.map((tag, index) => (
                        <li key={index}>{tag}</li>
                    ))}
                </ul> */}
                <button type="submit">Upload</button>
            </form>
        </div>
    );
}

export default RegisterVideo;
