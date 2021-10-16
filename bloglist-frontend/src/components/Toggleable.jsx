
const Toggleable = ({label, children, visible, setVisible}) => {
  if (!visible) return (
    <button onClick={() => setVisible(true)}>{label}</button>
  )
  else return(
    <div>
      {children}
      <button onClick={() => setVisible(false)}>Cancel</button>
    </div>
  )
}

export default Toggleable