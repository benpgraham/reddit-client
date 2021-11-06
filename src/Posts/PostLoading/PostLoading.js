import React from 'react';
import Card from '../../Card/Card';
import Skeleton from 'react-loading-skeleton';
import './PostLoading.css';
import 'react-loading-skeleton/dist/skeleton.css';

const PostLoading = () => {

    return (
            <Card>
                <div className="top">
                    <div className="left-top">
                        <Skeleton width={100} />
                    </div>
                    <div className="right-top">
                        <Skeleton width={100} />
                    </div>
                </div>
                <div className="title" >
                    <Skeleton height={30} />
                </div>
                <div className="content" >
                    <Skeleton height={250} />
                </div>
                <div className="bottom">
                    <div className="left-bottom">
                        <Skeleton width={100} />
                    </div>
                    <div className="right-bottom">
                        <Skeleton width={100} />
                    </div>
                </div>
            </ Card>
    )
};

export default PostLoading;