import { Button, Card, Flex, Form, Input, message, Modal, Popconfirm, Row, Select, Table, Tooltip, Typography, Upload } from 'antd';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { DeleteOutlined, EditOutlined, FilterOutlined, ImportOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react'
import TableActions from '../../common/TableActions';
import * as XLSX from "xlsx";
import axiosInstance from '../../../axios/axiosInstance';
import { Link } from 'react-router-dom';


const AllAccounts = ({
    showSelect,
    selectedAccounts,
    setSelectedAccounts
}) => {

    const [loading, setLoading] = useState(false);
    const [filterModal, setFilterModal] = useState(false);
    const [filters, setFilters] = useState({
        account_status: "CONNECTED",
        quality_rating: "GREEN"
    })
    const [allAccounts, setAllAccounts] = useState([{}]);

    const getAccountData = async (query) => {
        setLoading(true);
        try {
            // const { data } = await axiosInstance.get(`accounts/all?account_status=${query.account_status}&quality_rating=${query.quality_rating}`);
            const { data } = await axiosInstance.get(`accounts/all`);
            setAllAccounts(data?.accounts);
            setLoading(false);
        } catch (error) {
            message.error(error.message);
        }

    }

    useEffect(() => {
        getAccountData(filters);
    }, [])


    const handleUpload = async (file) => {
        const isExcel =
            file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || // .xlsx
            file.type === "application/vnd.ms-excel"; // .xls

        if (!isExcel) {
            message.error("Only Excel files (.xls, .xlsx) are allowed!");
            return false;
        }

        const reader = new FileReader();

        reader.onload = async (e) => {
            const binaryStr = e.target.result;
            const workbook = XLSX.read(binaryStr, { type: "binary" });
            const sheetName = workbook.SheetNames[0]; // Get first sheet
            const sheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(sheet);

            // Format data to match desired JSON structure
            const accounts = jsonData.map(({ name, phone, username, password, loginUrl }) => ({ name, phone, username, password, loginUrl }));

            console.log("accounts", accounts);

            await axiosInstance.post("accounts/add/bulk", { accounts })
            message.success("accounts added successfully")
            getAccountData()
        };

        reader.readAsBinaryString(file);
        return false;
    };

    const rowSelection = {
        selectedRowKeys: selectedAccounts,
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedAccounts(selectedRows.map(({ _id }) => _id))
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            name: record.name,
        }),
    };

    const tableButtons = [
        <Button onClick={() => setFilterModal(true)} icon={<FilterOutlined />}>
            Filters
        </Button>,
        <Upload
            key={"import"}
            beforeUpload={handleUpload}
            showUploadList={false} >
            <Button type='primary' icon={<ImportOutlined />}>Import</Button>
        </Upload >
    ]

    const columns = [
        {
            title: "SN",
            width: 60,
            key: "sn",
            render: (text, record, index) => index + 1,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (name) => name ?? "-",
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
            render: (phone) => phone ?? "-",
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
            render: (username) => username ?? "-",
        },
        {
            title: 'Password',
            dataIndex: 'password',
            key: 'password',
            render: (password) => password ?? "-",
        },
        {
            title: 'Login URL',
            dataIndex: 'loginUrl',
            key: 'loginUrl',
            render: (loginUrl) => <Link to={loginUrl}>{loginUrl} </Link> ?? "-",
        },
    ];

    return (
        <PageContainer
            title="Accounts"
        >
            <ProCard>
                <Flex style={{
                    flexDirection: 'column',
                    gap: "1rem",
                    padding: "0 2.5rem"
                }}>
                    <TableActions buttons={tableButtons} />

                    <Card>
                        <Table
                            rowSelection={showSelect && rowSelection}
                            columns={columns}
                            dataSource={allAccounts}
                            loading={loading}
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
                            rowKey={(record) => record._id}
                            footer={() => {
                                return (
                                    <Row >
                                        <Typography.Text style={{ marginRight: 10 }}>
                                            Total: <b>{allAccounts?.length}</b>
                                        </Typography.Text>
                                        <Typography.Text>
                                            {showSelect && <>Selected: <b>{selectedAccounts?.length}</b></>}
                                        </Typography.Text>
                                    </Row>
                                );
                            }}
                        />
                    </Card>
                </Flex>

                <Modal
                    title="Apply Filters"
                    centered
                    open={filterModal}
                    onOk={() => {
                        getAccountData(filters);
                        setFilterModal(false);
                    }}
                    onCancel={() => setFilterModal(false)}
                    okText="Apply"
                    cancelText="Cancel"
                >
                    <Form layout="vertical">
                        <Form.Item
                            label="Filter by Account Status"
                            initialValue={filters.account_status}
                        >
                            <Select
                                value={filters.account_status}
                                onChange={(value) => setFilters(prev => ({ ...prev, account_status: value }))}
                                style={{ width: "100%" }}
                                options={[
                                    { label: "CONNECTED", value: "CONNECTED" },
                                    { label: "BANNED", value: "BANNED" },
                                    { label: "FLAG", value: "FLAG" },
                                ]}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Quality Rating"
                            initialValue={filters.quality_rating}
                        >
                            <Select
                                value={filters.quality_rating}
                                onChange={(value) => setFilters(prev => ({ ...prev, quality_rating: value }))}
                                style={{ width: "100%" }}
                                options={[
                                    { label: "GREEN", value: "GREEN" },
                                    { label: "MEDIUM", value: "MEDIUM" },
                                    { label: "LOW", value: "LOW" },
                                ]}
                            />
                        </Form.Item>

                    </Form>
                </Modal>
            </ProCard>
        </PageContainer>
    )
}

export default AllAccounts    
