import React from 'react';

class FormRow extends React.Component {

    render() {
        return (
          <div className='form__row'>
              {this.props.children}
          </div>
        )
    }

}
export default FormRow;
