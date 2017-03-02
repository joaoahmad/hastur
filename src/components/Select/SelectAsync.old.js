import React, { PropTypes } from 'react'
import Select from './index'
import omit from 'lodash/omit'
import debounce from 'lodash/debounce'

// import SelectConnected from './SelectConnected';

class SelectAsync extends React.Component {
    constructor() {
        super();
        this.state = {
            list: [],
            fetching: false,
            config: {
                value: 'id',
                label: 'title'
            }
        }
        this.handleChange = debounce(this.handleChange.bind(this), 500);
    }
    componentDidMount(){
        this.handleFetch();
        this.setState({ config: {
            ...this.state.config,
            ...this.props.config
        }});
    }

    handleFetch(filter = {}){
        const { action, entity } = this.props
        this.setState({ fetching: true  })
        action(filter).then((response) => {
            const list = entity ? response.payload[entity] : response.payload;
            this.setState({ list, fetching: false  })
        })
    }

    handleChange(inputValue){
        const { label } = this.state.config;
        this.handleFetch({ [label]: inputValue });
    }

    render(){
        const { list, fetching, config } = this.state

        const options = list.map(item => Object({ value: item[config.value], label: item[config.label] }))
        const props = omit(this.props, ['onFocus', 'onBlur'])

        return <Select {...props}
            options={options}
            onInputChange={this.handleChange}
            isLoading={fetching} />
    }
}

SelectAsync.propTypes = {
    action: PropTypes.func.isRequired,
    entity: PropTypes.string,
    config: PropTypes.shape({
        value: PropTypes.any,
        label: PropTypes.any,
    })
}

export default SelectAsync;
