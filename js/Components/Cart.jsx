import React from 'react'
import config from '../config.js'
import TableRows from './Libraries/TableRows.jsx'


class Cart extends React.Component {
    constructor() {
        super()
        this.state = {
            products: []
        }
    }

    componentWillMount() {
        this.hasData = true
        let arr = this.state.products
        fetch(config.apiUrl + '/getCart/' + localStorage.getItem('cart'))
            .then(response => response.json())
            .then(responseJson => {
                arr.push(responseJson.items)
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
                    this.setState({
                        products: responseJson.items
                    })
                })
        }

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
                            }) : null
                    }
                    </tbody>
                </table>
                <div className="pull-right">
                    <b>Razem: {
                        this.countAllElements()
                    }</b>
                </div>
            </div>
        </div>
    }
}

export default Cart