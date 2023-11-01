import { useEffect, useId, useState } from 'react'
import { useLazyGetImageQuery } from '../services/imageGen';
import { copy, linkIcon, loader, tick } from '../assets';
import { getImageFromBase64 } from '../utils/convertImage';
import { getImageHash } from '../services/getImageHash';

const ImageGen = () => {
    const imageID = useId();
    const [imageData, setImageData] = useState({
        prompt: "",
        hash: "",
        image: ""
    });

    const [imageFile, setImageFile] = useState(null);
    const [allImages, setAllImages] = useState([]);
    const [copied, setCopied] = useState("");

    const [getImage] = useLazyGetImageQuery();
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        const imagePromptsFromLocalStorage = JSON.parse(
            localStorage.getItem("images")
        );

        if (imagePromptsFromLocalStorage) {
            setAllImages(imagePromptsFromLocalStorage);
        }

    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setIsError(false);

        const existingImage = allImages.find((item) => item.prompt === imageData.prompt);
        if (existingImage) return setImageData(existingImage);

        const fetchedImage = async () => {
            const data = await getImageHash(imageData.prompt, imageID);
            const response = data.hash;

            if (response) {
                setImageData({ ...imageData, hash: response })

                setTimeout(async () => {
                    const imageDetail = await getImage({ imageHash: response });

                    if (imageDetail?.data.image) {
                        const url = getImageFromBase64(imageDetail.data.image);

                        setIsLoading(false);
                        setImageFile(url);

                        const newImage = { prompt: imageData.prompt, hash: response, image: url };
                        const updatedAllImages = [newImage, ...allImages];

                        setImageData(newImage);
                        setAllImages(updatedAllImages);

                        localStorage.setItem('images', JSON.stringify(updatedAllImages));
                    }
                    else {
                        setIsError(true);
                    }
                }, 8000);
            }
            else {
                setIsError(false);
            }
        }
        fetchedImage();
    }

    const handleCopy = (copyPrompt) => {
        setCopied(copyPrompt);
        navigator.clipboard.writeText(copyPrompt);
        setTimeout(() => setCopied(false), 3000);
    };

    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            handleSubmit(e);
        }
    };

    return (
        <>
            <h1 className='head_text'>
                Generate Images using <br className='max-md:hidden' />
                <span className='orange_gradient '>OpenAI GPT-4</span>
            </h1>
            <h2 className='desc'>
            Elevate your visuals with AIProKit, an AI-powered open-source image generator that turns your prompts into stunning graphics.
            </h2>
            <section className='mt-16 w-full max-w-xl'>
                {/* Search */}
                <div className='flex flex-col w-full gap-2'>
                    <form
                        className='relative flex justify-center items-center'
                        onSubmit={handleSubmit}
                    >
                        <img
                            src={linkIcon}
                            alt='link-icon'
                            className='absolute left-0 my-2 ml-3 w-5'
                        />

                        <input
                            type='text'
                            placeholder='Enter the prompt'
                            value={imageData.prompt}
                            onChange={(e) => setImageData({ ...imageData, prompt: e.target.value })}
                            onKeyDown={handleKeyDown}
                            required
                            className='url_input peer'
                        />
                        <button
                            type='submit'
                            className='submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700 '
                        >
                            <p>↵</p>
                        </button>
                    </form>

                    {/* Browse History */}
                    <div className='flex flex-col gap-1 max-h-60 overflow-y-auto'>
                        {allImages.reverse().map((item, index) => (
                            <div
                                key={`link-${index}`}
                                onClick={() => setImageData(item)}
                                className='link_card'
                            >
                                <div className='copy_btn' onClick={() => handleCopy(item.prompt)}>
                                    <img
                                        src={copied === item.prompt ? tick : copy}
                                        alt={copied === item.prompt ? "tick_icon" : "copy_icon"}
                                        className='w-[100%] h-[40%] object-contain'
                                    />
                                </div>
                                <p className='flex-1 font-satoshi text-blue-700 font-medium text-sm truncate'>
                                    {item.prompt}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Display Result */}
                <div className='my-10 max-w-full flex justify-center items-center'>
                    {isLoading ? (
                        <img src={loader} alt='loader' className='w-20 h-20 object-contain' />
                    ) : isError ? (
                        <p className='font-inter font-bold text-black text-center'>
                            Well, that was not supposed to happen...
                            <br />
                        </p>
                    ) : (
                        imageData.image && (
                            <div className='flex flex-col gap-3'>
                                <h2 className='font-satoshi font-bold text-gray-600 text-xl'>
                                    Generated <span className='blue_gradient'>Image</span>
                                </h2>
                                <div>
                                    {imageFile && (
                                        <div className='blue_gradient my-6'>
                                            <a href={imageFile} download={`${imageData.prompt}.png`}>
                                                Click to download
                                            </a>
                                        </div>
                                    )}
                                </div>
                                <div className='summary_box'>
                                    <img src={imageData.image} alt={`${imageData.prompt}`} />
                                </div>
                            </div>
                        )
                    )}
                </div>
            </section>
        </>
    )
}

export default ImageGen
