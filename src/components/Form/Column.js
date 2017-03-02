import React from 'react';

class FormColumn extends React.Component {

    render() {
        const { width } = this.props;
        const style = {
            WebkitFlex: width,
            msFlex: width,
            flex: width,
        }
        return (
          <div className='form__column' style={width ? style : null}>
              {this.props.children}
          </div>
        )
    }

}
export default FormColumn;
