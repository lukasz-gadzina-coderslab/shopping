import React from 'react'
import config from '../config.js'
import TableRows from './Libraries/TableRows.jsx'
import { hashHistory } from 'react-router'

class Cart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            products: []
        }
    }

    componentDidMount() {
        this.hasData = true
        fetch(config.apiUrl + '/getCart/' + localStorage.getItem('cart'))
            .then(response => response.json())
            .then(responseJson => {
                if(responseJson.items.length === 0) {

                    this.hasData = false
                }
                this.setState({
                    products: responseJson.items
                })
            })
    }

    countAllElements = () => {
        let sum = 0
        
        this.state.products.forEach(element => {
            sum += parseInt(element.price)
        })

        return sum
    }

    handleRemoveClick = event => {
        if(confirm("Do you rly want delete this item?")) {
            fetch(config.apiUrl + "/cart/delete/" + event.target.dataset.id)
                .then(response => response.json())
                .then(responseJson => {
                    if (responseJson.items.length === 0) {
                        this.hasData = false
                    } else {
                        this.setState({
                            products: responseJson.items
                        })
                    }
                })
        }

    }

    handleOrderClick = () => {
        hashHistory.push('/cart/' + this.props.params.id + '/form')
    }

    render() {
        return <div className="row">
            <div className="col-md-12 col-sm-12">
                <table className="table table-bordered table-hovered">
                    <tbody>
                    {
                        this.hasData ? this.state.products.map(element => {
                                return <TableRows photo={element.product.product_images[0].url}
                                            key={element.id}
                                            name={element.product.name}
                                            price={element.product.price}
                                            available={element.product.available}
                                            amount={element.price}
                                            description={element.product.description}
                                            del={true}
                                            id={element.id}
                                            quantity={element.quantity}
                                            handleRemoveClick={this.handleRemoveClick}
                                            />
                            }) : <tr><td><h2>Your cart is empty :(</h2></td></tr>
                    }
                    </tbody>
                </table>
                <div className="pull-right">
                    <b>Razem: {
                        this.countAllElements()
                    }</b><br/>
                    {
                        this.state.products.length > 0 ? <button type="button" className="btn btn-success"
                                             onClick={this.handleOrderClick}>
                                Checkout :D
                            </button> : null
                    }
                </div>
            </div>
        </div>
    }
}

export default Cart