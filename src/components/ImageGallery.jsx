import { useState } from "react";
import { IoMdClose } from "react-icons/io";


const GALLERY_IMAGES = [
    "assets/images/gallery/gallery-image-1.jpg",
    "assets/images/gallery/gallery-image-2.jpg",
    "assets/images/gallery/gallery-image-3.jpg",
    "assets/images/gallery/gallery-image-4.jpg",
    "assets/images/gallery/gallery-image-5.jpg",
]

const ImageGallery = () => {
    const [selectedImage, setSelectedImage] = useState(null);
  return (
    <>
    {selectedImage && (
    <div className="modal-container">
        <div className="small-container">
            <div className="card">
                <button onClick={() => setSelectedImage(null)} className="modal-close mb-4"><IoMdClose/></button>
                <div className="gallery-image-preview">
                    <img src={selectedImage} alt="" />
                </div>
            </div>
        </div>
    </div>
    )}
    <div className='gallery-container'>
        <div className='gallery-inner'>
            {GALLERY_IMAGES.map((image, index) => (
                <button onClick={() => setSelectedImage(image)} className="gallery-item">
                    <img src={image} alt="" key={image} />
                </button>
            ))}
        </div>
    </div>
    </>
  )
}

export default ImageGallery