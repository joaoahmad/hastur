import React, { PropTypes } from 'react';
import classnames from 'classnames';
import omit from 'lodash/omit';
import pStyles from './styles.css';

function Paragraph(props){
    let { className, type, style, modifiers, variant, disabled, muted, italic, bold, ...others } = props;
    variant = variant ? variant.split(' ') : modifiers;
    const classes = classnames(pStyles.text, className, {
        [pStyles['text--strong']]: bold,
        [pStyles['text--muted']]: muted,
        [pStyles['text--italic']]: italic
    },
        ...variant.map(i => pStyles['text--' + i]));

    return (
        <span {...others} style={style} className={classes}>{props.children}</span>
    );

}

Paragraph.propTypes = {
    modifiers: PropTypes.array, // DEPRECATED
    variant: PropTypes.string,
    muted: PropTypes.bool,
    bold: PropTypes.bool,
    italic: PropTypes.bool,
};

Paragraph.defaultProps = {
    modifiers: [], // DEPRECATED
    variant: null,
    muted: false,
    bold: false,
    italic: false,
};

const styles = pStyles;
export { styles };
export default Paragraph;
