import React from 'react';
import axios from 'axios';
import {Grid, Paper, TextField, Button} from '@material-ui/core';
import Title from './Title';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';


class InvoiceEdit extends React.Component {
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
        this.getInvoice();
    }
    getInvoice() {
        const path = this.props.location.pathname.split('/');
        const requestString = 'http://localhost:3000/invoices/' + path[path.length - 1];
        axios.get(requestString)
        .then((response) => {
            const invoice = response.data.invoice;
            // invoice.totalBrutto = 0;
            // invoice.totalNetto = 0;
            // invoice.items.map(item => {
            //     item.totalBrutto = item.qty * item.unitPriceNet;
            //     item.totalNetto = item.totalBrutto * (1 + item.taxRate);
            //     invoice.totalBrutto += item.totalBrutto;
            //     invoice.totalNetto += item.totalNetto;
            //     invoice.taxRate = item.taxRate;
            // })
            this.setState({
                invoice: invoice
            })
        })
        .catch((error) => {
            console.log(error);
        });
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
    removeItem(index) {
        let invoice = this.state.invoice;
        let removed = invoice.items.splice(index, 1);
        this.setState({
            invoice: invoice
        })
    }

    saveInvoice() {
        if (this.state.error) {
            return;
        }
        const requestURL = 'http://localhost:3000/invoices/' + this.state.invoice.id;
        axios.put(requestURL, {invoice: this.state.invoice})
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        })
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
                                value={this.state.invoice.createdDate || ''}
                                margin="normal"
                                variant="outlined" />
                            <TextField
                                required
                                error={this.state['due-date-hasError']}
                                helperText={this.state['due-date-hasError'] ? 'This field is required' : ''}
                                id="due-date"
                                label="Due Date"
                                style={{marginLeft: '8px', marginRight: '8px'}}
                                value={this.state.invoice.dueDate || ''}
                                onChange={(e) => {
                                    const empty = e.target.value === '' ? true : false;
                                    const value = e.target.value;
                                    let invoice = this.state.invoice;
                                    invoice.dueDate = value;
                                    let state = {};
                                    state.invoice = invoice;
                                    state.error = empty;
                                    state[e.target.id + '-hasError'] = empty
                                    this.setState(state);
                                }}
                                margin="normal"
                                variant="outlined" />
                            <TextField
                                disabled
                                id="invoice-id"
                                label="Invoice Id"
                                style={{marginLeft: '8px', marginRight: '8px'}}
                                value={this.state.invoice.id || ''}
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
                                error={this.state['recipient-name-hasError']}
                                helperText={this.state['recipient-name-hasError'] ? 'This field is required' : ''}
                                id="recipient-name"
                                label="Recipient Name"
                                style={{marginLeft: '8px', marginRight: '8px'}}
                                value={this.state.invoice.recipient.name || ''}
                                onChange={(e) => {
                                    const empty = e.target.value === '' ? true : false;
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
                                error={this.state['recipient-email-hasError']}
                                helperText={this.state['recipient-email-hasError'] ? 'This field is required' : ''}
                                id="recipient-email"
                                label="Recipient Email"
                                style={{marginLeft: '8px', marginRight: '8px'}}
                                value={this.state.invoice.recipient.email || ''}
                                onChange={(e) => {
                                    const empty = e.target.value === '' ? true : false;
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
                                error={this.state['recipient-address1-hasError']}
                                helperText={this.state['recipient-address1-hasError'] ? 'This field is required' : ''}
                                id="recipient-address1"
                                label="Recipient Address1"
                                style={{marginLeft: '8px', marginRight: '8px'}}
                                value={this.state.invoice.recipient.address1 || ''}
                                onChange={(e) => {
                                    const empty = e.target.value === '' ? true : false;
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
                                required
                                error={this.state['recipient-vatId-hasError']}
                                helperText={this.state['recipient-vatId-hasError'] ? 'This field is required' : ''}
                                id="recipient-vatId"
                                label="Recipient Vat Id"
                                style={{marginLeft: '8px', marginRight: '8px'}}
                                value={this.state.invoice.recipient.vatId || ''}
                                onChange={(e) => {
                                    const empty = e.target.value === '' ? true : false;
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
                                required
                                error={this.state['sender-name-hasError']}
                                helperText={this.state['sender-name-hasError'] ? 'This field is required' : ''}
                                id="sender-name"
                                label="Sender Name"
                                style={{marginLeft: '8px', marginRight: '8px'}}
                                value={this.state.invoice.sender.name || ''}
                                onChange={(e) => {
                                    const empty = e.target.value === '' ? true : false;
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
                                required
                                error={this.state['sender-email-hasError']}
                                helperText={this.state['sender-email-hasError'] ? 'This field is required' : ''}
                                id="sender-email"
                                label="Sender Email"
                                style={{marginLeft: '8px', marginRight: '8px'}}
                                value={this.state.invoice.sender.email || ''}
                                onChange={(e) => {
                                    const empty = e.target.value === '' ? true : false;
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
                                required
                                error={this.state['sender-address1-hasError']}
                                helperText={this.state['sender-address1-hasError'] ? 'This field is required' : ''}
                                id="sender-address1"
                                label="Sender Address1"
                                style={{marginLeft: '8px', marginRight: '8px'}}
                                value={this.state.invoice.sender.address1 || ''}
                                onChange={(e) => {
                                    const empty = e.target.value === '' ? true : false;
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
                                required
                                error={this.state['sender-vatId-hasError']}
                                helperText={this.state['sender-vatId-hasError'] ? 'This field is required' : ''}
                                id="sender-vatId"
                                label="Sender Vat Id"
                                style={{marginLeft: '8px', marginRight: '8px'}}
                                value={this.state.invoice.sender.vatId || ''}
                                onChange={(e) => {
                                    const empty = e.target.value === '' ? true : false;
                                    const match = e.target.value.match(/DE[0-9]{9}/)
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
                            <Grid key={item.name + '-' + index} container spacing={3}>
                                <Grid item sm={11}>
                                    <form style={{display: 'flex', flexWrap: 'wrap'}} noValidate autoComplete="off">
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
                                </Grid>
                                <Grid item sm={1}>
                                    <Button color="primary" onClick={() => this.removeItem(index)}>
                                        <RemoveCircleIcon />
                                    </Button>
                                </Grid>
                            </Grid>
                        ))}
                        <Grid container direction="row-reverse" spacing={2}>
                            <Grid item xs={1}>
                                <Button
                                color="primary"
                                onClick={() => {
                                    this.saveInvoice();
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

export default InvoiceEdit;