import React from 'react'
import { Link } from 'react-router'

class TableRows extends React.Component {
    render() {
        return <tr>
            <td>
                <img className="mini-photo" src={this.props.photo} alt="Zdjęcie" />
            </td>
            <td>
                <span className='name'>
                    {this.props.name}
                </span>
                <span className='price'>
                    ({this.props.price} zł)
                </span>
                <span className='available'>
                    {this.props.available ?
                        <span className='available'>Dostępny</span> :
                        <span className='unavailable'>Niedostępny</span>
                    }
                </span>
                <p className='description'>
                    {this.props.description.substr(0, 30) + '...'}
                </p>

                {
                    this.props.del ? <button className="btn btn-danger delete-product-button" data-id={this.props.id}
                            onClick={this.props.handleRemoveClick}>Usuń</button> :
                            <Link to={'/product/' + this.props.id} className='btn btn-info show-product-button'>
                                Show
                            </Link>
                }
                {
                    this.props.quantity ? <span className="quantity"><h2>Ilość: {this.props.quantity}</h2></span> : null
                }
                {
                    this.props.amount ? <span className="amount">Łącznie: {this.props.amount }</span> : null
                }
            </td>
        </tr>
    }
}

export default TableRows