import React from 'react';
import Card from '../../Card/Card';
import Skeleton from 'react-loading-skeleton';
import './PostLoading.css';
import 'react-loading-skeleton/dist/skeleton.css';

const PostLoading = () => {

    // Copy of post tile with loading skeletons in the place of content
    return (
            <Card>
                <div className="top">
                    <div className="left-top">
                        <Skeleton width={75} />
                    </div>
                    <div className="right-top">
                        <Skeleton width={75} />
                    </div>
                </div>
                <div className="title" >
                    <Skeleton width={350} height={30} />
                </div>
                <div className="content" >
                    <Skeleton height={250} />
                </div>
                <div className="bottom">
                    <div className="left-bottom">
                        <Skeleton width={75} />
                    </div>
                    <div className="right-bottom">
                        <Skeleton width={75} />
                    </div>
                </div>
            </ Card>
    )
};

export default PostLoading;