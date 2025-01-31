import { Button, Card, Col, Flex, Popconfirm, Row, Table, Tooltip, Typography } from 'antd';
import React, { useState } from 'react'
import TableActions from './TableActions';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { addContacts, editContact } from '../../../redux/contacts/contactSlice';
import { useDispatch, useSelector } from 'react-redux';
import AddContacts from './AddContacts';
import ProComponentWrapper from '../ProComponentWrapper';
import { PageContainer, ProCard } from '@ant-design/pro-components';

const Contacts = () => {

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [singleData, setSingleData] = useState({});

    const dispatch = useDispatch()
    const { contacts } = useSelector(state => state.contacts)

    const handleAddContact = (contact) => {
        dispatch(addContacts([contact]))
    }

    const handleImportData = (newData) => {
        dispatch(addContacts(newData))
    }

    const handleEditContact = (index, data) => {
        dispatch(editContact({ index, data }))
    }

    const handleCloseModal = () => {
        setOpen(false)
        isEdit(false)
        setSingleData({})
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
            render: (_, record, index) => (
                <Flex gap="small" vertical>
                    <Flex wrap gap="small">
                        <Tooltip title={<span style={{ fontSize: "0.8rem" }}>Edit</span>}>
                            <Button
                                onClick={() => {
                                    setIsEdit(true)
                                    setOpen(true)
                                    setSingleData({ index, record })
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
        <PageContainer
            title="Contacts"
        >
            <ProCard>
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
                <AddContacts open={open} handleSubmit={handleEditContact} handleCloseModal={handleCloseModal} isEdit={isEdit} singleData={singleData?.record} index={singleData?.index} />
            </ProCard>
        </PageContainer>
    )
}

export default Contacts
