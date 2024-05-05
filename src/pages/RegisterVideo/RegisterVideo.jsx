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

    const handleInputChange = (event) => {
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

        try {
            const response = await axios.post('http://101.235.73.77:8080/api/video', formData, {
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
            <input type="file" onChange={handleFileChange} />
            <input type="text" value={title} onChange={handleTitleChange} placeholder="Enter title" />
            <input type="text" value={tagInput} onChange={handleInputChange} placeholder="Enter a tag" />
            <button type="button" onClick={handleAddTag}>Add Tag</button>
                <ul>
                    {tags.map((tag, index) => (
                        <li key={index}>{tag}</li>
                    ))}
                </ul>
            <button type="submit">Upload</button>
        </form>
        </div>
    )
}

export default RegisterVideo;