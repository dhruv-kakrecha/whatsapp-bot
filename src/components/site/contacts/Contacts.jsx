import { Button, Card, Flex, message, Popconfirm, Table, Tooltip, Typography, Upload } from 'antd';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { DeleteOutlined, EditOutlined, ImportOutlined, PlusCircleOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react'
import AddContacts from './AddContacts';
import TableActions from '../../common/TableActions';
import * as XLSX from "xlsx";
import axiosInstance from '../../../axios/axiosInstance';


const Contacts = () => {

    const [contacts, setContacts] = useState([{}]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [singleData, setSingleData] = useState({});


    const getContactsData = async () => {
        setLoading(true);
        try {
            const { data } = await axiosInstance.get("/contacts/all")
            setContacts(data?.contacts);
        } catch (error) {
            message.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getContactsData()
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
            // const contacts = jsonData.map(({ phone, countryCode }) => ({ phone, countryCode }));
            const contacts = jsonData.map((row) => ({ phone: row.Phone, countryCode: row.CountryCode }));

            console.log("contacts", contacts);

            await axiosInstance.post("contacts/add/bulk", { contacts })

            message.success("Contact added successfully!");
            getContactsData()
        };

        reader.readAsBinaryString(file);
        return false;
    };

    const handleSubmit = async (newValue) => {
        await axiosInstance.post("contacts/add/single", newValue);
        message.success("Contacts added successfully!");
        getContactsData()
    }

    const tableButtons = [
        <Button
            key={"add"}
            icon={<PlusCircleOutlined />}
            onClick={() => setOpen(true)}
        >
            Add
        </Button>,
        <Upload
            key={"import"}
            beforeUpload={handleUpload}
            showUploadList={false} >
            <Button type='primary' icon={<ImportOutlined />}>Import</Button>
        </Upload >
    ]


    const handleCloseModal = () => {
        setOpen(false)
        setIsEdit(false)
        setSingleData({})
    }

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
            title: 'Country Code',
            dataIndex: 'countryCode',
            key: 'countryCode',
            render: (countryCode) => countryCode ?? "-",
        },
        {
            title: 'Phone Number',
            dataIndex: 'phone',
            key: 'phone',
            render: (phone) => phone ?? "-",
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
            title="Contacts"
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
                            loading={loading}
                            columns={columns}
                            dataSource={contacts}
                            scroll={{
                                x: 1200,
                            }}
                            // loading={loading}
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
                                        {"Total"}: {contacts.length}
                                    </Typography.Text>
                                );
                            }}
                        />
                    </Card>
                </Flex>
                <AddContacts open={open} handleSubmit={handleSubmit} handleCloseModal={handleCloseModal} isEdit={isEdit} singleData={singleData?.record} index={singleData?.index} />
            </ProCard>
        </PageContainer>
    )
}

export default Contacts
