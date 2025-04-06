import { ChangeEvent } from 'react'

export const LabeledInput = ({ label, type, placeholder, onChange } : LabelledInputTypes) =>  {
    return (
        <div className="w-full mb-4">
            <label className="block font-semibold mb-1">{label}</label>
            <input 
                placeholder={placeholder} type={type || "text"}
                className="block w-full px-3 py-2 border-2 border-gray-200 rounded-md text-gray-600 outline-none" 
                onChange={onChange}
            />
        </div>
    )
}

interface LabelledInputTypes{
    label : string,
    type? : string,
    placeholder: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void 
}
