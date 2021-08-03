import React from 'react';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import {
	Box,
	Button,
	Paper,
	Typography,
	LinearProgress,
} from '@material-ui/core';
import { InputStyles } from './Input.styles';
import { excelToJson } from '../../utils/ExcelToJson';


export default function Input() {
	const classes = InputStyles();

	const [{ processed, outstanding }, dispatchQueue] = React.useReducer(queueReducer, { processed: [], outstanding: [] })

	const uploaded = processed.length + outstanding.length
	const remaining = outstanding.length

	const removeCurrent = useCallback(() => dispatchQueue({ type: "pop" }), [dispatchQueue])
	const uploadFiles = useCallback((files: FileList) =>
		dispatchQueue({ type: "upload", files: Array.from(files).map(file => ({ file, fileName: file.name })) }), [dispatchQueue])
	const clearQueue = useCallback(() => dispatchQueue({ type: "clear" }), [dispatchQueue])

	useEffect(() => {
		const entry = outstanding[0]
		if (entry) {
			processEntry(entry)
			dispatchQueue({ type: "processing" })
		}
	}, [outstanding.length])

	const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (files) {
			uploadFiles(files)
		}
	}

	const nextData = async () => {
		const outstandingFirst = outstanding[0]
		const processedResult = await outstandingFirst.result;
		if (processedResult)
			dispatchQueue({ type: "processed", ...processedResult })
	}

	const saveData = async () => {
		console.log(processed)
	}

	return (
		<Paper className={classes.paper}>
			<Typography component='h1' variant='h5' align='center'>
				New Crystal Data
			</Typography>

			<React.Fragment>

				<div style={{ position: 'relative' }}>
					<div style={uploaded <= 0 ? { display: 'block' } : { display: 'none' }}>
						<Box className={classes.spacing} display='flex'>
							<Button variant='contained' component='label'>
								Choose File(s)
								<input
									type='file'
									onChange={onInputChange}
									id='files'
									accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
									hidden
									multiple
								/>
							</Button>
						</Box>
						<Typography>
							*You can choose one or multiple files. Only Excel files (.xls,
							.xlsx) are allowed. Please see{' '}
							<a href='https://petro.wovodat.org/assets/excels/Sample_Template_New_v3.xlsx'>
								example file
							</a>
							.
						</Typography>
					</div>
				</div>

				{uploaded > 0 && outstanding[0]
					&& <div>
						{!outstanding[0].result
							&& <div>
								<LinearProgress />
							</div>
						}
						{outstanding[0].result
							&& <div>
								// TODO: add form data
							</div>
						}
						<div className={classes.buttons}>
							<Button
								variant='contained'
								color='primary'
								className={classes.button}
								onClick={nextData}
							>
								Next
							</Button>
						</div>
					</div>
				}

				{uploaded > 0 && !outstanding[0]
					&& <div>
						<div>
							Saving {processed.length} files?
						</div>
						<div className={classes.buttons}>
							// TODO: change saveData
							<Button
								variant='contained'
								color='primary'
								className={classes.button}
								onClick={saveData}
							>
								Save
							</Button>
						</div>
					</div>
				}

			</React.Fragment>
		</Paper >
	);
}

const queueReducer = (queue: Queue, message: UploadMessage | ProcessingMessage | ProcessedMessage | PopMessage | ClearMessage): Queue => {
	switch (message.type) {
		case "upload": return { processed: queue.processed, outstanding: [...queue.outstanding, ...message.files] }
		case "processing": // Processing `outstanding` head. Refresh
			return { processed: queue.processed, outstanding: [...queue.outstanding] }
		case "processed":
			if (queue.outstanding[0].file === message.file)
				return { processed: [...queue.processed, message.result], outstanding: queue.outstanding.slice(1) }
			return queue // Not in the list, ignored
		case "pop": return { processed: queue.processed.slice(1), outstanding: queue.outstanding }
		case "clear": return { processed: [], outstanding: [] }
	}
}


function processEntry(entry: OutstandingEntry) {
	if (entry.result) return

	const { file, fileName } = entry
	console.log(fileName)
	entry.result = excelToJson(entry.file).then((json) => {
		return { file, result: { fileName, json } }
	})
}



type ProcessedEntry = {
	fileName: string, json: any,
}
type OutstandingEntry = {
	file: File, fileName: string, result?: Promise<{ file: File, result: ProcessedEntry }>,
}
type Queue = { processed: ProcessedEntry[], outstanding: OutstandingEntry[] }
type UploadMessage = { type: "upload", files: OutstandingEntry[] }
type ProcessingMessage = { type: "processing" }
type ProcessedMessage = { type: "processed", file: File, result: ProcessedEntry }
type PopMessage = { type: "pop" }
type ClearMessage = { type: "clear" }

// type MongoDBJson = {
// 	crystal: string,
// 	type: string,
// 	axis: string,
// 	orientation: string,
// 	mineral: string,
// 	volcano: string,
// 	eruption: string,
// 	reference: string,
// 	//author: string,
// 	//doi: string,
// 	traverse: Traverse[],
// }

// type Traverse = {
// 	sio2: string
// }