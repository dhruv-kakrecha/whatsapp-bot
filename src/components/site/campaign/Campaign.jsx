import React, { useState } from 'react'
import AllAccounts from '../accounts/AllAccounts'
import AllTemplates from '../templates/AllTemplates'
import Contacts from '../contacts/Contacts'
import { Button, Card, message, Steps } from 'antd'


const steps = [
  {
    title: "Accounts",
    content: <AllAccounts />,
  },
  {
    title: "Templates",
    content: <AllTemplates />,
  },
  {
    title: "Contact",
    content: <Contacts />,
  },
];
const Campaign = () => {
  const [current, setCurrent] = useState(0)
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));
  return (
    <Card>
      <Steps
        current={current}
        onChange={() => setCurrent(current + 1)}
        items={items}
      />
      <div>{steps[current].content}</div>
      <div
        style={{
          display:"flex",
          alignItems: "center",
          justifyContent: "end",
          marginTop: 24,
        }}
      >
        {current > 0 && (
          <Button
            style={{
              margin: '0 8px',
            }}
            onClick={() => prev()}
          >
            Back
          </Button>
        )}
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => message.success('Processing complete!')}>
            Send Message
          </Button>
        )}

      </div>
    </Card>
  )
}

export default Campaign