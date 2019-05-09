// libraries
import React from '~/react';

// export
export default class Blockquote extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <blockquote className='blockquote mb-0'>
        <p id='text'>
          {this.props.quote}
        </p>
        { this.props.author ? (
          <footer className='blockquote-footer'>
            <span id='author'>{this.props.author}</span>
          </footer>
        ) : ''}
      </blockquote>
    );
  }
}