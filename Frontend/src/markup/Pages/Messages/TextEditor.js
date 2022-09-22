import React,{useState} from 'react'
import {
	BiRedo,
	BiUndo,
	BiBold,
	BiUnderline,
	BiAlignJustify,
	BiAlignRight,
	BiAlignMiddle,
	BiAlignLeft,
	BiStrikethrough,
	BiItalic,
	BiListOl,
	BiLink,
	BiListUl,
	BiUnlink,
	
} from "react-icons/bi"
import { MdSubscript,MdSuperscript} from "react-icons/md"
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import Picker from 'emoji-picker-react';
import { Grid } from '@material-ui/core';
import Modal from '@mui/material/Modal';
import ReactQuill from 'react-quill'; 
import 'react-quill/dist/quill.snow.css';import "../../../css/text-ediitor.css"
import { IconButton } from '@mui/material';
function pasteHtmlAtCaret(html) {
		let sel, range;
		if (window.getSelection) {
		// IE9 and non-IE
		sel = window.getSelection();
		if (sel.getRangeAt && sel.rangeCount) {
			range = sel.getRangeAt(0);
			range.deleteContents();

			// Range.createContextualFragment() would be useful here but is
			// non-standard and not supported in all browsers (IE9, for one)
			const el = document.createElement("div");
			el.innerHTML = html;
			let frag = document.createDocumentFragment(),
			node,
			lastNode;
			while ((node = el.firstChild)) {
			lastNode = frag.appendChild(node);
			}
			range.insertNode(frag);

			// Preserve the selection
			if (lastNode) {
			range = range.cloneRange();
			range.setStartAfter(lastNode);
			range.collapse(true);
			sel.removeAllRanges();
			sel.addRange(range);
			}
		}
		} else if (document.selection && document.selection.type != "Control") {
		// IE < 9
		document.selection.createRange().pasteHTML(html);
		}
}
export const Emoji = (props) => {
	const {textbox,setTextbox,inputRef,setCursorPosition,cursorPosition} = props;
	const [chosenEmoji, setChosenEmoji] = useState(null);
	const pickEmoji = ( e , emoji ) => {
		const ref = inputRef.current ;
		console.log(inputRef.current[0])
		ref.focus();

		// const start = textbox.substring(0 ,ref.selectionStart) ;
		// const end = textbox.substring( ref.selectionStart ) ;
		// const text = start + emoji.emoji + end ;

		// setTextbox(text);

		// setCursorPosition(start.length+emoji.length);
		// parsing emoji into texteditor 
		pasteHtmlAtCaret(`<b>${emoji.emoji}</b>`);
	}
	return (
	<div className="emoji-picker">
		<Grid
        justifyContent={"flex-end"}
        style={{ padding: "10px 30px", display: "flex" }}
        container
        spacing={3}>
			<div className="talk-bubble-bottom tri-bottom bottom-in">
			<Picker  preload={true} onEmojiClick={pickEmoji}  groupVisibility={{flags: false,}} />
            {/* <div className="talktext">

			</div> */}
			</div>

		</Grid>
		
	</div>
	// </Modal>
	);
};
export const HeaderTextEditor = (props) => {
	const {inputRef} = props;
	const [ selected,setSelected] = useState("text")
	const [ selectedFont,setSelectedFont] = useState("Arial")
	const [selectedHead,setSelectedHead] = useState("p");
	const modifyText = (command, defaultUi, value) => {
		//execCommand executes command on selected text
		document.execCommand(command, defaultUi, value);
	};
	const wrapTag = (role,type="formatBlock") => {
        document.designMode = "on"
		if(type==="formatBlock"){

			switch(role) {
				case "H1":
					document.execCommand("formatBlock",false,role)
					document.designMode= "off"
					alert("bitch")
					break;
				case 'p':
					document.execCommand('formatBlock', false, role);
					document.designMode= "off"
					break;
				default:
					document.execCommand(role, false, null);
					break;
				}
			}else if(type === "foreColor" || type === "backColor" || type === "fontSize" || type==="fontName"){
				document.execCommand(type, false, role);
				document.designMode= "off"
			}
    }
	// modifyText()
	if(selected === "color"){
		return(
			<div className='text-editor-header'>
			
				font
				<IconButton onClick={ (e) => wrapTag(e.target.value,"foreColor") } onMouseDown={(event) => 
        event.preventDefault()}>
					<input type='color'/>
				</IconButton>
					bgcolor
				<IconButton onClick={ (e) => wrapTag(e.target.value,"backColor") } onMouseDown={(event) => 
        event.preventDefault()}>
					<input type='color'/>
				</IconButton>
				<select id="selecting" onChange={(e) => setSelected(e.target.value)}>
					<option value="text">Text</option>
					<option value="color" selected>color </option>
					<option value="heading">Heading</option>
					{/* <option value="audi">Audi</option> */}
				</select>
			</div>
		)
	}
	if(selected === "heading"){
		return(
			<div className='text-editor-header'>
				font Size
				<select id="formatBlock" class="adv-option-button" selected={selectedHead} onChange={(e) =>{
					// setSelectedHead(e.target.value,"fontSize")
					wrapTag(e.target.value,"fontSize")
					}}>
				<option value="3">default</option>
				<option value="1">1</option>
				<option value="2">2</option>
				<option value="3">3</option>
				<option value="4">4</option>
				<option value="5">5</option>
				<option value="6">6</option>
				<option value="7">7</option>
				</select>
				font Name 
				<select id="fontName" class="adv-option-button" selected ={ selectedFont} onChange={(e) =>{
					setSelectedFont(e.target.value)
					wrapTag(e.target.value,"fontName")
					}}>
					<option value={"Arial"}>default</option>
					<option value={"Arial"}> Arial</option>
					<option value={"Verdana"}> Verdana</option>
					<option value={ "Times New Roman"}> Times New Roman</option>
					<option value={"cursive"}> cursive</option>
					<option value={"Courier New"}> Courier New </option>
					<option value={"Garamond"}> Garamond </option>
					<option value={"Georgia"}> Georgia </option>
				</select>
			</div>
		)
	}
	
	function Cmd(){}
	return (
		<div className="text-editor-header">
			<IconButton sx={{color:"black"}} onClick={ (e) =>{
				wrapTag("undo") 
				const originalVal = "rgb(111, 111, 111)"
				if(getComputedStyle(e.target).color === originalVal){
					e.target.style.color = "black"
				}else{
					e.target.style.color = originalVal

				}
			}} onMouseDown={(event) => 
        event.preventDefault()}>
				<BiUndo/>
			</IconButton>
			<IconButton onClick={ (e) => {
				wrapTag("redo")
				const originalVal = "rgb(111, 111, 111)"
				if(getComputedStyle(e.target).color === originalVal){
					e.target.style.color = "black"
				}else{
					e.target.style.color = originalVal

				} 
			}} onMouseDown={(event) => 
        event.preventDefault()}>
				<BiRedo />

			</IconButton>
			<IconButton onClick={ (e) => {
				wrapTag("bold")
				const originalVal = "rgb(111, 111, 111)"
				if(getComputedStyle(e.target).color === originalVal){
					e.target.style.color = "black"
				}else{
					e.target.style.color = originalVal

				}
			} } onMouseDown={(event) => 
        event.preventDefault()}>
				<BiBold/>

			</IconButton>
			<IconButton onClick={ (e) => {
				wrapTag("italic") 
				const originalVal = "rgb(111, 111, 111)"
				if(getComputedStyle(e.target).color === originalVal){
					e.target.style.color = "black"
				}else{
					e.target.style.color = originalVal

				}
			}} onMouseDown={(event) => 
        event.preventDefault()}>
				<BiItalic/>
			</IconButton>
			<IconButton onClick={ (e) =>{
				wrapTag("underline") 
				const originalVal = "rgb(111, 111, 111)"
				if(getComputedStyle(e.target).color === originalVal){
					e.target.style.color = "black"
				}else{
					e.target.style.color = originalVal

				}
			}} onMouseDown={(event) => 
        event.preventDefault()}>
				<BiUnderline/>
			</IconButton>
			<IconButton onClick={ (e) =>{
				wrapTag("unlink") 
				const originalVal = "rgb(111, 111, 111)"
				if(getComputedStyle(e.target).color === originalVal){
					e.target.style.color = "black"
				}else{
					e.target.style.color = originalVal

				}
			}} onMouseDown={(event) => 
        event.preventDefault()}>
				<BiUnlink/>
			</IconButton>
			<IconButton onClick={ (e) =>{
				wrapTag("strikethrough") 
				const originalVal = "rgb(111, 111, 111)"
				if(getComputedStyle(e.target).color === originalVal){
					e.target.style.color = "black"
				}else{
					e.target.style.color = originalVal

				}
			}} onMouseDown={(event) => 
        event.preventDefault()}>
				<BiStrikethrough/>
			</IconButton>
			<IconButton onClick={ (e) => {
				wrapTag("subscript") 
				const originalVal = "rgb(111, 111, 111)"
				if(getComputedStyle(e.target).color === originalVal){
					e.target.style.color = "black"
				}else{
					e.target.style.color = originalVal

				}
			}} onMouseDown={(event) => 
        event.preventDefault()}>
				<MdSubscript/>
			</IconButton>
			<IconButton onClick={ (e) =>{
				wrapTag("superscript") 
				const originalVal = "rgb(111, 111, 111)"
				if(getComputedStyle(e.target).color === originalVal){
					e.target.style.color = "black"
				}else{
					e.target.style.color = originalVal

				}
				}} onMouseDown={(event) => 
        event.preventDefault()}>
				<MdSuperscript />
			</IconButton>
			<IconButton onClick={ (e) => {
				wrapTag("insertUnorderedList") 
				const originalVal = "rgb(111, 111, 111)"
				if(getComputedStyle(e.target).color === originalVal){
					e.target.style.color = "black"
				}else{
					e.target.style.color = originalVal

				}
			}} onMouseDown={(event) => 
        event.preventDefault()}>
				<BiListUl/>
			</IconButton>
			<IconButton onClick={ (e) =>{ 
				wrapTag("insertOrderedList") 
				const originalVal = "rgb(111, 111, 111)"
				if(getComputedStyle(e.target).color === originalVal){
					e.target.style.color = "black"
				}else{
					e.target.style.color = originalVal

				}
			}} onMouseDown={(event) => 
        event.preventDefault()}>
				<BiListOl/>
			</IconButton>
			<select id="selecting" selected={selected} onChange={(e) => setSelected(e.target.value)}>
				<option value="text">Text</option>
				<option value="color">color </option>
				<option value="heading">Heading</option>
				{/* <option value="audi">Audi</option> */}
			</select>
		</div>
						
		)

}
const TextEditor = (props) => {
	const [ detailsValue , setDetailsValue] = useState()
	const [ expandTxtEditor,setexpandTxtEditor] = useState(false)
	return (
		<ReactQuill value={detailsValue || ''} onChange={(e)=>{setDetailsValue(e.target.value)}} style={{position:"relative",top:"-25px", height:'150px', width:"70%", paddingBottom:'70px'}} />
	)
}

export default TextEditor
