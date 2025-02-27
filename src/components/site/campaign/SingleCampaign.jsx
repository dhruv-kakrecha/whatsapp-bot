import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, List, message, Table, Typography, Modal, Spin, Row, Col } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import axiosInstance from '../../../axios/axiosInstance';
import { CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined, HourglassOutlined, LinkOutlined, SendOutlined } from '@ant-design/icons';

const SingleCampaign = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [reportLoading, setReportLoading] = useState(false);
    const [campaign, setCampaign] = useState(null);
    const [reportData, setReportData] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });

    const basicData = useMemo(() => [
        { title: "Total Contacts", value: `${campaign?.totalContacts} Contacts`, color: "#1abc9c", bgColor: "#e6f9f5" },
        { title: "Successful Contacts", value: `${campaign?.successCount} Contacts`, color: "#27ae60", bgColor: "#eaf9e9" },
        { title: "Failed Contacts", value: `${campaign?.failedCount} Contacts`, color: "#e74c3c", bgColor: "#fdecea" },
        { title: "Selected Template", value: campaign?.selectedTemplateName, color: "#9b59b6", bgColor: "#f5e6ff" },
        { title: "Selected Accounts", value: `${campaign?.selectedAccounts?.length} Accounts`, color: "#e67e22", bgColor: "#fdf3e6" }
    ], [campaign]);

    const statisticsIcons = {
        totalLinks: <LinkOutlined />,
        totalProcessing: <HourglassOutlined />,
        totalQueued: <ClockCircleOutlined />,
        totalSent: <SendOutlined />,
        totalDelivered: <CheckCircleOutlined />,
        totalOpen: <CheckCircleOutlined />,
        totalReplied: <CheckCircleOutlined />,
        totalFailed: <CloseCircleOutlined style={{ color: "red" }} />,
        totalStopped: <CloseCircleOutlined />,
        totalSending: <SendOutlined />
    };

    const handleViewReport = async (campaignId, accountId) => {
        setIsModalVisible(true);
        setReportLoading(true);
        try {
            const { data } = await axiosInstance.post("/messages/campaign/report/account", { campaignId, accountId });
            if (data.success) {
                setReportData(data);
            } else {
                message.error(data.message);
            }
        } catch (error) {
            message.error(error.message);
        } finally {
            setReportLoading(false);
        }
    };

    const getCampaignData = async () => {
        setLoading(true);
        try {
            const { data } = await axiosInstance.get(`/messages/campaigns/${id}`);
            if (data.success) {
                setCampaign(data.campaign);
            }
        } catch (error) {
            message.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) getCampaignData();
    }, [id]);

    const columns = [
        {
            title: "SN",
            width: 60,
            key: "sn",
            render: (_, __, index) => (pagination.current - 1) * pagination.pageSize + index + 1,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (name) => name ?? "-",
        },
        { title: 'UserName', dataIndex: 'username', key: 'username' },
        { title: 'Password', dataIndex: 'password', key: 'password' },
        {
            title: 'Login URL',
            dataIndex: 'loginUrl',
            key: 'loginUrl',
            render: (loginUrl) => loginUrl ? <Link to={loginUrl}>{loginUrl}</Link> : "-",
        },
        {
            title: "Actions",
            key: "action",
            fixed: "right",
            width: 100,
            render: (_, record) => (
                <Button type='primary' onClick={() => handleViewReport(id, record?._id)}>
                    View Report
                </Button>
            ),
        },
    ];

    return (
        <PageContainer loading={loading} title={`Campaign Report : ${campaign ? campaign.name : ""}`}>
            <List
                grid={{ gutter: 16, column: 5 }}
                dataSource={basicData}
                renderItem={(item) => (
                    <List.Item>
                        <Card title={item.title} style={{ background: item?.bgColor, textAlign: 'center' }}>
                            <Typography.Title level={5} style={{ color: item?.color, margin: 0 }}>
                                {item.value}
                            </Typography.Title>
                        </Card>
                    </List.Item>
                )}
            />
            <Card title="Selected Accounts">
                <Table
                    columns={columns}
                    dataSource={campaign?.selectedAccounts ?? []}
                    pagination={{
                        current: pagination.current,
                        pageSize: pagination.pageSize,
                        onChange: (page, pageSize) => setPagination({ current: page, pageSize }),
                    }}
                />
            </Card>

            <Modal
                title={`Account Report ${reportLoading ? "" :  " of " + reportData?.account?.username || "" }`}
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
                width={900}
            >
                {reportLoading ? (
                    <Spin size="large" style={{ display: 'flex', justifyContent: 'center' }} />
                ) : reportData ? (
                    <>
                        <Card style={{ marginBottom: 16 }}>
                            <Typography.Text><strong>Name:</strong> {reportData.account.name}</Typography.Text><br />
                            <Typography.Text><strong>Phone:</strong> +{reportData.account.phone}</Typography.Text><br />
                            <Typography.Text><strong>Username:</strong> {reportData.account.username}</Typography.Text>
                        </Card>
                        <div style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between', // Ensures 5 in a row
                            gap: '16px', // Controls spacing
                            marginBottom: '16px'
                        }}>
                            {Object.entries(reportData.statistics)
                                .filter(([key]) => key !== 'broadcastId')
                                .map(([key, value], index) => (
                                    <Card
                                        key={index}
                                        size="small"
                                        style={{
                                            flex: '1 1 calc(20% - 16px)', // Ensures exactly 5 cards per row
                                            textAlign: 'center',
                                            background: "#f9f9f9",
                                            borderRadius: 8,
                                            padding: 8,
                                            minWidth: '150px', // Prevents too small cards on small screens
                                            maxWidth: '200px' // Keeps consistent size
                                        }}
                                    >
                                        {statisticsIcons[key] || <SendOutlined />} {/* Replace with actual icons */}
                                        <Typography.Title level={5} style={{ marginTop: 8, fontSize: 16 }}>
                                            {value}
                                        </Typography.Title>
                                        <Typography.Text style={{ fontSize: 12 }}>
                                            {key.replace(/total/, '')}
                                        </Typography.Text>
                                    </Card>
                                ))}
                        </div>

                    </>
                ) : (
                    <Typography.Text>No report available.</Typography.Text>
                )}
            </Modal>
        </PageContainer>
    );
};

export default SingleCampaign;
