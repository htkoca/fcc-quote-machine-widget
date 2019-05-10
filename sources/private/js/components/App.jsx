// libraries
import React from '~/react';
import qs from '~/qs';

// components
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Blockquote from '@/js/components/Blockquote';

// setTimeout Promise
function delay(t, v) {
  return new Promise(function(resolve) { 
      setTimeout(resolve.bind(null, v), t)
  });
}

// export
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: '',
      author: '',
      loading: false
    };
    this.getQuote = this.getQuote.bind(this);
  }
  componentDidMount() {
    this.getQuote();
  }
  getQuote() {
    this.setState({ loading: true });
    fetch('data/quotes.json')
      .then((resp) => resp.json())
      .then((quotes) => {
        return delay(200, quotes);
      })
      .then((quotes) => {
        let self = this;
        let idx = Math.floor(Math.random() * quotes.length);
        let quote = quotes[idx]
        self.setState({
          quote: quote.quote, 
          author: quote.author
        })
      })
      .catch((err) => {
        console.log(err);
      })
      .then((err) => {
        this.setState({ loading: false });
      })
  }
  render() {
    let query = qs.stringify({ text: `${this.state.quote} - ${this.state.author}`, url: window.location.href });
    return (
      <main id='main' className='py-4'>
        <div className='container'>
          <Card>
            <Card.Header>Random Quote Machine</Card.Header>
            <Card.Body id='quote-box'>
              <div className={this.state.loading ? 'fade-box' : 'fade-box active'}>
                <Blockquote quote={this.state.quote} author={this.state.author}/>
              </div>
              <hr/>
              <ButtonToolbar>
                <Button id='new-quote' className="mr-2" variant='primary' onClick={this.getQuote} disabled={this.state.loading}>New Quote</Button>
                <Button id='tweet-quote' variant='primary' href={`https://twitter.com/intent/tweet?${query}`} disabled={this.state.loading} target="_blank">Tweet Quote</Button>
              </ButtonToolbar>
            </Card.Body>
          </Card>
        </div>
      </main>
    );
  }
}