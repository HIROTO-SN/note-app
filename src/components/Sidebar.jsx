import React from 'react';
import "./style/Sidebar.css";

const Sidebar = ({ onAddNote, notes }) => {
	return (
		<div className='app-sidebar'>
			<div className='app-sidebar-header'>
				<h1>ノート</h1>
				<button onClick={onAddNote}>追加</button>
			</div>
			<div className="app-sidebar-notes">
				{notes.map((note) => {
					return (
						<div className="app-sidebar-note" key={note.id}>
							<div className="sidebar-note-title">
								<strong>{note.title}</strong>
								<button>削除</button>
							</div>
							<p>{note.content}</p>
							<small>最後の修正日:{new Date(note.modDate).toLocaleDateString("ja-JP")}</small>
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default Sidebar