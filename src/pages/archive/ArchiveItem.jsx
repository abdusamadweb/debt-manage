import React, {useState} from 'react';
import ArchiveId from "./ArchiveId";

const ArchiveItem = ({ i }) => {

    const [modal, setModal] = useState(false)
    console.log(modal)

    return (
        <li className='content__item item' key={i.id}>
            { modal && <ArchiveId item={i} title={i.name.slice(1)} setModal={setModal} /> }
            <div className='item__link row align-center' onClick={() => setModal(true)}>
                <div className='item__folder'>
                    <i className="fa-regular fa-folder-open icon"/>
                </div>
                <span className="item__date">{ i.name.slice(1) }</span>
            </div>
        </li>
    );
};

export default ArchiveItem;
