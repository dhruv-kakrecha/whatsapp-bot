import { ImportOutlined, PlusCircleOutlined, RedoOutlined, UploadOutlined } from '@ant-design/icons';
import { Badge, Button, Card, Col, Flex, Input, Row, Typography, Upload } from 'antd'
import React, { useState } from 'react'
import AddContacts from './AddContacts';
import * as XLSX from "xlsx";


const { Search } = Input;

const TableActions = ({
    searchValue,
    handleSearchChange,
    handleImportData,
    handleAddContact
}) => {

    const [open, setOpen] = useState(false)

    const handleCloseModal = () => {
        setOpen(false)
    }


    const handleUpload = (file) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            const binaryStr = e.target.result;
            const workbook = XLSX.read(binaryStr, { type: "binary" });
            const sheetName = workbook.SheetNames[0]; // Get first sheet
            const sheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(sheet);

            // Format data to match desired JSON structure
            const formattedData = jsonData.map((row) => ({
                name: row.name, // Adjust keys based on Excel column headers
                contactNumber: row["contact number"],
            }));

            handleImportData(formattedData);
        };

        return false; // Prevent auto upload
    };

    return (
        <Card>
            <Row gutter={[16, 24]}>
                <Col xs={24} sm={24} md={24} lg={24} xl={8} xxl={8}>
                    <Search
                        placeholder="Search"
                        // loading={true}
                        onChange={handleSearchChange}
                        value={searchValue}
                    />
                </Col>
                <Col xs={0} sm={0} md={0} lg={0} xl={4} xxl={4}></Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={12}>
                    <Flex align="end" gap="small" justify="flex-end">
                        <Button
                            key={"add"}
                            icon={<PlusCircleOutlined />}
                            onClick={() => setOpen(true)}
                        >
                            Add
                        </Button>
                        {/* <Button
                            type='primary'
                            key={"import"}
                            icon={<ImportOutlined />}
                            onClick={handleImportData}
                        >
                            Import
                        </Button> */}
                        <Upload beforeUpload={handleUpload} showUploadList={false}>
                            <Button type='primary' icon={<ImportOutlined />}>Import</Button>
                        </Upload>
                    </Flex>
                    <AddContacts open={open} handleAddContact={handleAddContact} handleCloseModal={handleCloseModal} />
                </Col>
            </Row>
        </Card>
    )
}

export default TableActions
