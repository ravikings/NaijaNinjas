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
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import Picker from 'emoji-picker-react';
import { Grid } from '@material-ui/core';
import Modal from '@mui/material/Modal';
import "../../../css/text-ediitor.css"
export const Emoji = (props) => {
	const {textbox,setTextbox,inputRef,setCursorPosition,cursorPosition} = props;
	const [chosenEmoji, setChosenEmoji] = useState(null);
	const pickEmoji = ( e , emoji ) => {
		const ref = inputRef.current ;
		console.log(inputRef.current[0])
		ref.focus();
		const start = textbox.substring(0 ,ref.selectionStart) ;
		const end = textbox.substring( ref.selectionStart ) ;
		const text = start + emoji.emoji + end ;

		setTextbox(text);

		setCursorPosition(start.length+emoji.length);
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
const TextEditor = () => {
	const [ expandTxtEditor,setexpandTxtEditor] = useState(false)
	function formatDoc(cmd, value=null) {
		if(value) {
			document.execCommand(cmd, false, value);
		} else {
			document.execCommand(cmd);
		}
	}
	
	function addLink() {
		const url = prompt('Insert url');
		formatDoc('createLink', url);
	}
	
	
	
	
	const content = document.getElementById('content');
	
	content.addEventListener('mouseenter', function () {
		const a = content.querySelectorAll('a');
		a.forEach(item=> {
			item.addEventListener('mouseenter', function () {
				content.setAttribute('contenteditable', false);
				item.target = '_blank';
			})
			item.addEventListener('mouseleave', function () {
				content.setAttribute('contenteditable', true);
			})
		})
	})
	
	
	const showCode = document.getElementById('show-code');
	let active = false;
	
	showCode.addEventListener('click', function () {
		showCode.dataset.active = !active;
		active = !active
		if(active) {
			content.textContent = content.innerHTML;
			content.setAttribute('contenteditable', false);
		} else {
			content.innerHTML = content.textContent;
			content.setAttribute('contenteditable', true);
		}
	})
	
	
	
	const filename = document.getElementById('filename');
	
	function fileHandle(value) {
		if(value === 'new') {
			content.innerHTML = '';
			filename.value = 'untitled';
		} else if(value === 'txt') {
			const blob = new Blob([content.innerText])
			const url = URL.createObjectURL(blob)
			const link = document.createElement('a');
			link.href = url;
			link.download = `${filename.value}.txt`;
			link.click();
		} else if(value === 'pdf') {
			// html2pdf(content).save(filename.value);
		}
	}
	return (
		<div className="container">
			<div className="toolbar">
				{expandTxtEditor? 
					<div className="head">
					
						<select onchange="formatDoc('formatBlock', this.value); this.selectedIndex=0;">
							<option value="" selected="" hidden="" disabled="">Format</option>
							<option value="h1">Heading 1</option>
							<option value="h2">Heading 2</option>
							<option value="h3">Heading 3</option>
							<option value="h4">Heading 4</option>
							<option value="h5">Heading 5</option>
							<option value="h6">Heading 6</option>
							<option value="p">Paragraph</option>
						</select>
						<select onchange="formatDoc('fontSize', this.value); this.selectedIndex=0;">
							<option value="" selected="" hidden="" disabled="">Font size</option>
							<option value="1">Extra small</option>
							<option value="2">Small</option>
							<option value="3">Regular</option>
							<option value="4">Medium</option>
							<option value="5">Large</option>
							<option value="6">Extra Large</option>
							<option value="7">Big</option>
						</select>
						<div className="color">
							<span>Color</span>
							<input type="color" oninput="formatDoc('foreColor', this.value); this.value='#000000';"/>
						</div>
						<div className="color">
							<span>Background</span>
							<input type="color" oninput="formatDoc('hiliteColor', this.value); this.value='#000000';"/>
						</div>
					</div>:""}
				<div className="btn-toolbar">
					<button onclick="formatDoc('undo')"><BiUndo/></button>
					<button onclick="formatDoc('redo')"><BiRedo/> </button>
					<button onclick="formatDoc('bold')"><BiBold/></button>
					<button onclick="formatDoc('underline')"><BiUnderline/></button>
					<button onclick="formatDoc('italic')"><BiItalic/></button>
					<button onclick="formatDoc('strikeThrough')"><BiStrikethrough/></button>
					<button onclick="formatDoc('justifyLeft')"><BiAlignLeft/></button>
					<button onclick="formatDoc('justifyCenter')"><BiAlignMiddle/></button>
					<button onclick="formatDoc('justifyRight')"><BiAlignRight/></button>
					{/* <button onclick="formatDoc('justifyFull')"><BiAlignJustify/></button>
					<button onclick="formatDoc('insertOrderedList')"><BiListOl/></button>
					<button onclick="formatDoc('insertUnorderedList')"><BiListUl/></button>
					<button onclick="formatDoc('unlink')"><BiUnlink/></button>
				  */}
					<button onclick="addLink()"><BiLink/></button> 
					{/* <button id="show-code" data-active="false">&lt;/&gt;</button> */}
					<button id="show-code" data-active="false"><AttachFileIcon/></button>
				</div>
			</div>
			<div id="content" contenteditable="true" spellcheck="false" placeholder='your message'>
				
			</div>
		</div>
	
	)
}

export default TextEditor
