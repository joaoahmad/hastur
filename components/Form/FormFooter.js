import React, { Component, PropTypes } from 'react';
import { Sticky } from 'react-sticky';
import classnames from 'classnames';
import Affix from 'components/Affix';
import styles from './styles/form-footer.css';

class FormFooter extends Component {

    static propTypes = {
        variant: PropTypes.string,
        offset: PropTypes.number,
    }

    static defaultProps = {
        variant: '',
        offset: 0,
    }

    render() {
        const { className, variant, offset, ...others } = this.props;
        const classes = classnames(styles.formFooter, className, ...variant.split(' ').map(i => styles['formFooter--' + i]));
        return (
            <div className={classes}>
                {this.props.children}
            </div>
        );
        // return (
        //     <Affix className={styles.formFooterAfix} offsetBottom={offset}>
        //         <div className={styles.formFooter}>
        //             {this.props.children}
        //         </div>
        //     </Affix>
        // );
    }
}

export default FormFooter;
