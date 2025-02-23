import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from '../../../../axios/axiosInstance'
import { PageContainer, ProCard } from '@ant-design/pro-components'
import { Card, List, message, Typography } from 'antd'

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
        <PageContainer title={`Account Import Reports ${(!loading && accountReport?.total > 0) ? ": Total " + accountReport?.total : ""}`} loading={loading}>
            <Card title={`Inserted - ${accountReport?.inserted?.length ?? 0}`}>
                <List
                    key="inserted"
                    dataSource={accountReport?.inserted || ["No Data"]} // Ensure it is always an array
                    renderItem={(item, index) => (
                        <List.Item key={index}>{item}</List.Item>
                    )}
                    bordered
                />
            </Card>
            <Card title={`Exist - ${accountReport?.exists?.length ?? 0}`}>
                <List
                    key="exists"
                    dataSource={accountReport?.exists || ["No Data"]} // Corrected to use 'exists'
                    renderItem={(item, index) => (
                        <List.Item key={index}>{item}</List.Item>
                    )}
                    bordered
                />
            </Card>
            <Card title={`Failed - ${accountReport?.failed?.length ?? 0}`}>
                <List
                    key="failed"
                    dataSource={accountReport?.failed || ["No Data"]} // Corrected to use 'exists'
                    renderItem={(item, index) => (
                        <List.Item key={index}>{item}</List.Item>
                    )}
                    bordered
                />
            </Card>
        </PageContainer>

    )
}

export default SingleAccount
