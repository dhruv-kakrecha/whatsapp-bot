import { message, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import axiosInstance from '../../../axios/axiosInstance'

const MediaModal = ({ open, setOpen, selectedImage, setSelectedImage }) => {

    const [images, setImages] = useState([])

    const getImages = async () => {
        try {
            const { data } = await axiosInstance.get("media/all")
            if (data?.success) {
                setImages(data.data)
            }
        } catch (error) {
            message.error(error.message)
        }
    }

    useEffect(() => {
        getImages();
    }, [])


    return (
        <Modal open={open} onClose={() => setOpen(false)} okText="Choose">

        </Modal>
    )
}

export default MediaModal
