import React from 'react';
import { Route } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Title from './Title';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Edit, DeleteForever} from '@material-ui/icons';
import DeleteInvoiceModal from './DeleteInvoiceModal';

class InvoiceDetail extends React.Component {
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
        const requestString = 'http://localhost:3000' + this.props.location.pathname;
        axios.get(requestString)
        .then(response => {
            const invoice = response.data.invoice;
            invoice.totalBrutto = 0;
            invoice.totalNetto = 0;
            invoice.items.map(item => {
                item.totalNetto = item.qty * item.unitPriceNet;
                item.totalBrutto = item.totalNetto * (1 - item.taxRate);
                invoice.totalBrutto += item.totalBrutto;
                invoice.totalNetto += item.totalNetto;
                invoice.taxRate = item.taxRate;
            })
            this.setState({
                invoice: invoice
            })
        })
    }
    saveButtonClicked() {
        this.handlerForButtonClicked = this.handlerForButtonClicked.bind(this);
        this.setState({
            buttonClicked: true
        });
    }
    handlerForButtonClicked(value) {
        this.setState({
            buttonClicked: value
        })
    }
    render() {
        return (
            <Grid container spacing={3}>
                <div id="modalContainer">
                    { (this.state.buttonClicked) ? <DeleteInvoiceModal handler={this.handlerForButtonClicked} invoice={this.state.invoice} open={true}/> : false }
                </div>
                <Grid item xs={12}>
                    <Paper style={{padding: '16px', display: 'flex', overflow: 'auto', flexDirection: 'column'}}>
                        <Grid container spacing={1}>
                            <Grid item sm={10}>
                                <Title>{this.state.invoice.recipient.name}</Title>
                            </Grid>
                            <Grid item sm={1}>
                                <Route render={({history}) => (
                                    <Button color="primary" onClick={() => {history.push('edit/' + this.state.invoice.id)}}>
                                        <Edit />
                                    </Button>
                                )} />
                            </Grid>
                            <Grid item sm={1}>
                                {/* <Route render={({history}) => ( */}
                                    {/* <Button color="primary" onClick={() => {history.push('edit/' + this.state.invoice.id)}}> */}
                                    <Button color="primary" onClick={() => {this.saveButtonClicked()}}>
                                        <DeleteForever />
                                    </Button>
                                {/* )} /> */}
                            </Grid>
                        </Grid>
                        <Typography variant="body2" gutterBottom>
                            {this.state.invoice.recipient.email}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                            {this.state.invoice.recipient.address1},
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                            {this.state.invoice.recipient.address2},
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                            {this.state.invoice.recipient.address3}
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper style={{padding: '16px', display: 'flex', overflow: 'auto', flexDirection: 'column'}}>
                        <Title>Invoice #{this.state.invoice.id}</Title>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>No.</TableCell>
                                    <TableCell>Item</TableCell>
                                    <TableCell>Unit Price</TableCell>
                                    <TableCell>Unit</TableCell>
                                    <TableCell>Total</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.invoice.items.map((item, index) => (
                                    <TableRow key={index + 1}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{item.description}</TableCell>
                                        <TableCell>{item.unitPriceNet}</TableCell>
                                        <TableCell>{item.qty}</TableCell>
                                        <TableCell align="right">{item.totalBrutto.toFixed(2)}</TableCell>
                                    </TableRow>
                                ))}
                                <TableRow>
                                    <TableCell colSpan={2}/>
                                    <TableCell colSpan={2}>Sub Total: </TableCell>
                                    <TableCell align="right">{this.state.invoice.totalBrutto.toFixed(2)}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={2}/>
                                    <TableCell colSpan={1}>Tax Rate: </TableCell>
                                    <TableCell>{this.state.invoice.taxRate * 100}%</TableCell>
                                    <TableCell align="right">{(this.state.invoice.totalNetto - this.state.invoice.totalBrutto).toFixed(2)}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={2}/>
                                    <TableCell style={{fontWeight: 'bold'}} colSpan={2}>Grand Total: </TableCell>
                                    <TableCell style={{fontWeight: 'bold'}} align="right">{this.state.invoice.totalNetto.toFixed(2)}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper style={{padding: '16px', display: 'flex', overflow: 'auto', flexDirection: 'column'}}>
                        <Title>Sent from: {this.state.invoice.sender.name}</Title>
                        <Typography variant="body2" gutterBottom>
                            {this.state.invoice.sender.email}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                            {this.state.invoice.sender.address1},
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                            {this.state.invoice.sender.address2},
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                            {this.state.invoice.sender.address3}
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}

export default InvoiceDetail;