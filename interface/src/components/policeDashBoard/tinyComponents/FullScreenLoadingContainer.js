import React from 'react'
import '../../style.css'
import 'font-awesome/css/font-awesome.min.css';

function FullScreenLoadingContainer() {
    return (
        <div>
            <div className="entireScreenCoveringParent">
            <span className="centredChild">
                <i className='fa fa-circle-o-notch fa-spin'></i>
            </span>
            </div> 
        </div>
    )
}

export default FullScreenLoadingContainer
