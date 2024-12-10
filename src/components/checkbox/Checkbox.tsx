const Checkbox = (props: {
    id?: string,
    extra?: string

}) => {
    const { id, extra, ...rest } = props
    return <input
        type="checkbox"
        name="weekly"
        id={id}
        className={`defaultCheckbox ${extra}`}
        {...rest} />
}

export default Checkbox