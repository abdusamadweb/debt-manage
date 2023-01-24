import React from 'react';

const ArchiveId = ({ setModal, item, title }) => {

    console.log(item)

    // format price
    const formatPrice = Intl.NumberFormat('de-DE');

    return (
        <div className='item__modal modal'>
            <div className="modal__content content">
                <button className='icon-btn' onClick={() => setModal(false)}><i className="fa-solid fa-xmark icon"/></button>
                <h2 className='content__title'>{ title }</h2>
                <ul className='content__list'>
                    {
                        item.archives.map(i => (
                            <li className={`content__item item row between align-center ${i.status === 'OUT' ? 'status-red' : 'status-green'}`} key={i.id}>
                                <div className="item__diver row">
                                    <span className='item__label'>Sanasi:</span>
                                    <time className='item__info' dateTime={i.createdAt}>{ new Date(i.createdAt).toLocaleString().slice(0, 17) }</time>
                                </div>
                                <div className="item__diver row">
                                    <span className='item__label'>Miqdori:</span>
                                    <span className='item__info'>{ formatPrice.format(i.debtPrice) } sum</span>
                                </div>
                                <div className="item__diver desc row">
                                    <span className='item__label'>Tarifi:</span>
                                    <span className='item__info txt'>{ i.description } Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur consequuntur cumque dolorem ea eaque earum esse expedita iste itaque iure iusto maxime numquam provident, quam ratione sapiente unde vel voluptas.</span>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className="bg" onClick={() => setModal(false)}/>
        </div>
    );
};

export default ArchiveId;
