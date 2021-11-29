type InputPageProps = {
  text: string;
}

export default function ViewPage({text}: InputPageProps) {
  return (
    <div className='journal__view' >
				<div
					className='journal__view-text'
				/>
				{text}
			<button className='journal__view-update' >
				Update story
			</button>
		</div>
  )
}