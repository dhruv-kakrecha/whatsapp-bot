import { InboxOutlined } from '@ant-design/icons'
import Dragger from 'antd/es/upload/Dragger'
import React from 'react'

const UploadMedia = (props) => {
    return (
        <div>
            <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                    banned files.
                </p>
            </Dragger>
        </div>
    )
}

export default UploadMedia
