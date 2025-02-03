import { Button, Card, Col, Flex, message, Popconfirm, Row, Table, Tooltip, Typography } from 'antd';
import React, { useEffect, useMemo, useState } from 'react'
import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import TableActions from '../../common/TableActions';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axiosInstance from '../../../axios/axiosInstance';

const AllTemplates = () => {

    // const allTemplates = templateData.result.items
    const [allTemplates, setAllTemplates] = useState([])
    const [loading, setLoading] = useState(false)
    const [selectedRows, setSelectedRows] = useState([]);

    const CLIENT_ID = useSelector(state => state.auth.user.tenantId)
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

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRows(selectedRows)
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            // Column configuration not to be checked
            name: record.name,
        }),
    };
    const columns = [
        {
            title: "SN",
            width: 60,
            render: (text, record, index) => index + 1,
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
        {
            title: "Actions",
            key: "action",
            fixed: "right",
            width: 100,
            render: (_, record, index) => (
                <Flex gap="small" vertical>
                    <Flex wrap gap="small">
                        <Button
                            onClick={() => handleSendTemplate(index, record?.elementName)}
                            loading={buttonLoading === index}
                        >
                            {buttonLoading === index ? "Sending" : "Send"}
                        </Button>
                        {/* <Tooltip title={<span style={{ fontSize: "0.8rem" }}>Edit</span>}>
                            <Button
                                size="small"
                                shape="circle"
                                icon={<EditOutlined />}
                            />
                        </Tooltip>
                        <Tooltip
                            color="red"
                            title={<span style={{ fontSize: "0.8rem" }}>Delete</span>}
                        >
                            <Popconfirm
                                key={`confirmation-${record?._id}`}
                                icon={""}
                                description="Are you sure to delete this brand?"
                                onConfirm={() => {
                                    handleDeleteBrand(record?._id);
                                }}
                                onCancel={() => { }}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button size="small" shape="circle" icon={<DeleteOutlined />} />
                            </Popconfirm>
                        </Tooltip> */}
                    </Flex>
                </Flex>
            ),
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
                            rowSelection={rowSelection}
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
                            rowKey={(record) => record?.id}
                            footer={() => {
                                return (
                                    <Row >
                                        <Typography.Text style={{ marginRight: 10 }}>
                                            {"Total"}: {allTemplates.length}
                                        </Typography.Text>
                                        <Typography.Text>
                                            {"Selected"}: {selectedRows.length}
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
