import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import jwtdecode from 'jwt-decode'
import api from '../api'

import Price from './Price'
import ProductDescription from './ProductDescription'

class ProductCard extends React.Component {
  state = {
    showConfirmation: false,
    size: ''
  }

  showConfirmation = () => this.setState({ showConfirmation: true })
  hideConfirmation = () => this.setState({ showConfirmation: false })

  handleClick = () => {
    const userId = jwtdecode(this.props.user.token).user._id
    api.cart
      .add(userId, this.props.product._id, { size: this.state.size })
      .then(data => {
        this.props.setMessage(data.message)
      })
  }
  handleChange = e => this.setState({ size: e.target.value })

  render() {
    const { product, toggleDescription, deleteProduct, user } = this.props
    const { size } = this.state
    const adminActions = (
      <div className='extra content'>
        {this.state.showConfirmation ? (
          <div className='ui two buttons'>
            <button
              className='ui red basic button'
              onClick={() => deleteProduct(product)}
            >
              <i className='ui icon check' /> YES
            </button>
            <button
              className='ui grey basic button'
              onClick={this.hideConfirmation}
            >
              <i className='ui icon close' /> NO
            </button>
          </div>
        ) : (
          <div className='ui two buttons'>
            <Link
              to={`/products/edit/${product._id}`}
              className='ui green basic button'
            >
              <i className='ui icon edit' />
            </Link>
            <button
              className='ui red basic button'
              onClick={this.showConfirmation}
            >
              <i className='ui icon trash' />
            </button>
          </div>
        )}
      </div>
    )
    const addToCart = (
      <div className='extra content right'>
        <button
          className='ui green labeled icon button'
          onClick={this.handleClick}
        >
          <i className='shopping basket icon'></i>Ajouter au panier
        </button>
      </div>
    )
    const chooseSize = (
      <select
        name='productSize'
        value={size}
        onChange={this.handleChange}
        className='ui dropdown product_select'
      >
        <option value=''>Choisir la taille</option>
        {product.size.split(' / ').map((taille, index) => (
          <option value={taille} key={index}>
            {taille}
          </option>
        ))}
      </select>
    )

    return (
      <div className='ui card'>
        {!product.described ? (
          <div className='image'>
            <Price product={product} />
            <Link to={`/product/${product._id}`} className='ui image' {...user}>
              <img src={product.thumbnail} alt='Bouquet' />
            </Link>
          </div>
        ) : (
          <div className='ui justified content description'>
            {product.description.split('\n').map((line, ind) => (
              <p key={ind}>{line}</p>
            ))}
          </div>
        )}
        <div className='content'>
          <Link
            to={`/product/${product._id}`}
            className='header title'
            {...user}
          >
            {product.name}
          </Link>

          <div className='meta caption productCard__caption'>
            <p className='product__icon'>
              {user.token && (user.role === 'user' || user.role === 'admin') ? (
                chooseSize
              ) : (
                <>
                  <strong>Tailles :</strong> {product.size}{' '}
                </>
              )}
            </p>
            <ProductDescription
              described={product.described}
              toggleDescription={toggleDescription}
              productId={product._id}
            />
          </div>
        </div>

        {user.token && (user.role === 'user' || user.role === 'admin') ? (
          addToCart
        ) : (
          <div className='extra content right'>
            <Link to={`/signup`} className='ui green basic labeled icon button'>
              <i className='ui user plus icon' /> Pour commander, créer un
              compte
            </Link>
          </div>
        )}
        {user.token && user.role === 'admin' && adminActions}
      </div>
    )
  }
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
  }).isRequired,
  toggleFeatured: PropTypes.func.isRequired,
  deleteProduct: PropTypes.func.isRequired,
  user: PropTypes.shape({
    token: PropTypes.string,
    role: PropTypes.string.isRequired
  }).isRequired
}

export default ProductCard
