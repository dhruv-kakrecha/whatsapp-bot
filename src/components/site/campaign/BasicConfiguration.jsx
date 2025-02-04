import { Button, Card, Form, Input } from 'antd'
import React from 'react'

const BasicConfiguration = ({
    campaignName,
    setCampaignName,
    messagesPerAccount,
    setMessagesPerAccount
}) => {

    return (
        <Card title="Basic Configuration">
            <Form layout="vertical">

                <Form.Item
                    label="Campaign Name"
                    name="name"
                    required
                >
                    <Input value={campaignName} onChange={(e) => setCampaignName(e.target.value)} placeholder="Campaign Name" />
                </Form.Item>

                <Form.Item
                    label="Messages Per Account"
                    name="messages"
                    required
                >
                    <Input value={messagesPerAccount} onChange={(e) => setMessagesPerAccount(e.target.value)} placeholder="Messages Per Account" />
                </Form.Item>

            </Form>

        </Card>
    )
}

export default BasicConfiguration
