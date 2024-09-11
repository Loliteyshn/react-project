import React, { Suspense } from "react";

function withSuspense <WCP extends JSX.IntrinsicAttributes>(WrappedComponent: React.ComponentType<WCP>) {
    return (props: WCP) => {
        return <Suspense fallback={<div>Loading...</div>}>
            <WrappedComponent {...props} />
        </Suspense>
    }
}

export default withSuspense