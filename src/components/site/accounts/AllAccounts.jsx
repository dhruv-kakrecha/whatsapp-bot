import { Button, Card, Flex, message, Popconfirm, Table, Tooltip, Typography, Upload } from 'antd';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { DeleteOutlined, EditOutlined, ImportOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react'
import TableActions from '../../common/TableActions';
import * as XLSX from "xlsx";
import axiosInstance from '../../../axios/axiosInstance';
import { accountsData } from '../../../../dummyData/data';
import { Link } from 'react-router-dom';


const AllAccounts = () => {

    const [loading, setLoading] = useState(false);
    const [allAccounts, setAllAccounts] = useState([{}]);

    const getAccountData = async () => {
        setLoading(true);
        try {
            const { data } = await axiosInstance.get("accounts/all");
            setAllAccounts(data?.accounts);
            setLoading(false);
        } catch (error) {
            message.error(error.message);
        }

    }

    useEffect(() => {
        getAccountData();
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

    const tableButtons = [
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
        // {
        //     title: "Actions",
        //     key: "action",
        //     fixed: "right",
        //     width: 100,
        //     render: (_, record, index) => (
        //         <Flex gap="small" vertical>
        //             <Flex wrap gap="small">
        //                 <Tooltip title={<span style={{ fontSize: "0.8rem" }}>Edit</span>}>
        //                     <Button
        //                         onClick={() => {
        //                             setIsEdit(true)
        //                             setOpen(true)
        //                             setSingleData({ index, record })
        //                         }}
        //                         size="small"
        //                         shape="circle"
        //                         icon={<EditOutlined />}
        //                     />
        //                 </Tooltip>
        //                 <Tooltip
        //                     color="red"
        //                     title={<span style={{ fontSize: "0.8rem" }}>Delete</span>}
        //                 >
        //                     <Popconfirm
        //                         key={`confirmation-${record?._id}`}
        //                         icon={""}
        //                         description="Are you sure to delete this brand?"
        //                         onConfirm={() => {
        //                             handleDeleteBrand(record?._id);
        //                         }}
        //                         onCancel={() => { }}
        //                         okText="Yes"
        //                         cancelText="No"
        //                     >
        //                         <Button size="small" shape="circle" icon={<DeleteOutlined />} />
        //                     </Popconfirm>
        //                 </Tooltip>
        //             </Flex>
        //         </Flex>
        //     ),
        // },
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
                            // rowSelection={rowSelection}
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
                                    <Typography.Text>
                                        {"Total"}: {allAccounts.length}
                                    </Typography.Text>
                                );
                            }}
                        />
                    </Card>
                </Flex>
            </ProCard>
        </PageContainer>
    )
}

export default AllAccounts    
