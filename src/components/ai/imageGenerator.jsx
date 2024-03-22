import React, {useRef, useState, useEffect} from 'react';
import './imageGenerator.css';
import cat from '../../assets/cat.png'
import openai from 'openai';

const ImageGenerator = () => {
    // initalize url to slash
    const [image_url, setImageUrl] = useState('/');
    const [headerVisible, setHeaderVisible] = useState(false);

    let inputRef = useRef(null);

    useEffect(() => {
        // Set header to be visible after component mounts
        setHeaderVisible(true);
      }, []);

    const imageGenerator = async () => {
        if (inputRef.current.value === '') {
            return 0;
        }
        console.log(inputRef.current.value);
        // fetch image from api
        const response = await fetch('https://api.openai.com/v1/images/generations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer',
                    'User-Agent': 'Chrome',
                },
                body: JSON.stringify({
                    model: "dall-e-2",
                    prompt: inputRef.current.value,
                    n: 1,
                    size: "512x512",
                }),
            });
        if (!response.ok) {
            throw new Error('Failed to fetch image');
        }

        // console.log(response);        
        let data = await response.json();
        let data_array = data.data;
        // console.log(data_array[0].url);
        setImageUrl(data_array[0].url);
    }

    

    return (
        <div className="image-generator">
            
            <div className={`header ${headerVisible ? 'active' : ''}`}>AI Image Generator</div>
            <div className="img-loaded">
                 {/* if image_url is slash, display cat image, else display image_url */}
                <img src={image_url==="/"?cat:image_url} alt="" />
            </div>
    
            <div className="search-box">
                <input type="text" ref={inputRef} className='search-input' placeholder='Describe an image to generate'/>
                <button onClick={imageGenerator} className='search-btn'>Search</button>
            </div>
            <video autoPlay muted loop id="myVideo">
                <source src="assets/wallpaper.mp4" type="video/mp4"/>
            </video>
        </div>
    )
    }

export default ImageGenerator;
