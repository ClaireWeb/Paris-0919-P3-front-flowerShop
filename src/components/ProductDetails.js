import React from 'react';
import PropTypes from 'prop-types';

const ProductDetails = ({ product, user }) => {
  const handleChange = e => console.log(e.target.value);

  return (
    <div className='ui container'>
      <h1 className='ui center aligned dividing header'>{product.name}</h1>

      <div className='ui stackable grid'>
        <div className='row'>
          <div className='six wide column'>
            <div className='ui fluid image'>
              <img src={product.thumbnail} alt='Bouquet' />
            </div>
          </div>

          <div className='ten wide column'>
            <p>{product.description}</p>
            <table className='ui table'>
              <tbody>
                <tr>
                  <td>Tailles disponibles:</td>
                  {user.token && user.role === 'user' ? (
                    <td>
                      <select
                        name='productSize'
                        value='Tailles'
                        onChange={handleChange}
                      >
                        <option value='0'>Choisir la taille</option>
                        {product.size.split(' / ').map((taille, index) => (
                          <option value={taille} key={index}>
                            {taille}
                          </option>
                        ))}
                      </select>
                    </td>
                  ) : (
                    <td>{product.size}</td>
                  )}
                </tr>
                {/* <tr>
              <td>Duration:</td>
              <td>{product.duration} minutes</td>
            </tr> */}
              </tbody>
            </table>

            <div className='productDetails__buttons'>
              <p className='ui green huge label'>{product.price / 100} €</p>

              {user.token && user.role === 'user' && (
                <div className='extra content right'>
                  <button className='ui green basic button'>
                    <i className='shopping basket icon'></i>Ajouter au panier
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ProductDetails.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
    //duration: PropTypes.number.isRequired
  }).isRequired
};

export default ProductDetails;