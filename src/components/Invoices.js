import React from 'react';
import { Route } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import queryString from 'query-string';

class Invoices extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      invoices: [],
      pageNumber: queryString.parse(this.props.location.search).page_number !== undefined ? queryString.parse(this.props.location.search).page_number : 1,
      pageSize: queryString.parse(this.props.location.search).page_size !== undefined ? queryString.parse(this.props.location.search).page_size : 10,
      queryString: {}
    }
    this.getInvoices();
  }
  
  getMoreInvoices() {
    let size = queryString.parse(this.props.location.search).page_size !== undefined ? Number(this.state.pageSize) + Number(queryString.parse(this.props.location.search).page_size) : this.state.pageSize + 10;
    this.setState({
      pageSize: size
    });
    this.getInvoices();
  }

  getInvoices() {
    console.log(this.state.pageNumber, this.state.pageSize);
    let requestString = 'http://localhost:3000/invoices?page_size=' + this.state.pageSize + '&page_number=' + this.state.pageNumber;
    axios.get(requestString)
    .then(response => {
      const invoices = response.data.invoices;
      invoices.map(invoice => {
        invoice.totalBrutto = 0;
        invoice.totalNetto = 0;
        invoice.items.map(item => {
          item.totalBrutto = item.qty * item.unitPriceNet;
          item.totalNetto = item.totalBrutto * (1 + item.taxRate);
          invoice.totalBrutto += item.totalBrutto;
          invoice.totalNetto += item.totalNetto;
        })
      });
      this.setState({
        invoices: invoices
      })
    })
  }

  render() {
    return (
      <Grid item xs={12}>
        <Paper style={{padding: '16px', display: 'flex', overflow: 'auto', flexDirection: 'column'}}>
                    
            <Title>Recent Invoices</Title>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Recipient</TableCell>
                  <TableCell>Sender</TableCell>
                  <TableCell>Number of Items</TableCell>
                  <TableCell align="right">Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.invoices.map(invoice => (
                  <Route render={({ history }) => (
                    <TableRow key={invoice.id} hover onClick={() => {history.push('invoices/' + invoice.id)}}>
                      <TableCell>{invoice.createdDate}</TableCell>
                      <TableCell>{invoice.recipient.name}</TableCell>
                      <TableCell>{invoice.sender.name}</TableCell>
                      <TableCell>{invoice.items.lenth}</TableCell>
                      <TableCell align="right">{invoice.totalNetto.toFixed(2)}</TableCell>
                    </TableRow>
                  )} />
                ))}
              </TableBody>
            </Table>
            <div style={{marginTop: '24px'}}>
              <Button color="primary" onClick={() => {this.getMoreInvoices()}}>
                See more Invoices
              </Button>
            </div>

        </Paper>
      </Grid>
    );
  }
}

export default Invoices;