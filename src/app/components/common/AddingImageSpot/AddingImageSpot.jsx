import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import iconImg from '../../../assets/img/icons/icon-img.png'
import deleteImg from '../../../assets/img/icons/delete_Img_red.svg'
import style from './AddingImageSpot.module.css'

const AddingImageSpot = (props) => {
  const {
    classes,
    error,
    register,
    images,
    setImages,
    setImgUrl,
    imgUrl,
    label,
    placeholder
  } = props

  const photoPicker = useRef(null)

  const handlePickPhoto = () => {
    photoPicker.current.click()
  }

  const imgChange = (e) => {
    const reader = new FileReader()

    reader.onload = function () {
      setImgUrl(reader?.result)
    }
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0])
      setImages([...images, e.target.files[0]])
    }
  }

  const onClose = (e) => {
    e.preventDefault()
    setImgUrl(imgUrl)
    setImages(images.splice(images.length - 1))
  }

  return (
    <div className={label ? style.wrapperWithLabel : style.wrapper}>
      <input
        type="file"
        {...register}
        accept="image/*"
        name="file"
        ref={photoPicker}
        className={style.hidden}
        onChange={imgChange}
      />

      {imgUrl ? (
        <div className={style.photo}>
          <img
            src={imgUrl}
            alt="img"
            id="photoImg"
            className={classes.uploadedImage}
          />
          <button className={style.photoRemove} onClick={onClose}>
            <img src={deleteImg} alt="close" />
          </button>
        </div>
      ) : (
        <div className={classes.background} onClick={handlePickPhoto}>
          <img
            src={iconImg}
            alt="icon img"
            id="iconImg"
            className={classes.sampleImage}
          />
        </div>
      )}

      {label ? (
        <div className={style.labelContainer}>
          <label
            htmlFor="profileLogo"
            onClick={handlePickPhoto}
            className={classes ? classes.label : style.label}
          >
            {label}
          </label>

          <p className={style.placeholder}>{placeholder}</p>
        </div>
      ) : (
        <></>
      )}
      {error && <p className={style.inputError}>&#9888; {error}</p>}
    </div>
  )
}
AddingImageSpot.propTypes = {
  // deletedPhotoPicker: PropTypes.object,
  onClose: PropTypes.func,
  classes: PropTypes.object,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  imgUrl: PropTypes.string,
  register: PropTypes.object,
  setImgUrl: PropTypes.func,
  images: PropTypes.array,
  setImages: PropTypes.func
}
export default AddingImageSpot
