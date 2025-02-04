import React, { useState } from "react";
import AllAccounts from "../accounts/AllAccounts";
import AllTemplates from "../templates/AllTemplates";
import Contacts from "../contacts/Contacts";
import { Button, Card, message, Steps } from "antd";
import BasicConfiguration from "./BasicConfiguration";
import axiosInstance from "../../../axios/axiosInstance";
import { PageContainer, ProCard } from "@ant-design/pro-components";

const Campaign = () => {

  const [campaignName, setCampaignName] = useState("")
  const [messagesPerAccount, setMessagesPerAccount] = useState()
  const [selectedAccounts, setSelectedAccounts] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [selectedContacts, setSelectedContacts] = useState([]);

  console.log("campaign Data", {
    campaignName, messagesPerAccount, selectedAccounts, selectedTemplate, selectedContacts
  });


  const [current, setCurrent] = useState(0);

  const steps = [
    {
      title: "Basic Configuration",
      content: <BasicConfiguration
        campaignName={campaignName}
        setCampaignName={setCampaignName}
        messagesPerAccount={messagesPerAccount}
        setMessagesPerAccount={setMessagesPerAccount}
      />
    },
    {
      title: "Accounts",
      content: <AllAccounts
        showSelect
        selectedAccounts={selectedAccounts}
        setSelectedAccounts={setSelectedAccounts}
      />,
    },
    {
      title: "Templates",
      content: <AllTemplates
        showSelect
        setSelectedTemplate={setSelectedTemplate}
        selectedTemplate={selectedTemplate}
      />,
    },
    {
      title: "Contact",
      content: <Contacts
        showSelect
        selectedContacts={selectedContacts}
        setSelectedContacts={setSelectedContacts}
      />,
    },
  ];

  const next = () => {
    if (current === 0 && (!campaignName || !messagesPerAccount)) {
      message.warning("please fill all the fields")
    } else if (current === 1 && selectedAccounts.length === 0) {
      message.warning("Please select atleast one account!");
    } else if (current === 2 && !selectedTemplate) {
      message.warning("Please select a template!");
    } else if (current === 3 && selectedContacts.length === 0) {
      message.warning("please select atleast one contact!");
    } else {
      setCurrent((prev) => prev + 1);
    }
  }

  const prev = () => {
    if (current > 0) {
      setCurrent((prev) => prev - 1);
    }
  };

  const handleSendMessage = async () => {
    if (current === 3 && selectedContacts.length === 0) {
      message.warning("please select atleast one contact!");
    } else {
      try {


        const payload = {
          template_name: selectedTemplate,
          account_ids: selectedAccounts,
          broadcast_name: campaignName,
          change_account_after_messages: messagesPerAccount,
          receivers: selectedContacts.map((contact) => ({ whatsappNumber: contact }))
        }
        const { data } = axiosInstance.post("/messages/send/bulk", payload)
      } catch (error) {
        message.error(error.message)
      }
    }
  }

  return (
    // <Card>
    <PageContainer
      title="Campaign"
    >

      <ProCard>
        <Steps current={current} items={steps.map((item) => ({ key: item.title, title: item.title }))} />
        <div style={{ marginTop: 24 }}>{steps[current].content}</div>
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 24 }}>
          {current > 0 && (
            <Button style={{ marginRight: 8 }} onClick={prev}>
              Back
            </Button>
          )}
          {current < steps.length - 1 ? (
            <Button type="primary" onClick={next}>
              Next
            </Button>
          ) : (
            <Button type="primary" onClick={handleSendMessage}>
              Send Message
            </Button>
          )}
        </div>
      </ProCard>
    </PageContainer>

    // </Card>
  );
};

export default Campaign;
