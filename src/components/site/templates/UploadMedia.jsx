import { LoadingOutlined, UploadOutlined } from '@ant-design/icons'
import { Button, Card, message } from 'antd'
import Dragger from 'antd/es/upload/Dragger'
import React, { useState } from 'react'
import axiosInstance from '../../../axios/axiosInstance'

const UploadMedia = () => {

    const [imageUrl, setImageUrl] = useState("http://res.cloudinary.com/dmwgmfl0h/image/upload/v1742039317/watisender/wqbamdrlgta3duclvuor.jpg");
    const [imageUploading, setImageUploading] = useState(false)

    const handleUpload = async ({ file }) => {
        try {
            setImageUploading(true);
            const formData = new FormData();
            formData.append("file", file);
            formData.append("type", "image");

            const { data } = await axiosInstance.post("/media/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (data?.success) {
                message.success(data?.message)
                setImageUrl(data?.data?.url);
            } else {
                message.success(data?.message)
            }
        } catch (error) {
            message.error(error.message);
        } finally {
            setImageUploading(false);
        }


    }
    return (
        <div>
            <Dragger
                multiple={false}
                showUploadList={false}
                customRequest={handleUpload}>
                {imageUrl ? <img src={imageUrl} alt="" height={165} /> : <>
                    <Card>
                        {imageUploading ? (<LoadingOutlined />) : (<>
                            <Button type="primary" icon={<UploadOutlined />}>
                                Upload Media
                            </Button>
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                            <p className="ant-upload-hint">
                                Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                                banned files.
                            </p></>)}
                    </Card>
                </>}
            </Dragger >
        </div >
    )
}

export default UploadMedia
