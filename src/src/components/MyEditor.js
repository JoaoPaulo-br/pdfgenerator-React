import React, { Fragment } from 'react';
import ReactDOM from 'react-dom'
import { Modal, Button } from 'react-bootstrap';
// import { convertFromRaw, EditorState } from 'draft-js';
import RichEditor from './RichEditor'
import Pdfrender from './Pdfrender'
import '../assets/css/MyEditor.css'


class MyEditor extends React.Component {
  constructor(props){
      super(props)
      this.state={
        richEditorContent: '',
        textareaContent: '',
        show: false,
        warningMsg: false,
        detectedItem: 0
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handlePreview = this.handlePreview.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleCloseWarning = this.handleCloseWarning.bind(this)
    this.handleRichTextChange = this.handleRichTextChange.bind(this)
    this.handleTxtAreaChange = this.handleTxtAreaChange.bind(this)
  }

  handleSubmit(event){
    if(this.state.richEditorContent !== '' || this.state.textareaContent !== '')
      this.setState({show: false, warningMsg: true})
  }
  handlePreview(){
    if(this.state.detectedItem === 0){
      this.handleRichTextChange()
      this.setState({show: true, warningMsg: false})
    }
    else if(this.state.textareaContent !== '')
      this.setState({show: true, warningMsg: false})
  }
  
  getSavedEditorData() {
    const savedData = localStorage.getItem('editorData');
    // let rawEditorData = savedData ? JSON.parse(savedData) : null;
    console.log('myeditor',savedData)
    return savedData;
  }

  handleTxtAreaChange(event){
    this.setState({textareaContent: event.target.value,detectedItem:1})
  }
  handleRichTextChange(){
    console.log('-----------')
    let richEditorbuf = JSON.stringify(this.getSavedEditorData());
    this.setState({richEditorContent: richEditorbuf,detectedItem: 0}) 
    
  }
  handleClose(){
    this.setState({show: false})
  }
  handleCloseWarning(){
    this.setState({warningMsg: false,detectedItem:0})
  }
  render() {
    return (
      <div>
        <RichEditor />
        <textarea rows="10" cols="117" value={this.state.textareaContent} onChange={this.handleTxtAreaChange} ref="normalIn" />
        <br />
        <button onClick={this.handlePreview}>Preview</button>
        <button onClick={this.handleSubmit}>Submit</button>
        <Modal show={this.state.show} onHide={this.handleClose} dialogClassName="modal-90w">
          <Modal.Body>
            {
              this.state.show && 
                <Pdfrender 
                  content={this.state.detectedItem === 0 ? this.state.richEditorContent : this.state.textareaContent } 
                  isDown={this.state.warningMsg}
                  detected = {this.state.detectedItem} 
                />
            }
          </Modal.Body>
        </Modal>
        
        <Modal show={this.state.warningMsg} onHide={this.handleCloseWarning}>
          <Modal.Body>
            Do you wanna download file? 
          </Modal.Body>
          <Modal.Footer>
            {
              this.state.warningMsg && 
              <Pdfrender 
                content={this.state.detectedItem === 0 ? this.state.richEditorContent : this.state.textareaContent} 
                isDown={this.state.warningMsg}
                detected = {this.state.detectedItem} 
              />
            }
            <Button onClick={this.handleCloseWarning}>No</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}  

export default MyEditor