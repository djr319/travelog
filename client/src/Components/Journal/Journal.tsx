

export default function Journal (): JSX.Element {
  function handleSubmit () {
    return 0;
  }

  return (
    <div className="journal">
      <form className="journal__form" onSubmit={handleSubmit}>
        <button type='submit'>Save Journal</button>
      </form>
    </div>
  )
}