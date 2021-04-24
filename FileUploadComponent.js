import React, { Component } from 'react';
import axios from 'axios';

class FileUploadComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: '',
            status: '',
            progress: 0,
            po: '',
            ref: React.createRef()
        }
    }
    selectFileHandler = (event) => {
        //1. define the array for the file type e.g. png, jpeg
        const fileTypes = ['image/png', 'image/jpeg'];

        // 2. get the file type
        let file = event.target.files;
        console.log(`File ${file}`);
        // 3. the message for error if the file type of not matched
        let errMessage = [];
        // 4. to check the file type to match with the fileTypes array iterate 
        // through the types array
        //if (fileTypes.every(extension => file[0].type != extension)) {
           // errMessage.push(`The file ${file.type} extension is not supported`);
        //} else {
            this.setState({
                selectedFile: file[0],
                
            });
       // }
    };
    // method contain logic to upload file
    uploadHandler = (event) => {
        // 1. the FormData object that contains the data to be posted to the 
        // WEB API
        const formData = new FormData();
        formData.append('file', this.state.selectedFile);

        // 2. post the file to the WEB API
        axios.post("https://localhost:44393/api/FileUpload/Upload", formData, {
            onUploadProgress: progressEvent => {
                this.setState({
                    progress: (progressEvent.loaded / progressEvent.total * 100)
                })
            }
        })
            .then((response) => {
                this.setState({ status: `upload success ${response.data}` });
            })
            .catch((error) => {
                this.setState({ status: `upload failed ${error}` });
            })
    }


    componentDidMount() {
        const formData = new FormData();
       

        // 2. post the file to the WEB API
        axios.get("https://localhost:44393/api/FileUpload/getPhotos"
            )
            .then((response) => {
               console.log(response);
            })
            .catch((error) => {
                this.setState({ status: `upload failed ${error}` });
            })
    }


    downloadPdf = () => {
        axios.get("https://localhost:44393/api/FileUpload/pdf" ).then(response => {
            let blob = new Blob([response.data], { type: 'application/octet-stream' })
            let ref = this.state.ref
            ref.current.href = URL.createObjectURL(blob)
            ref.current.download = 'data.pdf'
            ref.current.click()
        })
    }

    test = e => {
        
        axios.get("https://localhost:44393/api/FileUpload/photo", { responseType: "blob" })
            .then(function (response) {

                var reader = new window.FileReader();
                reader.readAsDataURL(response.data);
                reader.onload = function () {

                    var imageDataUrl = reader.result;
                    //imageElement.setAttribute("src", imageDataUrl);

                    localStorage.setItem('img',imageDataUrl);
                    console.log(imageDataUrl);
                }
            });

    }


    render() {
        const { po } = this.state
        return (
            <div>
                <h2>The File Upload DEMO</h2>
                <div>
                    <label>Select File to Upload</label>
                    <input type="file" onChange={this.selectFileHandler} />
                </div>
                <hr />
                <div>
                    <button type="button" onClick={this.uploadHandler}>Upload</button></div>
                <hr />
                <div>{this.state.progress}</div>
                <br />
                <div>{this.state.status}</div>

                <div>
                    <a style={{ display: 'none' }} href='empty' ref={this.state.ref}>ref</a>
                    <button onClick={this.downloadPdf}>Export CSV</button>
                    <button onClick={this.test}>Test this</button>
                    <p></p>

                    <img src={localStorage.getItem('img')} alt="Red dot" />
                </div>

            </div>
            
        );
    }
}

export default FileUploadComponent;