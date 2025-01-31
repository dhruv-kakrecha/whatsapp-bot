import { PageContainer, ProCard } from '@ant-design/pro-components'
import React from 'react'

const ProComponentWrapper = ({ title, children }) => {
    return (
        <PageContainer
            title="Templates"
        >
            <ProCard>
                {children}
            </ProCard>
        </PageContainer>
    )
}

export default ProComponentWrapper
