import React from 'react'
import config from '../config.js'
import { Link } from 'react-router'

class Orders extends React.Component {
    constructor() {
        super()
        this.state = {
            orders: []
        }
    }

    componentDidMount() {
        fetch(config.apiUrl + "/orders")
            .then(response => response.json())
            .then(responseJson => {
                this.setState({
                    orders: responseJson.orders
                })
            })
    }
    
    render() {
        return <div className="row">
            <div className="col-md-12 col-sm-12">
                <table className="table table-border">
                    {
                        this.state.orders.map(element => {
                            return <tr key={element.id}>
                                <td>
                                    <Link to={"/order/" + element.id}>{element.number}</Link>
                                </td>
                            </tr>
                        })
                    }
                </table>
            </div>

        </div>
    }
}

export default Orders