import { Button, Card, Col, Flex, Popconfirm, Row, Table, Tooltip, Typography } from 'antd';
import React, { useState } from 'react'
import TableActions from './TableActions';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { addContacts } from '../../../redux/contacts/contactSlice';
import { useDispatch, useSelector } from 'react-redux';

const Contacts = () => {

    const [loading, setLoading] = useState(false)
    // const [contacts, setContacts] = useState([])
    const dispatch = useDispatch()
    const { contacts } = useSelector(state => state.contacts)

    const handleAddContact = (contact) => {
        dispatch(addContacts([contact]))
    }

    const handleImportData = (newData) => {
        dispatch(addContacts(newData))
    }

    const columns = [
        {
            title: "SN",
            width: 60,
            render: (text, record, index) => index + 1,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Contact Number',
            dataIndex: 'contactNumber',
            key: 'contactNumber',
        },
        {
            title: "Actions",
            key: "action",
            fixed: "right",
            width: 100,
            render: (_, record) => (
                <Flex gap="small" vertical>
                    <Flex wrap gap="small">
                        <Tooltip title={<span style={{ fontSize: "0.8rem" }}>Edit</span>}>
                            <Button
                                onClick={() => {
                                    showModal("edit", record);
                                    setBrandDetails({
                                        id: record?._id,
                                        name: record?.name,
                                        website: record?.website,
                                        logo: record?.logo,
                                    });
                                }}
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
                        </Tooltip>
                    </Flex>
                </Flex>
            ),
        },
    ];

    return (
        <div>
            <Flex style={{
                flexDirection: 'column',
                gap: "1rem",
                padding: "0 2.5rem"
            }}>
                <TableActions
                    handleAddContact={handleAddContact}
                    handleImportData={handleImportData}
                />

                <Card>
                    <Table
                        // rowSelection={rowSelection}
                        columns={columns}
                        dataSource={contacts}
                        loading={loading}
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
        </div>
    )
}

export default Contacts
