import React from 'react';
import { FaReddit } from 'react-icons/fa';
import './DropdownHeader.css'

const DropdownHeader = ({ subreddit }) => {

    const { display_name, icon_img} = subreddit;

    return (
        <div className="dropdown-wrapper">
            <div className="dropdown-icon">
                {/* Checks if the subreedit has an icon, if not provides a default */}
                { ((icon_img) && <img src={icon_img} alt="" className="dropdown-image-block" />) || <FaReddit className="default-icon" /> }
            </div>
            <div className="dropdown-name">
                    <p>{display_name}</p>
            </div>
        </div>
    )
};

export default DropdownHeader;