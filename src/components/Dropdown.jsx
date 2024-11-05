import React from "react"
import Select from 'react-select'

const Dropdown = ({ options, selectedOptions, onChange }) => {
    const selectOptions = options.map(option => ({
        value: option,
        label: option
    }))
    return (
        <div className="p-4">
            <Select
                isMulti
                options={selectOptions}
                value={selectOptions.filter(option => selectedOptions.includes(option.value))}
                onChange={(selected) => onChange(selected.map(option => option.value))}
                className="basic-multi-select"
                classNamePrefix="select"
            />
        </div>
    )
}

export default Dropdown