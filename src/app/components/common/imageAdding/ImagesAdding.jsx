import {useState} from "react";
import ImageAdding from "./index";

export const ImagesAdding = ({images, setImages}) => {

    const [imageUrl, setImageUrl] = useState('')

    return (
        <ImageAdding images={images}
                     setImages={setImages}
                     imgUrl={imageUrl}
                     setImgUrl={setImageUrl}
        />
    )
}