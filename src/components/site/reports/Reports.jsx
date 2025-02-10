import { CheckOutlined, EyeOutlined, SendOutlined } from '@ant-design/icons'
import { PageContainer, ProCard } from '@ant-design/pro-components'
import { Card, Col, Flex, Row, Typography } from 'antd'
import React from 'react'
import { FaReplyAll } from 'react-icons/fa'
import { HiMiniSquare3Stack3D, HiOutlineArrowPathRoundedSquare } from 'react-icons/hi2'
import { IoCheckmarkDone } from 'react-icons/io5'
import { RxCrossCircled } from 'react-icons/rx'

const Reports = () => {


    const data = [
        {
            title: "Sent",
            value: 0,
            icon: <CheckOutlined />
        },
        {
            title: "Deliverd",
            value: 0,
            icon: <IoCheckmarkDone />
        },
        {
            title: "Read",
            value: 0,
            icon: <EyeOutlined />
        },
        {
            title: "Replied",
            value: 0,
            icon: <FaReplyAll />

        },
        {
            title: "Sending",
            value: 0,
            icon: <SendOutlined />
        },
        {
            title: "Failed",
            value: 0,
            icon: <RxCrossCircled />
        },
        {
            title: "Processing",
            value: 0,
            icon: <HiOutlineArrowPathRoundedSquare />
        },
        {
            title: "Queued",
            value: 0,
            icon: <HiMiniSquare3Stack3D />
        },
    ]
    return (
        <PageContainer
            title="Reports"
        >
            <ProCard title="Statistics">
                <Row gutter={[16, 24]}>
                    {data?.map((item, index) => (
                        <Col key={index} span={3}>
                            <Card bodyStyle={{ padding: 15 }} hoverable>
                                <Flex justify='space-evenly' align='center'>
                                    <div>
                                        <Typography.Title level={3} style={{ padding: 0, margin: 0 }}>
                                            {item.value}
                                        </Typography.Title>
                                        <Typography.Title level={5} style={{ padding: 0, margin: 0 }}>
                                            {item?.title}
                                        </Typography.Title>
                                    </div>
                                    <div style={{ fontSize: 20 }}>
                                        {item.icon}
                                    </div>
                                </Flex>

                            </Card>
                        </Col>
                    ))}
                </Row>
            </ProCard>
        </PageContainer>
    )
}

export default Reports
