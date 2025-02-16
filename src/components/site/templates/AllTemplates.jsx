import { Button, Card, Col, Flex, message, Popconfirm, Radio, Row, Table, Tooltip, Typography } from 'antd';
import React, { useEffect, useMemo, useState } from 'react'
import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import TableActions from '../../common/TableActions';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axiosInstance from '../../../axios/axiosInstance';

const AllTemplates = ({
    showSelect,
    selectedTemplate,
    setSelectedTemplate,
}) => {

    // const allTemplates = templateData.result.items
    const [allTemplates, setAllTemplates] = useState([])
    const [loading, setLoading] = useState(false)
    const [selectedRows, setSelectedRows] = useState([]);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        
    });

    const handleTableChange = (pagination) => {
        setPagination(pagination);
    };

    const CLIENT_ID = useSelector(state => state?.auth?.user?.tenantId)
    const navigate = useNavigate()

    const getTemplatesData = async () => {
        setLoading(true);
        try {
            const { data } = await axiosInstance.get(`templates/${CLIENT_ID}/all`);
            setAllTemplates(data?.templates);
        } catch (error) {
            message.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getTemplatesData();
    }, [])

    const tableButtons = useMemo(() => {
        return [
            <Button
                type="primary"
                key={"create_template"}
                onClick={() => {
                    navigate("/templates/add");
                }}
                icon={<PlusCircleOutlined />}
            >
                Create Template
            </Button>,
        ];
    }, [navigate]);

    const columns = [
        {
            title: "SN",
            width: 60,
            render: (text, { _id, elementName }, index) => {
                return (showSelect ? <Radio
                    checked={selectedTemplate === elementName}
                    onChange={() => setSelectedTemplate(elementName)}
                    id={_id}
                >
                    {pagination.pageSize * (pagination.current - 1) + (index + 1)}
                </Radio> : <>{pagination.pageSize * (pagination.current - 1) + (index + 1)}</>)
            },
        },
        {
            title: 'Name',
            dataIndex: 'elementName',
            key: 'elementName',
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Language',
            dataIndex: 'language',
            key: 'language',
            render: ({ text }) => text
        },
        {
            title: 'Last Updated',
            dataIndex: 'lastModified',
            key: 'lastModified',
            render: (text) => {
                if (!text) return '-'; // Handle cases where the date might be undefined or null
                const date = new Date(text);
                return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
            }
        },
    ];

    return (
        <PageContainer
            title="Templates"
        >
            <ProCard>
                <Flex style={{
                    flexDirection: 'column',
                    gap: "1rem",
                    padding: "0 2.5rem"
                }}>
                    <TableActions
                        buttons={tableButtons}
                    />

                    <Card>
                        <Table
                            loading={loading}
                            columns={columns}
                            dataSource={allTemplates}
                            scroll={{
                                x: 1200,
                            }}
                            // pagination={{
                            //     current: page,
                            //     total: templatesTotal,
                            //     pageSize: pageSize,
                            //     showSizeChanger: true,
                            //     onChange: (page, pageSize) => {
                            //         setPage(page);
                            //         setPageSize(pageSize);
                            //     },
                            // }}
                            pagination={{
                                current: pagination.current,
                                pageSize: pagination.pageSize,
                                total: allTemplates.length,
                                showSizeChanger: true,
                                onChange: (page, pageSize) => {
                                    setPagination({ current: page, pageSize });
                                },
                            }}
                            rowKey={(record) => record?.id}
                            footer={() => {
                                return (
                                    <Row >
                                        <Typography.Text style={{ marginRight: 10 }}>
                                            {"Total"}: <b>{allTemplates.length}</b>
                                        </Typography.Text>
                                        <Typography.Text>
                                            {"Selected"}: <b>{selectedTemplate}</b>
                                        </Typography.Text>
                                    </Row>
                                );
                            }}
                        />
                    </Card>
                </Flex>
            </ProCard>
        </PageContainer>
    )
}

export default AllTemplates
