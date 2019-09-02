import React from 'react';
import {Modal, Button, Grid} from '@material-ui/core';
import axios from 'axios';
import { Route } from 'react-router-dom';

class DeleteInvoiceModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: this.props.open,
            deleted: false
        }
    }
    deleteInvoice() {
        const requestString = 'http://localhost:3000/invoices/' + this.props.invoice.id;
        axios.delete(requestString)
        .then(response => {
            this.setState({
                deleted: true
            });
        })
        .catch(error => {
            console.log(error);
        })
    }
    render() {
        return(
            <Modal
                aria-labelledby="delete-invoice-modal"
                aria-describedby="ask-to-confirm-deletion-and-delete-invoice"
                open={this.props.open}
                onClose={()=> {
                    this.props.handler(false);
                }}
                >
                <div style={
                    {
                        position: 'absolute',
                        width: 400,
                        backgroundColor: 'white',
                        border: '2px solid #000',
                        boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)',
                        padding: '16px 32px 24px',
                        top: `${50 + Math.round(Math.random() * 20) - 10}%`,
                        left: `${50 + Math.round(Math.random() * 20) - 10}%`,
                        transform: `translate(-${50 + Math.round(Math.random() * 20) - 10}%, -${50 + Math.round(Math.random() * 20) - 10}%)`
                    }
                }>
                    {(this.state.deleted) ? 
                        <p>Invoice {this.props.invoice.id} has been successfuly deleted</p> :
                        <p>Are you sure you want to delete the invoice {this.props.invoice.id}?</p>
                    }
                    <Grid container spacing={3}>
                        {(this.state.deleted) ? 
                            <Route render={({history}) => (
                            <Grid item>
                                <Button color="primary" onClick={() => {
                                    this.props.handler(false);
                                    history.push('/invoices');
                                }}>OK</Button>
                            </Grid>
                            )} /> :

                            <Grid item>
                                <Button color="primary" onClick={() => {this.deleteInvoice()}}>Yes</Button>
                                <Button color="secondary" onClick={() => {this.props.handler(false)}}>No</Button>
                            </Grid>
                        }
                    </Grid>
                </div>
            </Modal>
        )
    }
}

export default DeleteInvoiceModal;