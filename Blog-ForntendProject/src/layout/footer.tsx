import React from 'react';

class Footer extends React.Component<any, any> {

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | Iterable<React.ReactNode> | React.ReactPortal | boolean | any | null | undefined {
        return (
            <footer className={'bg-[#fafafa] text-white p-5'}>
                <h1 className={'text-[#0A3981] text-3xl font-semibold'}>BLOG</h1>
                
                <div className={'mt-5 text-center text-gray-800'}>Copyright © 2025 Blog LK</div>
            </footer>
        );
    }

}

export default Footer