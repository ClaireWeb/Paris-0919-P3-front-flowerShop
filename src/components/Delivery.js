import React from 'react';

import DeliveryCities from './DeliveryCities';
import DeliveryTime from './DeliveryTime';
import ModalMail from './ModalMail';

const Delivery = props => {
  return (
    <div className='ui centered card delivery__card'>
      <div className='content'>
        <div className='header'>
          <span className='right floated'>
            <i className='bicycle icon'></i>
          </span>
          <span></span> Livraison
        </div>
        <div className='description'>
          <p className='justified'>
            Nous livrons vos bouquets dans le{' '}
            <strong>secteur de Marne-la-Vallée</strong>.
          </p>
          <DeliveryCities />
          <div className='delivery_msg'>
            <i className='heart outline like icon'></i>
            <p>Livraison soignée, rapide, écologique et avec le sourire!</p>
          </div>
          <p className='delivery__time'>
            <strong>Du lundi au samedi de 9h à 20h</strong>
          </p>
          <DeliveryTime />
        </div>
      </div>
      <div className='center aligned extra content'>
        <p>
          Vous avez un doute, la ville choisie ne figure pas sur la liste? Nous
          pouvons peut être assurer votre livraison!
        </p>
        <ModalMail btnText='Contactez-nous' setMessage={props.setMessage} />
      </div>
    </div>
  );
};

export default Delivery;
