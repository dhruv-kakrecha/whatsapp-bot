import { Button, Col, Image, message, Modal, Row, Tabs } from 'antd'
import React, { useEffect, useState } from 'react'
import axiosInstance from '../../../axios/axiosInstance'
import UploadMedia from './UploadMedia'

const MediaModal = ({ open, setOpen, setSelectedImage }) => {

    const [images, setImages] = useState([])
    const [localySelectedImage, setLocalSelectedImage] = useState("")

    const getImages = async () => {
        try {
            const { data } = await axiosInstance.get("media/all")
            if (data?.success) {
                setImages(data.data)
                setLocalSelectedImage(data.data.length > 0 ? data.data[0]?.url : "")
            }
        } catch (error) {
            message.error(error.message)
        }
    }

    useEffect(() => {
        getImages();
    }, [])

    const handleChoose = () => {
        console.log("choose");

        setSelectedImage(localySelectedImage)
        setOpen(false)
    }

    const items = [
        {
            key: 1,
            label: "Media",
            children: <Row gutter={[18, 18]}>
                <Col xs={24} align="end"><Button>Delete</Button></Col>
                {images?.map((media, index) => (
                    <Col key={index} xs={12} md={8} lg={6} >
                        <Image
                            onClick={() => setLocalSelectedImage(media?.url)}
                            key={index}
                            src={media?.url}
                            alt="Media not found"
                            width={100}
                            height={100}
                            style={{ borderRadius: "0.5rem", border: `3px solid ${localySelectedImage === media?.url ? "#1677FF" : "transparent"}` }}
                            preview={false}
                        />
                    </Col>
                ))}
            </Row>,
        },
        {
            key: 2,
            label: "Upload",
            children: <UploadMedia />,
        },
    ];


    return (
        <Modal width={500} title="Choose Media" open={open} onCancel={() => setOpen(false)} cancelText="Cancel" okText="Choose" onOk={handleChoose}>
            <Tabs
                defaultActiveKey={1}
                type="card"
                items={items}
            />
        </Modal>
    )
}

export default MediaModal
