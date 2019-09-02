import React from 'react';
import axios from 'axios';
import {Grid, Paper, TextField, Button} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Title from './Title';

class InvoiceCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            invoice: {
                items: [],
                totalNetto: 0,
                totalBrutto: 0,
                recipient: {},
                sender: {}
            }
        }
    }

    createInvoice() {
        if (this.state.error) {
            return;
        }
        const requestURL = 'http://localhost:3000/invoices';
        axios.post(requestURL, {invoice: this.state.invoice})
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        })
    }

    addItem() {
        let invoice = this.state.invoice;
        invoice.items.push({
            description: '',
            qty: 0,
            taxRate: 0,
            unitPriceNet: 0.00
        });
        this.setState({
            invoice: invoice
        });
    }

    render() {
        return(
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper style={{padding: '16px', display: 'flex', overflow: 'auto', flexDirection: 'column'}}>
                        <Title>General Info</Title>
                        <form style={{display: 'flex', flexWrap: 'wrap'}} noValidate autoComplete="off">
                            <TextField
                                disabled
                                id="created-date"
                                label="Created Date"
                                name="createdDate"
                                style={{marginLeft: '8px', marginRight: '8px'}}
                                value={this.state.invoice.createdDate || 'Will be filled after submit'}
                                margin="normal"
                                variant="outlined" />
                            <TextField
                                disabled
                                id="due-date"
                                label="Due Date"
                                style={{marginLeft: '8px', marginRight: '8px'}}
                                value={this.state.invoice.dueDate || 'Will be filled after submit'}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    let invoice = this.state.invoice;
                                    invoice.dueDate = value;
                                    this.setState({
                                        invoice: invoice
                                    })
                                }}
                                margin="normal"
                                variant="outlined" />
                            <TextField
                                disabled
                                id="invoice-id"
                                label="Invoice Id"
                                style={{marginLeft: '8px', marginRight: '8px'}}
                                value={this.state.invoice.id || 'Will be filled after submit'}
                                margin="normal"
                                variant="outlined" />
                        </form>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper style={{padding: '16px', display: 'flex', overflow: 'auto', flexDirection: 'column'}}>
                        <Title>Recipient Info</Title>
                        <form style={{display: 'flex', flexWrap: 'wrap'}} noValidate autoComplete="off">
                            <TextField
                                required
                                id="recipient-name"
                                label="Recipient Name"
                                error={this.state['recipient-name-hasError']}
                                type="text"
                                style={{marginLeft: '8px', marginRight: '8px'}}
                                value={this.state.invoice.recipient.name || ''}
                                onChange={(e) => {
                                    const empty = e.target.value === '' ? true: false;
                                    const value = e.target.value;
                                    let invoice = this.state.invoice;
                                    invoice.recipient.name = value;
                                    let state = {};
                                    state.invoice = invoice;
                                    state.error = empty;
                                    state[e.target.id + '-hasError'] = empty
                                    this.setState(state);
                                }}
                                margin="normal"
                                variant="outlined" />
                            <TextField
                                required
                                id="recipient-email"
                                label="Recipient Email"
                                error={this.state['recipient-email-hasError']}
                                type="email"
                                style={{marginLeft: '8px', marginRight: '8px'}}
                                value={this.state.invoice.recipient.email || ''}
                                onChange={(e) => {
                                    const empty = e.target.value === '' ? true: false;
                                    const value = e.target.value;
                                    let invoice = this.state.invoice;
                                    invoice.recipient.email = value;
                                    let state = {};
                                    state.invoice = invoice;
                                    state.error = empty;
                                    state[e.target.id + '-hasError'] = empty
                                    this.setState(state);
                                }}
                                margin="normal"
                                variant="outlined" />
                            <TextField
                                required
                                id="recipient-address1"
                                label="Recipient Address1"
                                error={this.state['recipient-address1-hasError']}
                                type="text"
                                style={{marginLeft: '8px', marginRight: '8px'}}
                                value={this.state.invoice.recipient.address1 || ''}
                                onChange={(e) => {
                                    const empty = e.target.value === '' ? true: false;
                                    const value = e.target.value;
                                    let invoice = this.state.invoice;
                                    invoice.recipient.address1 = value;
                                    let state = {};
                                    state.invoice = invoice;
                                    state.error = empty;
                                    state[e.target.id + '-hasError'] = empty
                                    this.setState(state);
                                }}
                                margin="normal"
                                variant="outlined" />
                            <TextField
                                id="recipient-address2"
                                label="Recipient Address2"
                                type="text"
                                style={{marginLeft: '8px', marginRight: '8px'}}
                                value={this.state.invoice.recipient.address2 || ''}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    let invoice = this.state.invoice;
                                    invoice.recipient.address2 = value;
                                    this.setState({
                                        invoice: invoice
                                    })
                                }}
                                margin="normal"
                                variant="outlined" />
                            <TextField
                                id="recipient-address3"
                                label="Recipient Address3"
                                type="text"
                                style={{marginLeft: '8px', marginRight: '8px'}}
                                value={this.state.invoice.recipient.address3 || ''}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    let invoice = this.state.invoice;
                                    invoice.recipient.address3 = value;
                                    this.setState({
                                        invoice: invoice
                                    })
                                }}
                                margin="normal"
                                variant="outlined" />
                            <TextField
                                id="recipient-vatId"
                                label="Recipient Vat Id"
                                error={this.state['recipient-vatId-hasError']}
                                type="text"
                                style={{marginLeft: '8px', marginRight: '8px'}}
                                value={this.state.invoice.recipient.vatId || ''}
                                onChange={(e) => {
                                    const empty = e.target.value === '' ? true: false;
                                    const value = e.target.value;
                                    let invoice = this.state.invoice;
                                    invoice.recipient.vatId = value;
                                    let state = {};
                                    state.invoice = invoice;
                                    state.error = empty;
                                    state[e.target.id + '-hasError'] = empty
                                    this.setState(state);
                                }}
                                margin="normal"
                                variant="outlined" />
                        </form>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper style={{padding: '16px', display: 'flex', overflow: 'auto', flexDirection: 'column'}}>
                        <Title>Sender Info</Title>
                        <form style={{display: 'flex', flexWrap: 'wrap'}} noValidate autoComplete="off">
                            <TextField
                                id="sender-name"
                                label="Sender Name"
                                error={this.state['sender-name-hasError']}
                                type="text"
                                style={{marginLeft: '8px', marginRight: '8px'}}
                                value={this.state.invoice.sender.name || ''}
                                onChange={(e) => {
                                    const empty = e.target.value === '' ? true: false;
                                    const value = e.target.value;
                                    let invoice = this.state.invoice;
                                    invoice.sender.name = value;
                                    let state = {};
                                    state.invoice = invoice;
                                    state.error = empty;
                                    state[e.target.id + '-hasError'] = empty
                                    this.setState(state);
                                }}
                                margin="normal"
                                variant="outlined" />
                            <TextField
                                id="sender-email"
                                label="Sender Email"
                                error={this.state['sender-email-hasError']}
                                type="email"
                                style={{marginLeft: '8px', marginRight: '8px'}}
                                value={this.state.invoice.sender.email || ''}
                                onChange={(e) => {
                                    const empty = e.target.value === '' ? true: false;
                                    const value = e.target.value;
                                    let invoice = this.state.invoice;
                                    invoice.sender.email = value;
                                    let state = {};
                                    state.invoice = invoice;
                                    state.error = empty;
                                    state[e.target.id + '-hasError'] = empty
                                    this.setState(state);
                                }}
                                margin="normal"
                                variant="outlined" />
                            <TextField
                                id="sender-address1"
                                label="Sender Address1"
                                error={this.state['sender-address1-hasError']}
                                type="text"
                                style={{marginLeft: '8px', marginRight: '8px'}}
                                value={this.state.invoice.sender.address1 || ''}
                                onChange={(e) => {
                                    const empty = e.target.value === '' ? true: false;
                                    const value = e.target.value;
                                    let invoice = this.state.invoice;
                                    invoice.sender.address1 = value;
                                    let state = {};
                                    state.invoice = invoice;
                                    state.error = empty;
                                    state[e.target.id + '-hasError'] = empty
                                    this.setState(state);
                                }}
                                margin="normal"
                                variant="outlined" />
                            <TextField
                                id="sender-address2"
                                label="Sender Address2"
                                type="text"
                                style={{marginLeft: '8px', marginRight: '8px'}}
                                value={this.state.invoice.sender.address2 || ''}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    let invoice = this.state.invoice;
                                    invoice.sender.address2 = value;
                                    this.setState({
                                        invoice: invoice
                                    })
                                }}
                                margin="normal"
                                variant="outlined" />
                            <TextField
                                id="sender-address3"
                                label="Sender Address3"
                                type="text"
                                style={{marginLeft: '8px', marginRight: '8px'}}
                                value={this.state.invoice.sender.address3 || ''}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    let invoice = this.state.invoice;
                                    invoice.sender.address3 = value;
                                    this.setState({
                                        invoice: invoice
                                    })
                                }}
                                margin="normal"
                                variant="outlined" />
                            <TextField
                                id="sender-vatId"
                                label="Sender Vat Id"
                                error={this.state['sender-vatId-hasError']}
                                type="text"
                                style={{marginLeft: '8px', marginRight: '8px'}}
                                value={this.state.invoice.sender.vatId || ''}
                                onChange={(e) => {
                                    const empty = e.target.value === '' ? true: false;
                                    const value = e.target.value;
                                    let invoice = this.state.invoice;
                                    invoice.sender.vatId = value;
                                    let state = {};
                                    state.invoice = invoice;
                                    state.error = empty;
                                    state[e.target.id + '-hasError'] = empty
                                    this.setState(state);
                                }}
                                margin="normal"
                                variant="outlined" />
                        </form>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper style={{padding: '16px', display: 'flex', overflow: 'auto', flexDirection: 'column'}}>
                        <Grid container spacing={3}>
                            <Grid item sm={11}>
                                <Title>Items Info</Title>
                            </Grid>
                            <Grid item sm={1}>
                                <Button color="primary" onClick={() => {this.addItem()}}>
                                    <AddCircleIcon />
                                </Button>
                            </Grid>
                        </Grid>
                        {this.state.invoice.items.map((item, index) => (
                            <form key={item.name + '-' + index} style={{display: 'flex', flexWrap: 'wrap'}} noValidate autoComplete="off">
                                <TextField
                                    id="item-description"
                                    label="Item Description"
                                    style={{marginLeft: '8px', marginRight: '8px'}}
                                    value={item.description || ''}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        let invoice = this.state.invoice;
                                        invoice.items[index].description = value;
                                        this.setState({
                                            invoice: invoice
                                        })
                                    }}
                                    margin="normal"
                                    variant="outlined" />
                                <TextField
                                    id="item-qty"
                                    label="Item Qty"
                                    style={{marginLeft: '8px', marginRight: '8px'}}
                                    value={item.qty || ''}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        let invoice = this.state.invoice;
                                        invoice.items[index].qty = value;
                                        this.setState({
                                            invoice: invoice
                                        })
                                    }}
                                    margin="normal"
                                    variant="outlined" />
                                <TextField
                                    id="item-tax-rate"
                                    label="Item Tax Rate"
                                    style={{marginLeft: '8px', marginRight: '8px'}}
                                    value={item.taxRate || ''}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        let invoice = this.state.invoice;
                                        invoice.items[index].taxRate = value;
                                        this.setState({
                                            invoice: invoice
                                        })
                                    }}
                                    margin="normal"
                                    variant="outlined" />
                                <TextField
                                    id="item-unit-price"
                                    label="Item Unit Price"
                                    style={{marginLeft: '8px', marginRight: '8px'}}
                                    value={item.unitPriceNet || ''}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        let invoice = this.state.invoice;
                                        invoice.items[index].unitPriceNet = value;
                                        this.setState({
                                            invoice: invoice
                                        })
                                    }}
                                    margin="normal"
                                    variant="outlined" />
                            </form>
                        ))}
                        <Grid container direction="row-reverse" spacing={2}>
                            <Grid item xs={1}>
                                <Button
                                color="primary"
                                onClick={() => {
                                    this.createInvoice();
                                }}>
                                    Save
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}

export default InvoiceCreate;