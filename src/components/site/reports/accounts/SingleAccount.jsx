import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from '../../../../axios/axiosInstance'
import { PageContainer, ProCard } from '@ant-design/pro-components'
import { List, message, Typography } from 'antd'

const SingleAccount = () => {

    const [accountReport, setAccountReport] = useState(null)
    const [loading, setLoading] = useState(false)
    const { id } = useParams()
    const { Text } = Typography

    const getAccountReport = async () => {
        try {
            setLoading(true)
            const { data } = await axiosInstance.get(`/reports/imports/accounts/${id}`)
            if (data.success) {
                setAccountReport(data.report)
            }
        } catch (error) {
            message.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getAccountReport()
    }, [id])



    return (
        <PageContainer
            title="Reports"
            loading={loading}
        >
            <ProCard>
                <List
                    dataSource={accountReport?.inserted}
                    renderItem={(item) => (
                        <List.Item> {item} </List.Item>
                    )}
                    bordered
                />
            </ProCard>
        </PageContainer>
    )
}

export default SingleAccount
