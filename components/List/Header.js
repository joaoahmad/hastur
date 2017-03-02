import React from 'react';
import reduce from 'lodash/reduce';

class Header extends React.Component {

    render() {

        const { header } = this.props
        const headerFields = reduce(header, (fields, item, i) => {
            if(typeof item === 'object' && item.key)
            fields.push(<span key={i} className={`uxlist__header__field uxlist__header__field__${item.key}`}>{item.label}</span>)

            return fields;
        }, [])

        return (
            <div className="uxlist__header">
                {headerFields}
                <span className="uxlist__header__field uxlist__header__actions"></span>
            </div>
        );
    }
}


Header.propTypes = {
    header: React.PropTypes.array,
}

export default Header
