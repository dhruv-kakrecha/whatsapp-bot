import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from '../../../axios/axiosInstance'
import { PageContainer, ProCard } from '@ant-design/pro-components'
import { message } from 'antd'

const SingleTemplate = () => {

    const [template, setTemplate] = useState(null)
    const [loading, setLoading] = useState(false)
    const { id } = useParams()

    const getTemplateData = async () => {
        try {
            setLoading(true)
            const { data } = await axiosInstance.get(`/templates/${id}`)
            if (data.success) {
                setTemplate(data.report)
            }
        } catch (error) {
            message.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (id) getTemplateData()
    }, [id])



    return (
        <PageContainer
            title="Reports"
            loading={loading}
        >
            <ProCard title={`Report : ${template?.templateName}`}>
                {template?.templateName}
            </ProCard>
        </PageContainer>
    )
}

export default SingleTemplate
