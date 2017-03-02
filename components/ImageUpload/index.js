import React, { PropTypes } from 'react';
import each from 'lodash/each';
import isEmpty from 'lodash/isEmpty';
import Dropzone from 'react-dropzone';
import classnames from 'classnames';

class ImageUpload extends React.Component {

    constructor(props){
        super(props)
        this.state = { image: false, uploading: false }
        this.handleOpenClick = this.handleOpenClick.bind(this)
        this.onDrop = this.onDrop.bind(this)
    }

    onDrop(files) {
        const { onUpload, multiple } = this.props
        if(!multiple){
            return onUpload(files[0]);
        }else{
            return onUpload(files);
        }
    }

    handleOpenClick(){
        this.refs.dropzone.open();
    }

    get getImage(){
        const image = this.state.image || this.props.image;
        const styles = {
            width: this.props.width,
            height: this.props.height,
            background: '#e9e9e9 no-repeat center center / ' + this.props.bgSize,
        }
        if(image){
            styles.backgroundImage = `url(${image})`;
            // return ( <div style={styles}></div> )
        }else{
            // return ( <div style={styles}></div> )
        }
        if((!this.props.width || !this.props.height) || (this.props.autoSize == true && !isEmpty(image))){
            return (<img src={image} />)
        }else{
            return (<div style={styles}></div>)
        }
    }

    render() {

        const { multiple, label, uploading } = this.props

        var classes = classnames('uximage_upload', {
            'is-uploading': uploading || false,
        });

        return (
            <div className='uximage_upload-wrap'>
                {label ? <label>{label}</label> : null }
                {label ? <br/> : null }
                <div className={classes}>
                    <Dropzone ref="dropzone" onDrop={this.onDrop} className="dropzone" multiple={multiple || false} disableClick={true}>
                        {this.getImage}
                    </Dropzone>
                    <div className="uximage_upload-overlay">
                        <span className="uximage_upload-overlay-progress">Salvando</span>
                    </div>
                    <div className="uximage_upload-choose">
                        <button className="uximage_upload-choose-button" type="button" onClick={this.handleOpenClick}>
                            <i className="vi-refresh"></i>
                            Atualizar imagem
                        </button>
                    </div>
                </div>
            </div>
        );
    }

}

ImageUpload.propTypes = {
    onUpload: PropTypes.func.isRequired,
    image: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    bgSize: PropTypes.string,
}

ImageUpload.defaultProps = {
    bgSize: 'cover',
}

export default ImageUpload
